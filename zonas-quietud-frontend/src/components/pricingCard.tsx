import { Check, X, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";

interface Feature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: Feature[];
  buttonText: string;
  buttonVariant?: "default" | "outline" | "secondary";
  popular?: boolean;
  highlighted?: boolean;
  onButtonClick?: () => void;
}

export function PricingCard({
  name,
  price,
  period = "/mes",
  description,
  features,
  buttonText,
  buttonVariant = "outline",
  popular = false,
  highlighted = false,
  onButtonClick,
}: PricingCardProps) {
  return (
    <Card
      className={`relative transition-all duration-300 ${
        highlighted
          ? "border-primary shadow-2xl shadow-primary/20 scale-105 z-10 bg-gradient-to-b from-primary/5 to-background"
          : "hover:shadow-lg hover:scale-102"
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1 shadow-lg">
            <Sparkles className="w-3 h-3 mr-1" />
            Más Popular
          </Badge>
        </div>
      )}

      <CardHeader className={`text-center ${popular ? "pt-8" : "pt-6"}`}>
        <h3 className="text-foreground mb-2">{name}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>
        
        <div className="mb-6">
          {price === "Gratis" ? (
            <div className="text-5xl text-foreground">Gratis</div>
          ) : price === "Personalizado" ? (
            <div className="text-3xl text-foreground">Contactar</div>
          ) : (
            <>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-2xl text-muted-foreground">S/</span>
                <span className="text-6xl text-foreground">{price}</span>
                <span className="text-muted-foreground">{period}</span>
              </div>
            </>
          )}
        </div>

        <Button
          variant={buttonVariant}
          size="lg"
          className={`w-full ${
            highlighted
              ? "bg-gradient-to-r from-primary to-teal-600 hover:from-primary/90 hover:to-teal-700 text-white shadow-lg"
              : ""
          }`}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground uppercase tracking-wide">
            Características incluidas:
          </p>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                {feature.included ? (
                  <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-gray-400" />
                  </div>
                )}
                <span
                  className={
                    feature.included
                      ? "text-foreground"
                      : "text-muted-foreground line-through"
                  }
                >
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
