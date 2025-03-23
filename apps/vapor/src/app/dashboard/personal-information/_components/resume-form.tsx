/* eslint-disable @typescript-eslint/no-non-null-assertion */

"use client"

import { useEffect, useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Plus, Trash2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import type { Resume } from "@acme/validators"
import { ResumeSchema } from "@acme/validators"

import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useAPI } from "@/lib/api/client"
import { useUpdateResume } from "@/stores/resume-store"

type ResumeFormProps = { resumeData: Resume }

// TODO: Add a loading spinner to submit button and disable it while submitting
export function ResumeForm({ resumeData }: ResumeFormProps) {
  const api = useAPI()
  const updateResume = useUpdateResume()
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [newSkill, setNewSkill] = useState("")
  const [activeTab, setActiveTab] = useState("personal")

  const submitResume = useMutation(
    api.resume.update.mutationOptions({
      onSuccess: () => {
        toast.success("Resume saved successfully!")
        reset()
      },
      onError: () => {
        toast.error("Failed to save resume.")
      },
    }),
  )

  const form = useForm<Resume>({
    resolver: zodResolver(ResumeSchema),
    defaultValues: resumeData,
  })

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = form

  useEffect(() => {
    const subscription = watch((values) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }

      debounceTimeoutRef.current = setTimeout(() => {
        updateResume(values as Resume)
        debounceTimeoutRef.current = null
      }, 355)
    })

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
      subscription.unsubscribe()
    }
  }, [watch, updateResume])

  function addExperienceItem() {
    const currentValues = watch("experience")
    setValue("experience", [
      ...currentValues,
      {
        company: "",
        title: "",
        from: "",
        to: "",
        location: "",
        bullets: [""],
      },
    ])
  }

  function removeExperienceItem(index: number) {
    const currentValues = watch("experience")
    setValue(
      "experience",
      currentValues.filter((_, i) => i !== index),
    )
  }

  function addEducationItem() {
    const currentValues = watch("education")
    setValue("education", [
      ...currentValues,
      {
        school: "",
        degree: "",
        field: "",
        from: "",
        to: "",
        gpa: "",
      },
    ])
  }

  function removeEducationItem(index: number) {
    const currentValues = watch("education")
    setValue(
      "education",
      currentValues.filter((_, i) => i !== index),
    )
  }

  function addProjectsItem() {
    const currentValues = watch("projects")
    setValue("projects", [
      ...currentValues,
      {
        name: "",
        bullets: [""],
        link: "",
      },
    ])
  }

  function removeProjectsItem(index: number) {
    const currentValues = watch("projects")
    setValue(
      "projects",
      currentValues.filter((_, i) => i !== index),
    )
  }

  function addExperienceBullet(expIndex: number) {
    const currentValues = watch("experience")
    const updatedValues = [...currentValues]
    updatedValues[expIndex]!.bullets = [...updatedValues[expIndex]!.bullets, ""]
    setValue("experience", updatedValues)
  }

  function removeExperienceBullet(expIndex: number, bulletIndex: number) {
    const currentValues = watch("experience")
    const updatedValues = [...currentValues]
    updatedValues[expIndex]!.bullets = updatedValues[expIndex]!.bullets.filter(
      (_, i) => i !== bulletIndex,
    )
    setValue("experience", updatedValues)
  }

  function addProjectBullet(projIndex: number) {
    const currentValues = watch("projects")
    const updatedValues = [...currentValues]
    updatedValues[projIndex]!.bullets = [
      ...updatedValues[projIndex]!.bullets,
      "",
    ]
    setValue("projects", updatedValues)
  }

  function removeProjectBullet(projIndex: number, bulletIndex: number) {
    const currentValues = watch("projects")
    const updatedValues = [...currentValues]
    updatedValues[projIndex]!.bullets = updatedValues[
      projIndex
    ]!.bullets.filter((_, i) => i !== bulletIndex)
    setValue("projects", updatedValues)
  }

  function addWebsite() {
    const currentWebsites = watch("websites")
    setValue("websites", [...currentWebsites, ""])
  }

  function removeWebsite(index: number) {
    const currentWebsites = watch("websites")
    setValue(
      "websites",
      currentWebsites.filter((_, i) => i !== index),
    )
  }

  function handleAddSkill() {
    if (newSkill.trim() !== "") {
      const currentSkills = watch("skills")
      setValue("skills", [...currentSkills, newSkill])
      setNewSkill("")
    }
  }

  function removeSkill(index: number) {
    const currentSkills = watch("skills")
    setValue(
      "skills",
      currentSkills.filter((_, i) => i !== index),
    )
  }

  function handleFormSubmit(data: Resume) {
    submitResume.mutate({
      resume: data,
    })
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddSkill()
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-6 flex w-full flex-row">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="experience">Experience</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
      </TabsList>

      <Card className="border shadow">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <TabsContent value="personal" className="mt-0 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="City, State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="(123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormLabel>Websites</FormLabel>
                    <FormDescription>
                      Add your portfolio, LinkedIn, or other relevant websites
                    </FormDescription>

                    {watch("websites").map((_, index) => (
                      <div key={index} className="mt-2 flex items-center gap-2">
                        <FormField
                          control={control}
                          name={`websites.${index}`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  placeholder="https://yourwebsite.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeWebsite(index)}
                          disabled={watch("websites").length <= 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={addWebsite}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Website
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="summary" className="mt-0 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Professional Summary</h3>
                  <FormField
                    control={control}
                    name="summary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Summary</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write a brief summary of your professional background and goals..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabel>Skills</FormLabel>
                    <FormDescription>
                      Add your technical and soft skills
                    </FormDescription>

                    <div className="mb-2 flex flex-wrap gap-2">
                      {watch("skills").map(
                        (skill, index) =>
                          skill && (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="px-2 py-1 text-sm"
                            >
                              {skill}
                              <button
                                type="button"
                                className="text-muted-foreground hover:text-foreground ml-1"
                                onClick={() => removeSkill(index)}
                              >
                                ×
                              </button>
                            </Badge>
                          ),
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        placeholder="Add a skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleAddSkill}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="experience" className="mt-0 space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Work Experience</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addExperienceItem}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Experience
                    </Button>
                  </div>

                  {watch("experience").map((_, expIndex) => (
                    <Card key={expIndex} className="border-muted border">
                      <CardHeader className="flex flex-row items-start justify-between p-4 pb-2">
                        <div>
                          <CardTitle className="text-base">
                            Experience {expIndex + 1}
                          </CardTitle>
                          <CardDescription>
                            {watch(`experience.${expIndex}.company`) ||
                              "Company Name"}{" "}
                            -{" "}
                            {watch(`experience.${expIndex}.title`) ||
                              "Job Title"}
                          </CardDescription>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive h-8 w-8"
                          onClick={() => removeExperienceItem(expIndex)}
                          disabled={watch("experience").length <= 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-4 p-4 pt-0">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <FormField
                            control={control}
                            name={`experience.${expIndex}.company`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Company Name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={control}
                            name={`experience.${expIndex}.title`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Job Title</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Software Engineer"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                          <FormField
                            control={control}
                            name={`experience.${expIndex}.from`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>From</FormLabel>
                                <FormControl>
                                  <Input placeholder="Jan 2020" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={control}
                            name={`experience.${expIndex}.to`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>To</FormLabel>
                                <FormControl>
                                  <Input placeholder="Present" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={control}
                            name={`experience.${expIndex}.location`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                  <Input placeholder="City, State" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div>
                          <FormLabel>Responsibilities & Achievements</FormLabel>

                          {watch(`experience.${expIndex}.bullets`).map(
                            (_, bulletIndex) => (
                              <div
                                key={bulletIndex}
                                className="mt-2 flex items-center gap-2"
                              >
                                <FormField
                                  control={control}
                                  name={`experience.${expIndex}.bullets.${bulletIndex}`}
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormControl>
                                        <Input
                                          placeholder="Describe your responsibilities and achievements"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  onClick={() =>
                                    removeExperienceBullet(
                                      expIndex,
                                      bulletIndex,
                                    )
                                  }
                                  disabled={
                                    watch(`experience.${expIndex}.bullets`)
                                      .length <= 1
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ),
                          )}

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => addExperienceBullet(expIndex)}
                          >
                            <Plus className="mr-2 h-4 w-4" /> Add Bullet Point
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="education" className="mt-0 space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Education</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addEducationItem}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Education
                    </Button>
                  </div>

                  {watch("education").map((_, eduIndex) => (
                    <Card key={eduIndex} className="border-muted border">
                      <CardHeader className="flex flex-row items-start justify-between p-4 pb-2">
                        <div>
                          <CardTitle className="text-base">
                            Education {eduIndex + 1}
                          </CardTitle>
                          <CardDescription>
                            {watch(`education.${eduIndex}.school`) ||
                              "School Name"}{" "}
                            -{" "}
                            {watch(`education.${eduIndex}.degree`) || "Degree"}
                          </CardDescription>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive h-8 w-8"
                          onClick={() => removeEducationItem(eduIndex)}
                          disabled={watch("education").length <= 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-4 p-4 pt-0">
                        <FormField
                          control={control}
                          name={`education.${eduIndex}.school`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>School</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="University Name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <FormField
                            control={control}
                            name={`education.${eduIndex}.degree`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Degree</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Bachelor of Science"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={control}
                            name={`education.${eduIndex}.field`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Field of Study</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Computer Science"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                          <FormField
                            control={control}
                            name={`education.${eduIndex}.from`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>From</FormLabel>
                                <FormControl>
                                  <Input placeholder="Sep 2018" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={control}
                            name={`education.${eduIndex}.to`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>To</FormLabel>
                                <FormControl>
                                  <Input placeholder="May 2022" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={control}
                            name={`education.${eduIndex}.gpa`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>GPA (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="3.8/4.0" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="projects" className="mt-0 space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Projects</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addProjectsItem}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Project
                    </Button>
                  </div>

                  {watch("projects").map((_, projIndex) => (
                    <Card key={projIndex} className="border-muted border">
                      <CardHeader className="flex flex-row items-start justify-between p-4 pb-2">
                        <div>
                          <CardTitle className="text-base">
                            Project {projIndex + 1}
                          </CardTitle>
                          <CardDescription>
                            {watch(`projects.${projIndex}.name`) ||
                              "Project Name"}
                          </CardDescription>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive h-8 w-8"
                          onClick={() => removeProjectsItem(projIndex)}
                          disabled={watch("projects").length <= 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-4 p-4 pt-0">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <FormField
                            control={control}
                            name={`projects.${projIndex}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Project Name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Project Name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={control}
                            name={`projects.${projIndex}.link`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Project Link (Optional)</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="https://github.com/yourusername/project"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div>
                          <FormLabel>Project Description</FormLabel>

                          {watch(`projects.${projIndex}.bullets`).map(
                            (_, bulletIndex) => (
                              <div
                                key={bulletIndex}
                                className="mt-2 flex items-center gap-2"
                              >
                                <FormField
                                  control={control}
                                  name={`projects.${projIndex}.bullets.${bulletIndex}`}
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormControl>
                                        <Input
                                          placeholder="Describe your project and technologies used"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  onClick={() =>
                                    removeProjectBullet(projIndex, bulletIndex)
                                  }
                                  disabled={
                                    watch(`projects.${projIndex}.bullets`)
                                      .length <= 1
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ),
                          )}

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => addProjectBullet(projIndex)}
                          >
                            <Plus className="mr-2 h-4 w-4" /> Add Bullet Point
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <div className="flex justify-end pt-6">
                <Button
                  type="submit"
                  className="bg-primary"
                  disabled={!isDirty || submitResume.isPending}
                >
                  {submitResume.isPending ? (
                    <>
                      <Icons.Spinner className="h-4 w-4" />
                    </>
                  ) : (
                    "Save Resume"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Tabs>
  )
}
