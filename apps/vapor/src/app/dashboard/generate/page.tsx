"use client"

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { useAPI } from "@/lib/api/client"

const resume = {
  fullName: "John Smith",
  location: "Whoville, Kansas",
  email: "john@gmail.com",
  phone: "(111) 222 - 3344",
  websites: ["https://github.com/john", "https://linkedin.com/in/john"],
  summary:
    "Dedicated software engineer with 3+ years of experience developing web applications using modern JavaScript frameworks. Passionate about creating efficient, scalable, and user-friendly solutions. Strong problem-solving skills and experience working in agile environments.",
  skills: [
    "TypeScript",
    "React",
    "Node.js",
    "Express",
    "Next.js",
    "Firebase",
    "D3.js",
    "Git",
    "Docker",
    "AWS",
    "CI/CD",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "SQLite",
    "Redis",
    "Elasticsearch",
    "Kafka",
  ],
  experience: [
    {
      company: "Tech Company Inc.",
      title: "Software Engineer",
      from: "Jan 2021",
      to: "Present",
      location: "San Francisco, CA",
      bullets: [
        "Implemented responsive UI components with React and TypeScript. Implemented responsive UI components with React and TypeScript. Implemented responsive UI components with React and TypeScript.",
        "Collaborated with cross-functional teams to deliver features on time",
        "Optimized database queries resulting in 40% faster load times",
      ],
    },
    {
      company: "Startup Co.",
      title: "Software Engineering Intern",
      from: "May 2020",
      to: "Aug 2020",
      location: "Boston, MA",
      bullets: [
        "Built a data visualization dashboard using React and D3.js",
        "Participated in daily stand-ups and sprint planning",
        "Implemented user authentication system using Firebase",
      ],
    },
  ],
  education: [
    {
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
      name: "E-commerce Platform",
      bullets: [
        "Implemented product catalog, shopping cart, and payment processing",
        "Utilized Redux for state management and responsive design principles",
      ],
      link: "https://github.com/john/ecommerce",
    },
    {
      name: "Personal Portfolio Website",
      bullets: [
        "Designed and developed a responsive portfolio website",
        "Implemented dark/light mode and animations using Framer Motion",
        "Integrated a contact form with serverless functions",
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

  function handleClick() {
    generate.mutate({
      resume: resume,
      templateID: "001",
    })
  }

  return (
    <main>
      <Button onClick={handleClick}> generate </Button>
    </main>
  )
}
