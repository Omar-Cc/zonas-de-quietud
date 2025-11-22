import { Check, HelpCircle, X } from "lucide-react";
import { Navbar } from "../components/layouts/navbar/navbar";
import { Footer } from "../components/layouts/footer";
import { PricingCard } from "../components/pricingCard";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { useState } from "react";

const pricingPlans = {
  monthly: {
    basic: {
      name: "Básico",
      price: "Gratis",
      period: "",
      description: "Perfecto para comenzar a explorar",
      features: [
        { text: "Acceso al mapa interactivo", included: true },
        { text: "Consulta de calificaciones", included: true },
        { text: "5 calificaciones por mes", included: true },
        { text: "Visualización de estadísticas básicas", included: true },
        { text: "Comentarios en calificaciones", included: false },
        { text: "Reportes de incidentes", included: false },
        { text: "Dashboard personalizado", included: false },
        { text: "Sistema de logros", included: false },
        { text: "Exportar datos", included: false },
        { text: "Soporte prioritario", included: false },
      ],
      buttonText: "Comenzar Gratis",
      buttonVariant: "outline" as const,
    },
    premium: {
      name: "Premium",
      price: "29",
      period: "/mes",
      description: "Para usuarios activos y comprometidos",
      features: [
        { text: "Todo lo del plan Básico", included: true },
        { text: "Calificaciones ilimitadas", included: true },
        { text: "Comentarios en calificaciones", included: true },
        { text: "Reportes de incidentes ilimitados", included: true },
        { text: "Dashboard personalizado completo", included: true },
        { text: "Sistema de logros e insignias", included: true },
        { text: "Alertas personalizadas", included: true },
        { text: "Exportar datos en PDF/Excel", included: true },
        { text: "Soporte prioritario", included: true },
        { text: "API de desarrollador", included: false },
      ],
      buttonText: "Actualizar a Premium",
      buttonVariant: "default" as const,
      popular: true,
      highlighted: true,
    },
    enterprise: {
      name: "Empresas",
      price: "Personalizado",
      period: "",
      description: "Soluciones a medida para organizaciones",
      features: [
        { text: "Todo lo del plan Premium", included: true },
        { text: "Usuarios ilimitados", included: true },
        { text: "API completa de desarrollador", included: true },
        { text: "Integración con sistemas propios", included: true },
        { text: "Dashboard empresarial avanzado", included: true },
        { text: "Análisis predictivo con IA", included: true },
        { text: "Informes personalizados", included: true },
        { text: "Gestor de cuenta dedicado", included: true },
        { text: "SLA garantizado", included: true },
        { text: "Capacitación y onboarding", included: true },
      ],
      buttonText: "Contactar Ventas",
      buttonVariant: "outline" as const,
    },
  },
  yearly: {
    basic: {
      name: "Básico",
      price: "Gratis",
      period: "",
      description: "Perfecto para comenzar a explorar",
      features: [
        { text: "Acceso al mapa interactivo", included: true },
        { text: "Consulta de calificaciones", included: true },
        { text: "5 calificaciones por mes", included: true },
        { text: "Visualización de estadísticas básicas", included: true },
        { text: "Comentarios en calificaciones", included: false },
        { text: "Reportes de incidentes", included: false },
        { text: "Dashboard personalizado", included: false },
        { text: "Sistema de logros", included: false },
        { text: "Exportar datos", included: false },
        { text: "Soporte prioritario", included: false },
      ],
      buttonText: "Comenzar Gratis",
      buttonVariant: "outline" as const,
    },
    premium: {
      name: "Premium",
      price: "24",
      period: "/mes",
      description: "Para usuarios activos y comprometidos",
      features: [
        { text: "Todo lo del plan Básico", included: true },
        { text: "Calificaciones ilimitadas", included: true },
        { text: "Comentarios en calificaciones", included: true },
        { text: "Reportes de incidentes ilimitados", included: true },
        { text: "Dashboard personalizado completo", included: true },
        { text: "Sistema de logros e insignias", included: true },
        { text: "Alertas personalizadas", included: true },
        { text: "Exportar datos en PDF/Excel", included: true },
        { text: "Soporte prioritario", included: true },
        { text: "API de desarrollador", included: false },
      ],
      buttonText: "Actualizar a Premium",
      buttonVariant: "default" as const,
      popular: true,
      highlighted: true,
    },
    enterprise: {
      name: "Empresas",
      price: "Personalizado",
      period: "",
      description: "Soluciones a medida para organizaciones",
      features: [
        { text: "Todo lo del plan Premium", included: true },
        { text: "Usuarios ilimitados", included: true },
        { text: "API completa de desarrollador", included: true },
        { text: "Integración con sistemas propios", included: true },
        { text: "Dashboard empresarial avanzado", included: true },
        { text: "Análisis predictivo con IA", included: true },
        { text: "Informes personalizados", included: true },
        { text: "Gestor de cuenta dedicado", included: true },
        { text: "SLA garantizado", included: true },
        { text: "Capacitación y onboarding", included: true },
      ],
      buttonText: "Contactar Ventas",
      buttonVariant: "outline" as const,
    },
  },
};

