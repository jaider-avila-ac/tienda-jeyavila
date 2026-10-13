import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, Bell, CircleUserRound, Menu as MenuIcon } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { useNotifications } from '../../context/NotificationsContext'
import CategoryDrawer from './CategoryDrawer'
import { NEGOCIO, REDES_JEY } from '../../data/negocio'

// Menú de escritorio, como en el sitio de Jey: enlaces en mayúsculas con un bloque rojo inclinado
// que marca la página actual. Música lleva a su perfil de Spotify; Contacto, a su WhatsApp.
const MENU = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/catalogo', label: 'Productos' },
  { href: REDES_JEY.spotify, label: 'Música' },
  { href: NEGOCIO.whatsappUrl, label: 'Contacto' },
]
const claseMenu = 'relative px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors'

// ══════════════════════════════════════════════════════════════════════════
// Versión alterna del header: misma data/funciones que la original (mismo
// estado de búsqueda, mismos conteos de carrito/notificaciones, mismos
// links), pero con otra forma — logo centrado y una fila de búsqueda propia,
// en vez de barra única con logo a la izquierda. Alto total unificado
// (112px) para mobile y desktop — ver StoreLayout.jsx.
// ══════════════════════════════════════════════════════════════════════════
export default function Navbar() {
  const { count } = useCart()
  const { isAuthenticated, user } = useAuth()
  const { unreadCount } = useNotifications()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const firstName = user?.nombre?.trim() || user?.email?.split('@')[0] || ''
  const fullName = [user?.nombre, user?.apellido].filter(Boolean).join(' ').trim()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/busqueda?q=${encodeURIComponent(search.trim())}`)
      setSearch('')
    }
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">

        {/* Fila principal — categorías y menú | logo centrado | iconos */}
        <div className="h-16 bg-black border-b border-white/10">
          <div className="h-full max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-[1fr_auto_1fr] items-center gap-2">

            <div className="flex items-center gap-2">
            <button
              onClick={() => setDrawerOpen((v) => !v)}
              className={`w-10 h-10 flex items-center justify-center transition-colors flex-shrink-0 ${
                drawerOpen ? 'bg-accent text-white' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Menú"
            >
              <MenuIcon size={19} />
            </button>
            <nav className="hidden lg:flex items-center">
              {MENU.map((m) => m.to ? (
                <NavLink key={m.label} to={m.to} end={m.end}
                  className={({ isActive }) => `${claseMenu} ${isActive ? 'text-white' : 'text-neutral-400 hover:text-white'}`}>
                  {({ isActive }) => (
                    <>
                      <span className={`absolute inset-0 -skew-x-12 bg-accent transition-transform duration-300 origin-bottom ${isActive ? 'scale-y-100' : 'scale-y-0'}`} />
                      <span className="relative">{m.label}</span>
                    </>
                  )}
                </NavLink>
              ) : (
                <a key={m.label} href={m.href} target="_blank" rel="noopener noreferrer" className={`${claseMenu} text-neutral-400 hover:text-white`}>{m.label}</a>
              ))}
            </nav>
            </div>

            <Link to="/" className="flex items-center justify-center">
              <img src="/logos/logo-blanco.png" alt="Jey Avila Music" width="800" height="334" className="h-10 sm:h-11 w-auto" />
            </Link>

            <div className="flex items-center gap-0.5 sm:gap-1 justify-self-end">
              <Link
                to="/notificaciones"
                className="relative w-10 h-10 flex items-center justify-center text-neutral-300 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Notificaciones"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[15px] h-[15px] bg-accent text-white text-[9px] font-black flex items-center justify-center px-0.5 border-2 border-white">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Link>

              <Link
                to={isAuthenticated ? '/configuracion' : '/login'}
                className="hidden sm:flex w-10 h-10 items-center justify-center text-neutral-300 hover:bg-white/10 hover:text-white transition-colors"
                aria-label={isAuthenticated ? fullName || firstName : 'Iniciar sesión'}
                title={isAuthenticated ? fullName || firstName : 'Iniciar sesión'}
              >
                <CircleUserRound size={19} />
              </Link>

              <Link
                to="/carrito"
                className="relative w-10 h-10 flex items-center justify-center text-neutral-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                <ShoppingCart size={19} />
                {count > 0 && (
                  <span className="absolute top-1 right-1 min-w-[15px] h-[15px] bg-accent text-white text-[9px] font-black flex items-center justify-center px-0.5 border-2 border-white">
                    {count}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Fila de búsqueda — un solo diseño para cualquier tamaño de pantalla */}
        <div className="h-12 bg-neutral-900 border-b border-white/10 flex items-center px-4 lg:px-6">
          <form onSubmit={handleSearch} className="relative w-full max-w-3xl mx-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar productos, marcas, categorías..."
              className="w-full h-9 bg-superficie border border-white pl-4 pr-11 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-accent transition"
            />
            <button
              type="submit"
              aria-label="Buscar"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-white bg-accent hover:bg-accent-dark transition-colors"
            >
              <Search size={13} />
            </button>
          </form>
        </div>
      </div>

      {/* Menú de categorías */}
      <CategoryDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
