import { useState } from "react";
import {
  AlertTriangle,
  MapPin,
  Upload,
  X,
  Camera,
  Video,
  FileText,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

interface IncidentReportFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const incidentTypes = [
  { value: "robbery", label: "Robo", severity: "high" },
  { value: "assault", label: "Asalto", severity: "high" },
  { value: "vandalism", label: "Vandalismo", severity: "medium" },
  { value: "suspicious", label: "Actividad Sospechosa", severity: "medium" },
  { value: "accident", label: "Accidente de Tránsito", severity: "high" },
  { value: "noise", label: "Perturbación del Orden", severity: "low" },
  { value: "infrastructure", label: "Daño a Infraestructura", severity: "medium" },
  { value: "lighting", label: "Falta de Iluminación", severity: "low" },
  { value: "other", label: "Otro", severity: "low" },
];

export function IncidentReportForm({ isOpen, onClose }: IncidentReportFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [incidentType, setIncidentType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState({ lat: -12.0464, lng: -77.0428 });
  const [address, setAddress] = useState("Av. Arequipa, Miraflores");
  const [files, setFiles] = useState<File[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [urgency, setUrgency] = useState("medium");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (files.length + newFiles.length <= 5) {
        setFiles([...files, ...newFiles]);
      } else {
        alert("Máximo 5 archivos permitidos");
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    console.log("Incident Report:", {
      type: incidentType,
      description,
      location,
      address,
      files: files.length,
      anonymous: isAnonymous,
      urgency,
    });
    alert("¡Reporte enviado con éxito!");
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setCurrentStep(1);
    setIncidentType("");
    setDescription("");
    setFiles([]);
    setIsAnonymous(false);
    setUrgency("medium");
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceed = () => {
    if (currentStep === 1) return incidentType !== "";
    if (currentStep === 2) return address !== "";
    if (currentStep === 3) return description.length >= 20;
    return true;
  };

  const getSeverityColor = (severity: string) => {
    if (severity === "high") return "bg-red-100 text-red-700 border-red-300";
    if (severity === "medium") return "bg-amber-100 text-amber-700 border-amber-300";
    return "bg-gray-100 text-gray-700 border-gray-300";
  };

  const getUrgencyColor = (level: string) => {
    if (level === "high") return "destructive";
    if (level === "medium") return "default";
    return "secondary";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 gap-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-border bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-500" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl">Reportar Incidente</DialogTitle>
              <DialogDescription asChild>
                <div className="text-muted-foreground mt-1">
                  Ayuda a mantener segura tu comunidad reportando incidentes
                </div>
              </DialogDescription>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Paso {currentStep} de 4
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round((currentStep / 4) * 100)}% completado
              </span>
            </div>
            <Progress value={(currentStep / 4) * 100} className="h-2" />
          </div>

          {/* Step Labels */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {[
              { num: 1, label: "Tipo" },
              { num: 2, label: "Ubicación" },
              { num: 3, label: "Detalles" },
              { num: 4, label: "Multimedia" },
            ].map((step) => (
              <div
                key={step.num}
                className={`text-center p-2 rounded-lg transition-colors ${
                  currentStep === step.num
                    ? "bg-primary text-primary-foreground"
                    : currentStep > step.num
                    ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <p className="text-xs">{step.label}</p>
              </div>
            ))}
          </div>
        </DialogHeader>

        {/* Form Content */}
        <div className="p-6 min-h-[400px]">
          {/* Step 1: Incident Type */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <Label className="text-base mb-4 block">
                  ¿Qué tipo de incidente deseas reportar?
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {incidentTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setIncidentType(type.value)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        incidentType === type.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-foreground">{type.label}</span>
                        <Badge
                          variant="outline"
                          className={getSeverityColor(type.severity)}
                        >
                          {type.severity === "high" && "Alta"}
                          {type.severity === "medium" && "Media"}
                          {type.severity === "low" && "Baja"}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {incidentType && (
                <div className="space-y-3">
                  <Label>Nivel de Urgencia</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "low", label: "Baja" },
                      { value: "medium", label: "Media" },
                      { value: "high", label: "Alta" },
                    ].map((level) => (
                      <Button
                        key={level.value}
                        type="button"
                        variant={urgency === level.value ? getUrgencyColor(level.value) : "outline"}
                        onClick={() => setUrgency(level.value)}
                        className="w-full"
                      >
                        {level.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <Label className="text-base mb-4 block">
                  ¿Dónde ocurrió el incidente?
                </Label>
                
                {/* Mini Map */}
                <div className="relative w-full h-64 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden border-2 border-border mb-4">
                  <svg viewBox="0 0 600 400" className="w-full h-full">
                    {/* Grid background */}
                    <defs>
                      <pattern id="grid-incident" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-300 dark:text-gray-700" />
                      </pattern>
                    </defs>
                    <rect width="600" height="400" fill="url(#grid-incident)" />
                    
                    {/* Streets */}
                    <line x1="100" y1="200" x2="500" y2="200" stroke="#9ca3af" strokeWidth="4" />
                    <line x1="300" y1="50" x2="300" y2="350" stroke="#9ca3af" strokeWidth="4" />
                    
                    {/* Location pin */}
                    <g className="cursor-pointer">
                      <circle cx="300" cy="200" r="30" fill="#ef4444" opacity="0.2" />
                      <circle cx="300" cy="200" r="15" fill="#ef4444" opacity="0.3" />
                      <path
                        d="M 300 180 L 300 210 M 285 195 L 315 195"
                        stroke="#ef4444"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </g>
                  </svg>
                  
                  <div className="absolute top-3 left-3 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 shadow-lg border border-border">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-600" />
                      <span className="text-sm">Haz clic para ajustar</span>
                    </div>
                  </div>
                </div>

                {/* Address Input */}
                <div className="space-y-2">
                  <Label>Dirección o Referencia</Label>
                  <Input
                    placeholder="Ej: Av. Arequipa cuadra 15, frente al parque"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Coordenadas: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Description */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <Label className="text-base mb-4 block">
                  Describe lo que ocurrió
                </Label>
                <Textarea
                  placeholder="Proporciona todos los detalles relevantes: fecha, hora, personas involucradas, objetos, vehículos, etc. Cuanta más información compartas, más útil será tu reporte."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={8}
                  className="resize-none"
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">
                    Mínimo 20 caracteres requeridos
                  </p>
                  <p className={`text-xs ${description.length >= 20 ? "text-green-600" : "text-muted-foreground"}`}>
                    {description.length}/500
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="anonymous" className="cursor-pointer flex-1">
                  Enviar reporte de forma anónima
                </Label>
              </div>
            </div>
          )}

          {/* Step 4: Media Upload */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <Label className="text-base mb-4 block">
                  Adjunta evidencia (Opcional)
                </Label>
                <p className="text-sm text-muted-foreground mb-4">
                  Puedes adjuntar fotos o videos que ayuden a documentar el incidente. Máximo 5 archivos.
                </p>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-red-500/50 transition-colors">
                  <Input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-foreground mb-1">
                        Haz clic para subir archivos
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Imágenes o videos hasta 10MB cada uno
                      </p>
                    </div>
                    <div className="flex gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Camera className="w-4 h-4" />
                        <span className="text-xs">JPG, PNG</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Video className="w-4 h-4" />
                        <span className="text-xs">MP4, MOV</span>
                      </div>
                    </div>
                  </label>
                </div>

                {/* File Previews */}
                {files.length > 0 && (
                  <div className="mt-6">
                    <Label className="mb-3 block">Archivos adjuntos ({files.length}/5)</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="relative aspect-video rounded-lg overflow-hidden border border-border group bg-muted"
                        >
                          {file.type.startsWith("image/") ? (
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Video className="w-8 h-8 text-muted-foreground" />
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-1 text-xs truncate">
                            {file.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-6 pt-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={currentStep === 1 ? onClose : prevStep}
            >
              {currentStep === 1 ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </>
              ) : (
                <>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Anterior
                </>
              )}
            </Button>

            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={!canProceed()}
                className="min-w-[140px]"
              >
                Siguiente
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="min-w-[140px] bg-red-600 hover:bg-red-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Enviar Reporte
              </Button>
            )}
          </div>

          {/* Warning Notice */}
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg">
            <div className="flex gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 dark:text-amber-200">
                Los reportes falsos o malintencionados pueden tener consecuencias legales. Asegúrate de proporcionar información veraz.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
