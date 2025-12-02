import { useState, useEffect } from 'react'
import { Link, useSearch } from '@tanstack/react-router'
import { motion } from 'motion/react'
import {
  BookOpen,
  HelpCircle,
  Video,
  BarChart3,
  Star,
  MapPin,
  Shield,
  Volume2,
  Wind,
  Users,
  TrendingUp,
  Award,
  CheckCircle2,
  Info,
  MessageCircle,
  GraduationCap,
  Mail,
  Phone,
  Clock,
  FileText,
  Cookie,
  Scale,
  Code,
} from 'lucide-react'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

// Datos para estadísticas
const monthlyReports = [
  { month: 'Jun', reportes: 45 },
  { month: 'Jul', reportes: 52 },
  { month: 'Ago', reportes: 61 },
  { month: 'Set', reportes: 58 },
  { month: 'Oct', reportes: 70 },
  { month: 'Nov', reportes: 85 },
]

const criteriaDistribution = [
  { name: 'Seguridad', value: 35, color: '#3b82f6' },
  { name: 'Ruido', value: 30, color: '#f97316' },
  { name: 'Aire', value: 25, color: '#10b981' },
  { name: 'Otros', value: 10, color: '#8b5cf6' },
]

const faqs = [
  {
    question: '¿Cómo funciona el sistema de calificación?',
    answer:
      'Nuestro sistema evalúa las zonas basándose en tres criterios principales: seguridad, nivel de ruido y calidad del aire. Cada criterio se califica de 0 a 10, y el promedio ponderado determina la puntuación general de la zona.',
  },
  {
    question: '¿Puedo reportar incidentes de forma anónima?',
    answer:
      'Sí, todos los reportes son anónimos por defecto. Solo se registra la ubicación y los detalles del incidente, pero no se vincula información personal identificable a menos que decidas compartirla voluntariamente.',
  },
  {
    question: '¿Cómo se calculan las zonas de quietud?',
    answer:
      'Las zonas de quietud se calculan mediante un algoritmo que analiza múltiples factores: reportes de usuarios, datos históricos, nivel de ruido ambiental, índice de criminalidad y calidad del aire. Las zonas con puntuaciones superiores a 7.0 se consideran "zonas de quietud".',
  },
  {
    question: '¿Con qué frecuencia se actualizan los datos?',
    answer:
      'Los datos del mapa se actualizan en tiempo real. Cada vez que un usuario envía un reporte o calificación, la información se procesa inmediatamente y se refleja en el mapa dentro de los siguientes 5 minutos.',
  },
  {
    question: '¿Puedo exportar los datos de mi zona?',
    answer:
      'Actualmente estamos trabajando en una función de exportación de datos. Próximamente podrás descargar reportes en formato PDF o CSV con las estadísticas de tu zona de interés.',
  },
  {
    question: '¿Cómo reporto un incidente?',
    answer:
      'Para reportar un incidente, navega al mapa, haz clic en la ubicación donde ocurrió el incidente y selecciona "Reportar Incidente". Completa el formulario con los detalles y envía. Tu reporte será procesado inmediatamente.',
  },
  {
    question: '¿Qué hago si encuentro información incorrecta?',
    answer:
      'Si encuentras datos incorrectos, puedes reportarlo a través del Centro de Ayuda o contactando directamente a nuestro equipo de soporte. Revisaremos la información y la corregiremos lo antes posible.',
  },
]

const tutorials = [
  {
    title: 'Cómo usar el mapa interactivo',
    duration: '3:45',
    thumbnail: '🗺️',
    description: 'Aprende a navegar por el mapa, filtrar zonas y ver detalles.',
  },
  {
    title: 'Reportar un incidente',
    duration: '2:30',
    thumbnail: '📝',
    description: 'Guía paso a paso para reportar incidentes de forma efectiva.',
  },
  {
    title: 'Calificar una calle',
    duration: '4:15',
    thumbnail: '⭐',
    description:
      'Cómo evaluar calles según seguridad, ruido y calidad del aire.',
  },
  {
    title: 'Interpretar estadísticas',
    duration: '5:00',
    thumbnail: '📊',
    description: 'Entiende las métricas y gráficos del dashboard.',
  },
]

