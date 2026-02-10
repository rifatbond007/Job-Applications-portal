import { PortalTopbar } from "../../comoponents/PortalTopbar";
import { Card, CardContent, CardHeader, CardTitle } from "../../comoponents/ui/card";
import { Button } from "../../comoponents/ui/button";
import { Badge } from "../../comoponents/ui/badge";
import { FileText, Download, Sparkles, Star, Briefcase, GraduationCap, Award } from "lucide-react";
import { Separator } from "../../comoponents/ui/separator";
import { Progress } from "../../comoponents/ui/progress";

const candidateInfo = {
  name: "Sarah Johnson",
  position: "Senior React Developer",
  email: "sarah.j@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  aiScore: 92,
};

const aiInsights = [
  { category: "Technical Skills", score: 95, highlight: "Expert in React, TypeScript, Node.js" },
  { category: "Experience Level", score: 90, highlight: "6 years of relevant experience" },
  { category: "Culture Fit", score: 88, highlight: "Strong team collaboration background" },
  { category: "Communication", score: 92, highlight: "Clear and concise writing" },
];

const experience = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    period: "2021 - Present",
    description: "Led development of React-based dashboard serving 10k+ users. Improved performance by 40%.",
  },
  {
    title: "Full Stack Developer",
    company: "StartupXYZ",
    period: "2019 - 2021",
    description: "Built full-stack features using React and Node.js. Mentored 3 junior developers.",
  },
];

const skills = [
  "React", "TypeScript", "Node.js", "Next.js", "GraphQL", 
  "Jest", "Redux", "Tailwind CSS", "AWS", "Docker"
];

export function ResumeViewer() {
  return (
    <>
      <PortalTopbar title="Resume Viewer" subtitle="View candidate details with AI insights" />
      <main className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Resume Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Candidate Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-2xl font-medium text-blue-700">SJ</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-medium mb-1">{candidateInfo.name}</h2>
                      <p className="text-gray-600 mb-2">{candidateInfo.position}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{candidateInfo.email}</span>
                        <span>•</span>
                        <span>{candidateInfo.phone}</span>
                        <span>•</span>
                        <span>{candidateInfo.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button className="bg-blue-500 hover:bg-blue-600">
                      Schedule Interview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-500" />
                <CardTitle>Work Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <div key={index}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{exp.title}</h4>
                          <p className="text-sm text-gray-600">{exp.company}</p>
                        </div>
                        <span className="text-sm text-gray-500">{exp.period}</span>
                      </div>
                      <p className="text-sm text-gray-600">{exp.description}</p>
                      {index < experience.length - 1 && <Separator className="mt-6" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Award className="h-5 w-5 text-blue-500" />
                <CardTitle>Technical Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-700">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-500" />
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <h4 className="font-medium">Bachelor of Science in Computer Science</h4>
                  <p className="text-sm text-gray-600">University of California, Berkeley</p>
                  <p className="text-sm text-gray-500 mt-1">2015 - 2019</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
                <CardTitle>AI Match Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 mb-2">
                    <span className="text-3xl font-bold text-blue-700">{candidateInfo.aiScore}</span>
                  </div>
                  <p className="text-sm text-gray-600">Excellent Match</p>
                </div>
                <Badge variant="secondary" className="w-full justify-center bg-blue-100 text-blue-700">
                  AI Generated Insights
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Score Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{insight.category}</span>
                        <span className="text-blue-600">{insight.score}%</span>
                      </div>
                      <Progress value={insight.score} className="h-2 mb-2" />
                      <p className="text-xs text-gray-600">{insight.highlight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <p className="text-sm">Strong technical expertise in React ecosystem</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <p className="text-sm">Proven track record of performance optimization</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <p className="text-sm">Leadership and mentoring experience</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  Move to Shortlist
                </Button>
                <Button variant="outline" className="w-full">
                  Schedule Interview
                </Button>
                <Button variant="outline" className="w-full">
                  Send Message
                </Button>
                <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                  Reject Candidate
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
