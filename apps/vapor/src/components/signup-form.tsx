"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { auth } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { Icons } from "./icons"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Your name is too short!",
  }),
  email: z.string().email(),
  password: z.string().min(2, {
    message: "Your password is too short!",
  }),
})

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast("Signing up...")

    const { error } = await auth.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      callbackURL: "/dashboard",
    })

    if (error) {
      toast.error("There was an error signing up!", {
        description: error.message,
      })
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome!</CardTitle>
          <CardDescription>
            Sign up with your Google or Github account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Sign up with Google and Github */}
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <Button variant="outline" className="w-full">
                <Icons.google className="h-6 w-6" />
                Sign up with Google
              </Button>
              <Button variant="outline" className="w-full">
                <Icons.github className="h-6 w-6" />
                Sign up with Github
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

            {/* Email Sign Up Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>Name</FormLabel>
                      <FormControl>
                        <Input
                          id={field.name}
                          type="text"
                          placeholder="Jane Doe"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="hidden">
                        This is your name used to sign up.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                        This is your email address used to sign up.
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
                        This is your password used to sign up.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full" type="submit">
                  Sign up
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>

      {/* TOS and Privacy Policy */}
      <div
        className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance
          *:[a]:underline *:[a]:underline-offset-4"
      >
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  )
}
