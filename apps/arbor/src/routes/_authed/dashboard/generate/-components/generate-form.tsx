import type { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { generateSchema } from "@jobshine/validators"

import { Icons } from "@/components/icons"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useUser } from "@/hooks/auth-hooks"
import { useAPI } from "@/lib/api-client"
import { CoverLetterTemplateCarousel } from "./cover-letter-template-carousel"
import { ResumeTemplateCarousel } from "./resume-template-carousel"

export function GenerateForm() {
  const user = useUser()
  const api = useAPI()
  const generate = useMutation(
    api.ai.generate.mutationOptions({
      onSuccess: (data) => {
        toast.success("Document generated successfully!")
        downloadFile(data.url, `${user?.name}.pdf`).catch(console.error)
      },
      onError: (error) => {
        let errorMessage =
          error instanceof Error ? error.message : "Unknown error"
        if (errorMessage === "Stream closed") {
          errorMessage =
            "The document generation process timed out. Please try again."
        }

        toast.error("Error generating PDF!", {
          description: errorMessage,
        })

        console.error(error)
      },
    }),
  )

  const form = useForm<z.infer<typeof generateSchema>>({
    resolver: zodResolver(generateSchema),
    defaultValues: {
      jobDescription: "",
      documentType: "resume",
      resumeTemplate: "001",
      coverLetterTemplate: "001",
    },
  })

  function handleSubmit(data: z.infer<typeof generateSchema>) {
    generate.mutate({
      jobDescription: data.jobDescription,
      documentType: data.documentType,
      resumeTemplate: data.resumeTemplate,
      coverLetterTemplate: data.coverLetterTemplate,
    })
  }

  async function downloadFile(url: string, filename: string) {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to download: ${response.statusText}`)
      }

      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = blobUrl
      link.download = filename
      link.style.display = "none"

      document.body.appendChild(link)
      link.click()

      setTimeout(() => {
        document.body.removeChild(link)
        window.URL.revokeObjectURL(blobUrl)
      }, 100)
    } catch (error) {
      console.error("Error downloading file:", error)
      toast.error("Error downloading file!", {
        description: error instanceof Error ? error.message : "Unknown error",
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex h-full flex-col gap-4"
      >
        {/* Job Description Section */}
        <section>
          <FormField
            control={form.control}
            name="jobDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">
                  Job Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the job description that you would like to generate for..."
                    className="max-h-[150px] min-h-[150px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        {/* Document Type Section */}
        <section className="flex-grow">
          <FormField
            control={form.control}
            name="documentType"
            render={({ field }) => (
              <FormItem className="h-full">
                <FormLabel className="text-lg font-medium">
                  Document Type
                </FormLabel>
                <FormControl>
                  <Tabs
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    className="w-full"
                  >
                    <TabsList className="mb-6 flex w-full flex-row">
                      <TabsTrigger value="resume">Resume</TabsTrigger>
                      <TabsTrigger value="cover-letter" className="">
                        Cover Letter
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent
                      value="resume"
                      className="max-h-[38vh] min-h-[38vh]"
                    >
                      <ResumeTemplateCarousel />
                    </TabsContent>
                    <TabsContent
                      value="cover-letter"
                      className="max-h-[38vh] min-h-[38vh]"
                    >
                      <CoverLetterTemplateCarousel />
                    </TabsContent>
                  </Tabs>
                </FormControl>
              </FormItem>
            )}
          />
        </section>

        <Button
          type="submit"
          className="bg-primary"
          disabled={generate.isPending}
        >
          {generate.isPending && (
            <Icons.Spinner className="h-4 w-4 animate-spin" />
          )}
          Generate
        </Button>

        <AlertDialog open={generate.isPending}>
          <AlertDialogContent className="sm:max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center text-xl font-semibold">
                Creating Your Perfect Document
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                We're tailoring your
                {form.getValues("documentType") === "resume"
                  ? " resume "
                  : " cover letter "}
                to match the job description. This typically takes 15-30
                seconds.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="flex flex-col items-center justify-center space-y-6 py-6">
              <div className="relative">
                <div className="bg-primary/20 absolute -inset-1 animate-pulse rounded-full blur-xl"></div>
                <Icons.Spinner className="text-primary h-16 w-16 animate-spin" />
              </div>

              <p className="text-muted-foreground text-sm">
                Optimizing content for ATS compatibility...
              </p>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  )
}
