import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Package } from 'lucide-react'
import { useOrders } from '../../../context/OrdersContext'
import OrderCard from '../components/OrderCard'

export default function MisComprasPage() {
  const { orders, loading, reload } = useOrders()

  // Siempre recarga al entrar a la página — evita mostrar un estado desactualizado
  // cuando el cliente llega aquí desde una notificación de "cambió de estado".
  useEffect(() => {
    reload()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center text-sm text-neutral-500">
        Cargando tus compras…
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-6">
        <h1 className="text-2xl font-black text-white mb-8">Mis compras</h1>
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-superficie-2 flex items-center justify-center mx-auto mb-5">
            <Package size={32} className="text-neutral-600" />
          </div>
          <h2 className="text-lg font-black text-white">Aún no tienes pedidos</h2>
          <p className="text-neutral-500 text-sm mt-2 mb-6">Cuando realices una compra aparecerá aquí</p>
          <Link to="/" className="btn-primary inline-flex">Ir a la tienda</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 pb-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-white">Mis compras</h1>
        <span className="text-sm text-neutral-500">
          {orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'}
        </span>
      </div>
      <div className="max-w-2xl space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}
