import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function NotificationFilters() {
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Filtrar</CardTitle>
        <CardDescription>
          Mostrar solo notificaciones importantes o no leídas.
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-1">
        <div className="flex flex-col gap-2">
          <Button variant="outline" size="sm">
            No leídas
          </Button>
          <Button variant="outline" size="sm">
            Incidencias
          </Button>
          <Button variant="outline" size="sm">
            Comunidad
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
