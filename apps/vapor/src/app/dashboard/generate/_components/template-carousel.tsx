"use client"

import { useFormContext } from "react-hook-form"
import { z } from "zod"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { generateSchema } from "./form.schema"

type Template = {
  id: string
  name: string
  image: string
}

interface TemplateCarouselProps {
  templates: Template[]
}

export function TemplateCarousel({ templates }: TemplateCarouselProps) {
  const { setValue } = useFormContext<z.infer<typeof generateSchema>>()

  return (
    <Carousel className="w-full max-w-md">
      <CarouselContent>
        {templates.map((template) => (
          <CarouselItem key={template.id} className="pl-1 md:pl-1">
            <div className="p-1">
              <button
                type="button"
                className="block overflow-hidden rounded-lg"
                onClick={() => setValue("template", template.id)}
              >
                <img
                  src={template.image}
                  alt={template.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-2 text-center">{template.name}</div>
              </button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  )
}
