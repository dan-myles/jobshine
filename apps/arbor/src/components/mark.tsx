import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"

type MarkProps = {
  className?: string
}

export function Mark(props: MarkProps) {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-center text-3xl font-bold",
        props.className,
      )}
    >
      <Icons.Logo className="mt-1 mr-1 h-7 w-7" />
      <p className="text-primary font-bold">Jobshine</p>
    </div>
  )
}
