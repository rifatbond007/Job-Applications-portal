import { PortalTopbar } from "../../comoponents/PortalTopbar";
import { Card, CardContent, CardHeader, CardTitle } from "../../comoponents/ui/card";
import { Button } from "../../comoponents/ui/button";
import { Input } from "../../comoponents/ui/input";
import { Label } from "../../comoponents/ui/label";
import { Switch } from "../../comoponents/ui/switch";
import { Separator } from "../../comoponents/ui/separator";
import { Textarea } from "../../comoponents/ui/textarea";

export function JobPosterSettings() {
  return (
    <>
      <PortalTopbar title="Settings" subtitle="Manage company profile and preferences" />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl space-y-6">
          {/* Company Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" defaultValue="TechCorp Inc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input id="industry" defaultValue="Technology" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companySize">Company Size</Label>
                <Input id="companySize" defaultValue="50-200 employees" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" type="url" defaultValue="https://techcorp.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea 
                  id="description" 
                  defaultValue="Leading technology company building innovative solutions for modern businesses."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input id="contactEmail" type="email" defaultValue="hr@techcorp.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 987-6543" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Tech Street, San Francisco, CA 94105" />
              </div>
            </CardContent>
          </Card>

          {/* Hiring Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Hiring Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="autoReply">Auto-reply Message</Label>
                <Textarea 
                  id="autoReply" 
                  defaultValue="Thank you for applying! We'll review your application and get back to you soon."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aiThreshold">AI Score Threshold for Auto-screening</Label>
                <Input id="aiThreshold" type="number" defaultValue="75" min="0" max="100" />
                <p className="text-sm text-gray-500">Candidates below this score will be flagged for manual review</p>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>New Application Alerts</Label>
                  <p className="text-sm text-gray-500">Get notified when someone applies</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Daily Summary Report</Label>
                  <p className="text-sm text-gray-500">Daily email with hiring metrics</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Interview Reminders</Label>
                  <p className="text-sm text-gray-500">Get reminded about upcoming interviews</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>AI Insights</Label>
                  <p className="text-sm text-gray-500">Receive AI-powered candidate recommendations</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Team Management */}
          <Card>
            <CardHeader>
              <CardTitle>Team Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Allow Team Members to Post Jobs</Label>
                  <p className="text-sm text-gray-500">Team members can create job postings</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Require Approval for Job Posts</Label>
                  <p className="text-sm text-gray-500">Admin approval needed before publishing</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-blue-500 hover:bg-blue-600">Save Changes</Button>
          </div>
        </div>
      </main>
    </>
  );
}
