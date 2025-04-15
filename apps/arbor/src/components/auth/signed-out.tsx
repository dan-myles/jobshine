import { useAuth } from "@/hooks/use-auth"

type SignedOutProps = {
  children?: React.ReactNode
}

export function SignedOut({ children }: SignedOutProps) {
  const { auth } = useAuth()

  if (!!auth) {
    return null
  }

  return <>{children}</>
}
