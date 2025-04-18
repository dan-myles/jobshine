import { createFileRoute } from "@tanstack/react-router"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export const Route = createFileRoute("/_authed/dashboard/billing/")({
  component: Page,
})

function Page() {
  const handleUpdatePayment = () => {
    console.log("Update payment clicked")
    toast.success("Payment method updated successfully")
  }

  const handleCancelSubscription = () => {
    console.log("Cancel subscription clicked")
    toast.error("Subscription cancelled")
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">Billing & Subscription</h1>
        <p className="text-muted-foreground">
          Manage your subscription and billing information
        </p>
      </div>

      <div className="space-y-12">
        {/* Current Plan Section */}
        <div className="space-y-6 p-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Current Plan</h2>
            <p className="text-muted-foreground text-sm">
              Your current subscription details and usage
            </p>
          </div>
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Pro Plan</span>
                  <Badge
                    variant="outline"
                    className="border-green-200 bg-green-50 text-green-700"
                  >
                    active
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  Next billing date: 2024-05-17
                </p>
              </div>
              <div className="text-right">
                <div className="font-semibold">$29.99/month</div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelSubscription}
                >
                  Cancel Subscription
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Storage Usage</span>
                <span>75/100 GB</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Payment Methods Section */}
        <div className="space-y-6 p-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Payment Methods</h2>
            <p className="text-muted-foreground text-sm">
              Manage your payment methods and billing information
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <div className="bg-muted flex h-6 w-10 items-center justify-center rounded">
                  •••• 4242
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Credit Card</span>
                    <Badge variant="secondary">Default</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">Expires 12/25</p>
                </div>
              </div>
              <Button variant="outline" onClick={handleUpdatePayment}>
                Update
              </Button>
            </div>
            <Button variant="outline" className="w-full">
              Add Payment Method
            </Button>
          </div>
        </div>

        <Separator />

        {/* Billing History Section */}
        <div className="space-y-6 p-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Billing History</h2>
            <p className="text-muted-foreground text-sm">
              View your past invoices and payments
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-1">
                <div className="font-medium">Pro Plan - Monthly</div>
                <p className="text-muted-foreground text-sm">2024-04-17</p>
              </div>
              <div className="text-right">
                <div className="font-medium">$29.99</div>
                <Badge
                  variant="outline"
                  className="border-green-200 bg-green-50 text-green-700"
                >
                  paid
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-1">
                <div className="font-medium">Pro Plan - Monthly</div>
                <p className="text-muted-foreground text-sm">2024-03-17</p>
              </div>
              <div className="text-right">
                <div className="font-medium">$29.99</div>
                <Badge
                  variant="outline"
                  className="border-green-200 bg-green-50 text-green-700"
                >
                  paid
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
