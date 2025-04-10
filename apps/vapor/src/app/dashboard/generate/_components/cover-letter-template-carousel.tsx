"use client"

import type { z } from "zod"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"

import type { generateSchema } from "@jobshine/validators"
import { CoverLetterTemplateIdSchema } from "@jobshine/validators"

import type { CarouselApi } from "@/components/ui/carousel"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { GeneratePreviewImage } from "./generate-preview-image"

export function CoverLetterTemplateCarousel() {
  const { setValue } = useFormContext<z.infer<typeof generateSchema>>()
  const [api, setApi] = useState<CarouselApi>()

  const templates = CoverLetterTemplateIdSchema.options.map((templateID) => {
    return {
      id: templateID,
      image: `/cover-letter-templates/${templateID}.png`,
    }
  })

  useEffect(() => {
    if (!api) {
      return
    }

    const selected = `00${api.selectedScrollSnap() + 1}`
    const input = CoverLetterTemplateIdSchema.parse(selected)
    setValue("coverLetterTemplate", input)

    api.on("select", () => {
      const selected = `00${api.selectedScrollSnap() + 1}`
      const input = CoverLetterTemplateIdSchema.parse(selected)
      setValue("coverLetterTemplate", input)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api])

  return (
    <Carousel className="h-full w-full" setApi={setApi}>
      <CarouselContent>
        {templates.map((template) => (
          <CarouselItem key={template.id} className="pl-1 md:pl-1">
            <div className="flex h-full flex-col justify-center p-4">
              <div className="mx-auto max-w-[14vw] rounded-md border shadow-md">
                <GeneratePreviewImage src={template.image} />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  )
}
