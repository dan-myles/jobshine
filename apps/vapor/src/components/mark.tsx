import { Icons } from "@/components/icons"

export function Mark() {
  return (
    <div className="flex flex-row items-center justify-center space-x-2 p-4 text-3xl font-bold">
      <Icons.logo className="h-10 w-10" />
      <p className="text-primary">Jobshine</p>
    </div>
  )
}
