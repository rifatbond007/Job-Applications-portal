import { PortalTopbar } from "../../components/PortalTopbar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Search, Flag, Eye, CheckCircle, XCircle } from "lucide-react";

const mockJobListings = [
  { 
    id: 1, 
    title: "Senior React Developer", 
    company: "TechCorp Inc.", 
    status: "Active",
    applicants: 42,
    posted: "2024-02-01",
    flagged: false
  },
  { 
    id: 2, 
    title: "Product Manager", 
    company: "StartupXYZ", 
    status: "Flagged",
    applicants: 18,
    posted: "2024-02-03",
    flagged: true
  },
  { 
    id: 3, 
    title: "Data Scientist", 
    company: "DataCo", 
    status: "Active",
    applicants: 67,
    posted: "2024-01-28",
    flagged: false
  },
  { 
    id: 4, 
    title: "UX Designer", 
    company: "DesignHub", 
    status: "Under Review",
    applicants: 31,
    posted: "2024-02-05",
    flagged: false
  },
  { 
    id: 5, 
    title: "Backend Engineer", 
    company: "CloudSystems", 
    status: "Active",
    applicants: 54,
    posted: "2024-01-25",
    flagged: false
  },
];

export function JobListingsOversight() {
  return (
    <>
      <PortalTopbar title="Job Listings Oversight" subtitle="Monitor and moderate job postings" />
      <main className="flex-1 overflow-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>All Job Listings</CardTitle>
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
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                  <SelectItem value="review">Under Review</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Job Listings Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applicants</TableHead>
                  <TableHead>Posted Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockJobListings.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="flex items-center gap-2">
                      {job.flagged && <Flag className="h-4 w-4 text-red-500" />}
                      {job.title}
                    </TableCell>
                    <TableCell>{job.company}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary"
                        className={
                          job.status === "Active" 
                            ? "bg-green-100 text-green-700" 
                            : job.status === "Flagged"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      >
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{job.applicants}</TableCell>
                    <TableCell>{job.posted}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm" className="text-green-600">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
