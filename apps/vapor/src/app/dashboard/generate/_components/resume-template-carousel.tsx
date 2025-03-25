"use client"

import type { z } from "zod"
import { useFormContext } from "react-hook-form"

import { ResumeTemplateIDSchema } from "@acme/validators"

import type { generateSchema } from "./form.schema"
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
  const { setValue } = useFormContext<z.infer<typeof generateSchema>>()

  const templates = ResumeTemplateIDSchema.options.map((templateID) => {
    return {
      id: templateID,
      image: `/resume-templates/${templateID}.png`,
    }
  })

  return (
    <Carousel className="h-full w-full">
      <CarouselContent>
        {templates.map((template) => (
          <CarouselItem key={template.id} className="pl-1 md:pl-1">
            <div className="flex h-full flex-col justify-center p-4">
              <div className="mx-auto max-w-[12vw] rounded-md border shadow-md">
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
