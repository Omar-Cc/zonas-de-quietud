# ESTRUCTURA DEL PROYECTO

El proyecto esta estructurado siguiendo el patrón de arquitectura Vertical Slices. Recordemos que este frontend es tonto (no tiene lógica de negocio) y solo se encarga de mostrar la interfaz y de redirigir a los usuarios a las rutas correctas.

```
src
│   index.css
│   main.tsx
│   routeTree.gen.ts
│
├───api
│       apiClient.ts
│       queryClient.ts
│
├───assets
│   │   Fondo.png
│   │   zonas_quietud_h.webp
│   │   zonas_quietud_h_120x40.png
│   │   zonas_quietud_icon.webp
│   │   zonas_quietud_icon_v2.webp
│   │   zonas_quietud_v.webp
│   │
│   ├───fonts
│   ├───icons
│   └───images
├───components
│   │   achievementBadge.tsx
│   │   chartVisualization.tsx
│   │   contributionDialog.tsx
│   │   filterSidebar.tsx
│   │   heatmapVisualization.tsx
│   │   mapLegend.tsx
│   │   pricingCard.tsx
│   │   radarChart.tsx
│   │   ratingVisualization.tsx
│   │
│   ├───layouts
│   │   │   footer.tsx
│   │   │   layout.tsx
│   │   │
│   │   ├───navbar
│   │   │       mainNavbar.tsx
│   │   │       navbar.tsx
│   │   │       quickAccessBar.tsx
│   │   │       searchBar.tsx
│   │   │       searchDialog.tsx
│   │   │       topBar.tsx
│   │   │
│   │   └───sidebar
│   ├───shared
│   │       DataTable.tsx
│   │       EmptyState.tsx
│   │       Loader.tsx
│   │       StatusBadge.tsx
│   │
│   └───ui
│           accordion.tsx
│           avatar.tsx
│           badge.tsx
│           button.tsx
│           card.tsx
│           chart.tsx
│           dialog.tsx
│           dropdown-menu.tsx
│           input.tsx
│           label.tsx
│           progress.tsx
│           scroll-area.tsx
│           select.tsx
│           separator.tsx
│           sheet.tsx
│           slider.tsx
│           sonner.tsx
│           switch.tsx
│           tabs.tsx
│           textarea.tsx
│
├───config
│       apiRoutes.ts
│       constants.ts
│       firebase.ts
│
├───features
│   ├───auth
│   │   │   index.ts
│   │   │
│   │   ├───api
│   │   ├───components
│   │   ├───context
│   │   │       AuthContext.tsx
│   │   │
│   │   ├───hooks
│   │   ├───schemas
│   │   ├───services
│   │   │       auth.service.ts
│   │   │
│   │   └───types
│   ├───incidents
│   │   │   index.ts
│   │   │
│   │   ├───api
│   │   ├───components
│   │   │       incidentReportForm.tsx
│   │   │
│   │   ├───context
│   │   ├───hooks
│   │   ├───schemas
│   │   ├───services
│   │   └───types
│   ├───map
│   │   │   index.ts
│   │   │
│   │   ├───api
│   │   ├───components
│   │   │       mapVisualization.tsx
│   │   │       streetPopup.tsx
│   │   │
│   │   ├───context
│   │   ├───hooks
│   │   ├───hooks copy
│   │   ├───schemas
│   │   ├───services
│   │   ├───store
│   │   └───types
│   └───ratings
│       │   index.ts
│       │
│       ├───api
│       ├───components
│       │       ratingForm.tsx
│       │       starRating.tsx
│       │
│       ├───context
│       ├───hooks
│       ├───hooks copy
│       ├───schemas
│       ├───services
│       └───types
├───hooks
│       useAuth.ts
│
├───lib
│       formatters.ts
│       utils.ts
│       validators.ts
│
├───pages
│       ayudaPage.tsx
│       calificacionesPage.tsx
│       comunidadPage.tsx
│       configuracionPage.tsx
│       detalleCallesPage.tsx
│       homePage.tsx
│       loginPage.tsx
│       mapaPage.tsx
│       miDashboardPage.tsx
│       notificacionesPage.tsx
│       planesPage.tsx
│       recursosPage.tsx
│       registerPage.tsx
│       reportesPage.tsx
│       zonasInteresPage.tsx
│
├───routes
│   │   index.tsx
│   │   login.tsx
│   │   register.tsx
│   │   __root.tsx
│   │
│   └───app
│           ayuda.tsx
│           calificaciones.tsx
│           comunidad.tsx
│           configuracion.tsx
│           detallesCalles.tsx
│           mapa.tsx
│           miDashboard.tsx
│           notificaciones.tsx
│           planes.tsx
│           recursos.tsx
│           reportes.tsx
│           zonasInteres.tsx
│
└───store
```