const faqs = [
  {
    question: "¿Puedo cambiar de plan en cualquier momento?",
    answer:
      "Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se reflejarán en tu próximo ciclo de facturación.",
  },
  {
    question: "¿Ofrecen descuentos para organizaciones sin fines de lucro?",
    answer:
      "Sí, ofrecemos descuentos especiales para ONGs y organizaciones sin fines de lucro. Contáctanos para más información.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos tarjetas de crédito, débito, PayPal y transferencias bancarias para planes empresariales.",
  },
  {
    question: "¿Hay período de prueba gratuito para Premium?",
    answer:
      "Sí, ofrecemos 14 días de prueba gratuita del plan Premium sin necesidad de tarjeta de crédito.",
  },
  {
    question: "¿Puedo cancelar mi suscripción?",
    answer:
      "Sí, puedes cancelar tu suscripción en cualquier momento desde tu panel de usuario. No hay penalidades por cancelación.",
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const plans = isYearly ? pricingPlans.yearly : pricingPlans.monthly;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar isAuthenticated={true} userName="María García" notificationCount={3} />

      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 opacity-[0.03] dark:opacity-[0.02]">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="pricing-pattern"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="40" cy="40" r="1" fill="currentColor" className="text-primary" />
              <circle cx="0" cy="0" r="1" fill="currentColor" className="text-primary" />
              <circle cx="80" cy="0" r="1" fill="currentColor" className="text-primary" />
              <circle cx="0" cy="80" r="1" fill="currentColor" className="text-primary" />
              <circle cx="80" cy="80" r="1" fill="currentColor" className="text-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pricing-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 pt-[70px]">
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Planes y Precios
            </Badge>
            <h1 className="text-5xl md:text-6xl text-foreground mb-4">
              Elige el plan perfecto para ti
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comienza gratis y actualiza cuando estés listo. Sin contratos, sin sorpresas.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Label htmlFor="billing-toggle" className="text-foreground">
                Mensual
              </Label>
              <Switch
                id="billing-toggle"
                checked={isYearly}
                onCheckedChange={setIsYearly}
              />
              <Label htmlFor="billing-toggle" className="text-foreground">
                Anual
              </Label>
              <Badge variant="default" className="bg-green-600">
                Ahorra 17%
              </Badge>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <PricingCard
              {...plans.basic}
              onButtonClick={() => alert("Comenzando plan Básico...")}
            />
            <PricingCard
              {...plans.premium}
              onButtonClick={() => alert("Actualizando a Premium...")}
            />
            <PricingCard
              {...plans.enterprise}
              onButtonClick={() => alert("Contactando ventas...")}
            />
          </div>

          {/* Feature Comparison Table */}
          <div className="mb-16">
            <h2 className="text-3xl text-foreground text-center mb-8">
              Comparación Detallada
            </h2>
            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-4 px-4 text-muted-foreground">
                          Característica
                        </th>
                        <th className="text-center py-4 px-4">
                          <div className="text-foreground">Básico</div>
                        </th>
                        <th className="text-center py-4 px-4 bg-primary/5">
                          <div className="text-foreground">Premium</div>
                          <Badge variant="secondary" className="mt-1">Popular</Badge>
                        </th>
                        <th className="text-center py-4 px-4">
                          <div className="text-foreground">Empresas</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-4 px-4 text-foreground">Calificaciones por mes</td>
                        <td className="text-center py-4 px-4">5</td>
                        <td className="text-center py-4 px-4 bg-primary/5">Ilimitadas</td>
                        <td className="text-center py-4 px-4">Ilimitadas</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-4 px-4 text-foreground">Reportes de incidentes</td>
                        <td className="text-center py-4 px-4">
                          <X className="w-5 h-5 text-gray-400 mx-auto" />
                        </td>
                        <td className="text-center py-4 px-4 bg-primary/5">
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        </td>
                        <td className="text-center py-4 px-4">
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-4 px-4 text-foreground">Dashboard personalizado</td>
                        <td className="text-center py-4 px-4">
                          <X className="w-5 h-5 text-gray-400 mx-auto" />
                        </td>
                        <td className="text-center py-4 px-4 bg-primary/5">
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        </td>
                        <td className="text-center py-4 px-4">Avanzado</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-4 px-4 text-foreground">API de desarrollador</td>
                        <td className="text-center py-4 px-4">
                          <X className="w-5 h-5 text-gray-400 mx-auto" />
                        </td>
                        <td className="text-center py-4 px-4 bg-primary/5">
                          <X className="w-5 h-5 text-gray-400 mx-auto" />
                        </td>
                        <td className="text-center py-4 px-4">
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-4 px-4 text-foreground">Soporte</td>
                        <td className="text-center py-4 px-4">Email</td>
                        <td className="text-center py-4 px-4 bg-primary/5">Prioritario</td>
                        <td className="text-center py-4 px-4">Dedicado 24/7</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl text-primary mb-2">14 días</div>
                <p className="text-muted-foreground">Prueba gratuita</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl text-primary mb-2">Sin compromiso</div>
                <p className="text-muted-foreground">Cancela cuando quieras</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl text-primary mb-2">Seguro</div>
                <p className="text-muted-foreground">Pago encriptado</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl text-primary mb-2">24/7</div>
                <p className="text-muted-foreground">Soporte disponible</p>
              </CardContent>
            </Card>
          </div>

          {/* FAQs */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl text-foreground mb-2">
                Preguntas Frecuentes
              </h2>
              <p className="text-muted-foreground">
                ¿Tienes dudas? Aquí están las respuestas más comunes
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Final CTA */}
          <Card className="bg-gradient-to-r from-primary to-teal-600 text-white border-0">
            <CardContent className="py-16 text-center">
              <h2 className="text-3xl md:text-4xl mb-4">
                ¿Listo para comenzar?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Únete a miles de usuarios que ya están mejorando su calidad de vida urbana
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Comenzar Gratis
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Contactar Ventas
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
