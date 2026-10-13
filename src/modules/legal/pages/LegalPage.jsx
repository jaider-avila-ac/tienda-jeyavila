import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { getLegalDoc } from '../legalContent'
import { getTiendaConfig } from '../../../services/tiendaConfigService'
import { NEGOCIO } from '../../../data/negocio'
import { applyPageSeo } from '../../../utils/seo'

const OTROS = [
  { slug: 'terminos', label: 'Términos y condiciones' },
  { slug: 'privacidad', label: 'Política de privacidad' },
  { slug: 'envios', label: 'Política de envíos' },
  { slug: 'cambios', label: 'Política de cambios y devoluciones' },
]

export default function LegalPage({ slug }) {
  // Solo la política de envíos depende de un dato que cambia desde el panel (el mínimo de
  // envío gratis); mientras carga, o si falla, se muestra el texto sin monto en vez de
  // inventar uno.
  const [ctx, setCtx] = useState({})

  useEffect(() => {
    if (slug !== 'envios') return
    let alive = true
    getTiendaConfig().then((cfg) => {
      if (!alive || !cfg) return
      setCtx({ envioGratisActivo: cfg.envio_gratis_activo, envioGratisDesde: cfg.envio_gratis_desde })
    })
    return () => { alive = false }
  }, [slug])

  const doc = getLegalDoc(slug, ctx)

  useEffect(() => {
    if (doc) {
      applyPageSeo({ title: `${doc.titulo} | ${NEGOCIO.nombre}`, description: doc.descripcion, path: `/${slug}` })
    }
  }, [doc, slug])

  if (!doc) return null

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 pb-16">
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 flex-wrap">
        <Link to="/" className="hover:text-black transition-colors">Inicio</Link>
        <ChevronRight size={11} />
        <span className="text-gray-600">{doc.titulo}</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-black text-black">{doc.titulo}</h1>
      <p className="text-xs text-gray-400 mt-1">Última actualización: {NEGOCIO.actualizado}</p>

      <div className="mt-8 space-y-7">
        {doc.secciones.map((s) => (
          <section key={s.titulo}>
            <h2 className="text-base font-bold text-black mb-2">{s.titulo}</h2>
            {s.parrafos?.map((p) => (
              <p key={p} className="text-sm text-gray-600 leading-relaxed mb-2">{p}</p>
            ))}
            {s.items && (
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600 leading-relaxed">
                {s.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            )}
          </section>
        ))}
      </div>

      <div className="mt-12 pt-6 border-t border-gray-100">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Otras políticas</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {OTROS.filter((o) => o.slug !== slug).map((o) => (
            <Link key={o.slug} to={`/${o.slug}`} className="text-sm text-gray-600 hover:text-accent transition-colors">
              {o.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
