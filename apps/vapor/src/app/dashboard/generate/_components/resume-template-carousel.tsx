"use client"

import type { z } from "zod"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { useFormContext } from "react-hook-form"

import { ResumeTemplateIDSchema } from "@acme/validators"

import type { generateSchema } from "./form.schema"
import { MorphingDialog } from "@/components/motion/morphing-dialog"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useAPI } from "@/lib/api/client"
import { PreviewImage } from "./generate-preview-image"

export function ResumeTemplateCarousel() {
  const api = useAPI()
  const { data, isPending } = useQuery(api.resume.templates.queryOptions())
  const { setValue } = useFormContext<z.infer<typeof generateSchema>>()

  if (!data || isPending) {
    return <div>Loading...</div>
  }

  return (
    <Carousel className="h-full w-full">
      <CarouselContent>
        {data.map((template) => (
          <CarouselItem key={template.id} className="pl-1 md:pl-1">
            <div className="p-1">
              <Card className="mx-auto h-full w-full max-w-[15.60vw] rounded-md bg-transparent shadow-md">
                <CardContent>
                  <PreviewImage src={template.image} />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  )
}
