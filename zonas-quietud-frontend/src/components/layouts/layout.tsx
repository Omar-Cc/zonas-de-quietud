import { Outlet } from "@tanstack/react-router"
import { Navbar } from "./navbar/navbar"
import { Footer } from "./footer"

function Layout() {

  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout