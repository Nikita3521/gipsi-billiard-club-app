import Image from "next/image"

export default function AboutSection() {
  return (
    <section className="relative h-[600px] bg-[radial-gradient(circle_at_center,#02434b_0%,#01282d_35%,#000000_80%)]">
      <div className={"mx-auto w-full max-w-7xl px-4"}>
        <div className="flex items-center justify-center">
          <div>
            <Image
              src="/images/background_1.webp"
              alt="tables"
              width={440}
              height={500}
            />
          </div>
          <div className="items-left flex flex-col justify-center"></div>
        </div>
      </div>
    </section>
  )
}
