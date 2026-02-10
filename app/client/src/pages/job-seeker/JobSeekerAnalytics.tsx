import { PortalTopbar } from "../../comoponents/PortalTopbar";
import { Card, CardContent, CardHeader, CardTitle } from "../../comoponents/ui/card";
import { TrendingUp, Target, Clock, Award } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const applicationTrendData = [
  { month: "Aug", applications: 3, interviews: 1, offers: 0 },
  { month: "Sep", applications: 5, interviews: 2, offers: 1 },
  { month: "Oct", applications: 8, interviews: 3, offers: 1 },
  { month: "Nov", applications: 12, interviews: 4, offers: 1 },
  { month: "Dec", applications: 18, interviews: 5, offers: 2 },
  { month: "Jan", applications: 24, interviews: 6, offers: 2 },
];

const responseRateData = [
  { name: "No Response", value: 42 },
  { name: "Rejected", value: 25 },
  { name: "Interview", value: 25 },
  { name: "Offer", value: 8 },
];

const COLORS = ['#9ca3af', '#ef4444', '#3b82f6', '#10b981'];

const industryData = [
  { industry: "Tech", count: 12 },
  { industry: "Finance", count: 6 },
  { industry: "Healthcare", count: 3 },
  { industry: "Retail", count: 3 },
];

export function JobSeekerAnalytics() {
  return (
    <>
      <PortalTopbar title="Analytics" subtitle="Track your job search performance" />
      <main className="flex-1 overflow-auto p-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm">Success Rate</CardTitle>
              <Target className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">33%</div>
              <p className="text-xs text-green-600 mt-1">↑ 8% vs last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">5.2 days</div>
              <p className="text-xs text-gray-500 mt-1">Median time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm">Interview Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">25%</div>
              <p className="text-xs text-green-600 mt-1">↑ 5% improvement</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm">Profile Views</CardTitle>
              <Award className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">127</div>
              <p className="text-xs text-green-600 mt-1">↑ 18 this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Application Trend */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Application Funnel Trend (6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={applicationTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="applications" stroke="#10b981" strokeWidth={2} name="Applications" />
                <Line type="monotone" dataKey="interviews" stroke="#3b82f6" strokeWidth={2} name="Interviews" />
                <Line type="monotone" dataKey="offers" stroke="#f59e0b" strokeWidth={2} name="Offers" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Response Rate Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Application Outcomes</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={responseRateData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {responseRateData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Industry Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Applications by Industry</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={industryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="industry" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
