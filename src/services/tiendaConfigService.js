import { fetchPublic } from './api'

export async function getTiendaConfig() {
  try {
    return await fetchPublic('/tienda/config')
  } catch {
    return null
  }
}
