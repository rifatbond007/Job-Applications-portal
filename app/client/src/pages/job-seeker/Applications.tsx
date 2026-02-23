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
import { Search, Plus, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../comoponents/ui/tabs";
import { Link } from "react-router";
import api from "../../api/axios";

type AppStatus = "APPLIED" | "SHORTLISTED" | "REJECTED" | "HIRED";

interface ApplicationRow {
  applicationId: string;
  jobTitle: string;
  companyName: string;
  status: AppStatus;
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

export function Applications() {
  const [applications, setApplications] = useState<ApplicationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get<{ content: ApplicationRow[] }>(
          "/applications/me/applications?page=0&size=100"
        );
        const list = data.content ?? (Array.isArray(data) ? data : []);
        if (!cancelled) setApplications(Array.isArray(list) ? list : []);
      } catch (e) {
        if (!cancelled) setApplications([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const filtered = applications.filter((app) => {
    const matchSearch =
      search === "" ||
      [app.jobTitle, app.companyName].some((s) =>
        s.toLowerCase().includes(search.toLowerCase())
      );
    const matchStatus =
      statusFilter === "all" || app.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const byStatus = (status: AppStatus) => applications.filter((a) => a.status === status);
  const activeCount = applications.filter(
    (a) => a.status === "APPLIED" || a.status === "SHORTLISTED"
  ).length;
  const archivedCount = applications.filter(
    (a) => a.status === "REJECTED" || a.status === "HIRED"
  ).length;

  return (
    <>
      <PortalTopbar title="My Applications" subtitle="Track and manage your job applications" />
      <main className="flex-1 overflow-auto p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Application Tracker</CardTitle>
              <Link to="/">
                <Button className="bg-green-500 hover:bg-green-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search applications..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="APPLIED">Applied</SelectItem>
                  <SelectItem value="SHORTLISTED">Shortlisted</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                  <SelectItem value="HIRED">Hired</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <p className="text-gray-500 py-8">Loading applications…</p>
            ) : (
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="all">All ({applications.length})</TabsTrigger>
                  <TabsTrigger value="active">Active ({activeCount})</TabsTrigger>
                  <TabsTrigger value="shortlisted">Shortlisted ({byStatus("SHORTLISTED").length})</TabsTrigger>
                  <TabsTrigger value="archived">Archived ({archivedCount})</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  <List applications={filtered} getStatusBadgeStyle={getStatusBadgeStyle} formatStatus={formatStatus} />
                </TabsContent>
                <TabsContent value="active">
                  <List
                    applications={filtered.filter(
                      (a) => a.status === "APPLIED" || a.status === "SHORTLISTED"
                    )}
                    getStatusBadgeStyle={getStatusBadgeStyle}
                    formatStatus={formatStatus}
                  />
                </TabsContent>
                <TabsContent value="shortlisted">
                  <List
                    applications={filtered.filter((a) => a.status === "SHORTLISTED")}
                    getStatusBadgeStyle={getStatusBadgeStyle}
                    formatStatus={formatStatus}
                  />
                </TabsContent>
                <TabsContent value="archived">
                  <List
                    applications={filtered.filter(
                      (a) => a.status === "REJECTED" || a.status === "HIRED"
                    )}
                    getStatusBadgeStyle={getStatusBadgeStyle}
                    formatStatus={formatStatus}
                  />
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
}

function List({
  applications,
  getStatusBadgeStyle,
  formatStatus,
}: {
  applications: ApplicationRow[];
  getStatusBadgeStyle: (s: string) => string;
  formatStatus: (s: string) => string;
}) {
  if (applications.length === 0) {
    return (
      <p className="text-gray-500 py-8">No applications in this group.</p>
    );
  }
  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <div
          key={app.applicationId}
          className="p-4 rounded-lg border hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-medium">{app.jobTitle}</h3>
                <Badge variant="secondary" className={getStatusBadgeStyle(app.status)}>
                  {formatStatus(app.status)}
                </Badge>
              </div>
              <p className="text-gray-600 mb-1">{app.companyName}</p>
              <p className="text-sm text-gray-500">
                Applied: {new Date(app.appliedAt).toLocaleDateString()}
              </p>
            </div>
            <Link to="/">
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-1" />
                View Job
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
