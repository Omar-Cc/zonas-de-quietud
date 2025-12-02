import { useState, useEffect } from 'react'
import { useSearch } from '@tanstack/react-router'
import { motion } from 'motion/react'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Building2,
  Briefcase,
  Newspaper,
  AlertCircle,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const CONTACT_REASONS = [
  { value: 'general', label: 'Consulta General', icon: MessageSquare },
  { value: 'technical', label: 'Problema Técnico', icon: AlertCircle },
  { value: 'business', label: 'Para Empresas', icon: Building2 },
  { value: 'jobs', label: 'Trabaja con Nosotros', icon: Briefcase },
  { value: 'press', label: 'Prensa y Medios', icon: Newspaper },
]

export default function ContactoPage() {
  const search = useSearch({ from: '/contacto' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    message: '',
  })

  useEffect(() => {
    if (search.reason) {
      setFormData((prev) => ({ ...prev, reason: search.reason || '' }))
    }
  }, [search.reason])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implementar envío de formulario
    console.log('Form submitted:', formData)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 px-4 py-10 dark:from-gray-900 dark:to-gray-950">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-foreground text-4xl font-bold">Contáctanos</h1>
          <p className="text-muted-foreground mt-2">
            Estamos aquí para ayudarte. Escríbenos y te responderemos lo antes
            posible.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Información de Contacto
                </CardTitle>
                <CardDescription>
                  Múltiples formas de comunicarte con nosotros
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                    <Mail className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:contacto@zonasquietud.com"
                      className="text-muted-foreground hover:text-primary text-sm"
                    >
                      contacto@zonasquietud.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                    <Phone className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <a
                      href="tel:+51987654321"
                      className="text-muted-foreground hover:text-primary text-sm"
                    >
                      +51 987 654 321
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                    <MapPin className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Dirección</p>
                    <p className="text-muted-foreground text-sm">
                      Av. Javier Prado Este 4200
                      <br />
                      Santiago de Surco, Lima
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                    <Clock className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Horario de Atención</p>
                    <p className="text-muted-foreground text-sm">
                      Lunes a Viernes: 9:00 - 18:00
                      <br />
                      Sábados: 9:00 - 13:00
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Motivos de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {CONTACT_REASONS.map((reason) => {
                  const Icon = reason.icon
                  return (
                    <div key={reason.value} className="flex items-center gap-3">
                      <Icon className="text-primary h-4 w-4" />
                      <span className="text-sm">{reason.label}</span>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Envíanos un Mensaje</CardTitle>
                <CardDescription>
                  Completa el formulario y nos pondremos en contacto contigo en
                  menos de 24 horas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre Completo *</Label>
                      <Input
                        id="name"
                        placeholder="Juan Pérez"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="juan@ejemplo.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+51 987 654 321"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reason">Motivo de Contacto *</Label>
                      <Select
                        value={formData.reason}
                        onValueChange={(value) => handleChange('reason', value)}
                        required
                      >
                        <SelectTrigger id="reason">
                          <SelectValue placeholder="Selecciona un motivo" />
                        </SelectTrigger>
                        <SelectContent>
                          {CONTACT_REASONS.map((reason) => (
                            <SelectItem key={reason.value} value={reason.value}>
                              {reason.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje *</Label>
                    <Textarea
                      id="message"
                      placeholder="Cuéntanos cómo podemos ayudarte..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground text-sm">
                      * Campos obligatorios
                    </p>
                    <Button type="submit" size="lg" className="cursor-pointer">
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Mensaje
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Card className="border-blue-200 dark:border-blue-800">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <AlertCircle className="h-4 w-4 text-blue-500" />
                    Soporte Técnico
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Para problemas técnicos urgentes, escríbenos a{' '}
                  <a
                    href="mailto:soporte@zonasquietud.com"
                    className="text-primary hover:underline"
                  >
                    soporte@zonasquietud.com
                  </a>
                </CardContent>
              </Card>

              <Card className="border-green-200 dark:border-green-800">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Building2 className="h-4 w-4 text-green-500" />
                    Alianzas Empresariales
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Para propuestas comerciales, contacta a{' '}
                  <a
                    href="mailto:empresas@zonasquietud.com"
                    className="text-primary hover:underline"
                  >
                    empresas@zonasquietud.com
                  </a>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
