import { PortalTopbar } from "../../components/PortalTopbar";
import { KPICard } from "../../components/KPICard";
import { Briefcase, Users, UserCheck, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const candidatePipelineData = [
  { stage: "Applied", count: 124 },
  { stage: "Screening", count: 68 },
  { stage: "Interview", count: 32 },
  { stage: "Offer", count: 8 },
];

const applicationTrendData = [
  { date: "Feb 1", applications: 18 },
  { date: "Feb 2", applications: 24 },
  { date: "Feb 3", applications: 21 },
  { date: "Feb 4", applications: 28 },
  { date: "Feb 5", applications: 35 },
  { date: "Feb 6", applications: 32 },
];

const recentApplications = [
  { id: 1, name: "Sarah Johnson", position: "Senior React Developer", score: 92, applied: "2 hours ago" },
  { id: 2, name: "Michael Chen", position: "Full Stack Engineer", score: 88, applied: "4 hours ago" },
  { id: 3, name: "Emma Wilson", position: "Frontend Developer", score: 85, applied: "6 hours ago" },
];

const activeJobs = [
  { id: 1, title: "Senior React Developer", applicants: 42, status: "Active", daysLeft: 18 },
  { id: 2, title: "Full Stack Engineer", applicants: 38, status: "Active", daysLeft: 12 },
  { id: 3, title: "Frontend Developer", applicants: 28, status: "Active", daysLeft: 25 },
];

export function JobPosterDashboard() {
  return (
    <>
      <PortalTopbar title="Dashboard" subtitle="Welcome back! Here's your hiring overview" />
      <main className="flex-1 overflow-auto p-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <KPICard
            title="Active Job Posts"
            value="8"
            icon={Briefcase}
            trend={{ value: "2 this month", isPositive: true }}
            accentColor="bg-blue-500"
          />
          <KPICard
            title="Total Applicants"
            value="232"
            icon={Users}
            trend={{ value: "28 today", isPositive: true }}
            accentColor="bg-blue-500"
          />
          <KPICard
            title="Shortlisted"
            value="45"
            icon={UserCheck}
            trend={{ value: "12 this week", isPositive: true }}
            accentColor="bg-blue-500"
          />
          <KPICard
            title="Time to Hire"
            value="18 days"
            icon={TrendingUp}
            trend={{ value: "3 days faster", isPositive: true }}
            accentColor="bg-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Candidate Pipeline */}
          <Card>
            <CardHeader>
              <CardTitle>Candidate Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={candidatePipelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Application Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Applications This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={applicationTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app.id} className="flex items-start justify-between p-3 rounded-lg border">
                    <div className="flex-1">
                      <h4 className="font-medium">{app.name}</h4>
                      <p className="text-sm text-gray-500">{app.position}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          AI Score: {app.score}
                        </Badge>
                        <span className="text-xs text-gray-400">{app.applied}</span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                      Review
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Job Posts */}
          <Card>
            <CardHeader>
              <CardTitle>Active Job Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeJobs.map((job) => (
                  <div key={job.id} className="p-3 rounded-lg border">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium">{job.title}</h4>
                        <p className="text-sm text-gray-500">{job.applicants} applicants</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {job.status}
                      </Badge>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Time remaining</span>
                        <span>{job.daysLeft} days left</span>
                      </div>
                      <Progress value={(job.daysLeft / 30) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
