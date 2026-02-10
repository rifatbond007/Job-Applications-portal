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
import { Search, Filter, Plus, ExternalLink, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../comoponents/ui/tabs";

const mockApplications = {
  all: [
    { id: 1, company: "TechCorp Inc.", position: "Senior React Developer", status: "Under Review", applied: "Feb 4, 2024", salary: "$120k - $150k" },
    { id: 2, company: "StartupXYZ", position: "Full Stack Engineer", status: "Interview Scheduled", applied: "Feb 3, 2024", salary: "$100k - $130k" },
    { id: 3, company: "DataCo", position: "Frontend Developer", status: "Applied", applied: "Feb 2, 2024", salary: "$90k - $120k" },
    { id: 4, company: "CloudSystems", position: "React Developer", status: "Under Review", applied: "Feb 1, 2024", salary: "$110k - $140k" },
    { id: 5, company: "DesignHub", position: "UI Engineer", status: "Rejected", applied: "Jan 30, 2024", salary: "$95k - $125k" },
  ],
  active: [
    { id: 1, company: "TechCorp Inc.", position: "Senior React Developer", status: "Under Review", applied: "Feb 4, 2024", salary: "$120k - $150k" },
    { id: 2, company: "StartupXYZ", position: "Full Stack Engineer", status: "Interview Scheduled", applied: "Feb 3, 2024", salary: "$100k - $130k" },
    { id: 3, company: "DataCo", position: "Frontend Developer", status: "Applied", applied: "Feb 2, 2024", salary: "$90k - $120k" },
  ],
  interviews: [
    { id: 2, company: "StartupXYZ", position: "Full Stack Engineer", status: "Interview Scheduled", applied: "Feb 3, 2024", salary: "$100k - $130k" },
  ],
  archived: [
    { id: 5, company: "DesignHub", position: "UI Engineer", status: "Rejected", applied: "Jan 30, 2024", salary: "$95k - $125k" },
  ],
};

const getStatusBadgeStyle = (status: string) => {
  switch (status) {
    case "Applied":
      return "bg-green-100 text-green-700";
    case "Under Review":
      return "bg-yellow-100 text-yellow-700";
    case "Interview Scheduled":
      return "bg-blue-100 text-blue-700";
    case "Rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export function Applications() {
  return (
    <>
      <PortalTopbar title="My Applications" subtitle="Track and manage your job applications" />
      <main className="flex-1 overflow-auto p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Application Tracker</CardTitle>
              <Button className="bg-green-500 hover:bg-green-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Application
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search applications..." className="pl-10" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="review">Under Review</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="all">All ({mockApplications.all.length})</TabsTrigger>
                <TabsTrigger value="active">Active ({mockApplications.active.length})</TabsTrigger>
                <TabsTrigger value="interviews">Interviews ({mockApplications.interviews.length})</TabsTrigger>
                <TabsTrigger value="archived">Archived ({mockApplications.archived.length})</TabsTrigger>
              </TabsList>

              {Object.entries(mockApplications).map(([key, applications]) => (
                <TabsContent key={key} value={key}>
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <div key={app.id} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-medium">{app.position}</h3>
                              <Badge variant="secondary" className={getStatusBadgeStyle(app.status)}>
                                {app.status}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-1">{app.company}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>Applied: {app.applied}</span>
                              <span>•</span>
                              <span>{app.salary}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
