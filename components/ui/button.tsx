import { ReactNode } from "react"
import { cn } from "@/consts/utils"

type ButtonProps = {
  children: ReactNode
  className?: string
}

export default function Button({ children, className }: ButtonProps) {
  return (
    <button
      className={cn(
        "h-12 cursor-pointer rounded-none border-2 border-gold bg-gold px-8 text-lg font-extrabold tracking-wide text-white uppercase transition-all duration-150 hover:bg-transparent",
        className
      )}
    >
      {children}
    </button>
  )
}
