import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'

interface NotificationSummaryProps {
  totalNotifications: number
  unreadCount: number
}

export function NotificationSummary({
  totalNotifications,
  unreadCount,
}: Readonly<NotificationSummaryProps>) {
  return (
    <Card className="bg-linear-to-tr from-white/60 to-white/20 p-4">
      <CardHeader>
        <CardTitle>Resumen semanal</CardTitle>
        <CardDescription>Resumen rápido de actividad reciente</CardDescription>
      </CardHeader>

      <CardContent className="mt-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm">Reportes</p>
            <p className="text-lg font-semibold">{totalNotifications}</p>
          </div>
          <div>
            <p className="text-sm">Pendientes</p>
            <p className="text-lg font-semibold">{unreadCount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
