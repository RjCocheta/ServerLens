import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-1 backdrop-blur-lg">
      <nav className="page-wrap flex flex-wrap justify-between gap-x-1 gap-y-2 py-3 sm:py-4">
        <h2 className="m-0 my-auto flex-shrink-0 text-base font-semibold tracking-tight">
          ServerLens
        </h2>

        <div className="ml-auto flex items-center gap-1.5 sm:ml-0 sm:gap-2">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
