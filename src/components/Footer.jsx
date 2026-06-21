import { siteConfig } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto max-w-6xl px-6 text-center text-sm text-white/40">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}.
        </p>
      </div>
    </footer>
  )
}
