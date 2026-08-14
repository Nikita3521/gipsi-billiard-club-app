import { ReactNode, ButtonHTMLAttributes } from "react"
import { cn } from "@/consts/utils"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  className?: string
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "h-12 cursor-pointer overflow-hidden rounded-none border-2 border-gold bg-gold px-8 text-lg font-extrabold tracking-wide text-white uppercase transition-all duration-150 hover:bg-transparent",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
