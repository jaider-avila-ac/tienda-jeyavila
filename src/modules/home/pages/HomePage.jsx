import { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Flame, Clock, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import ProductCard from '../../../components/ui/ProductCard'
import { getProducts, subscribeProducts } from '../../../services/productService'
import { getActiveCategories } from '../../../services/categoryService'
import { getRecientes, getCategoriaFavorita, pruneRecientes } from '../../../services/recentService'
import { getRecientesDB, getCategoriaFavoritaDB } from '../../../services/eventoService'
import { tokenStore } from '../../../services/tokenStore'
import { getBanners, getBannersGuardados } from '../../../services/bannerService'
import { useBackendOnline } from '../../../hooks/useBackendOnline'
import CollectionsGrid from '../components/CollectionsGrid'
import HeroJey from '../components/HeroJey'
import LlamadoJey from '../components/LlamadoJey'
import { applyPageSeo } from '../../../utils/seo'

/** Encabezado de cada sección de la portada: título en mayúsculas (tipografía del sitio de Jey)
 *  con una barra roja, y el enlace "Ver todos" a la derecha. */
function TituloSeccion({ children, icono, to, verTodo = 'Ver todos' }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5">
      <h2 className="flex items-center gap-3 font-display text-sm sm:text-base font-black uppercase tracking-wide text-white">
        <span className="w-1 h-5 bg-accent" aria-hidden="true" />
        {icono}
        {children}
      </h2>
      {to && (
        <Link to={to} className="flex-shrink-0 text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 hover:text-white transition-colors flex items-center gap-1">
          {verTodo} <ArrowRight size={12} />
        </Link>
      )}
    </div>
  )
}

