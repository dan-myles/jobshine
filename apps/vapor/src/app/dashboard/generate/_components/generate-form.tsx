"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { ResumeTemplateIDSchema } from "@acme/validators"

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
import { generateSchema } from "./form.schema"
import { ResumeTemplateCarousel } from "./resume-template-carousel"

export function GenerateForm() {
  const form = useForm<z.infer<typeof generateSchema>>({
    resolver: zodResolver(generateSchema),
    defaultValues: {
      jobDescription: "",
      documentType: "resume",
      resumeTemplate: "001",
    },
  })

  function handleSubmit(data: z.infer<typeof generateSchema>) {
    console.log(data)
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
                      <TabsTrigger value="cover-letter">
                        Cover Letter
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="resume">
                      <ResumeTemplateCarousel />
                    </TabsContent>
                    <TabsContent value="cover-letter">
                      Change your password here.
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
