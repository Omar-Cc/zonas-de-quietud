import { NotificationItem } from './NotificationItem'
import { type Notification } from '../types'

interface NotificationListProps {
  notifications: Notification[]
}

export function NotificationList({
  notifications,
}: Readonly<NotificationListProps>) {
  return (
    <div className="space-y-3">
      {notifications.map((n) => (
        <NotificationItem key={n.id} notification={n} />
      ))}
    </div>
  )
}
