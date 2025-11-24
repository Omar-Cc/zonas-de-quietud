import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { type Notification } from '../types'

interface NotificationItemProps {
  notification: Notification
}

export function NotificationItem({
  notification,
}: Readonly<NotificationItemProps>) {
  return (
    <Card
      className={cn(
        'flex items-center gap-4 p-4 transition-transform hover:scale-[1.01]',
        notification.unread ? 'border-primary/10 ring-primary/20 ring-2' : ''
      )}
    >
      <div className="flex w-full items-start gap-3">
        <Avatar>
          {notification.avatar ? (
            <AvatarImage src={notification.avatar} />
          ) : (
            <AvatarFallback>{notification.title.charAt(0)}</AvatarFallback>
          )}
        </Avatar>

        <div className="flex w-full flex-col">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="font-semibold">{notification.title}</h3>
              <p className="text-muted-foreground text-sm">
                {notification.message}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-xs">
                {notification.time}
              </span>
              {notification.unread && (
                <Badge className="bg-rose-500/90">Nuevo</Badge>
              )}
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <Button variant="outline" size="sm">
              Marcar leído
            </Button>
            <Button variant="ghost" size="sm">
              Ver
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
