import { PortalTopbar } from "../../comoponents/PortalTopbar";
import { Card, CardContent, CardHeader, CardTitle } from "../../comoponents/ui/card";
import { TrendingUp, Clock, Users, Target } from "lucide-react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const hiringFunnelData = [
  { month: "Aug", applications: 120, screenings: 48, interviews: 24, offers: 6 },
  { month: "Sep", applications: 145, screenings: 58, interviews: 29, offers: 8 },
  { month: "Oct", applications: 168, screenings: 67, interviews: 34, offers: 9 },
  { month: "Nov", applications: 192, screenings: 77, interviews: 38, offers: 11 },
  { month: "Dec", applications: 210, screenings: 84, interviews: 42, offers: 12 },
  { month: "Jan", applications: 232, screenings: 93, interviews: 45, offers: 14 },
];

const sourceBreakdownData = [
  { name: "LinkedIn", value: 35 },
  { name: "Indeed", value: 28 },
  { name: "Direct Apply", value: 22 },
  { name: "Referral", value: 15 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

const timeToHireData = [
  { stage: "Application", days: 0 },
  { stage: "Screening", days: 3 },
  { stage: "Interview", days: 8 },
  { stage: "Offer", days: 12 },
  { stage: "Acceptance", days: 18 },
];

export function JobPosterAnalytics() {
  return (
    <>
      <PortalTopbar title="Analytics" subtitle="Hiring insights and performance metrics" />
      <main className="flex-1 overflow-auto p-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm">Conversion Rate</CardTitle>
              <Target className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">6%</div>
              <p className="text-xs text-green-600 mt-1">↑ 1.2% vs last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm">Avg Time to Hire</CardTitle>
              <Clock className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">18 days</div>
              <p className="text-xs text-green-600 mt-1">↓ 3 days faster</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm">Offer Accept Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">78%</div>
              <p className="text-xs text-green-600 mt-1">↑ 5% improvement</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm">Total Hires (6M)</CardTitle>
              <Users className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">60</div>
              <p className="text-xs text-gray-500 mt-1">10 per month avg</p>
            </CardContent>
          </Card>
        </div>

        {/* Hiring Funnel Trend */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Hiring Funnel (6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={hiringFunnelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="applications" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Applications" />
                <Area type="monotone" dataKey="screenings" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Screenings" />
                <Area type="monotone" dataKey="interviews" stackId="3" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} name="Interviews" />
                <Area type="monotone" dataKey="offers" stackId="4" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} name="Offers" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Application Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Application Sources</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sourceBreakdownData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sourceBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Time to Hire Stages */}
          <Card>
            <CardHeader>
              <CardTitle>Time to Hire by Stage</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={timeToHireData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="days" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
