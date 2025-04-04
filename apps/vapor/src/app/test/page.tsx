"use client"

import type { CoverLetter } from "@acme/validators"

export const testCoverLetterData: CoverLetter = {
  senderName: "John Smith", // Changed name
  senderAddress: "123 Main St\nAnytown, CA 90210",
  senderPhone: "555-987-6543", // Changed phone for variety
  senderEmail: "john.smith@email.com", // Changed email
  senderWebsite: "https://johnsmith.example.com", // Changed website
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.", // Changed body to Lorem Ipsum with a newline
}

export default function Page() {



  return (
    <div>
      <p> resume viewer</p>
    </div>
  )
}
