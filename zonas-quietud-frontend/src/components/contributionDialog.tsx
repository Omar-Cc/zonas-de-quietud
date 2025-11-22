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
  MapPin,
  Star,
  ShieldAlert,
  TrendingUp,
  Bell,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";

interface ContributionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  streetName?: string;
  district?: string;
  defaultTab?: "evaluate" | "report";
}

interface RatingCriteria {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  value: number;
}

const incidentTypes = [
  { value: "robbery", label: "Robo o Asalto", severity: "high", icon: ShieldAlert },
  { value: "vandalism", label: "Vandalismo", severity: "medium", icon: AlertTriangle },
  { value: "suspicious", label: "Actividad Sospechosa", severity: "medium", icon: AlertTriangle },
  { value: "accident", label: "Accidente de Tránsito", severity: "high", icon: AlertTriangle },
  { value: "noise", label: "Ruido Extremo Puntual", severity: "low", icon: Volume2 },
  { value: "infrastructure", label: "Infraestructura Dañada", severity: "medium", icon: AlertTriangle },
  { value: "lighting", label: "Falta de Iluminación", severity: "low", icon: AlertTriangle },
  { value: "pollution", label: "Contaminación Severa", severity: "medium", icon: Wind },
  { value: "other", label: "Otro Problema", severity: "low", icon: AlertTriangle },
];

