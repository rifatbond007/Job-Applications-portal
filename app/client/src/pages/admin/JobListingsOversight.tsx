import { useState, useEffect } from "react";
import { PortalTopbar } from "../../comoponents/PortalTopbar";
import { Card, CardContent, CardHeader, CardTitle } from "../../comoponents/ui/card";
import { Badge } from "../../comoponents/ui/badge";
import { Input } from "../../comoponents/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../comoponents/ui/table";
import { Search } from "lucide-react";
import api from "../../api/axios";

interface JobRow {
  id: string;
  title: string;
  location: string;
  salary: number | null;
  companyName: string;
  status: string;
  createdAt: string;
}

const getStatusBadgeStyle = (status: string) => {
  switch (status) {
    case "OPEN":
      return "bg-green-100 text-green-700";
    case "CLOSED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export function JobListingsOversight() {
  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .get<{ content: JobRow[] }>("/jobs/all?page=0&size=100")
      .then(({ data }) => {
        const list = data.content ?? (Array.isArray(data) ? data : []);
        if (!cancelled) setJobs(Array.isArray(list) ? list : []);
      })
      .catch(() => {
        if (!cancelled) setJobs([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const filtered = jobs.filter(
    (j) =>
      search === "" ||
      [j.title, j.companyName].some((s) =>
        s.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <>
      <PortalTopbar title="Job Listings Oversight" subtitle="Monitor and moderate job postings" />
      <main className="flex-1 overflow-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>All Job Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search jobs..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <p className="text-gray-500 py-8">Loading…</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Posted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.companyName}</TableCell>
                      <TableCell>{job.location || "—"}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getStatusBadgeStyle(job.status)}>
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
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
