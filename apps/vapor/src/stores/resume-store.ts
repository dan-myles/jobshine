// NOTE: This store is used to store client side resume data.
// It is only used to hot reload the resume preview.

import { create } from "zustand"

import type { Resume } from "@acme/validators"

type ResumeActions = {
  updateResume: (newResumeData: Resume) => void
}

type ResumeState = {
  resumeData: Resume
}

const useResumeStore = create<ResumeState & ResumeActions>((set) => ({
  resumeData: {
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
  updateResume: (newResumeData: Resume) => set({ resumeData: newResumeData }),
}))

export const useResumeData = () => useResumeStore((state) => state.resumeData)
export const useUpdateResume = () =>
  useResumeStore((state) => state.updateResume)