export function ContributionDialog({
  isOpen,
  onClose,
  streetName = "Av. Arequipa",
  district = "Miraflores",
  defaultTab = "evaluate",
}: ContributionDialogProps) {
  const [activeTab, setActiveTab] = useState<"evaluate" | "report">(defaultTab);

  // Estado para Evaluación
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
      description: "¿Qué tan ruidosa es esta zona normalmente?",
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
  const [evaluationComments, setEvaluationComments] = useState("");
  const [evaluationPhotos, setEvaluationPhotos] = useState<File[]>([]);
  const [useStars, setUseStars] = useState(false);

  // Estado para Reporte de Incidente
  const [incidentType, setIncidentType] = useState("");
  const [incidentDescription, setIncidentDescription] = useState("");
  const [incidentPhotos, setIncidentPhotos] = useState<File[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [urgency, setUrgency] = useState("medium");

  const handleCriteriaChange = (id: string, value: number) => {
    setCriteria((prev) =>
      prev.map((c) => (c.id === id ? { ...c, value } : c))
    );
  };

  const handleEvaluationPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEvaluationPhotos([...evaluationPhotos, ...Array.from(e.target.files)]);
    }
  };

  const removeEvaluationPhoto = (index: number) => {
    setEvaluationPhotos(evaluationPhotos.filter((_, i) => i !== index));
  };

  const handleIncidentPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (incidentPhotos.length + newFiles.length <= 5) {
        setIncidentPhotos([...incidentPhotos, ...newFiles]);
      } else {
        alert("Máximo 5 archivos permitidos");
      }
    }
  };

  const removeIncidentPhoto = (index: number) => {
    setIncidentPhotos(incidentPhotos.filter((_, i) => i !== index));
  };

  const handleEvaluationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Evaluation submitted:", {
      street: streetName,
      district,
      criteria,
      comments: evaluationComments,
      photos: evaluationPhotos.length,
    });
    alert("¡Gracias por tu evaluación! Contribuiste al mapa de calor.");
    onClose();
  };

  const handleIncidentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Incident reported:", {
      street: streetName,
      district,
      type: incidentType,
      description: incidentDescription,
      photos: incidentPhotos.length,
      anonymous: isAnonymous,
      urgency,
    });
    alert("¡Reporte enviado! Alertaremos a la comunidad y autoridades.");
    onClose();
  };

  const averageScore =
    criteria.reduce((sum, c) => sum + c.value, 0) / criteria.length;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "#F44336";
      case "medium":
        return "#FF9800";
      case "low":
        return "#FFC107";
      default:
        return "#6EEB83";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="text-2xl">Contribuir a la Comunidad</DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" style={{ color: "#08A09C" }} />
                <span className="text-foreground">{streetName}</span>
                <Badge variant="secondary">{district}</Badge>
              </div>
              <p className="text-sm">
                Elige cómo quieres contribuir: evalúa la zona o reporta un problema urgente
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1">
          <div className="px-6 pt-4 bg-muted/30">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="evaluate" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Evaluar Zona
              </TabsTrigger>
              <TabsTrigger value="report" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Reportar Problema
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB 1: EVALUAR ZONA */}
          <TabsContent value="evaluate" className="m-0">
            <ScrollArea className="max-h-[calc(90vh-280px)]">
              <div className="p-6 space-y-4">
                {/* Información explicativa */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 mt-0.5" style={{ color: "#007BFF" }} />
                    <div className="text-sm">
                      <p className="text-foreground mb-1">
                        <strong>Evalúa la zona en general</strong>
                      </p>
                      <p className="text-muted-foreground">
                        Tu calificación se usa para generar el mapa de calor y ayudar a otros
                        ciudadanos a identificar las mejores zonas de Lima. Evalúa basándote en tu
                        experiencia general en esta calle.
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleEvaluationSubmit} className="space-y-6">
                  {/* Rating Type Toggle */}
                  <div className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                    <span className="text-sm text-muted-foreground">Tipo de calificación</span>
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
                  <div className="space-y-4">
                    {criteria.map((criterion) => {
                      const Icon = criterion.icon;
                      return (
                        <div
                          key={criterion.id}
                          className="space-y-3 p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1">
                              <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
                                style={{ backgroundColor: "#08A09C20" }}
                              >
                                <Icon className="w-5 h-5" style={{ color: "#08A09C" }} />
                              </div>
                              <div className="flex-1">
                                <Label className="text-base text-foreground">
                                  {criterion.label}
                                </Label>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {criterion.description}
                                </p>
                              </div>
                            </div>
                            <div
                              className="text-2xl min-w-[3rem] text-right"
                              style={{ color: "#08A09C" }}
                            >
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
                              <span className="text-sm text-muted-foreground">
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

                  {/* Average Score */}
                  <div
                    className="rounded-lg p-4 border"
                    style={{
                      background: "linear-gradient(to bottom right, #08A09C10, #08A09C20)",
                      borderColor: "#08A09C40",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">Calificación Promedio</span>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl" style={{ color: "#08A09C" }}>
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
                      placeholder="Comparte tu experiencia general en esta calle... ¿Qué la hace especial o qué se podría mejorar?"
                      value={evaluationComments}
                      onChange={(e) => setEvaluationComments(e.target.value)}
                      rows={3}
                      className="resize-none"
                    />
                  </div>

                  {/* Photo Upload */}
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-foreground">
                      <Camera className="w-4 h-4" />
                      Fotografías (Opcional)
                    </Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleEvaluationPhotoUpload}
                        className="hidden"
                        id="evaluation-photo-upload"
                      />
                      <label
                        htmlFor="evaluation-photo-upload"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        <Upload className="w-6 h-6 text-muted-foreground" />
                        <div className="text-sm">
                          <p className="text-foreground">Haz clic para subir fotos</p>
                          <p className="text-xs text-muted-foreground">PNG, JPG hasta 10MB</p>
                        </div>
                      </label>
                    </div>

                    {evaluationPhotos.length > 0 && (
                      <div className="grid grid-cols-4 gap-2">
                        {evaluationPhotos.map((photo, index) => (
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
                              onClick={() => removeEvaluationPhoto(index)}
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
              </div>
            </ScrollArea>

            {/* Footer para Evaluar */}
            <div className="p-6 pt-4 border-t border-border bg-muted/30">
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  onClick={handleEvaluationSubmit}
                  className="flex-1"
                  style={{ backgroundColor: "#08A09C", color: "#FFFFFF" }}
                >
                  Enviar Evaluación
                </Button>
              </div>
              <p className="text-center text-xs text-muted-foreground mt-3">
                Tu evaluación se sumará al mapa de calor de la zona
              </p>
            </div>
          </TabsContent>

          {/* TAB 2: REPORTAR PROBLEMA */}
          <TabsContent value="report" className="m-0">
            <ScrollArea className="max-h-[calc(90vh-280px)]">
              <div className="p-6 space-y-4">
                {/* Información explicativa */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 mt-0.5" style={{ color: "#FF9800" }} />
                    <div className="text-sm">
                      <p className="text-foreground mb-1">
                        <strong>Reporta un problema puntual y urgente</strong>
                      </p>
                      <p className="text-muted-foreground">
                        Usa este reporte para alertar sobre incidentes específicos que requieren
                        atención inmediata (robos, accidentes, infraestructura dañada, etc.). Esto
                        NO afecta el mapa de calor, sino que genera alertas para la comunidad.
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleIncidentSubmit} className="space-y-6">
                  {/* Incident Type */}
                  <div className="space-y-3">
                    <Label className="text-foreground">Tipo de Problema *</Label>
                    <Select value={incidentType} onValueChange={setIncidentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo de problema" />
                      </SelectTrigger>
                      <SelectContent>
                        {incidentTypes.map((type) => {
                          const Icon = type.icon;
                          return (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                <Icon
                                  className="w-4 h-4"
                                  style={{ color: getSeverityColor(type.severity) }}
                                />
                                {type.label}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Urgency Level */}
                  <div className="space-y-3">
                    <Label className="text-foreground">Nivel de Urgencia *</Label>
                    <Select value={urgency} onValueChange={setUrgency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: "#FFC107" }}
                            />
                            Baja - Puede esperar
                          </div>
                        </SelectItem>
                        <SelectItem value="medium">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: "#FF9800" }}
                            />
                            Media - Atención pronto
                          </div>
                        </SelectItem>
                        <SelectItem value="high">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: "#F44336" }}
                            />
                            Alta - Requiere atención inmediata
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Description */}
                  <div className="space-y-3">
                    <Label className="text-foreground">Descripción del Problema *</Label>
                    <Textarea
                      placeholder="Describe el problema con el mayor detalle posible: ¿Qué pasó? ¿Cuándo? ¿Dónde exactamente?"
                      value={incidentDescription}
                      onChange={(e) => setIncidentDescription(e.target.value)}
                      rows={4}
                      className="resize-none"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      {incidentDescription.length}/500 caracteres
                    </p>
                  </div>

                  {/* Photo Upload */}
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-foreground">
                      <Camera className="w-4 h-4" />
                      Evidencia Fotográfica (Recomendado)
                    </Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-orange-500/50 transition-colors">
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleIncidentPhotoUpload}
                        className="hidden"
                        id="incident-photo-upload"
                      />
                      <label
                        htmlFor="incident-photo-upload"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        <Upload className="w-6 h-6 text-muted-foreground" />
                        <div className="text-sm">
                          <p className="text-foreground">Sube fotos del problema (máx. 5)</p>
                          <p className="text-xs text-muted-foreground">
                            Las fotos ayudan a validar el reporte
                          </p>
                        </div>
                      </label>
                    </div>

                    {incidentPhotos.length > 0 && (
                      <div className="grid grid-cols-4 gap-2">
                        {incidentPhotos.map((photo, index) => (
                          <div
                            key={index}
                            className="relative aspect-square rounded-lg overflow-hidden border border-border group"
                          >
                            <img
                              src={URL.createObjectURL(photo)}
                              alt={`Evidence ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeIncidentPhoto(index)}
                              className="absolute top-1 right-1 w-6 h-6 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Anonymous Toggle */}
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
                    <div className="flex-1">
                      <Label className="text-foreground">Reporte Anónimo</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tu identidad no será compartida públicamente
                      </p>
                    </div>
                    <Switch checked={isAnonymous} onCheckedChange={setIsAnonymous} />
                  </div>
                </form>
              </div>
            </ScrollArea>

            {/* Footer para Reportar */}
            <div className="p-6 pt-4 border-t border-border bg-muted/30">
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  onClick={handleIncidentSubmit}
                  className="flex-1"
                  style={{ backgroundColor: "#FF9800", color: "#FFFFFF" }}
                  disabled={!incidentType || !incidentDescription}
                >
                  Enviar Reporte
                </Button>
              </div>
              <p className="text-center text-xs text-muted-foreground mt-3">
                Tu reporte alertará a la comunidad y autoridades
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
