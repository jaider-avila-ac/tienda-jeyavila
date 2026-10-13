import { fetchPublic } from './api'

function adaptBanner(b) {
  return {
    id:      b.id,
    tipo:    b.tipo,
    url:     b.url,
    titulo:  b.titulo,
    ctaLink: b.cta_link,
  }
}

// Los banners casi nunca cambian, así que no se piden en cada entrada a la portada:
//  - Se guarda la última copia en localStorage: en la siguiente visita se pinta al instante
//    (getBannersGuardados) sin esperar a la red.
//  - Se pide al servidor UNA sola vez por visita (getBanners memoriza la solicitud mientras la
//    página no se recargue), y ese resultado reemplaza la copia guardada. Si el admin cambió
//    algo, se ve en cuanto llega esa respuesta y queda guardado para la próxima visita.
const claveGuardado = (posicion) => `banners:v1:${posicion}`
const solicitudes = new Map()

export function getBannersGuardados(posicion) {
  try {
    const data = JSON.parse(localStorage.getItem(claveGuardado(posicion)))
    return Array.isArray(data) ? data : null
  } catch {
    return null
  }
}

function guardar(posicion, banners) {
  try {
    localStorage.setItem(claveGuardado(posicion), JSON.stringify(banners))
  } catch {
    // Sin almacenamiento disponible: simplemente no hay copia para la próxima visita
  }
}

export function getBanners(posicion) {
  if (!solicitudes.has(posicion)) {
    const solicitud = fetchPublic(`/banners?posicion=${posicion}`)
      .then((data) => {
        const banners = Array.isArray(data) ? data.map(adaptBanner) : []
        guardar(posicion, banners)
        return banners
      })
      .catch((err) => {
        solicitudes.delete(posicion) // si falló, la próxima vez se vuelve a intentar
        throw err
      })
    solicitudes.set(posicion, solicitud)
  }
  return solicitudes.get(posicion)
}
