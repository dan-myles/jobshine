import Image from "next/image"
import { XIcon } from "lucide-react"

import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogTrigger,
} from "@/components/motion/morphing-dialog"

type PreviewImageProps = {
  src: string
  className?: string
}

export function PreviewImage({ src }: PreviewImageProps) {
  return (
    <MorphingDialog
      transition={{
        type: "spring",
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>
        <Image
          src={src}
          className="z-50 h-full w-full flex-grow cursor-zoom-in rounded-xl object-cover"
          alt="Preview Image"
          width={200}
          height={200}
        />
      </MorphingDialogTrigger>
      <MorphingDialogContainer className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <MorphingDialogContent>
          <Image
            src={src}
            alt="Preview Image"
            fill
            style={{ objectFit: "contain" }}
            className="mx-auto my-auto max-h-[92vh] w-full max-w-[34.60vw] rounded-md bg-transparent
              object-contain shadow-2xl"
          />
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}
