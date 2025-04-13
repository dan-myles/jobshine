import { Navbar } from "@/components/navbar"
import { createFileRoute } from "@tanstack/react-router"


export const Route = createFileRoute("/")({
  component: Page,
})

export default function Page() {

  return (
    <>
      <Navbar />
      <main className="container mx-auto pt-32 pb-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            LOL
          </div>
          <div className="order-1 lg:order-2">
            {/* <FeatureCarousel */}
            {/*   title="Powerful Features" */}
            {/*   description="Build, deploy, and scale applications effortlessly" */}
            {/*   image={{ */}
            {/*     step1dark1: "/images/step1dark1.png", */}
            {/*     step1dark2: "/images/step1dark2.png", */}
            {/*     step1light1: "/images/step1light1.png", */}
            {/*     step1light2: "/images/step1light2.png", */}
            {/*     step2dark1: "/images/step2dark1.png", */}
            {/*     step2dark2: "/images/step2dark2.png", */}
            {/*     step2light1: "/images/step2light1.png", */}
            {/*     step2light2: "/images/step2light2.png", */}
            {/*     step3dark: "/images/step3dark.png", */}
            {/*     step3light: "/images/step3light.png", */}
            {/*     step4light: "/images/step4light.png", */}
            {/*     alt: "Platform screenshots", */}
            {/*   }} */}
            {/* /> */}
          </div>
        </div>
      </main>
      <main className="container mx-auto pt-32 pb-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            LOL
          </div>
          <div className="order-1 lg:order-2">
            {/* <FeatureCarousel */}
            {/*   title="Powerful Features" */}
            {/*   description="Build, deploy, and scale applications effortlessly" */}
            {/*   image={{ */}
            {/*     step1dark1: "/images/step1dark1.png", */}
            {/*     step1dark2: "/images/step1dark2.png", */}
            {/*     step1light1: "/images/step1light1.png", */}
            {/*     step1light2: "/images/step1light2.png", */}
            {/*     step2dark1: "/images/step2dark1.png", */}
            {/*     step2dark2: "/images/step2dark2.png", */}
            {/*     step2light1: "/images/step2light1.png", */}
            {/*     step2light2: "/images/step2light2.png", */}
            {/*     step3dark: "/images/step3dark.png", */}
            {/*     step3light: "/images/step3light.png", */}
            {/*     step4light: "/images/step4light.png", */}
            {/*     alt: "Platform screenshots", */}
            {/*   }} */}
            {/* /> */}
          </div>
        </div>
      </main>
    </>
  )
}
