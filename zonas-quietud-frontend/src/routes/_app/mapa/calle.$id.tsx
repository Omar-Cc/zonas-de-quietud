import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/mapa/calle/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/mapa/calle/$id"!</div>
}
