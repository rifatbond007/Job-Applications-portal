import { PortalTopbar } from "../../comoponents/PortalTopbar";
import { Card, CardContent, CardHeader, CardTitle } from "../../comoponents/ui/card";
import { Badge } from "../../comoponents/ui/badge";
import { Brain, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const aiUsageTrend = [
  { date: "Feb 1", requests: 1240 },
  { date: "Feb 2", requests: 1580 },
  { date: "Feb 3", requests: 1420 },
  { date: "Feb 4", requests: 1890 },
  { date: "Feb 5", requests: 2100 },
  { date: "Feb 6", requests: 2340 },
];

const featureBreakdown = [
  { name: "Resume Analysis", value: 35 },
  { name: "Job Matching", value: 28 },
  { name: "Interview Prep", value: 18 },
  { name: "Cover Letters", value: 19 },
];

const COLORS = ['#f97316', '#3b82f6', '#10b981', '#8b5cf6'];

const ethicsAlerts = [
  { id: 1, severity: "low", message: "Bias detection threshold reached for skill matching", timestamp: "2024-02-06 14:32" },
  { id: 2, severity: "info", message: "AI model updated to v2.4.1", timestamp: "2024-02-06 10:15" },
  { id: 3, severity: "medium", message: "Unusual pattern in resume scoring detected", timestamp: "2024-02-05 16:22" },
];

export function AIUsageMonitor() {
  return (
    <>
      <PortalTopbar title="AI Usage & Ethics Monitor" subtitle="Track AI performance and ethical compliance" />
      <main className="flex-1 overflow-auto p-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm">Total AI Requests</CardTitle>
              <Brain className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">12,570</div>
              <p className="text-xs text-green-600 mt-1">↑ 18% vs yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm">Avg Response Time</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">245ms</div>
              <p className="text-xs text-green-600 mt-1">↓ 12ms improvement</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">99.8%</div>
              <p className="text-xs text-gray-500 mt-1">Consistent</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm">Active Alerts</CardTitle>
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">3</div>
              <p className="text-xs text-gray-500 mt-1">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Usage Trend */}
          <Card>
            <CardHeader>
              <CardTitle>AI Request Volume (Last 6 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={aiUsageTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="requests" stroke="#f97316" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Feature Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>AI Feature Usage Distribution</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={featureBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {featureBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Ethics & Compliance */}
        <Card>
          <CardHeader>
            <CardTitle>Ethics & Compliance Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ethicsAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-4 p-4 rounded-lg border">
                  <Badge 
                    variant="secondary"
                    className={
                      alert.severity === "medium" 
                        ? "bg-yellow-100 text-yellow-700" 
                        : alert.severity === "low"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }
                  >
                    {alert.severity}
                  </Badge>
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
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
