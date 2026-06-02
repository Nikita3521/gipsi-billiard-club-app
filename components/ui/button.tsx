import { ReactNode } from "react"

type ButtonProps = {
  children: ReactNode
}

export default function Button({ children }: ButtonProps) {
  return (
    <button className="h-12 cursor-pointer rounded-none border-2 border-gold bg-gold px-8 text-lg font-extrabold tracking-wide text-white uppercase transition-all duration-200 hover:bg-transparent">
      {children}
    </button>
  )
}
