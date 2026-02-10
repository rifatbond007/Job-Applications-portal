import { PortalTopbar } from "../../components/PortalTopbar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Upload, FileText, Download, Eye, Edit, Trash2, Sparkles } from "lucide-react";
import { EmptyState } from "../../components/EmptyState";

const mockResumes = [
  { 
    id: 1, 
    name: "Senior_Developer_Resume.pdf", 
    uploadedDate: "Feb 1, 2024", 
    aiScore: 87,
    isPrimary: true,
    size: "245 KB"
  },
  { 
    id: 2, 
    name: "Full_Stack_Resume_V2.pdf", 
    uploadedDate: "Jan 28, 2024", 
    aiScore: 82,
    isPrimary: false,
    size: "198 KB"
  },
];

const aiSuggestions = [
  { category: "Skills", suggestion: "Add more specific technologies (e.g., TypeScript, Next.js)", priority: "high" },
  { category: "Experience", suggestion: "Quantify achievements with metrics (e.g., 'Increased performance by 40%')", priority: "high" },
  { category: "Format", suggestion: "Use consistent date formatting throughout", priority: "medium" },
  { category: "Keywords", suggestion: "Include industry-standard keywords for better ATS compatibility", priority: "high" },
];

export function ResumeManager() {
  return (
    <>
      <PortalTopbar title="Resume Manager" subtitle="Manage and optimize your resumes" />
      <main className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Resume List */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>My Resumes</CardTitle>
                  <Button className="bg-green-500 hover:bg-green-600">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Resume
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {mockResumes.length > 0 ? (
                  <div className="space-y-4">
                    {mockResumes.map((resume) => (
                      <div key={resume.id} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="p-2 rounded-lg bg-green-100">
                              <FileText className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium">{resume.name}</h4>
                                {resume.isPrimary && (
                                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                                    Primary
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                                <span>Uploaded: {resume.uploadedDate}</span>
                                <span>•</span>
                                <span>{resume.size}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-green-500" />
                                <span className="text-sm">AI Score: </span>
                                <Badge variant="secondary" className="bg-green-100 text-green-700">
                                  {resume.aiScore}/100
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={FileText}
                    title="No resumes uploaded"
                    description="Upload your first resume to get AI-powered insights and recommendations"
                    action={{ label: "Upload Resume", onClick: () => {} }}
                  />
                )}
              </CardContent>
            </Card>

            {/* Resume Templates */}
            <Card>
              <CardHeader>
                <CardTitle>Resume Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border text-center hover:border-green-500 cursor-pointer transition-colors">
                    <div className="h-32 bg-gray-100 rounded mb-3 flex items-center justify-center">
                      <FileText className="h-12 w-12 text-gray-400" />
                    </div>
                    <h4 className="font-medium mb-1">Professional</h4>
                    <p className="text-xs text-gray-500">Classic ATS-friendly layout</p>
                  </div>
                  <div className="p-4 rounded-lg border text-center hover:border-green-500 cursor-pointer transition-colors">
                    <div className="h-32 bg-gray-100 rounded mb-3 flex items-center justify-center">
                      <FileText className="h-12 w-12 text-gray-400" />
                    </div>
                    <h4 className="font-medium mb-1">Modern</h4>
                    <p className="text-xs text-gray-500">Clean and contemporary</p>
                  </div>
                  <div className="p-4 rounded-lg border text-center hover:border-green-500 cursor-pointer transition-colors">
                    <div className="h-32 bg-gray-100 rounded mb-3 flex items-center justify-center">
                      <FileText className="h-12 w-12 text-gray-400" />
                    </div>
                    <h4 className="font-medium mb-1">Creative</h4>
                    <p className="text-xs text-gray-500">Stand out with design</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Suggestions Sidebar */}
          <div>
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Sparkles className="h-5 w-5 text-green-500" />
                <CardTitle>AI Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiSuggestions.map((suggestion, index) => (
                    <div key={index} className="p-3 rounded-lg border bg-green-50">
                      <div className="flex items-start justify-between mb-2">
                        <Badge 
                          variant="secondary" 
                          className={
                            suggestion.priority === "high" 
                              ? "bg-red-100 text-red-700" 
                              : "bg-yellow-100 text-yellow-700"
                          }
                        >
                          {suggestion.priority}
                        </Badge>
                        <span className="text-xs font-medium text-green-700">{suggestion.category}</span>
                      </div>
                      <p className="text-sm">{suggestion.suggestion}</p>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-green-500 hover:bg-green-600">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Optimize Resume
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
