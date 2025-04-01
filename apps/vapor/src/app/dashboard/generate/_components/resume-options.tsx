"use client"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function ResumeOptions() {
  return (
    <Card className="h-full p-4">
      <CardHeader className="mt-2 -mr-2 -ml-2">
        <h2 className="text-lg font-semibold">Resume Options</h2>
        <Separator />
      </CardHeader>
      <CardContent className="flex h-full flex-col">
        <section className="flex flex-col items-center justify-center gap-4 rounded-md border p-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <Icons.OpenAI className="h-16 w-16 fill-black dark:fill-white" />
          </div>

          <div className="flex flex-col items-start justify-center gap-1">
            <p className="text-xl font-semibold">GPT-4.5 Turbo</p>
            <p className="text-muted-foreground text-sm">
              OpenAI's flagship model.
            </p>
          </div>

          <Button variant="outline" className="w-full cursor-not-allowed">
            <Icons.Bot className="h-4 w-4" />
            Change model
          </Button>
        </section>

        {/* Coming Soon */}
        <section className="mt-4 flex w-full flex-grow items-center justify-center rounded-md border p-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <Icons.Shield className="mr-2 h-10 w-10 fill-white dark:fill-black" />
          </div>

          <div className="flex flex-col items-start justify-center gap-1">
            <p className="text-xl font-semibold">Coming Soon</p>
            <p className="text-foreground text-sm">
              More options are on the way!
            </p>
          </div>
        </section>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <div className="w-full text-sm">
          <div className="text-muted-foreground flex flex-col border-t pt-2">
            <div className="mb-1 flex items-center justify-between">
              <span>Token Estimation</span>
              <span className="font-mono">142 tokens</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>Cost Per Million</span>
              <span className="font-mono">Input: $0.15 USD</span>
              <span className="font-mono">Output: $0.60 USD</span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-dashed pt-2">
              <span className="text-xs italic">
                Prices may vary based on content length
              </span>
              <Icons.Receipt className="text-muted-foreground h-4 w-4" />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