function BannerHero({ banners }) {
  const slides = banners
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  const startTimer = () => {
    clearInterval(timerRef.current)
    if (slides.length <= 1) return
    timerRef.current = setInterval(() => {
      setCurrent((i) => (i + 1) % slides.length)
    }, 4500)
  }

  useEffect(() => {
    setCurrent(0)
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [slides.length])

  if (slides.length === 0) return null

  const go = (idx) => { setCurrent(idx); startTimer() }
  const prev = () => go((current - 1 + slides.length) % slides.length)
  const next = () => go((current + 1) % slides.length)

  return (
    <div className="relative w-full h-full overflow-hidden">
      {slides.map(({ tipo, url, ctaLink }, i) => {
        const offset = (i - current + slides.length) % slides.length
        const x = offset === 0 ? 0 : offset === slides.length - 1 ? -100 : 100

        const mediaEl = tipo === 'video' ? (
          <video src={url} className="w-full h-full object-cover" autoPlay muted loop playsInline />
        ) : (
          <img src={url} alt={`Banner ${i + 1}`} className="w-full h-full object-cover" draggable={false}
            fetchpriority={i === 0 ? 'high' : undefined} />
        )

        // Enlace externo (http/https/wa.me/etc) → <a target="_blank">
        // Enlace interno (empieza con /) → <Link>
        const isExternal = ctaLink && /^https?:\/\//i.test(ctaLink)
        const wrapped = ctaLink
          ? isExternal
            ? <a href={ctaLink} target="_blank" rel="noopener noreferrer" className="block w-full h-full">{mediaEl}</a>
            : <Link to={ctaLink} className="block w-full h-full">{mediaEl}</Link>
          : mediaEl

        return (
          <div key={i} className="absolute inset-0 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${x}%)` }}>
            {wrapped}
          </div>
        )
      })}

      {slides.length > 1 && (
        <>
          <button onClick={prev} aria-label="Anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 bg-black/40 hover:bg-black/65 backdrop-blur-sm flex items-center justify-center text-white transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button onClick={next} aria-label="Siguiente"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 bg-black/40 hover:bg-black/65 backdrop-blur-sm flex items-center justify-center text-white transition-colors">
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button key={i} onClick={() => go(i)} aria-label={`Ir al banner ${i + 1}`}
                className={`transition-all duration-300 ${
                  i === current ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                }`} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════ */

export default function HomePage() {
  useEffect(() => {
    applyPageSeo({
      title: 'Jey Avila Music | Tienda oficial',
      description: 'Tienda oficial de Jey Avila, cantante de champeta de Córdoba, Colombia. Productos oficiales con envíos a todo Colombia.',
      path: '/',
    })
  }, [])

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [recientes, setRecientes] = useState([])
  const [catFavorita, setCatFavorita] = useState(null)
  // Con una copia guardada de una visita anterior, la portada se pinta ya (sin spinner) y los
  // banners se refrescan en segundo plano (ver bannerService).
  const [heroBanners, setHeroBanners] = useState(() => getBannersGuardados('hero') ?? [])
  const [heroLoading, setHeroLoading] = useState(() => getBannersGuardados('hero') === null)
  const [hideHero, setHideHero] = useState(false)
  const heroBoxRef = useRef(null)
  const contentEndRef = useRef(null)
  const backendOnline = useBackendOnline()
  // true mientras "recientes" venga de getRecientesDB (ya validado en el servidor, en vivo) —
  // así el efecto de abajo no lo pisa con la versión podada localmente, que es solo el fallback.
  const recientesDeDbRef = useRef(false)

  useEffect(() => {
    // Si el refresco en segundo plano trae datos nuevos, se reflejan solos sin recargar.
    const unsubscribe = subscribeProducts((data) => setProducts(Array.isArray(data) ? data : []))

    getProducts().then((data) => {
      setProducts(Array.isArray(data) ? data : [])
    }).catch(() => {})

    getActiveCategories().then(setCategories).catch(() => {})
    // Solo reemplaza si de verdad cambió algo, para no reiniciar el carrusel sin motivo.
    getBanners('hero')
      .then((frescos) => setHeroBanners((actuales) => (
        JSON.stringify(actuales) === JSON.stringify(frescos) ? actuales : frescos
      )))
      .catch(() => {})
      .finally(() => setHeroLoading(false))

    if (tokenStore.isLoggedIn()) {
      getRecientesDB(8).then((dbData) => {
        if (Array.isArray(dbData) && dbData.length > 0) {
          recientesDeDbRef.current = true
          setRecientes(dbData)
        }
      })
      getCategoriaFavoritaDB().then((catFav) => {
        setCatFavorita(catFav || getCategoriaFavorita())
      })
    } else {
      setCatFavorita(getCategoriaFavorita())
    }

    return unsubscribe
  }, [])

  // "products" llega primero desde el caché local (localStorage, puede estar desactualizado) y
  // luego otra vez con el catálogo fresco del servidor (refresco en 2do plano, vía
  // subscribeProducts) — antes esta poda solo corría una vez con la primera versión, así que un
  // producto borrado/desactivado después de haberse visto quedaba "fantasma" en Vistos
  // recientemente hasta que se refrescaba la página. Recalcular cada vez que products cambia
  // cubre ambas pasadas (caché vieja y catálogo fresco) sin ese hueco.
  useEffect(() => {
    if (!products.length || recientesDeDbRef.current) return
    const validIds = new Set(products.filter((p) => p.activo).map((p) => p.id))
    setRecientes(pruneRecientes(validIds).slice(0, 8))
  }, [products])

  // El hero fijo no debe pintarse por encima del footer: en cuanto el final del contenido de
  // la portada (contentEndRef, justo antes de que empiece el footer) sube hasta tocar el borde
  // inferior del hero, se oculta — a partir de ahí ya no queda nada opaco que lo tape y lo que
  // se vería detrás es el footer.
  useEffect(() => {
    if (!heroBanners.length) return
    const check = () => {
      const heroEl = heroBoxRef.current
      const endEl = contentEndRef.current
      if (!heroEl || !endEl) return
      setHideHero(endEl.getBoundingClientRect().top <= heroEl.getBoundingClientRect().bottom)
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [heroBanners.length])

  // Si el backend no responde, no hay forma de confirmar que el caché local sigue vigente
  // (productos pudieron cambiar de precio/stock/estado) — mejor no mostrar nada a mostrar
  // datos posiblemente desactualizados como si fueran en vivo.
  const activeProducts = backendOnline ? products.filter((p) => p.activo) : []
  const vendidos = activeProducts.filter((p) => p.etiquetas.includes('mas-vendido')).slice(0, 4)
  const nuevos = activeProducts.filter((p) => p.etiquetas.includes('nuevo')).slice(0, 4)
  // Productos destacados: no dependen de ninguna etiqueta, así siempre hay contenido que mostrar
  // aunque no existan productos marcados "mas-vendido".
  const destacados = activeProducts.slice(0, 8)

  // Categoría favorita al frente; el resto en su orden original
  const sortedCategories = useMemo(() => {
    if (!catFavorita) return categories
    return [...categories].sort((a, b) => {
      if (a.id === catFavorita.id) return -1
      if (b.id === catFavorita.id) return 1
      return 0
    })
  }, [categories, catFavorita])

  if (heroLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 min-h-[70vh] text-neutral-500 text-sm">
        <Loader2 size={28} className="animate-spin" />
      </div>
    )
  }

  // El hero de banners queda fijo bajo el navbar (top: 112px, altura de Navbar — ver
  // StoreLayout.jsx) mientras el resto del contenido, en flujo normal, pasa por encima al
  // hacer scroll: el div de abajo reserva ese mismo alto con marginTop y lleva su propio
  // fondo opaco (bg-aux) + z-index mayor, así lo va tapando desde abajo a medida que sube.
  // Altura como % del ancho (no vh) para mantener la misma proporción que antes (aspect-[16/6]).
  const hasHero = heroBanners.length > 0
  const HERO_H = 'min(45vw, 540px)'

  return (
    <div className="pb-16">

      {/* ── Portada de Jey cuando el panel no tiene banners cargados ── */}
      {!hasHero && <HeroJey />}

      {/* ── Hero de banners: fijo bajo el navbar ── */}
      {hasHero && (
        <div
          ref={heroBoxRef}
          className={`fixed left-1/2 -translate-x-1/2 w-full max-w-[1920px] z-0 overflow-hidden ${hideHero ? 'invisible' : ''}`}
          style={{ top: 112, height: HERO_H }}
        >
          <BannerHero banners={heroBanners} />
        </div>
      )}

      <div
        className={hasHero ? 'relative z-10 bg-aux' : undefined}
        style={hasHero ? { marginTop: HERO_H } : undefined}
      >

      {!backendOnline && (
        <div className="max-w-7xl mx-auto px-4 pt-10">
          <p className="text-sm text-neutral-400 text-center bg-superficie-2 py-4">
            No pudimos conectar con el servidor. Verifica tu conexión e intenta de nuevo.
          </p>
        </div>
      )}

      {/* ── Productos destacados (no dependen de etiquetas) ── */}
      {destacados.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pt-10">
          <TituloSeccion to="/catalogo">Productos destacados</TituloSeccion>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {destacados.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* ── Más vendidos ── */}
      {vendidos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pt-10">
          <TituloSeccion to="/catalogo" icono={<Flame size={16} className="text-accent" />}>Más vendidos</TituloSeccion>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {vendidos.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* ── Secciones por categoría (ordenadas por actividad del usuario) ── */}
      {sortedCategories.map((cat) => {
        const productos = activeProducts.filter((p) => p.categoriaId === cat.id).slice(0, 4)
        if (productos.length === 0) return null
        return (
          <section key={cat.id} className="max-w-7xl mx-auto px-4 pt-10">
            <TituloSeccion to={`/catalogo?categoria=${cat.id}`} verTodo="Ver todo">{cat.nombre}</TituloSeccion>
            {cat.subcategorias.length > 0 && (
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar mb-3 pb-0.5">
                {cat.subcategorias.map((sub) => (
                  <Link key={sub}
                    to={`/catalogo?categoria=${cat.id}&subcategoria=${encodeURIComponent(sub)}`}
                    className="flex-shrink-0 text-[11px] font-medium text-neutral-400 hover:text-white border border-white/15 hover:border-accent px-2.5 py-1 transition-colors">
                    {sub}
                  </Link>
                ))}
              </div>
            )}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {productos.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )
      })}

      {/* ── Colecciones — nunca pegada al carrusel ni al final de la página ── */}
      <CollectionsGrid />

      {/* ── Nuevos ingresos ── */}
      {nuevos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pt-10">
          <TituloSeccion to="/catalogo?etiqueta=nuevo">Nuevos ingresos</TituloSeccion>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {nuevos.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* ── Vistos recientemente ── */}
      {recientes.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pt-10">
          <TituloSeccion icono={<Clock size={16} className="text-neutral-400" />}>Vistos recientemente</TituloSeccion>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {recientes.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* ── Cierre: "Más que música, es un llamado" + WhatsApp ── */}
      <LlamadoJey />

      {hasHero && <div ref={contentEndRef} />}
      </div>
    </div>
  )
}
