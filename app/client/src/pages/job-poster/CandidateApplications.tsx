import { useState, useEffect } from "react";
import { PortalTopbar } from "../../comoponents/PortalTopbar";
import { Card, CardContent, CardHeader, CardTitle } from "../../comoponents/ui/card";
import { Button } from "../../comoponents/ui/button";
import { Badge } from "../../comoponents/ui/badge";
import { Input } from "../../comoponents/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../comoponents/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../comoponents/ui/table";
import { Search, CheckCircle, XCircle } from "lucide-react";
import api from "../../api/axios";
import { toast } from "sonner";

interface JobOption {
  id: string;
  title: string;
  companyName: string;
}

interface CandidateRow {
  applicationId: string;
  candidateId: string;
  candidateEmail: string;
  candidateName: string | null;
  status: string;
  appliedAt: string;
}

const getStatusBadgeStyle = (status: string) => {
  switch (status) {
    case "APPLIED":
      return "bg-green-100 text-green-700";
    case "SHORTLISTED":
      return "bg-blue-100 text-blue-700";
    case "REJECTED":
      return "bg-red-100 text-red-700";
    case "HIRED":
      return "bg-emerald-100 text-emerald-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const formatStatus = (s: string) =>
  s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export function CandidateApplications() {
  const [jobs, setJobs] = useState<JobOption[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [candidates, setCandidates] = useState<CandidateRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadJobs = async () => {
    try {
      const { data } = await api.get<{ content: JobOption[] }>("/jobs/recruiter?page=0&size=100");
      const list = data.content ?? (Array.isArray(data) ? data : []);
      const arr = Array.isArray(list) ? list : [];
      setJobs(arr);
      if (arr.length > 0 && !selectedJobId) setSelectedJobId(arr[0].id);
    } catch {
      setJobs([]);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    if (!selectedJobId) {
      setCandidates([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    api
      .get<CandidateRow[]>(`/applications/jobs/${selectedJobId}`)
      .then(({ data }) => {
        if (!cancelled) setCandidates(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setCandidates([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [selectedJobId]);

  const updateStatus = async (applicationId: string, status: string) => {
    try {
      await api.patch(`/applications/${applicationId}/status`, { status });
      toast.success("Status updated.");
      setCandidates((prev) =>
        prev.map((c) =>
          c.applicationId === applicationId ? { ...c, status } : c
        )
      );
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? "Failed to update");
    }
  };

  const filtered = candidates.filter(
    (c) =>
      search === "" ||
      [c.candidateEmail, c.candidateName].some(
        (s) => s && s.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <>
      <PortalTopbar title="Candidates" subtitle="Review and manage applicants" />
      <main className="flex-1 overflow-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Candidate Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <Select value={selectedJobId} onValueChange={setSelectedJobId}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select job" />
                </SelectTrigger>
                <SelectContent>
                  {jobs.map((j) => (
                    <SelectItem key={j.id} value={j.id}>
                      {j.title} — {j.companyName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search candidates..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <p className="text-gray-500 py-8">Loading…</p>
            ) : selectedJobId && jobs.length === 0 ? (
              <p className="text-gray-500 py-8">No jobs. Create a job first.</p>
            ) : filtered.length === 0 ? (
              <p className="text-gray-500 py-8">No applications for this job yet.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Applied</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((c) => (
                    <TableRow key={c.applicationId}>
                      <TableCell className="font-medium">
                        {c.candidateName || c.candidateEmail}
                      </TableCell>
                      <TableCell>{c.candidateEmail}</TableCell>
                      <TableCell>
                        {new Date(c.appliedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getStatusBadgeStyle(c.status)}>
                          {formatStatus(c.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {c.status !== "SHORTLISTED" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-600"
                            onClick={() => updateStatus(c.applicationId, "SHORTLISTED")}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        {c.status !== "REJECTED" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                            onClick={() => updateStatus(c.applicationId, "REJECTED")}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        )}
                        {c.status !== "HIRED" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-emerald-600"
                            onClick={() => updateStatus(c.applicationId, "HIRED")}
                          >
                            Hire
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
