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
import { Search, Plus, Eye, Edit, Trash2, Users } from "lucide-react";

const mockJobListings = [
  {
    id: 1,
    title: "Senior React Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    status: "Active",
    applicants: 42,
    posted: "Jan 20, 2024",
    expires: "Feb 20, 2024",
    salary: "$120k - $150k",
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    status: "Active",
    applicants: 38,
    posted: "Jan 25, 2024",
    expires: "Feb 25, 2024",
    salary: "$100k - $130k",
  },
  {
    id: 3,
    title: "Frontend Developer",
    department: "Engineering",
    location: "Hybrid - New York",
    type: "Full-time",
    status: "Active",
    applicants: 28,
    posted: "Jan 12, 2024",
    expires: "Feb 12, 2024",
    salary: "$90k - $120k",
  },
  {
    id: 4,
    title: "Product Manager",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    status: "Draft",
    applicants: 0,
    posted: "Feb 5, 2024",
    expires: "Mar 5, 2024",
    salary: "$130k - $160k",
  },
  {
    id: 5,
    title: "UX Designer",
    department: "Design",
    location: "Remote",
    type: "Contract",
    status: "Closed",
    applicants: 52,
    posted: "Dec 10, 2023",
    expires: "Jan 10, 2024",
    salary: "$80k - $100k",
  },
];

const getStatusBadgeStyle = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-700";
    case "Draft":
      return "bg-gray-100 text-gray-700";
    case "Closed":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export function JobListings() {
  return (
    <>
      <PortalTopbar title="Job Listings" subtitle="Manage your job postings" />
      <main className="flex-1 overflow-auto p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Job Listings</CardTitle>
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Plus className="h-4 w-4 mr-2" />
                Create Job Post
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search job listings..." className="pl-10" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Job Listings */}
            <div className="space-y-4">
              {mockJobListings.map((job) => (
                <div
                  key={job.id}
                  className="p-4 rounded-lg border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-medium">{job.title}</h3>
                        <Badge variant="secondary" className={getStatusBadgeStyle(job.status)}>
                          {job.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="text-gray-500">Department:</span> {job.department}
                        </div>
                        <div>
                          <span className="text-gray-500">Location:</span> {job.location}
                        </div>
                        <div>
                          <span className="text-gray-500">Type:</span> {job.type}
                        </div>
                        <div>
                          <span className="text-gray-500">Salary:</span> {job.salary}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{job.applicants} applicants</span>
                        </div>
                        <span>•</span>
                        <span>Posted: {job.posted}</span>
                        <span>•</span>
                        <span>Expires: {job.expires}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
