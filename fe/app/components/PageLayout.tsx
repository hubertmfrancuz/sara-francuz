import { ReactNode } from "react"
import "./PageLayout.css"

type LayoutPattern =
  | "full-width"           // Full width content (home page)
  | "with-sidebar"         // Sidebar + content (shop page)
  | "centered-narrow"      // Centered narrow content (about, faq)
  | "product-detail"       // Product detail page layout

interface PageLayoutProps {
  children: ReactNode
  pattern: LayoutPattern
  className?: string
}

export default function PageLayout({ children, pattern, className = "" }: PageLayoutProps) {
  return (
    <div className={`page-layout ${pattern} ${className}`}>
      {children}
    </div>
  )
}
