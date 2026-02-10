import { PortalTopbar } from "../../components/PortalTopbar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { TrendingUp, Users, Briefcase, FileText, Activity } from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const userGrowthData = [
  { month: "Aug", jobSeekers: 3200, employers: 1800 },
  { month: "Sep", jobSeekers: 4100, employers: 2100 },
  { month: "Oct", jobSeekers: 5300, employers: 2600 },
  { month: "Nov", jobSeekers: 6200, employers: 3100 },
  { month: "Dec", jobSeekers: 7100, employers: 3600 },
  { month: "Jan", jobSeekers: 8234, employers: 4224 },
];

const applicationTrendData = [
  { week: "Week 1", applications: 2400, interviews: 480, offers: 120 },
  { week: "Week 2", applications: 2800, interviews: 560, offers: 140 },
  { week: "Week 3", applications: 3200, interviews: 640, offers: 160 },
  { week: "Week 4", applications: 3600, interviews: 720, offers: 180 },
];

const engagementData = [
  { day: "Mon", active: 4200 },
  { day: "Tue", active: 5100 },
  { day: "Wed", active: 4800 },
  { day: "Thu", active: 5400 },
  { day: "Fri", active: 6200 },
  { day: "Sat", active: 3100 },
  { day: "Sun", active: 2800 },
];

export function SystemAnalytics() {
  return (
    <>
      <PortalTopbar title="System Analytics" subtitle="Platform performance metrics and insights" />
      <main className="flex-1 overflow-auto p-6">
        {/* KPI Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm">Platform Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">156%</div>
              <p className="text-xs text-gray-500 mt-1">6-month growth rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm">Daily Active Users</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">4,832</div>
              <p className="text-xs text-green-600 mt-1">↑ 12% vs last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm">Avg Session Duration</CardTitle>
              <Activity className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">18m 42s</div>
              <p className="text-xs text-green-600 mt-1">↑ 2m 15s improvement</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm">Success Rate</CardTitle>
              <FileText className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">32%</div>
              <p className="text-xs text-gray-500 mt-1">Application to offer ratio</p>
            </CardContent>
          </Card>
        </div>

        {/* User Growth Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>User Growth (6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="jobSeekers" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                <Area type="monotone" dataKey="employers" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Application Funnel */}
          <Card>
            <CardHeader>
              <CardTitle>Application Funnel (This Month)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={applicationTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="applications" fill="#f97316" />
                  <Bar dataKey="interviews" fill="#3b82f6" />
                  <Bar dataKey="offers" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Daily Engagement */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Active Users (This Week)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="active" stroke="#f97316" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
