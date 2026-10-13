import { Link } from 'react-router-dom'
import { Instagram, Facebook, Youtube, Music2, MapPin, Phone, Mail } from 'lucide-react'
import { NEGOCIO, REDES_JEY } from '../../data/negocio'

// Duraciones fijas (no aleatorias) para que no cambien entre renders — igual que en su sitio
const RITMO = [0.9, 1.3, 0.7, 1.1, 0.8]

/** Barras de ecualizador que se mueven sin parar (las mismas del sitio de Jey Avila). */
function Ecualizador() {
  return (
    <span className="inline-flex items-end gap-[3px] h-5" aria-hidden="true">
      {RITMO.map((d, i) => (
        <span key={i} className="barra-eq h-full w-[3px] bg-accent" style={{ animationDuration: `${d}s`, animationDelay: `${-i * 0.17}s` }} />
      ))}
    </span>
  )
}

// lucide-react no trae el logo real de WhatsApp (su MessageCircle es una burbuja genérica,
// sin la silueta del teléfono) — mismo SVG que ya usa el footer del sitio-web.
function IconWhatsApp({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function IconTikTok({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0115.54 3h-3.09v12.4a2.592 2.592 0 01-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 004.3 1.38V7.3s-1.88.09-3.24-1.48z"/>
    </svg>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// Versión alterna del footer: mismo contenido (mismos links de información,
// mismas redes, mismo contacto, misma barra inferior), pero en un solo
// bloque centrado y apilado — logo/redes arriba, un único renglón de enlaces
// en línea, contacto debajo — en vez de la grilla de 3 columnas anterior.
// ══════════════════════════════════════════════════════════════════════════
const REDES = [
  { icon: Instagram, href: REDES_JEY.instagram, label: 'Instagram' },
  { icon: IconTikTok, href: REDES_JEY.tiktok, label: 'TikTok' },
  { icon: Youtube, href: REDES_JEY.youtube, label: 'YouTube' },
  { icon: Music2, href: REDES_JEY.spotify, label: 'Spotify' },
  { icon: Facebook, href: REDES_JEY.facebook, label: 'Facebook' },
  { icon: IconWhatsApp, href: NEGOCIO.whatsappUrl, label: 'WhatsApp' },
]

const INFO_LINKS = [
  { label: 'Política de cambios', to: '/cambios' },
  { label: 'Política de envíos', to: '/envios' },
  { label: 'Términos y condiciones', to: '/terminos' },
  { label: 'Política de privacidad', to: '/privacidad' },
]

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t-2 border-accent mt-16">
      <div className="max-w-5xl mx-auto px-6 py-14 flex flex-col items-center text-center">

        {/* Logo */}
        <img src="/logos/logo-blanco.png" alt="Jey Avila Music" width="800" height="334" className="h-16 w-auto mb-4" />

        {/* Tienda oficial, con el ecualizador en movimiento del sitio de Jey */}
        <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
          <Ecualizador /> Tienda oficial
        </p>

        {/* Redes oficiales de Jey */}
        <div className="flex items-center gap-2 mt-5">
          {REDES.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/20 flex items-center justify-center text-neutral-300 hover:bg-accent hover:border-accent hover:text-white transition-all"
              aria-label={label}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        {/* Enlaces de información, en un solo renglón */}
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-8 max-w-2xl">
          {INFO_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Contacto */}
        <div className="border border-white/10 px-6 py-4 mt-8 flex flex-col lg:flex-row items-center gap-3 lg:gap-6">
          <a
            href={NEGOCIO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors whitespace-nowrap flex-shrink-0"
          >
            <Phone size={14} className="text-accent flex-shrink-0" />{NEGOCIO.whatsappVisible}
          </a>
          <span className="hidden lg:block w-px h-4 bg-white/20" />
          <a href={`mailto:${NEGOCIO.email}`} className="flex items-center gap-2 whitespace-nowrap text-sm text-neutral-300 hover:text-white transition-colors">
            <Mail size={14} className="text-accent flex-shrink-0" />{NEGOCIO.email}
          </a>
          <span className="hidden lg:block w-px h-4 bg-white/20" />
          <p className="flex items-center gap-2 whitespace-nowrap text-sm text-neutral-300">
            <MapPin size={14} className="text-accent flex-shrink-0" />
            <span>{NEGOCIO.direccion}</span>
          </p>
          <span className="hidden lg:block w-px h-4 bg-white/20" />
          <p className="whitespace-nowrap text-sm text-neutral-300">
            <span className="text-neutral-500">Horario:</span> {NEGOCIO.horarioCorto}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-white text-black">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} Jey Avila Music. Todos los derechos reservados.</p>
          <p className="text-xs text-gray-600">Desarrollado por <a href="https://jaideravilastd.com" target="_blank" rel="noopener noreferrer" className="font-bold text-black hover:underline">Jaider Avila Studio</a></p>
          <div className="flex items-center gap-3">
            {['Nequi', 'PSE', 'Visa', 'Mastercard'].map((p) => (
              <span key={p} className="text-xs px-2 py-1 text-gray-500 font-medium">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
