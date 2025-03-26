"use client"

import type { z } from "zod"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"

import type { resumeGenerateSchema } from "@acme/validators"
import { ResumeTemplateIDSchema } from "@acme/validators"

import type { CarouselApi } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { PreviewImage } from "./generate-preview-image"

export function ResumeTemplateCarousel() {
  const { setValue } = useFormContext<z.infer<typeof resumeGenerateSchema>>()
  const [api, setApi] = useState<CarouselApi>()

  const templates = ResumeTemplateIDSchema.options.map((templateID) => {
    return {
      id: templateID,
      image: `/resume-templates/${templateID}.png`,
    }
  })

  useEffect(() => {
    if (!api) {
      return
    }

    // TODO: Fix going out of bounds of the carousel enum values
    const selected = `00${api.selectedScrollSnap() + 1}`
    const input = ResumeTemplateIDSchema.parse(selected)
    setValue("resumeTemplate", input)

    api.on("select", () => {
      const selected = `00${api.selectedScrollSnap() + 1}`
      const input = ResumeTemplateIDSchema.parse(selected)
      setValue("resumeTemplate", input)
    })
  }, [api])

  return (
    <Carousel className="h-full w-full" setApi={setApi}>
      <CarouselContent>
        {templates.map((template) => (
          <CarouselItem key={template.id} className="pl-1 md:pl-1">
            <div className="flex h-full flex-col justify-center p-4">
              <div className="mx-auto max-w-[14vw] rounded-md border shadow-md">
                <PreviewImage src={template.image} />
              </div>
            </div>
          </CarouselItem>
        ))}

        <CarouselItem className="pl-1 md:pl-1">
          <div className="p-1">
            <Card
              className="mx-auto my-auto h-[30vh] w-full max-w-[15.60vw] rounded-md bg-transparent
                shadow-md"
            >
              <CardContent
                className="text-secondary-foreground -mb-32 flex h-full flex-col items-center
                  justify-center"
              >
                More Coming Soon...
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  )
}
