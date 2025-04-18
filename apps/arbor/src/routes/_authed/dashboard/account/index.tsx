import { createFileRoute } from "@tanstack/react-router"
import { useUser } from "@/hooks/auth-hooks"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const Route = createFileRoute("/_authed/dashboard/account/")({
  component: Page,
})

function Page() {
  const user = useUser()

  const handleProfileUpdate = () => {
    console.log("Profile update clicked")
    toast.success("Profile updated successfully")
  }

  const handlePasswordChange = () => {
    console.log("Password change clicked")
    toast.success("Password changed successfully")
  }

  const handleEmailChange = () => {
    console.log("Email change clicked")
    toast.success("Email changed successfully")
  }

  const handleNotificationToggle = (checked: boolean) => {
    console.log("Notification settings changed:", checked)
    toast.success("Notification settings updated")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-12">
        <div className="space-y-6 p-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Profile</h2>
            <p className="text-sm text-muted-foreground">
              Update your profile information and avatar
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="lg">Change Avatar</Button>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={user?.name || ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user?.email || ""} />
            </div>
          </div>
          <Button onClick={handleProfileUpdate} size="lg">Update Profile</Button>
        </div>

        <Separator />

        <div className="space-y-6 p-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Security</h2>
            <p className="text-sm text-muted-foreground">
              Manage your password and security settings
            </p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </div>
          <Button onClick={handlePasswordChange} size="lg">Change Password</Button>
        </div>

        <Separator />

        <div className="space-y-6 p-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Notifications</h2>
            <p className="text-sm text-muted-foreground">
              Configure your notification preferences
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email notifications about your account
                </p>
              </div>
              <Switch
                defaultChecked
                onCheckedChange={handleNotificationToggle}
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">
                  Receive marketing and promotional emails
                </p>
              </div>
              <Switch
                defaultChecked
                onCheckedChange={handleNotificationToggle}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-6 p-6 rounded-lg border border-destructive bg-destructive/5">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Danger Zone</h2>
            <p className="text-sm text-muted-foreground">
              Irreversible and destructive actions
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Delete Account</Label>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button variant="destructive" size="lg">Delete Account</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
