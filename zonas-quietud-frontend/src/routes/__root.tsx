import Layout from "@/components/layouts/layout";
import { createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
  <>
    <Layout />
    <TanStackRouterDevtools />
  </>
)

export const Route = createRootRoute({ component: RootLayout });