## GUIA DE USO

```
src
│   main.tsx                <-- Punto de entrada (Providers, QueryClient)
│   index.css               <-- Tailwind imports
│   routeTree.gen.ts        <-- Auto-generado por TanStack Router
│   vite-env.d.ts
│
├───api                     <-- Configuración HTTP Global
│       axiosClient.ts      <-- Instancia base de Axios (interceptors, baseURL)
│       queryClient.ts      <-- Configuración del QueryClient
│
├───assets                  <-- Archivos estáticos
│   ├───fonts
│   ├───images              <-- Fondo.png, logos
│   └───icons               <-- SVGs personalizados (si no usas Lucide)
│
├───components              <-- "Shared Kernel" (UI Genérica y Layouts)
│   ├───layout              <-- Componentes estructurales globales
│   │       MainNavbar.tsx
│   │       Sidebar.tsx
│   │       Footer.tsx
│   │       PageContainer.tsx
│   │
│   ├───shared              <-- Componentes reutilizables NO Shadcn
│   │       StatusBadge.tsx
│   │       EmptyState.tsx
│   │       DataTable.tsx
│   │       Loader.tsx
│   │
│   └───ui                  <-- LIBRERÍA DE COMPONENTES (Shadcn UI)
│           button.tsx
│           card.tsx
│           sonner.tsx
│           ... (todos los demás)
│
├───config                  <-- Constantes globales
│       env.ts              <-- Validar variables de entorno (zod)
│       firebase.ts         <-- Init de Firebase
│       constants.ts
│
├───features                <-- 🔥 AQUÍ VIVE TU NEGOCIO (Vertical Slices)
│   │
│   ├───auth                <-- Feature: Autenticación
│   │   ├───api             <-- Llamadas al backend (login, register)
│   │   ├───components      <-- UI Específica (LoginForm, SocialButton)
│   │   ├───hooks           <-- Lógica (useAuthMutation)
│   │   ├───schemas         <-- Validaciones Zod (loginSchema)
│   │   ├───types           <-- Typescript interfaces
│   │   └───index.ts        <-- Barril (Public API del feature)
│   │
│   ├───map                 <-- Feature: Visualización Mapa
│   │   ├───components      <-- (MapLibre/Leaflet wrapper, Popups)
│   │   ├───hooks           <-- (useMapLayers, useStreetData)
│   │   ├───utils           <-- Helpers de GeoJSON
│   │   └───store           <-- (Opcional) slice de Zustand local para el mapa
│   │
│   ├───incidents           <-- Feature: Reportes
│   │   ├───api             <-- (createIncident, getIncidents)
│   │   ├───components      <-- (ReportForm, IncidentList)
│   │   └───schemas         <-- (incidentSchema)
│   │
│   └───ratings             <-- Feature: Calificaciones
│       ├───api
│       └───components      <-- (StarRating, RatingDialog)
│
├───hooks                   <-- Hooks GLOBALES y Genéricos
│       useDebounce.ts
│       useMediaQuery.ts
│       useTheme.ts
│
├───lib                     <-- Utilidades puras (sin React)
│       utils.ts            <-- cn() para Tailwind
│       formatters.ts       <-- Fechas, monedas
│       validators.ts
│
├───routes                  <-- 🚦 ENRUTAMIENTO (File-based Routing)
│   │   __root.tsx          <-- Layout Raíz (Auth Listener, Toaster)
│   │
│   ├───_auth               <-- Layout Protegido (Dashboard Layout)
│   │       route.tsx       <-- Verifica auth, renderiza Navbar/Sidebar
│   │       dashboard.tsx
│   │       mapa.tsx
│   │       reportes.tsx
│   │
│   ├───(public)            <-- Grupo lógico (no afecta URL)
│   │       index.tsx       <-- Landing Page (/)
│   │       login.tsx       <-- (/login)
│   │       register.tsx    <-- (/register)
│   │
│   └───_auth.onboarding    <-- Ruta especial
│           route.tsx
│
└───store                   <-- Estado GLOBAL (Zustand)
        authStore.ts        <-- Usuario, isLoading, isVerified
        uiStore.ts          <-- Sidebar open/close, Theme
```