import { Link } from 'react-router-dom'

/** Portada por defecto de la tienda cuando el panel no tiene banners cargados: Jey cantando, su
 *  firma y el mensaje de la tienda, con el negro y el rojo de su sitio web. Las fotos tienen .jpg
 *  de respaldo para Safari viejo (no muestra WebP). */
export default function HeroJey() {
  return (
    <section className="relative overflow-hidden bg-black border-b border-white/10">
      <img
        src="/img/perfil-cantando.webp"
        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/img/perfil-cantando.jpg' }}
        alt="Jey Avila cantando en tarima"
        width="1000" height="1500"
        fetchpriority="high"
        className="absolute inset-y-0 left-0 h-full w-full md:w-1/2 object-cover object-[50%_30%] opacity-60 md:opacity-100"
      />
      {/* La foto se funde con el negro hacia la derecha (y hacia abajo en celular) */}
      <div className="absolute inset-0 md:hidden bg-gradient-to-t from-black via-black/70 to-black/30" />
      <div className="absolute inset-y-0 left-0 hidden md:block w-1/2 bg-gradient-to-r from-transparent via-transparent to-black" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-6 min-h-[420px] sm:min-h-[460px] grid md:grid-cols-2 items-end md:items-center py-12">
        <div className="hidden md:block" />
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="text-center md:text-left">
            <img src="/logos/logo-blanco.png" alt="Jey Avila Music" width="800" height="334" className="h-24 sm:h-28 lg:h-32 w-auto mx-auto md:mx-0" />
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-neutral-300">Música · Fe · Propósito</p>
          </div>
          <div className="md:border-l-2 md:border-accent md:pl-8 text-center md:text-left">
            <p className="font-display text-sm sm:text-base font-bold uppercase leading-snug tracking-wide text-white">
              Lleva contigo<br />el mensaje de esperanza<br />en cada canción
            </p>
            <Link to="/catalogo" className="mt-5 inline-block bg-accent hover:bg-accent-dark text-white text-[11px] font-bold uppercase tracking-[0.2em] px-6 py-3 transition-colors">
              Ver productos
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
