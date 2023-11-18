import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {children}
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
          <div>
              <p>Copyright © 2023 - Todos os direitos reservados por Assis Junior W&M</p>
          </div>
      </footer>
    </div>
  )
}
