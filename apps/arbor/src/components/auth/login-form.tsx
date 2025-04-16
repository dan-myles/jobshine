import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useRouter } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/auth-hooks"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2, {
    message: "Your password is too short!",
  }),
})

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const { signInEmail } = useAuth()
  const [isPending, setPending] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setPending(true)
    const toastId = toast.loading("Logging in...")

    const { error } = await signInEmail({
      email: values.email,
      password: values.password,
    })

    if (error) {
      toast.error("There was an error logging in!", {
        description: error.message,
        id: toastId,
      })

      return
    }

    toast.success("Welcome back!", {
      id: toastId,
    })
    router.navigate({
      to: "/dashboard",
    })
    setPending(false)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Google or Github account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Login with Google and Github */}
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <Button variant="outline" className="w-full">
                <Icons.Google className="h-6 w-6" />
                Login with Google
              </Button>
              <Button variant="outline" className="w-full">
                <Icons.Github className="h-6 w-6" />
                Login with Github
              </Button>
            </div>
            <div
              className="after:border-border relative text-center text-sm after:absolute after:inset-0
                after:top-1/2 after:z-0 after:flex after:items-center after:border-t"
            >
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>

            {/* Email Sign In Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>Email</FormLabel>
                      <FormControl>
                        <Input
                          id={field.name}
                          type="email"
                          placeholder="email@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="hidden">
                        This is your email address used to log in.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>Password</FormLabel>
                      <FormControl>
                        <Input
                          id={field.name}
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="hidden">
                        This is your password used to log in.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full" type="submit">
                  {isPending && <Icons.Spinner className="h-4 w-4" />}
                  Login
                </Button>
              </form>
            </Form>

            {/* Sign Up Redirect */}
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TOS and Privacy Policy */}
      <div
        className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance
          *:[a]:underline *:[a]:underline-offset-4"
      >
        By clicking continue, you agree to our{" "}
        <Link to="/">Terms of Service</Link> and{" "}
        <Link to="/">Privacy Policy</Link>.
      </div>
    </div>
  )
}
