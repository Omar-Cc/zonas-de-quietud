import { useState } from "react";
import {
  AlertTriangle,
  Wind,
  Volume2,
  Accessibility,
  Heart,
  Upload,
  X,
  Camera,
  MessageSquare,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Slider } from "./ui/slider";
import { StarRating } from "./starRating";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";

interface RatingFormProps {
  isOpen: boolean;
  onClose: () => void;
  streetName?: string;
  district?: string;
}

interface RatingCriteria {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  value: number;
}

export function RatingForm({
  isOpen,
  onClose,
  streetName = "Av. Arequipa",
  district = "Miraflores",
}: RatingFormProps) {
  const [criteria, setCriteria] = useState<RatingCriteria[]>([
    {
      id: "security",
      label: "Seguridad",
      icon: AlertTriangle,
      description: "¿Qué tan segura te sientes en esta calle?",
      value: 7,
    },
    {
      id: "air_quality",
      label: "Calidad del Aire",
      icon: Wind,
      description: "¿Cómo percibes la calidad del aire?",
      value: 6,
    },
    {
      id: "noise",
      label: "Nivel de Ruido",
      icon: Volume2,
      description: "¿Qué tan ruidosa es esta zona?",
      value: 5,
    },
    {
      id: "accessibility",
      label: "Accesibilidad",
      icon: Accessibility,
      description: "¿Qué tan accesible es para todos?",
      value: 8,
    },
    {
      id: "tranquility",
      label: "Tranquilidad",
      icon: Heart,
      description: "¿Qué tan tranquila y agradable es?",
      value: 7,
    },
  ]);

  const [comments, setComments] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [useStars, setUseStars] = useState(false);

  const handleCriteriaChange = (id: string, value: number) => {
    setCriteria((prev) =>
      prev.map((c) => (c.id === id ? { ...c, value } : c))
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos([...photos, ...Array.from(e.target.files)]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Rating submitted:", {
      street: streetName,
      district,
      criteria,
      comments,
      photos: photos.length,
    });
    alert("¡Gracias por tu calificación!");
    onClose();
  };

  const averageScore =
    criteria.reduce((sum, c) => sum + c.value, 0) / criteria.length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="text-2xl">Calificar Calle</DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-foreground">{streetName}</span>
                <Badge variant="secondary">{district}</Badge>
              </div>
              <div>
                Tu evaluación ayudará a otros ciudadanos a tomar mejores
                decisiones
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-240px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Rating Type Toggle */}
            <div className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
              <span className="text-muted-foreground">Tipo de calificación</span>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={!useStars ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUseStars(false)}
                >
                  Deslizadores
                </Button>
                <Button
                  type="button"
                  variant={useStars ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUseStars(true)}
                >
                  Estrellas
                </Button>
              </div>
            </div>

            {/* Criteria Ratings */}
            <div className="space-y-6">
              {criteria.map((criterion) => {
                const Icon = criterion.icon;
                return (
                  <div
                    key={criterion.id}
                    className="space-y-3 p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <Label className="text-base text-foreground">
                            {criterion.label}
                          </Label>
                          <p className="text-muted-foreground mt-1">
                            {criterion.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-2xl font-medium text-primary min-w-[3rem] text-right">
                        {useStars
                          ? `${criterion.value}/10`
                          : criterion.value.toFixed(1)}
                      </div>
                    </div>

                    {useStars ? (
                      <div className="flex items-center justify-between">
                        <StarRating
                          value={Math.round(criterion.value / 2)}
                          onChange={(stars) =>
                            handleCriteriaChange(criterion.id, stars * 2)
                          }
                          size="lg"
                        />
                        <span className="text-muted-foreground">
                          {Math.round(criterion.value / 2)} de 5
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Slider
                          value={[criterion.value]}
                          onValueChange={(value) =>
                            handleCriteriaChange(criterion.id, value[0])
                          }
                          max={10}
                          step={0.5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Muy bajo</span>
                          <span>Excelente</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Average Score Display */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
              <div className="flex items-center justify-between">
                <span className="text-foreground">Calificación Promedio</span>
                <div className="flex items-center gap-2">
                  <span className="text-3xl text-primary">
                    {averageScore.toFixed(1)}
                  </span>
                  <span className="text-muted-foreground">/10</span>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-foreground">
                <MessageSquare className="w-4 h-4" />
                Comentarios (Opcional)
              </Label>
              <Textarea
                placeholder="Comparte tu experiencia en esta calle... ¿Qué hace que esta ubicación sea especial o qué se podría mejorar?"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                {comments.length}/500 caracteres
              </p>
            </div>

            {/* Photo Upload */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-foreground">
                <Camera className="w-4 h-4" />
                Fotografías (Opcional)
              </Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <div>
                    <p className="text-foreground">
                      Haz clic para subir fotos
                    </p>
                    <p className="text-muted-foreground">
                      PNG, JPG hasta 10MB
                    </p>
                  </div>
                </label>
              </div>

              {/* Photo Previews */}
              {photos.length > 0 && (
                <div className="grid grid-cols-4 gap-3">
                  {photos.map((photo, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden border border-border group"
                    >
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 w-6 h-6 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
        </ScrollArea>

        {/* Footer Actions */}
        <div className="p-6 pt-4 border-t border-border bg-muted/30">
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="flex-1 bg-orange-500 hover:bg-orange-600"
            >
              Enviar Calificación
            </Button>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3">
            Al enviar, aceptas nuestros{" "}
            <a href="#" className="text-primary hover:underline">
              Términos de Uso
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
