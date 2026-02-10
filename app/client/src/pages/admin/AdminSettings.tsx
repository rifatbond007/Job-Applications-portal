import { PortalTopbar } from "../../comoponents/PortalTopbar";
import { Card, CardContent, CardHeader, CardTitle } from "../../comoponents/ui/card";
import { Button } from "../../comoponents/ui/button";
import { Input } from "../../comoponents/ui/input";
import { Label } from "../../comoponents/ui/label";
import { Switch } from "../../comoponents/ui/switch";
import { Separator } from "../../comoponents/ui/separator";

export function AdminSettings() {
  return (
    <>
      <PortalTopbar title="Settings" subtitle="Configure system settings and preferences" />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl space-y-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="platformName">Platform Name</Label>
                <Input id="platformName" defaultValue="JobTracker AI" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input id="supportEmail" type="email" defaultValue="support@jobtracker.ai" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxApplications">Max Applications per User</Label>
                <Input id="maxApplications" type="number" defaultValue="50" />
              </div>
            </CardContent>
          </Card>

          {/* Feature Flags */}
          <Card>
            <CardHeader>
              <CardTitle>Feature Flags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>AI Resume Analysis</Label>
                  <p className="text-sm text-gray-500">Enable AI-powered resume analysis for job seekers</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Job Matching Algorithm</Label>
                  <p className="text-sm text-gray-500">Enable intelligent job matching recommendations</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-500">Send email updates to users</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>User Registration</Label>
                  <p className="text-sm text-gray-500">Allow new users to register</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* AI Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>AI Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="aiModel">AI Model Version</Label>
                <Input id="aiModel" defaultValue="v2.4.1" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="biasThreshold">Bias Detection Threshold</Label>
                <Input id="biasThreshold" type="number" defaultValue="0.75" step="0.01" min="0" max="1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxTokens">Max AI Tokens per Request</Label>
                <Input id="maxTokens" type="number" defaultValue="2048" />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button variant="outline">Reset to Defaults</Button>
            <Button className="bg-orange-500 hover:bg-orange-600">Save Changes</Button>
          </div>
        </div>
      </main>
    </>
  );
}
