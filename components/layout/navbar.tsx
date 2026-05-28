import { NavLink } from "./nav-link"

export default function Navbar() {
  return (
    <header>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <h1 className="text-xl font-bold">GIPSI BILLIARD CLUB</h1>

        <nav className="flex gap-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/booking">Booking</NavLink>
          <NavLink href="/discounts">Discounts</NavLink>
          <NavLink href="/menu">Menu</NavLink>
          <NavLink href="/tournaments">Tournaments</NavLink>
          <NavLink href="/contacts">Contacts</NavLink>
        </nav>
      </div>
    </header>
  )
}
