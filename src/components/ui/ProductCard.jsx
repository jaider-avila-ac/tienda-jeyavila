import { Link, useNavigate } from 'react-router-dom'
import { Star, Heart } from 'lucide-react'
import { fmt } from '../../utils/format'
import { useAuth } from '../../context/AuthContext'
import { useWishlist } from '../../context/WishlistContext'
import { useInViewOnce } from '../../hooks/useInViewOnce'

// ══════════════════════════════════════════════════════════════════════════
// Tarjeta de producto de la tienda de Jey Avila: la foto sobre fondo blanco (así se ven las
// fotos de producto, que vienen con fondo blanco) y la información en un bloque oscuro, con el
// nombre en mayúsculas, el precio grande y un botón rojo a lo ancho. El botón lleva a la página
// del producto, donde se elige talla/color antes de agregar al carrito.
// ══════════════════════════════════════════════════════════════════════════
export default function ProductCard({ product }) {
  const { id, slug, nombre, marca, imagenes, precio, precioFinal, descuento, etiquetas, tallas, ratingPromedio, totalResenas } = product
  const finalPrice = precioFinal ?? precio
  // URL "bonita" con el slug (ej. /producto/gorra-jey-avila) en vez del id numérico — el backend
  // acepta ambos (ver PublicCatalogService.getProductoByIdOrSlug), así que un producto sin slug
  // todavía (no debería pasar, es NOT NULL) simplemente cae al id.
  const href = `/producto/${slug || id}`
  const isNew = etiquetas?.includes('nuevo')
  const hasStock = tallas?.some((t) => t.stock > 0) ?? true
  const tieneResenas = Boolean(totalResenas > 0)

  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { isFavorito, toggle } = useWishlist()
  const favorito = isFavorito(id)
  const [inViewRef, inView] = useInViewOnce()

  const handleFavorito = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isAuthenticated) {
      navigate('/login', { state: { from: href } })
      return
    }
    toggle(id)
  }

  return (
    <Link
      ref={inViewRef}
      to={href}
      className={`group flex flex-col h-full bg-superficie border border-white/10 overflow-hidden hover:border-accent transition-[border-color,opacity,transform] duration-500 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Imagen, sobre blanco */}
      <div className="relative aspect-square bg-white overflow-hidden">
        <img
          src={imagenes?.[0]?.url ?? imagenes?.[0] ?? 'https://placehold.co/300x300/ffffff/0b0b0b?text=Jey+Avila+Music'}
          alt={nombre}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${hasStock ? '' : 'opacity-60'}`}
          loading="lazy"
        />

        {(descuento > 0 || isNew) && (
          <span className="absolute top-2.5 left-2.5 bg-accent text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1">
            {descuento > 0 ? `Promoción -${descuento}%` : 'Nuevo'}
          </span>
        )}

        <button
          onClick={handleFavorito}
          aria-label={favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          className="absolute top-2.5 right-2.5 w-8 h-8 bg-black/80 flex items-center justify-center hover:bg-accent transition-colors"
        >
          <Heart size={13} className={favorito ? 'text-white fill-white' : 'text-white'} />
        </button>

        {!hasStock && (
          <span className="absolute bottom-0 inset-x-0 bg-black/85 text-white text-[10px] font-bold uppercase tracking-[0.2em] text-center py-1.5">
            Agotado
          </span>
        )}
      </div>

      {/* Información, en oscuro */}
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <h3 className="font-display text-xs sm:text-sm font-bold uppercase leading-snug text-white line-clamp-2">
          {nombre}
        </h3>
        <p className="mt-1 text-[11px] text-neutral-400 truncate min-h-[16px]">{marca}</p>

        {tieneResenas && (
          <div className="flex items-center gap-1 mt-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                size={9}
                className={n <= Math.round(ratingPromedio) ? 'text-amber-400 fill-amber-400' : 'text-neutral-700 fill-neutral-700'}
              />
            ))}
            <span className="text-[10px] text-neutral-500 ml-0.5">({totalResenas})</span>
          </div>
        )}

        <div className="mt-auto pt-3">
          {descuento > 0 && <p className="text-[11px] text-neutral-500 line-through">{fmt(precio)}</p>}
          <p className="text-base sm:text-lg font-black text-white leading-none">
            {fmt(finalPrice)} <span className="text-[10px] font-semibold text-neutral-400">COP</span>
          </p>
          <span className={`mt-3 block py-2.5 text-center text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] transition-colors ${
            hasStock ? 'bg-accent text-white group-hover:bg-accent-dark' : 'bg-white/10 text-neutral-400'
          }`}>
            {hasStock ? 'Comprar' : 'Agotado'}
          </span>
        </div>
      </div>
    </Link>
  )
}
