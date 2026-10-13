import { Outlet, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function CheckoutLayout() {
  return (
    <div className="min-h-screen bg-aux">
      {/* Header simplificado */}
      <header className="bg-black border-b-2 border-accent h-14 flex items-center px-4 gap-4">
        <Link to="/" className="flex items-center">
          <img src="/logos/logo-blanco.png" alt="Jey Avila Music" width="800" height="334" className="h-9 w-auto" />
        </Link>

        <div className="flex-1 text-center">
          <span className="text-white text-sm font-semibold">Finalizar compra</span>
        </div>

        <Link to="/" className="flex items-center gap-1.5 text-neutral-300 hover:text-white text-xs transition-colors">
          <ArrowLeft size={14} /> Seguir comprando
        </Link>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
