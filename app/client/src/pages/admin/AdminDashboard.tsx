import { PortalTopbar } from "../../comoponents/PortalTopbar";
import { KPICard } from "../../comoponents/KPICard";
import { Users, Briefcase, FileText, AlertTriangle, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../comoponents/ui/card";
import { Badge } from "../../comoponents/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../comoponents/ui/table";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const platformActivityData = [
  { name: "Mon", applications: 24, jobPosts: 4 },
  { name: "Tue", applications: 31, jobPosts: 7 },
  { name: "Wed", applications: 28, jobPosts: 5 },
  { name: "Thu", applications: 35, jobPosts: 8 },
  { name: "Fri", applications: 42, jobPosts: 12 },
  { name: "Sat", applications: 18, jobPosts: 3 },
  { name: "Sun", applications: 15, jobPosts: 2 },
];

const aiUsageData = [
  { name: "Resume Review", count: 284 },
  { name: "Job Match", count: 312 },
  { name: "Interview Prep", count: 156 },
  { name: "Cover Letter", count: 203 },
];

const recentAlerts = [
  { id: 1, type: "warning", message: "High API usage detected", time: "5 min ago" },
  { id: 2, type: "info", message: "System backup completed", time: "1 hour ago" },
  { id: 3, type: "warning", message: "Flagged job posting reported", time: "2 hours ago" },
];

export function AdminDashboard() {
  return (
    <>
      <PortalTopbar title="Admin Dashboard" subtitle="System Overview & Monitoring" />
      <main className="flex-1 overflow-auto p-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <KPICard
            title="Total Users"
            value="12,458"
            icon={Users}
            trend={{ value: "12% vs last month", isPositive: true }}
            accentColor="bg-orange-500"
          />
          <KPICard
            title="Job Seekers"
            value="8,234"
            icon={Users}
            trend={{ value: "8% vs last month", isPositive: true }}
            accentColor="bg-orange-500"
          />
          <KPICard
            title="Employers"
            value="4,224"
            icon={Briefcase}
            trend={{ value: "15% vs last month", isPositive: true }}
            accentColor="bg-orange-500"
          />
          <KPICard
            title="Total Applications"
            value="34,521"
            icon={FileText}
            trend={{ value: "6% vs last month", isPositive: true }}
            accentColor="bg-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Platform Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Activity (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={platformActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="applications" stroke="#f97316" strokeWidth={2} />
                  <Line type="monotone" dataKey="jobPosts" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* AI Usage Summary */}
          <Card>
            <CardHeader>
              <CardTitle>AI Features Usage (This Week)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={aiUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Alerts & System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Alerts</CardTitle>
              <AlertTriangle className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <Badge variant={alert.type === "warning" ? "destructive" : "secondary"}>
                      {alert.type}
                    </Badge>
                    <div className="flex-1">
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {alert.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Server</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">AI Service</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Service</span>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Degraded</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Storage</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">Healthy</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