const RESOURCE_ITEMS = [
  {
    id: 'como-funciona',
    label: 'Cómo Funciona',
    desc: 'Aprende a usar la plataforma',
    icon: <Info className="h-5 w-5 text-blue-500" />,
  },
  {
    id: 'ayuda',
    label: 'Centro de Ayuda',
    desc: 'Soporte y contacto',
    icon: <HelpCircle className="h-5 w-5 text-purple-500" />,
  },
  {
    id: 'faq',
    label: 'FAQ',
    desc: 'Preguntas frecuentes',
    icon: <MessageCircle className="h-5 w-5 text-green-500" />,
  },
  {
    id: 'guia',
    label: 'Guía de Calificación',
    desc: 'Sistema de puntuación',
    icon: <GraduationCap className="h-5 w-5 text-orange-500" />,
  },
  {
    id: 'tutoriales',
    label: 'Video Tutoriales',
    desc: 'Aprende con videos',
    icon: <Video className="h-5 w-5 text-red-500" />,
  },
  {
    id: 'estadisticas',
    label: 'Estadísticas',
    desc: 'Datos y métricas',
    icon: <BarChart3 className="h-5 w-5 text-cyan-500" />,
  },
  {
    id: 'terminos',
    label: 'Términos y Condiciones',
    desc: 'Condiciones de uso',
    icon: <FileText className="h-5 w-5 text-indigo-500" />,
  },
  {
    id: 'privacidad',
    label: 'Política de Privacidad',
    desc: 'Protección de datos',
    icon: <Shield className="h-5 w-5 text-pink-500" />,
  },
  {
    id: 'cookies',
    label: 'Política de Cookies',
    desc: 'Uso de cookies',
    icon: <Cookie className="h-5 w-5 text-yellow-600" />,
  },
  {
    id: 'conducta',
    label: 'Código de Conducta',
    desc: 'Normas comunitarias',
    icon: <Scale className="h-5 w-5 text-teal-500" />,
  },
  {
    id: 'api',
    label: 'API para Desarrolladores',
    desc: 'Documentación técnica',
    icon: <Code className="h-5 w-5 text-slate-500" />,
  },
]

