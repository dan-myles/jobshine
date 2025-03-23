"use client"

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import type { Resume } from "@acme/validators"

import { Button } from "@/components/ui/button"
import { useAPI } from "@/lib/api/client"

const resume: Resume = {
  fullName: "John Smith",
  location: "Whoville, Kansas",
  email: "john@gmail.com",
  phone: "(111) 222 - 3344",
  summary:
    "Dedicated software engineer with 3+ years of experience developing web applications using modern JavaScript frameworks. Passionate about creating efficient, scalable, and user-friendly solutions. Strong problem-solving skills and experience working in agile environments.",
  websites: [
    { index: 0, url: "https://github.com/john" },
    { index: 1, url: "https://linkedin.com/in/john" },
  ],
  skills: [
    { index: 0, skill: "TypeScript" },
    { index: 1, skill: "React" },
    { index: 2, skill: "Node.js" },
    { index: 3, skill: "Express" },
    { index: 4, skill: "Next.js" },
    { index: 5, skill: "Firebase" },
    { index: 6, skill: "D3.js" },
    { index: 7, skill: "Git" },
    { index: 8, skill: "Docker" },
    { index: 9, skill: "AWS" },
    { index: 10, skill: "CI/CD" },
    { index: 11, skill: "MongoDB" },
    { index: 12, skill: "PostgreSQL" },
    { index: 13, skill: "MySQL" },
    { index: 14, skill: "SQLite" },
    { index: 15, skill: "Redis" },
    { index: 16, skill: "Elasticsearch" },
    { index: 17, skill: "Kafka" },
  ],
  experience: [
    {
      index: 0,
      company: "Tech Company Inc.",
      title: "Software Engineer",
      from: "Jan 2021",
      to: "Present",
      location: "San Francisco, CA",
      bullets: [
        {
          index: 0,
          bullet:
            "Implemented responsive UI components with React and TypeScript. Implemented responsive UI components with React and TypeScript. Implemented responsive UI components with React and TypeScript.",
        },
        {
          index: 1,
          bullet:
            "Collaborated with cross-functional teams to deliver features on time",
        },
        {
          index: 2,
          bullet:
            "Optimized database queries resulting in 40% faster load times",
        },
      ],
    },
    {
      index: 1,
      company: "Startup Co.",
      title: "Software Engineering Intern",
      from: "May 2020",
      to: "Aug 2020",
      location: "Boston, MA",
      bullets: [
        {
          index: 0,
          bullet: "Built a data visualization dashboard using React and D3.js",
        },
        {
          index: 1,
          bullet: "Participated in daily stand-ups and sprint planning",
        },
        {
          index: 2,
          bullet: "Implemented user authentication system using Firebase",
        },
      ],
    },
  ],
  education: [
    {
      index: 0,
      school: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      from: "2018",
      to: "2022",
      gpa: "3.8/4.0",
    },
  ],
  projects: [
    {
      index: 0,
      name: "E-commerce Platform",
      link: "https://github.com/john/ecommerce",
      bullets: [
        {
          index: 0,
          bullet:
            "Implemented product catalog, shopping cart, and payment processing",
        },
        {
          index: 1,
          bullet:
            "Utilized Redux for state management and responsive design principles",
        },
      ],
    },
    {
      index: 1,
      name: "Personal Portfolio Website",
      link: "",
      bullets: [
        {
          index: 0,
          bullet: "Designed and developed a responsive portfolio website",
        },
        {
          index: 1,
          bullet:
            "Implemented dark/light mode and animations using Framer Motion",
        },
        {
          index: 2,
          bullet: "Integrated a contact form with serverless functions",
        },
      ],
    },
  ],
}

export default function Page() {
  const api = useAPI()
  const generate = useMutation(
    api.resume.generate.mutationOptions({
      onSuccess: () => {
        toast("Resume generated!")
      },
      onError: (error) => {
        toast("There was an error generating the resume!")
        console.log(error)
      },
    }),
  )

  const insert = useMutation(
    api.resume.create.mutationOptions({
      onSuccess: () => {
        toast("Resume saved!")
      },
      onError: (error) => {
        toast("There was an error saving the resume!")
        console.log(error)
      },
    }),
  )

  function handleClick() {
    insert.mutate({
      resume: resume,
    })
  }

  return (
    <main>
      <Button onClick={handleClick}> generate </Button>
    </main>
  )
}
