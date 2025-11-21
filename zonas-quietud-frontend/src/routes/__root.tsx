import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Layout from '@/components/layouts/layout'
import { type ComponentType } from 'react'

const LayoutComponent = Layout as unknown as ComponentType<any>

const RootLayout = () => (
  <>
    <LayoutComponent>
      <main>
        <Outlet />
      </main>
    </LayoutComponent>
    <TanStackRouterDevtools />
  </>
)

export const Route = createRootRoute({ component: RootLayout });
