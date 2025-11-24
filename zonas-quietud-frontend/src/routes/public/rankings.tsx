import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/public/rankings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/public/rankings"!</div>
}
