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
        "transition-colors hover:text-green-500",
        isActive && "font-semibold text-green-500"
      )}
    >
      {children}
    </Link>
  )
}
