import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function StoreLayout() {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen bg-aux">
      <Navbar />
      {/* key en pathname para que la animación se dispare al cambiar de ruta (no en filtros) */}
      {/* Header unificado: fila principal(64px) + búsqueda(48px) = 112px,
          igual en mobile y desktop (antes había una altura distinta por breakpoint). */}
      <main className="pt-[112px] max-w-[1920px] w-full mx-auto">
        {/* La portada no lleva la animación de entrada: su hero es position:fixed y una ancestra
            con transform/opacity animados lo desplaza y lo desvanece mientras dura, y luego salta
            a su lugar (se veía como un parpadeo del banner, con el navbar y el footer quietos). */}
        <div key={pathname} className={pathname === '/' ? undefined : 'page-in'}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
