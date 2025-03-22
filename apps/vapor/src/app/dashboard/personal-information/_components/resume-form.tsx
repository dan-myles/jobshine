"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react"
import { useForm } from "react-hook-form"

import type { Resume } from "@acme/validators"
import { ResumeSchema } from "@acme/validators"

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

export function ResumeForm() {
  const [activeTab, setActiveTab] = useState("personal")

  const form = useForm<Resume>({
    resolver: zodResolver(ResumeSchema),
    defaultValues: {
      fullName: "",
      location: "",
      email: "",
      phone: "",
      websites: [""],
      summary: "",
      skills: [""],
      experience: [
        {
          company: "",
          title: "",
          from: "",
          to: "",
          location: "",
          bullets: [""],
        },
      ],
      education: [
        {
          school: "",
          degree: "",
          field: "",
          from: "",
          to: "",
          gpa: "",
        },
      ],
      projects: [
        {
          name: "",
          bullets: [""],
          link: "",
        },
      ],
    },
  })

  const { control, watch, setValue, handleSubmit } = form

  // Helper functions for array fields
  const addArrayItem = (field: keyof Resume, defaultValue: any) => {
    const currentValues = watch(field) as any[]
    setValue(field, [...currentValues, defaultValue])
  }

  const removeArrayItem = (field: keyof Resume, index: number) => {
    const currentValues = watch(field) as any[]
    setValue(
      field,
      currentValues.filter((_, i) => i !== index),
    )
  }

  const addBulletPoint = (field: keyof Resume, index: number) => {
    const currentValues = watch(field) as any[]
    const updatedValues = [...currentValues]
    updatedValues[index].bullets = [...updatedValues[index].bullets, ""]
    setValue(field, updatedValues)
  }

  const removeBulletPoint = (
    field: keyof Resume,
    itemIndex: number,
    bulletIndex: number,
  ) => {
    const currentValues = watch(field) as any[]
    const updatedValues = [...currentValues]
    updatedValues[itemIndex].bullets = updatedValues[itemIndex].bullets.filter(
      (_, i) => i !== bulletIndex,
    )
    setValue(field, updatedValues)
  }

  const addWebsite = () => {
    const currentWebsites = watch("websites")
    setValue("websites", [...currentWebsites, ""])
  }

  const removeWebsite = (index: number) => {
    const currentWebsites = watch("websites")
    setValue(
      "websites",
      currentWebsites.filter((_, i) => i !== index),
    )
  }

  const addSkill = () => {
    const currentSkills = watch("skills")
    setValue("skills", [...currentSkills, ""])
  }

  const removeSkill = (index: number) => {
    const currentSkills = watch("skills")
    setValue(
      "skills",
      currentSkills.filter((_, i) => i !== index),
    )
  }

  const navigateTab = (direction: "next" | "prev") => {
    const tabs = ["personal", "summary", "experience", "education", "projects"]
    const currentIndex = tabs.indexOf(activeTab)

    if (direction === "next" && currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
    } else if (direction === "prev" && currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1])
    }
  }

  const handleFormSubmit = (data: Resume) => {
    alert("Resume data submitted successfully!")
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-6 grid w-full grid-cols-5">
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
                      <FormField
                        control={control}
                        name={`skills.${watch("skills").length - 1}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input placeholder="Add a skill" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addSkill}
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
                      onClick={() =>
                        addArrayItem("experience", {
                          company: "",
                          title: "",
                          from: "",
                          to: "",
                          location: "",
                          bullets: [""],
                        })
                      }
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
                          onClick={() =>
                            removeArrayItem("experience", expIndex)
                          }
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
                                    removeBulletPoint(
                                      "experience",
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
                            onClick={() =>
                              addBulletPoint("experience", expIndex)
                            }
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
                      onClick={() =>
                        addArrayItem("education", {
                          school: "",
                          degree: "",
                          field: "",
                          from: "",
                          to: "",
                          gpa: "",
                        })
                      }
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
                          onClick={() => removeArrayItem("education", eduIndex)}
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
                      onClick={() =>
                        addArrayItem("projects", {
                          name: "",
                          bullets: [""],
                          link: "",
                        })
                      }
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
                          onClick={() => removeArrayItem("projects", projIndex)}
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
                                    removeBulletPoint(
                                      "projects",
                                      projIndex,
                                      bulletIndex,
                                    )
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
                            onClick={() =>
                              addBulletPoint("projects", projIndex)
                            }
                          >
                            <Plus className="mr-2 h-4 w-4" /> Add Bullet Point
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigateTab("prev")}
                  disabled={activeTab === "personal"}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>

                {activeTab === "projects" ? (
                  <Button type="submit" className="bg-primary">
                    Save Resume
                  </Button>
                ) : (
                  <Button type="button" onClick={() => navigateTab("next")}>
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Tabs>
  )
}
