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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../comoponents/ui/dialog";
import { Label } from "../../comoponents/ui/label";
import { Textarea } from "../../comoponents/ui/textarea";
import { Search, Plus, Eye, Trash2 } from "lucide-react";
import api from "../../api/axios";
import { toast } from "sonner";

interface JobRow {
  id: string;
  title: string;
  location: string;
  salary: number | null;
  companyName: string;
  status?: string;
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

function CreateCompanyForm({ onSuccess, onCancel }: { onSuccess: () => void; onCancel: () => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    try {
      const { data } = await api.post<{ id: string }>("/companies", { name: name.trim(), description: description.trim() || null, location: location.trim() || null });
      await api.post(`/companies/${data.id}/assign-me`);
      toast.success("Company created and linked.");
      onSuccess();
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? "Failed to create company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4 pt-4 border-t">
      <Label>Create new company</Label>
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Company name" required />
      <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location (optional)" />
      <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description (optional)" rows={2} />
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={loading}>{loading ? "Creating…" : "Create & link company"}</Button>
      </DialogFooter>
    </form>
  );
}

export function JobListings() {
  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [companySetupOpen, setCompanySetupOpen] = useState(false);
  const [companies, setCompanies] = useState<{ id: string; name: string }[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [assigning, setAssigning] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "" as string | number,
    type: "FULL_TIME",
  });

  const loadJobs = async () => {
    setLoading(true);
    try {
      const { data } = await api.get<{ content: JobRow[] }>("/jobs/recruiter?page=0&size=100");
      const list = data.content ?? (Array.isArray(data) ? data : []);
      setJobs(Array.isArray(list) ? list : []);
    } catch (e: any) {
      const msg = e.response?.data?.message ?? e.message ?? "Failed to load jobs";
      if (String(msg).toLowerCase().includes("company")) {
        setCompanySetupOpen(true);
        loadCompanies();
      }
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const loadCompanies = async () => {
    try {
      const { data } = await api.get<{ id: string; name: string }[]>("/companies");
      setCompanies(Array.isArray(data) ? data : []);
      if (Array.isArray(data) && data.length > 0 && !selectedCompanyId)
        setSelectedCompanyId(data[0].id);
    } catch {
      setCompanies([]);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateLoading(true);
    try {
      await api.post("/jobs", {
        title: form.title,
        description: form.description,
        location: form.location,
        salary: form.salary === "" ? null : Number(form.salary),
        type: form.type,
      });
      toast.success("Job created.");
      setCreateOpen(false);
      setForm({ title: "", description: "", location: "", salary: "", type: "FULL_TIME" });
      loadJobs();
    } catch (err: any) {
      const msg = err.response?.data?.message ?? "Failed to create job";
      toast.error(msg);
    } finally {
      setCreateLoading(false);
    }
  };

  const handleAssignCompany = async () => {
    if (!selectedCompanyId) return;
    setAssigning(true);
    try {
      await api.post(`/companies/${selectedCompanyId}/assign-me`);
      toast.success("Company linked. You can now post jobs.");
      setCompanySetupOpen(false);
      loadJobs();
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? "Failed to assign company");
    } finally {
      setAssigning(false);
    }
  };

  const handleCloseJob = async (jobId: string) => {
    if (!confirm("Close this job? New applications will not be accepted.")) return;
    try {
      await api.patch(`/jobs/${jobId}/close`);
      toast.success("Job closed.");
      loadJobs();
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? "Failed to close job");
    }
  };

  const filtered = jobs.filter(
    (j) =>
      search === "" ||
      [j.title, j.companyName].some((s) =>
        s.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <>
      <PortalTopbar title="Job Listings" subtitle="Manage your job postings" />
      <main className="flex-1 overflow-auto p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Job Listings</CardTitle>
              <div className="flex gap-2">
                {companies.length === 0 && (
                  <Button variant="outline" onClick={() => { setCompanySetupOpen(true); loadCompanies(); }}>
                    Setup Company
                  </Button>
                )}
                <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => setCreateOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Job Post
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search job listings..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <p className="text-gray-500 py-8">Loading…</p>
            ) : filtered.length === 0 ? (
              <p className="text-gray-500 py-8">No jobs yet. Create one or link a company first.</p>
            ) : (
              <div className="space-y-4">
                {filtered.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 rounded-lg border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium">{job.title}</h3>
                          <Badge variant="secondary" className={getStatusBadgeStyle(job.status ?? "OPEN")}>
                            {job.status ?? "OPEN"}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                          <div><span className="text-gray-500">Company:</span> {job.companyName}</div>
                          <div><span className="text-gray-500">Location:</span> {job.location || "—"}</div>
                          <div><span className="text-gray-500">Salary:</span> {job.salary != null ? `$${job.salary}` : "—"}</div>
                          <div><span className="text-gray-500">Posted:</span> {new Date(job.createdAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="outline" size="sm" asChild>
                          <a href="/job-poster/candidates">View candidates</a>
                        </Button>
                        {job.status === "OPEN" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                            onClick={() => handleCloseJob(job.id)}
                          >
                            Close
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Job Post</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateJob} className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Job title"
                  required
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Job description"
                  rows={3}
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={form.location}
                  onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                  placeholder="e.g. Remote, New York"
                />
              </div>
              <div>
                <Label>Salary (optional)</Label>
                <Input
                  type="number"
                  value={form.salary}
                  onChange={(e) => setForm((f) => ({ ...f, salary: e.target.value }))}
                  placeholder="e.g. 120000"
                />
              </div>
              <div>
                <Label>Type</Label>
                <Select
                  value={form.type}
                  onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FULL_TIME">Full-time</SelectItem>
                    <SelectItem value="PART_TIME">Part-time</SelectItem>
                    <SelectItem value="INTERNSHIP">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setCreateOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createLoading}>
                  {createLoading ? "Creating…" : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={companySetupOpen} onOpenChange={setCompanySetupOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Link to a company</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-gray-600 mb-4">
              Recruiters must be linked to a company before posting jobs. Select an existing company or create a new one.
            </p>
            {companies.length > 0 && (
              <>
                <Label>Existing company</Label>
                <Select value={selectedCompanyId} onValueChange={setSelectedCompanyId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <DialogFooter className="gap-2 sm:gap-0">
                  <Button variant="outline" onClick={() => setCompanySetupOpen(false)}>Cancel</Button>
                  <Button onClick={handleAssignCompany} disabled={assigning || !selectedCompanyId}>
                    {assigning ? "Linking…" : "Link me to this company"}
                  </Button>
                </DialogFooter>
              </>
            )}
            {companies.length === 0 && (
              <p className="text-gray-500">No companies yet. Create one below or ask an admin to add a company.</p>
            )}
            <CreateCompanyForm
              onSuccess={() => { setCompanySetupOpen(false); loadJobs(); loadCompanies(); }}
              onCancel={() => setCompanySetupOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
}
