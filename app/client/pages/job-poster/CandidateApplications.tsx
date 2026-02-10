import { PortalTopbar } from "../../components/PortalTopbar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Search, Filter, Sparkles, Star, CheckCircle, XCircle, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const mockCandidates = {
  all: [
    { 
      id: 1, 
      name: "Sarah Johnson", 
      position: "Senior React Developer", 
      aiScore: 92, 
      experience: "6 years",
      location: "San Francisco, CA",
      applied: "Feb 4, 2024",
      status: "New"
    },
    { 
      id: 2, 
      name: "Michael Chen", 
      position: "Full Stack Engineer", 
      aiScore: 88, 
      experience: "5 years",
      location: "Remote",
      applied: "Feb 3, 2024",
      status: "Screening"
    },
    { 
      id: 3, 
      name: "Emma Wilson", 
      position: "Frontend Developer", 
      aiScore: 85, 
      experience: "4 years",
      location: "New York, NY",
      applied: "Feb 2, 2024",
      status: "Interview"
    },
    { 
      id: 4, 
      name: "David Brown", 
      position: "Senior React Developer", 
      aiScore: 79, 
      experience: "7 years",
      location: "Austin, TX",
      applied: "Feb 1, 2024",
      status: "Shortlisted"
    },
    { 
      id: 5, 
      name: "Lisa Anderson", 
      position: "Frontend Developer", 
      aiScore: 91, 
      experience: "5 years",
      location: "Remote",
      applied: "Jan 31, 2024",
      status: "Offer"
    },
  ],
  new: [
    { 
      id: 1, 
      name: "Sarah Johnson", 
      position: "Senior React Developer", 
      aiScore: 92, 
      experience: "6 years",
      location: "San Francisco, CA",
      applied: "Feb 4, 2024",
      status: "New"
    },
  ],
  shortlisted: [
    { 
      id: 4, 
      name: "David Brown", 
      position: "Senior React Developer", 
      aiScore: 79, 
      experience: "7 years",
      location: "Austin, TX",
      applied: "Feb 1, 2024",
      status: "Shortlisted"
    },
  ],
  interview: [
    { 
      id: 3, 
      name: "Emma Wilson", 
      position: "Frontend Developer", 
      aiScore: 85, 
      experience: "4 years",
      location: "New York, NY",
      applied: "Feb 2, 2024",
      status: "Interview"
    },
  ],
};

const getStatusBadgeStyle = (status: string) => {
  switch (status) {
    case "New":
      return "bg-blue-100 text-blue-700";
    case "Screening":
      return "bg-yellow-100 text-yellow-700";
    case "Interview":
      return "bg-purple-100 text-purple-700";
    case "Shortlisted":
      return "bg-green-100 text-green-700";
    case "Offer":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getAIScoreBadgeStyle = (score: number) => {
  if (score >= 90) return "bg-green-100 text-green-700";
  if (score >= 80) return "bg-blue-100 text-blue-700";
  if (score >= 70) return "bg-yellow-100 text-yellow-700";
  return "bg-gray-100 text-gray-700";
};

export function CandidateApplications() {
  return (
    <>
      <PortalTopbar title="Candidates" subtitle="Review and manage applicants" />
      <main className="flex-1 overflow-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Candidate Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search candidates..." className="pl-10" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="react">React Developer</SelectItem>
                  <SelectItem value="fullstack">Full Stack Engineer</SelectItem>
                  <SelectItem value="frontend">Frontend Developer</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="score">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="score">AI Score (High to Low)</SelectItem>
                  <SelectItem value="date">Application Date</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="all">All ({mockCandidates.all.length})</TabsTrigger>
                <TabsTrigger value="new">New ({mockCandidates.new.length})</TabsTrigger>
                <TabsTrigger value="shortlisted">Shortlisted ({mockCandidates.shortlisted.length})</TabsTrigger>
                <TabsTrigger value="interview">Interview ({mockCandidates.interview.length})</TabsTrigger>
              </TabsList>

              {Object.entries(mockCandidates).map(([key, candidates]) => (
                <TabsContent key={key} value={key}>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Candidate</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>AI Score</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Applied</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {candidates.map((candidate) => (
                        <TableRow key={candidate.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-sm font-medium text-blue-700">
                                  {candidate.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <span className="font-medium">{candidate.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{candidate.position}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className={getAIScoreBadgeStyle(candidate.aiScore)}>
                                {candidate.aiScore}
                              </Badge>
                              <Sparkles className="h-4 w-4 text-blue-500" />
                            </div>
                          </TableCell>
                          <TableCell>{candidate.experience}</TableCell>
                          <TableCell>{candidate.location}</TableCell>
                          <TableCell>{candidate.applied}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className={getStatusBadgeStyle(candidate.status)}>
                              {candidate.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="outline" size="sm">View</Button>
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
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