export default function RecursosPage() {
  const search = useSearch({ from: '/recursos' })
  const [activeTab, setActiveTab] = useState('como-funciona')

  useEffect(() => {
    if (search.tab) {
      const match = RESOURCE_ITEMS.find(
        (i) =>
          i.label.toLowerCase() === search.tab?.toLowerCase() ||
          i.id === search.tab?.toLowerCase()
      )
      if (match) setActiveTab(match.id)
    }
  }, [search.tab])

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 px-4 py-10 dark:from-gray-900 dark:to-gray-950">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-4">
        {/* Sidebar */}
        <aside className="md:col-span-1">
          <div className="sticky top-6 space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <div className="mb-2 flex items-center gap-3">
                <div className="bg-primary/10 rounded-lg p-2">
                  <BookOpen className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Recursos</h3>
                  <p className="text-muted-foreground text-xs">
                    Aprende y explora
                  </p>
                </div>
              </div>
            </div>

            <nav className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                {RESOURCE_ITEMS.map((item) => {
                  const active = item.id === activeTab
                  return (
                    <li key={item.id}>
                      <Link
                        to="/recursos"
                        search={{ tab: item.label }}
                        className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors ${
                          active
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-800 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-900'
                        }`}
                        onClick={() => setActiveTab(item.id)}
                      >
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                          {item.icon}
                        </span>
                        <div className="flex-1 text-left">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-muted-foreground mt-0.5 text-xs">
                            {item.desc}
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">→</div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="md:col-span-3">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            {/* Cómo Funciona */}
            <TabsContent value="como-funciona" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="text-primary h-5 w-5" />
                      Cómo Funciona el Mapa
                    </CardTitle>
                    <CardDescription>
                      Descubre cómo navegar y usar todas las funciones del mapa
                      interactivo
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <h3 className="flex items-center gap-2 text-lg font-semibold">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          Navegación Básica
                        </h3>
                        <ul className="text-muted-foreground space-y-3 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>
                              <strong>Zoom:</strong> Usa la rueda del mouse o
                              los botones + / - para acercar o alejar
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>
                              <strong>Mover:</strong> Haz clic y arrastra para
                              desplazarte por el mapa
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>
                              <strong>Buscar:</strong> Usa la barra de búsqueda
                              para encontrar calles específicas
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>
                              <strong>Filtrar:</strong> Abre el panel lateral
                              para filtrar por distrito o puntuación
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          Pasos para Empezar
                        </h3>
                        <ol className="text-muted-foreground space-y-3 text-sm">
                          <li className="flex items-start gap-3">
                            <Badge variant="outline" className="shrink-0">
                              1
                            </Badge>
                            <span>
                              Navega al mapa interactivo desde el menú principal
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Badge variant="outline" className="shrink-0">
                              2
                            </Badge>
                            <span>
                              Busca tu zona de interés usando la barra de
                              búsqueda
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Badge variant="outline" className="shrink-0">
                              3
                            </Badge>
                            <span>
                              Haz clic en las calles para ver información
                              detallada
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Badge variant="outline" className="shrink-0">
                              4
                            </Badge>
                            <span>
                              Contribuye calificando calles o reportando
                              incidentes
                            </span>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Centro de Ayuda */}
            <TabsContent value="ayuda" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="text-primary h-5 w-5" />
                      Centro de Ayuda
                    </CardTitle>
                    <CardDescription>
                      Recursos y contacto para obtener soporte técnico
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-3">
                      <Card className="border-primary/20">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-base">
                            <Mail className="text-primary h-4 w-4" />
                            Correo Electrónico
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p className="text-muted-foreground text-sm">
                            Envíanos un correo y te responderemos en menos de 24
                            horas
                          </p>
                          <p className="text-sm font-medium">
                            soporte@zonasquietud.com
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-primary/20">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-base">
                            <Phone className="text-primary h-4 w-4" />
                            Teléfono
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p className="text-muted-foreground text-sm">
                            Llámanos de lunes a viernes
                          </p>
                          <p className="text-sm font-medium">+51 987 654 321</p>
                        </CardContent>
                      </Card>

                      <Card className="border-primary/20">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-base">
                            <Clock className="text-primary h-4 w-4" />
                            Horario
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p className="text-muted-foreground text-sm">
                            Atención al cliente
                          </p>
                          <p className="text-sm font-medium">
                            Lun - Vie: 9:00 - 18:00
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="mb-4 text-lg font-semibold">
                        Recursos Útiles
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Button
                          variant="outline"
                          className="h-auto cursor-pointer justify-start py-4"
                        >
                          <div className="text-left">
                            <div className="font-semibold">
                              Documentación Técnica
                            </div>
                            <div className="text-muted-foreground text-xs">
                              Guías detalladas para desarrolladores
                            </div>
                          </div>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-auto cursor-pointer justify-start py-4"
                        >
                          <div className="text-left">
                            <div className="font-semibold">
                              Reportar un Problema
                            </div>
                            <div className="text-muted-foreground text-xs">
                              Ayúdanos a mejorar la plataforma
                            </div>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* FAQ */}
            <TabsContent value="faq" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Preguntas Frecuentes</CardTitle>
                    <CardDescription>
                      Encuentra respuestas a las preguntas más comunes sobre la
                      plataforma
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {faqs.map((faq, index) => (
                        <AccordionItem
                          key={`faq-${index}`}
                          value={`item-${index}`}
                        >
                          <AccordionTrigger className="cursor-pointer text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="text-primary h-5 w-5" />
                      ¿Necesitas más ayuda?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Si no encuentras la respuesta que buscas, nuestro equipo
                      está aquí para ayudarte.
                    </p>
                    <div className="flex gap-3">
                      <Button className="cursor-pointer">
                        Contactar Soporte
                      </Button>
                      <Button variant="outline" className="cursor-pointer">
                        Ver Documentación
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Guía de Calificación */}
            <TabsContent value="guia" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="text-primary h-5 w-5" />
                      Sistema de Calificación
                    </CardTitle>
                    <CardDescription>
                      Comprende cómo evaluamos las zonas de quietud
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        Rangos de Puntuación
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Badge className="w-24 justify-center bg-green-500">
                            8.0 - 10.0
                          </Badge>
                          <span className="text-sm font-medium">Excelente</span>
                          <span className="text-muted-foreground text-sm">
                            - Zona muy tranquila y segura
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="w-24 justify-center bg-lime-500">
                            6.0 - 7.9
                          </Badge>
                          <span className="text-sm font-medium">Bueno</span>
                          <span className="text-muted-foreground text-sm">
                            - Zona agradable para vivir
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="w-24 justify-center bg-yellow-500">
                            4.0 - 5.9
                          </Badge>
                          <span className="text-sm font-medium">Regular</span>
                          <span className="text-muted-foreground text-sm">
                            - Zona con aspectos a mejorar
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="w-24 justify-center bg-orange-500">
                            2.0 - 3.9
                          </Badge>
                          <span className="text-sm font-medium">Malo</span>
                          <span className="text-muted-foreground text-sm">
                            - Zona con problemas significativos
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="w-24 justify-center bg-red-500">
                            0.0 - 1.9
                          </Badge>
                          <span className="text-sm font-medium">Crítico</span>
                          <span className="text-muted-foreground text-sm">
                            - Zona a evitar
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="mb-4 text-lg font-semibold">
                        Criterios de Evaluación
                      </h3>
                      <div className="grid gap-4 md:grid-cols-3">
                        <Card className="border-blue-200 dark:border-blue-800">
                          <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                              <Shield className="h-4 w-4 text-blue-500" />
                              Seguridad
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-muted-foreground text-sm">
                            Evaluamos la percepción de seguridad basada en
                            reportes de incidentes, iluminación y presencia
                            policial.
                          </CardContent>
                        </Card>

                        <Card className="border-orange-200 dark:border-orange-800">
                          <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                              <Volume2 className="h-4 w-4 text-orange-500" />
                              Nivel de Ruido
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-muted-foreground text-sm">
                            Medimos el ruido ambiental considerando tráfico
                            vehicular, construcciones y actividades comerciales.
                          </CardContent>
                        </Card>

                        <Card className="border-green-200 dark:border-green-800">
                          <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                              <Wind className="h-4 w-4 text-green-500" />
                              Calidad del Aire
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-muted-foreground text-sm">
                            Analizamos la calidad del aire basándonos en
                            vegetación, tráfico y reportes de contaminación.
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Video Tutoriales */}
            <TabsContent value="tutoriales" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid gap-6 md:grid-cols-2"
              >
                {tutorials.map((tutorial, index) => (
                  <Card
                    key={`tutorial-${index}`}
                    className="transition-shadow hover:shadow-lg"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-4xl">{tutorial.thumbnail}</div>
                          <div>
                            <CardTitle className="text-base">
                              {tutorial.title}
                            </CardTitle>
                            <CardDescription className="mt-1 flex items-center gap-2">
                              <Video className="h-3 w-3" />
                              {tutorial.duration}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">
                        {tutorial.description}
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4 w-full cursor-pointer"
                      >
                        Ver Tutorial
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </TabsContent>

            {/* Estadísticas */}
            <TabsContent value="estadisticas" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid gap-6 md:grid-cols-3"
              >
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-muted-foreground text-sm font-medium">
                      Total de Reportes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">1,247</div>
                    <p className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      +12% vs mes anterior
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-muted-foreground text-sm font-medium">
                      Usuarios Activos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">3,892</div>
                    <p className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      +8% vs mes anterior
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-muted-foreground text-sm font-medium">
                      Zonas Evaluadas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">156</div>
                    <p className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
                      <Award className="h-3 w-3 text-yellow-500" />
                      42 zonas de quietud
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Reportes Mensuales</CardTitle>
                    <CardDescription>
                      Evolución de reportes en los últimos 6 meses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={monthlyReports}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          className="stroke-muted"
                        />
                        <XAxis dataKey="month" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                        />
                        <Bar
                          dataKey="reportes"
                          fill="hsl(var(--primary))"
                          radius={[8, 8, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Distribución por Criterio</CardTitle>
                    <CardDescription>
                      Porcentaje de evaluaciones por categoría
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={criteriaDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {criteriaDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Términos y Condiciones */}
            <TabsContent value="terminos" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="text-primary h-5 w-5" />
                      Términos y Condiciones de Uso
                    </CardTitle>
                    <CardDescription>
                      Última actualización: 30 de Noviembre de 2024
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="prose prose-sm dark:prose-invert max-w-none space-y-6">
                    <section>
                      <h3 className="text-lg font-semibold">
                        1. Aceptación de los Términos
                      </h3>
                      <p className="text-muted-foreground">
                        Al acceder y utilizar Zonas de Quietud, aceptas estar
                        sujeto a estos términos y condiciones. Si no estás de
                        acuerdo con alguna parte de estos términos, no debes
                        utilizar nuestra plataforma.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold">
                        2. Uso de la Plataforma
                      </h3>
                      <p className="text-muted-foreground">
                        Zonas de Quietud es una plataforma colaborativa para
                        evaluar la calidad de vida urbana en Lima. Los usuarios
                        pueden:
                      </p>
                      <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-2">
                        <li>Consultar calificaciones de calles y zonas</li>
                        <li>
                          Reportar incidentes relacionados con ruido, seguridad
                          y calidad del aire
                        </li>
                        <li>Calificar calles según criterios establecidos</li>
                        <li>Participar en la comunidad y eventos</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold">
                        3. Responsabilidades del Usuario
                      </h3>
                      <p className="text-muted-foreground">
                        Los usuarios se comprometen a:
                      </p>
                      <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-2">
                        <li>Proporcionar información veraz y precisa</li>
                        <li>
                          No publicar contenido ofensivo, difamatorio o ilegal
                        </li>
                        <li>Respetar los derechos de otros usuarios</li>
                        <li>
                          No utilizar la plataforma para fines comerciales sin
                          autorización
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold">
                        4. Propiedad Intelectual
                      </h3>
                      <p className="text-muted-foreground">
                        Todo el contenido de la plataforma, incluyendo diseño,
                        código, textos e imágenes, es propiedad de Zonas de
                        Quietud y está protegido por las leyes de propiedad
                        intelectual del Perú.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold">
                        5. Limitación de Responsabilidad
                      </h3>
                      <p className="text-muted-foreground">
                        Zonas de Quietud no se hace responsable por la exactitud
                        de las calificaciones y reportes generados por los
                        usuarios. La información proporcionada es de carácter
                        informativo y no constituye asesoramiento profesional.
                      </p>
                    </section>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Política de Privacidad */}
            <TabsContent value="privacidad" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="text-primary h-5 w-5" />
                      Política de Privacidad
                    </CardTitle>
                    <CardDescription>
                      Cómo protegemos y utilizamos tus datos personales
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="prose prose-sm dark:prose-invert max-w-none space-y-6">
                    <section>
                      <h3 className="text-lg font-semibold">
                        1. Información que Recopilamos
                      </h3>
                      <p className="text-muted-foreground">
                        Recopilamos la siguiente información:
                      </p>
                      <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-2">
                        <li>
                          <strong>Información de cuenta:</strong> nombre, correo
                          electrónico, contraseña
                        </li>
                        <li>
                          <strong>Datos de uso:</strong> calificaciones,
                          reportes, comentarios
                        </li>
                        <li>
                          <strong>Información de ubicación:</strong> para
                          asociar reportes a zonas específicas
                        </li>
                        <li>
                          <strong>Datos técnicos:</strong> dirección IP, tipo de
                          navegador, sistema operativo
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold">
                        2. Uso de la Información
                      </h3>
                      <p className="text-muted-foreground">
                        Utilizamos tu información para:
                      </p>
                      <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-2">
                        <li>Proporcionar y mejorar nuestros servicios</li>
                        <li>Personalizar tu experiencia en la plataforma</li>
                        <li>
                          Enviar notificaciones y actualizaciones relevantes
                        </li>
                        <li>Analizar tendencias y patrones de uso</li>
                        <li>Prevenir fraudes y garantizar la seguridad</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold">
                        3. Protección de Datos
                      </h3>
                      <p className="text-muted-foreground">
                        Implementamos medidas de seguridad técnicas y
                        organizativas para proteger tus datos personales contra
                        acceso no autorizado, pérdida o alteración. Utilizamos
                        encriptación SSL/TLS para todas las transmisiones de
                        datos.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold">4. Tus Derechos</h3>
                      <p className="text-muted-foreground">Tienes derecho a:</p>
                      <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-2">
                        <li>Acceder a tus datos personales</li>
                        <li>Rectificar información inexacta</li>
                        <li>Solicitar la eliminación de tus datos</li>
                        <li>Oponerte al procesamiento de tus datos</li>
                        <li>Solicitar la portabilidad de tus datos</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold">5. Contacto</h3>
                      <p className="text-muted-foreground">
                        Para ejercer tus derechos o consultas sobre privacidad,
                        contáctanos en:{' '}
                        <a
                          href="mailto:privacidad@zonasquietud.com"
                          className="text-primary hover:underline"
                        >
                          privacidad@zonasquietud.com
                        </a>
                      </p>
                    </section>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Política de Cookies */}
            <TabsContent value="cookies" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cookie className="text-primary h-5 w-5" />
                      Política de Cookies
                    </CardTitle>
                    <CardDescription>
                      Información sobre el uso de cookies en nuestra plataforma
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="prose prose-sm dark:prose-invert max-w-none space-y-6">
                    <section>
                      <h3 className="text-lg font-semibold">
                        ¿Qué son las Cookies?
                      </h3>
                      <p className="text-muted-foreground">
                        Las cookies son pequeños archivos de texto que se
                        almacenan en tu dispositivo cuando visitas nuestro sitio
                        web. Nos ayudan a mejorar tu experiencia y proporcionar
                        funcionalidades personalizadas.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold">
                        Tipos de Cookies que Utilizamos
                      </h3>
                      <div className="mt-4 space-y-4">
                        <Card className="border-blue-200 dark:border-blue-800">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">
                              Cookies Esenciales
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-muted-foreground text-sm">
                            Necesarias para el funcionamiento básico del sitio.
                            Incluyen autenticación de sesión y preferencias de
                            seguridad.
                          </CardContent>
                        </Card>

                        <Card className="border-green-200 dark:border-green-800">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">
                              Cookies de Rendimiento
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-muted-foreground text-sm">
                            Recopilan información sobre cómo los usuarios
                            interactúan con el sitio para mejorar su
                            funcionamiento.
                          </CardContent>
                        </Card>

                        <Card className="border-purple-200 dark:border-purple-800">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">
                              Cookies de Funcionalidad
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-muted-foreground text-sm">
                            Permiten recordar tus preferencias y configuraciones
                            personalizadas.
                          </CardContent>
                        </Card>

                        <Card className="border-orange-200 dark:border-orange-800">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">
                              Cookies de Análisis
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-muted-foreground text-sm">
                            Nos ayudan a entender cómo los usuarios utilizan la
                            plataforma mediante herramientas como Google
                            Analytics.
                          </CardContent>
                        </Card>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold">
                        Gestión de Cookies
                      </h3>
                      <p className="text-muted-foreground">
                        Puedes controlar y/o eliminar las cookies según desees.
                        Puedes eliminar todas las cookies que ya están en tu
                        dispositivo y configurar la mayoría de los navegadores
                        para evitar que se instalen. Sin embargo, si haces esto,
                        es posible que tengas que ajustar manualmente algunas
                        preferencias cada vez que visites el sitio.
                      </p>
                    </section>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Código de Conducta */}
            <TabsContent value="conducta" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scale className="text-primary h-5 w-5" />
                      Código de Conducta Comunitaria
                    </CardTitle>
                    <CardDescription>
                      Normas para mantener una comunidad respetuosa y
                      constructiva
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="prose prose-sm dark:prose-invert max-w-none space-y-6">
                    <section>
                      <h3 className="text-lg font-semibold">
                        Nuestro Compromiso
                      </h3>
                      <p className="text-muted-foreground">
                        Nos comprometemos a proporcionar un entorno acogedor,
                        seguro y respetuoso para todos los miembros de nuestra
                        comunidad, independientemente de su edad, género,
                        orientación sexual, discapacidad, etnia, religión o
                        nivel socioeconómico.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold">
                        Comportamientos Esperados
                      </h3>
                      <ul className="text-muted-foreground list-inside list-disc space-y-2">
                        <li>Ser respetuoso y considerado con otros miembros</li>
                        <li>Proporcionar información veraz y constructiva</li>
                        <li>Aceptar críticas constructivas con gracia</li>
                        <li>Enfocarse en lo que es mejor para la comunidad</li>
                        <li>Mostrar empatía hacia otros miembros</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold">
                        Comportamientos Inaceptables
                      </h3>
                      <ul className="text-muted-foreground list-inside list-disc space-y-2">
                        <li>Uso de lenguaje o imágenes sexualizadas</li>
                        <li>Comentarios insultantes o despectivos</li>
                        <li>Acoso público o privado</li>
                        <li>
                          Publicación de información privada de otros sin
                          permiso
                        </li>
                        <li>Spam o publicidad no autorizada</li>
                        <li>
                          Cualquier conducta que pueda considerarse inapropiada
                          en un entorno profesional
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold">Consecuencias</h3>
                      <p className="text-muted-foreground">
                        Los administradores de la comunidad tienen el derecho y
                        la responsabilidad de eliminar, editar o rechazar
                        comentarios, reportes y otras contribuciones que no se
                        alineen con este Código de Conducta. Las violaciones
                        pueden resultar en suspensión temporal o permanente de
                        la cuenta.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold">
                        Reportar Violaciones
                      </h3>
                      <p className="text-muted-foreground">
                        Si observas un comportamiento inaceptable, por favor
                        repórtalo a:{' '}
                        <a
                          href="mailto:conducta@zonasquietud.com"
                          className="text-primary hover:underline"
                        >
                          conducta@zonasquietud.com
                        </a>
                      </p>
                    </section>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* API para Desarrolladores */}
            <TabsContent value="api" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="text-primary h-5 w-5" />
                      API para Desarrolladores
                    </CardTitle>
                    <CardDescription>
                      Documentación técnica para integrar Zonas de Quietud en
                      tus aplicaciones
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <section>
                      <h3 className="mb-3 text-lg font-semibold">
                        Endpoints Disponibles
                      </h3>
                      <div className="space-y-3">
                        <Card className="border-green-200 dark:border-green-800">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="font-mono text-base">
                                GET /api/v1/streets
                              </CardTitle>
                              <Badge className="bg-green-500">GET</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="text-muted-foreground text-sm">
                            Obtiene la lista de calles con sus calificaciones y
                            datos de ubicación.
                          </CardContent>
                        </Card>

                        <Card className="border-green-200 dark:border-green-800">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="font-mono text-base">
                                GET /api/v1/streets/:id
                              </CardTitle>
                              <Badge className="bg-green-500">GET</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="text-muted-foreground text-sm">
                            Obtiene información detallada de una calle
                            específica incluyendo reportes e historial.
                          </CardContent>
                        </Card>

                        <Card className="border-blue-200 dark:border-blue-800">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="font-mono text-base">
                                POST /api/v1/incidents
                              </CardTitle>
                              <Badge className="bg-blue-500">POST</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="text-muted-foreground text-sm">
                            Crea un nuevo reporte de incidente. Requiere
                            autenticación.
                          </CardContent>
                        </Card>

                        <Card className="border-blue-200 dark:border-blue-800">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="font-mono text-base">
                                POST /api/v1/ratings
                              </CardTitle>
                              <Badge className="bg-blue-500">POST</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="text-muted-foreground text-sm">
                            Envía una calificación para una calle. Requiere
                            autenticación.
                          </CardContent>
                        </Card>
                      </div>
                    </section>

                    <section>
                      <h3 className="mb-3 text-lg font-semibold">
                        Autenticación
                      </h3>
                      <p className="text-muted-foreground mb-3 text-sm">
                        La API utiliza tokens JWT para autenticación. Incluye el
                        token en el header de tus requests:
                      </p>
                      <pre className="bg-muted overflow-x-auto rounded-lg p-4">
                        <code className="text-sm">
                          {`Authorization: Bearer YOUR_API_TOKEN`}
                        </code>
                      </pre>
                    </section>

                    <section>
                      <h3 className="mb-3 text-lg font-semibold">
                        Ejemplo de Respuesta
                      </h3>
                      <pre className="bg-muted overflow-x-auto rounded-lg p-4">
                        <code className="text-sm">
                          {`{
  "id": "street-123",
  "name": "Av. El Bosque",
  "district": "San Isidro",
  "score": 9.2,
  "criteria": {
    "security": 9.5,
    "noise": 8.8,
    "airQuality": 9.3
  },
  "evaluations": 234
}`}
                        </code>
                      </pre>
                    </section>

                    <section>
                      <h3 className="mb-3 text-lg font-semibold">
                        Límites de Uso
                      </h3>
                      <ul className="text-muted-foreground list-inside list-disc space-y-2 text-sm">
                        <li>Plan Gratuito: 1,000 requests/día</li>
                        <li>Plan Básico: 10,000 requests/día</li>
                        <li>Plan Empresarial: Ilimitado</li>
                      </ul>
                    </section>

                    <div className="flex gap-3 pt-4">
                      <Button className="cursor-pointer">
                        Ver Documentación Completa
                      </Button>
                      <Button variant="outline" className="cursor-pointer">
                        Solicitar API Key
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
