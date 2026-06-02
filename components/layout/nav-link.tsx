"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

type NavLinkProps = {
  href: string
  children: React.ReactNode
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname()

  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "relative inline-flex items-center pb-1 text-sm font-medium uppercase tracking-[0.18em] text-white/70 transition-colors duration-200 hover:text-white",
        "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-200",
        "hover:after:scale-x-100",
        isActive && "text-white after:scale-x-100"
      )}
    >
      {children}
    </Link>
  )
}
