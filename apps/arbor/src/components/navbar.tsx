import { Link } from "@tanstack/react-router"
import { toast } from "sonner"

import { Mark } from "@/components/mark"
import { Button } from "@/components/ui/button"
import { useAuth, useSession } from "@/hooks/auth-hooks"

export function Navbar() {
  const session = useSession()
  const { signOut } = useAuth()

  async function handleSignOut() {
    const toastId = toast.loading("Signing out...")
    const { error } = await signOut()

    if (error) {
      toast.error("Failed to sign out!", {
        id: toastId,
      })
      return
    }

    toast.success("Signed out successfully!", {
      id: toastId,
    })
  }

  return (
    <nav className="sticky top-0 z-50 flex w-full bg-transparent shadow-md backdrop-blur-xl">
      <div className="flex flex-grow items-center justify-between p-4 px-6">
        <div className="flex items-center">
          <Mark />
        </div>

        <div className="text-md hidden w-full items-center justify-center gap-6 font-medium md:flex">
          <Link to="/" className="hover:text-primary transition-colors">
            Product
          </Link>
          <Link to="/" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/" className="hover:text-primary transition-colors">
            Pricing
          </Link>
        </div>

        {!session ? (
          <div className="text-md flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        ) : (
          <div className="text-md flex items-center gap-4">
            <Button variant="ghost" onClick={() => handleSignOut()}>
              Logout
            </Button>
            <Link to="/dashboard/resumes">
              <Button variant="default" size="sm">
                Dashboard
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
