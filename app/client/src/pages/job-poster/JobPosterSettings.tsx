import { useState, useEffect } from "react";
import { PortalTopbar } from "../../comoponents/PortalTopbar";
import { Card, CardContent, CardHeader, CardTitle } from "../../comoponents/ui/card";
import { Button } from "../../comoponents/ui/button";
import { Input } from "../../comoponents/ui/input";
import { Label } from "../../comoponents/ui/label";
import { Switch } from "../../comoponents/ui/switch";
import { Separator } from "../../comoponents/ui/separator";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/axios";
import { toast } from "sonner";

export function JobPosterSettings() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setLocation(user.location ?? "");
    }
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    try {
      const { data } = await api.patch<typeof user>("/users/me/profile", { name: name.trim() || undefined, location: location.trim() || undefined });
      if (data) setUser({ id: data.id, name: data.name ?? null, email: data.email, role: data.role, location: data.location ?? null });
      toast.success("Profile updated");
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? "Failed to update profile");
    } finally {
      setProfileSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    setPasswordSaving(true);
    try {
      await api.patch("/users/me/password", { currentPassword, newPassword });
      toast.success("Password updated");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? "Failed to update password");
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <>
      <PortalTopbar title="Settings" subtitle="Manage your account and preferences" />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={user?.email ?? ""} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Remote" />
                </div>
                <Button type="submit" disabled={profileSaving} className="bg-blue-500 hover:bg-blue-600">
                  {profileSaving ? "Saving…" : "Save profile"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change password</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current password</Label>
                  <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New password</Label>
                  <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" required />
                  <p className="text-xs text-muted-foreground">Min 8 characters, 1 upper, 1 lower, 1 number, 1 special character.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm new password</Label>
                  <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" required />
                </div>
                <Button type="submit" disabled={passwordSaving}>Update password</Button>
              </form>
            </CardContent>
          </Card>

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
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
