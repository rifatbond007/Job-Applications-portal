import { PortalTopbar } from "../../comoponents/PortalTopbar";
import { KPICard } from "../../comoponents/KPICard";
import { FileText, Calendar, CheckCircle, XCircle, Clock, TrendingUp, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../comoponents/ui/card";
import { Badge } from "../../comoponents/ui/badge";
import { Button } from "../../comoponents/ui/button";
import { Progress } from "../../comoponents/ui/progress";

const recentApplications = [
  { id: 1, company: "TechCorp Inc.", position: "Senior React Developer", status: "Under Review", appliedDate: "Feb 4, 2024" },
  { id: 2, company: "StartupXYZ", position: "Full Stack Engineer", status: "Interview Scheduled", appliedDate: "Feb 3, 2024" },
  { id: 3, company: "DataCo", position: "Frontend Developer", status: "Applied", appliedDate: "Feb 2, 2024" },
];

const upcomingInterviews = [
  { id: 1, company: "StartupXYZ", position: "Full Stack Engineer", date: "Feb 8, 2024", time: "2:00 PM" },
  { id: 2, company: "CloudSystems", position: "React Developer", date: "Feb 10, 2024", time: "10:00 AM" },
];

const aiInsights = [
  "Your profile matches 85% with Senior React roles",
  "Consider adding more projects to your portfolio",
  "Interview success rate improved by 15% this month",
];

export function JobSeekerDashboard() {
  return (
    <>
      <PortalTopbar title="Dashboard" subtitle="Welcome back! Here's your application overview" />
      <main className="flex-1 overflow-auto p-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <KPICard
            title="Applications Sent"
            value="24"
            icon={FileText}
            trend={{ value: "4 this week", isPositive: true }}
            accentColor="bg-green-500"
          />
          <KPICard
            title="Interviews"
            value="6"
            icon={Calendar}
            trend={{ value: "2 upcoming", isPositive: true }}
            accentColor="bg-green-500"
          />
          <KPICard
            title="Offers"
            value="2"
            icon={CheckCircle}
            trend={{ value: "1 pending", isPositive: true }}
            accentColor="bg-green-500"
          />
          <KPICard
            title="Response Rate"
            value="38%"
            icon={TrendingUp}
            trend={{ value: "5% increase", isPositive: true }}
            accentColor="bg-green-500"
          />
        </div>

        {/* Application Status Funnel */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Application Funnel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Applied (24)</span>
                <span className="text-sm">100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Under Review (12)</span>
                <span className="text-sm">50%</span>
              </div>
              <Progress value={50} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Interviews (6)</span>
                <span className="text-sm">25%</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Offers (2)</span>
                <span className="text-sm">8%</span>
              </div>
              <Progress value={8} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
                      <h4 className="font-medium">{app.position}</h4>
                      <p className="text-sm text-gray-500">{app.company}</p>
                      <p className="text-xs text-gray-400 mt-1">{app.appliedDate}</p>
                    </div>
                    <Badge 
                      variant="secondary"
                      className={
                        app.status === "Interview Scheduled"
                          ? "bg-blue-100 text-blue-700"
                          : app.status === "Under Review"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }
                    >
                      {app.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Interviews */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="p-3 rounded-lg border bg-blue-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{interview.position}</h4>
                        <p className="text-sm text-gray-600">{interview.company}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {interview.date}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {interview.time}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Prepare</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Sparkles className="h-5 w-5 text-green-500" />
            <CardTitle>AI-Powered Insights</CardTitle>
            <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700">AI Generated</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiInsights.map((insight, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-green-50">
                  <div className="rounded-full bg-green-100 p-1">
                    <Sparkles className="h-3 w-3 text-green-600" />
                  </div>
                  <p className="text-sm flex-1">{insight}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
