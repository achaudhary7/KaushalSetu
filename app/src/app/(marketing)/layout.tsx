import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'

/**
 * The public shell: Header, content, Footer. Every marketing and public-data page
 * renders inside it, which is why those two components are built once and never copied.
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
