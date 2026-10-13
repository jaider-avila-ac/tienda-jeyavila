import { BellOff, CheckCheck } from 'lucide-react'
import { useNotifications } from '../../../context/NotificationsContext'
import NotificationItem from '../components/NotificationItem'

export default function NotificationsPage() {
  const { items, unreadCount: unread, markRead, markAllRead, deleteNotification } = useNotifications()

  const handleMarkRead = (id) => markRead(id)
  const handleMarkAll = () => markAllRead()
  const handleDelete = (id) => deleteNotification(id)

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 pb-16">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Notificaciones</h1>
          {unread > 0 && (
            <p className="text-xs text-neutral-500 mt-0.5">{unread} sin leer</p>
          )}
        </div>
        {unread > 0 && (
          <button
            onClick={handleMarkAll}
            className="flex items-center gap-1.5 text-xs font-semibold text-white hover:underline"
          >
            <CheckCheck size={14} /> Marcar todas como leídas
          </button>
        )}
      </div>

      {items.length === 0 && (
        <div className="bg-superficie border border-white/10 p-16 text-center">
          <div className="w-16 h-16 bg-superficie-2 flex items-center justify-center mx-auto mb-4">
            <BellOff size={28} className="text-neutral-600" />
          </div>
          <p className="text-base font-black text-white mb-1">Sin notificaciones</p>
          <p className="text-sm text-neutral-500">
            Aquí aparecerán las actualizaciones de tus pedidos y novedades de la tienda.
          </p>
        </div>
      )}

      {items.length > 0 && (
        <div className="max-w-2xl space-y-2">
          {items.map((n) => (
            <NotificationItem
              key={n.id}
              notif={n}
              onMarkRead={handleMarkRead}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
