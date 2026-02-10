import { CheckCircle2, Clock, Send, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

type ApplicationStatus = "applied" | "reviewing" | "interviewing" | "offer";

interface ApplicationProgress {
  jobTitle: string;
  company: string;
  status: ApplicationStatus;
  appliedDate: string;
  nextStep?: string;
}

interface StatusTrackerProps {
  applications: ApplicationProgress[];
}

const statusConfig = {
  applied: {
    label: "Applied",
    icon: Send,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    progress: 25,
  },
  reviewing: {
    label: "Under Review",
    icon: Clock,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    progress: 50,
  },
  interviewing: {
    label: "Interviewing",
    icon: CheckCircle2,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    progress: 75,
  },
  offer: {
    label: "Offer Received",
    icon: Award,
    color: "text-green-600",
    bgColor: "bg-green-100",
    progress: 100,
  },
};

export function StatusTracker({ applications }: StatusTrackerProps) {
  if (applications.length === 0) {
    return (
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Application Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Clock className="h-12 w-12 mx-auto mb-3 text-gray-400" />
            <p>No active applications yet</p>
            <p className="text-sm mt-1">Start applying to track your progress here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle>Your Application Progress</CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Tracking {applications.length} active application{applications.length > 1 ? "s" : ""}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {applications.map((app, index) => {
          const config = statusConfig[app.status];
          const Icon = config.icon;

          return (
            <div
              key={index}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              {/* Job Info */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{app.jobTitle}</h4>
                  <p className="text-sm text-gray-600">{app.company}</p>
                </div>
                <div className={`p-2 rounded-full ${config.bgColor}`}>
                  <Icon className={`h-5 w-5 ${config.color}`} />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${config.color}`}>
                    {config.label}
                  </span>
                  <span className="text-sm text-gray-500">{config.progress}%</span>
                </div>
                <Progress value={config.progress} className="h-2" />
              </div>

              {/* Timeline */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Applied {app.appliedDate}</span>
                {app.nextStep && (
                  <span className="text-blue-600 font-medium">{app.nextStep}</span>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
