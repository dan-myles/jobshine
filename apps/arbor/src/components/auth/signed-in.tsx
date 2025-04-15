import { useAuth } from "@/hooks/use-auth"

type SignedInProps = {
  children?: React.ReactNode
}

export function SignedIn({ children }: SignedInProps) {
  const { auth } = useAuth()

  if (!auth) {
    return null
  }

  return <>{children}</>
}
