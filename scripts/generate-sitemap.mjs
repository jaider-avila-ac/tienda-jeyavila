// Genera public/sitemap.xml antes de cada build: páginas fijas + un URL por producto activo,
// con el slug (la misma URL canónica que usa el sitio: /producto/<slug>).
//
// Corre dentro de `npm run build` (y por lo tanto en el deploy de GitHub Actions a Hostinger),
// así que la lista de productos se actualiza en cada deploy. Si la API no responde NO se rompe
// el build: se genera el sitemap solo con las páginas fijas y se avisa por consola.
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadEnv } from 'vite'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const env = { ...loadEnv('production', raiz, 'VITE_'), ...process.env }

const sitio = String(env.VITE_PUBLIC_SITE_URL || '').replace(/\/+$/, '')
const api = String(env.VITE_API_URL || '').replace(/\/+$/, '')
const tenant = env.VITE_TENANT_ID

if (!tenant) {
  console.warn('[sitemap] Falta VITE_TENANT_ID: no se genera sitemap.')
  process.exit(0)
}
if (!sitio) {
  console.warn('[sitemap] Falta VITE_PUBLIC_SITE_URL: no se genera sitemap (un sitemap necesita el dominio real).')
  process.exit(0)
}

const escapar = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

async function slugsDeProductos() {
  if (!api) throw new Error('falta VITE_API_URL')
  const res = await fetch(`${api}/api/v1/public/productos`, {
    headers: { 'X-Tenant-Id': String(tenant) },
    signal: AbortSignal.timeout(20000),
  })
  if (!res.ok) throw new Error(`la API respondió ${res.status}`)
  const data = await res.json()
  if (!Array.isArray(data)) throw new Error('respuesta inesperada de la API')
  return data
    .filter((p) => p.activo !== false)
    .map((p) => p.slug || String(p.id))
}

const hoy = new Date().toISOString().slice(0, 10)
const paginas = [
  { ruta: '/', lastmod: hoy },
  { ruta: '/catalogo', lastmod: hoy },
  { ruta: '/envios' },
  { ruta: '/cambios' },
  { ruta: '/terminos' },
  { ruta: '/privacidad' },
]

let productos = []
try {
  productos = await slugsDeProductos()
} catch (err) {
  console.warn(`[sitemap] No se pudieron leer los productos (${err.message}). Se genera solo con las páginas fijas.`)
}

const urls = [
  ...paginas.map((p) => ({ loc: `${sitio}${p.ruta}`, lastmod: p.lastmod })),
  ...productos.map((slug) => ({ loc: `${sitio}/producto/${encodeURIComponent(slug)}` })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url>\n    <loc>${escapar(u.loc)}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}\n  </url>`)
  .join('\n')}
</urlset>
`

const destino = resolve(raiz, 'public', 'sitemap.xml')
mkdirSync(dirname(destino), { recursive: true })
writeFileSync(destino, xml)
console.log(`[sitemap] ${urls.length} URLs (${productos.length} productos) -> public/sitemap.xml`)
