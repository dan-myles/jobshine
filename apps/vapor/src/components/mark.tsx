import { Icons } from "@/components/icons"

export function Mark() {
  return (
    <div className="flex flex-row items-center justify-center text-3xl font-bold">
      <Icons.logo className="mt-1 mr-1 h-7 w-7" />
      <p className="text-primary">Jobshine</p>
    </div>
  )
}
