const SITE_URL = import.meta.env.VITE_PUBLIC_SITE_URL

export function siteOrigin() {
  const fallback = typeof window !== 'undefined' ? window.location.origin : ''
  return String(SITE_URL || fallback).replace(/\/$/, '')
}

export function absoluteUrl(value) {
  if (!value) return ''
  try {
    return new URL(value, `${siteOrigin()}/`).href
  } catch {
    return String(value)
  }
}

export function setMetaTag(name, content, attr = 'name') {
  if (!content || typeof document === 'undefined') return
  let tag = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

export function setCanonical(url) {
  if (!url || typeof document === 'undefined') return
  let tag = document.head.querySelector('link[rel="canonical"]')
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', 'canonical')
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', url)
}

const IMAGEN_POR_DEFECTO = '/og-jey-avila-tienda.jpg'

// Metadata de una página que no es de producto (la de producto arma la suya, ver
// ProductDetailPage.productSeoData). Siempre deja og:type/og:image en su valor por defecto para
// no arrastrar los de un producto visto antes al navegar dentro de la SPA.
export function applyPageSeo({ title, description, path = '/', image = IMAGEN_POR_DEFECTO }) {
  if (typeof document === 'undefined') return
  const url = absoluteUrl(path)
  const img = absoluteUrl(image)
  document.title = title
  setMetaTag('description', description)
  setCanonical(url)
  setMetaTag('og:title', title, 'property')
  setMetaTag('og:description', description, 'property')
  setMetaTag('og:type', 'website', 'property')
  setMetaTag('og:url', url, 'property')
  setMetaTag('og:image', img, 'property')
  setMetaTag('twitter:title', title)
  setMetaTag('twitter:description', description)
  setMetaTag('twitter:image', img)
}

export function upsertJsonLd(id, data) {
  if (!data || typeof document === 'undefined') return
  let script = document.getElementById(id)
  if (!script) {
    script = document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(data)
}

export function removeJsonLd(id) {
  if (typeof document === 'undefined') return
  document.getElementById(id)?.remove()
}
