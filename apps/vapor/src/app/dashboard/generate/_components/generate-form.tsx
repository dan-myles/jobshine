"use client"

import type { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { resumeGenerateSchema } from "@acme/validators"

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
import { useAPI } from "@/lib/api/client"
import { auth } from "@/lib/auth-client"
import { CoverLetterTemplateCarousel } from "./cover-letter-template-carousel"
import { ResumeTemplateCarousel } from "./resume-template-carousel"

export function GenerateForm() {
  const { data: session } = auth.useSession()
  const api = useAPI()
  const generate = useMutation(
    api.resume.generate.mutationOptions({
      onSuccess: (data) => {
        toast.success("PDF generated successfully")
        downloadFile(data.url, `${session?.user.name}.pdf`).catch(console.error)
      },
      onError: (error) => {
        toast.error("Error generating PDF", {
          description: error.message,
        })
      },
    }),
  )

  const form = useForm<z.infer<typeof resumeGenerateSchema>>({
    resolver: zodResolver(resumeGenerateSchema),
    defaultValues: {
      jobDescription: "",
      documentType: "resume",
      resumeTemplate: "001",
    },
  })

  function handleSubmit(data: z.infer<typeof resumeGenerateSchema>) {
    generate.mutate({
      jobDescription: data.jobDescription,
      documentType: data.documentType,
      resumeTemplate: data.resumeTemplate,
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
      toast.error("Error downloading file", {
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
                    className="min-h-[150px]"
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
                    <TabsContent value="resume">
                      <ResumeTemplateCarousel />
                    </TabsContent>
                    <TabsContent value="cover-letter">
                      <CoverLetterTemplateCarousel />
                    </TabsContent>
                  </Tabs>
                </FormControl>
              </FormItem>
            )}
          />
        </section>

        <Button type="submit" className="bg-primary">
          Generate
        </Button>
      </form>
    </Form>
  )
}
