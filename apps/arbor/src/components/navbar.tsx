
import { Mark } from "@/components/mark"
import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex w-full bg-transparent shadow-md backdrop-blur-xl">
      <div className="flex flex-grow items-center justify-between p-4 px-6">
        <div className="flex items-center">
          <Mark />
        </div>

        <div className="text-md hidden w-full items-center justify-center gap-6 font-medium md:flex">
          <Link
            to="/"
            className="hover:text-primary transition-colors"
          >
            Product
          </Link>
          <Link to="/" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link
            to="/"
            className="hover:text-primary transition-colors"
          >
            Pricing
          </Link>
        </div>

        <div className="hidden md:flex">
          <Link to="/dashboard">
            <Button variant="outline" size="sm" className="rounded-full">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
