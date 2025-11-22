import { useState } from "react";
import {
    ArrowLeft,
    Star,
    MapPin,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    Wind,
    Volume2,
    Accessibility,
    Heart,
    Calendar,
    Users,
    Image as ImageIcon,
    Share2,
    Bookmark,
    ThumbsUp,
    MessageSquare,
    Plus,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import { ScrollArea } from "../components/ui/scroll-area";
import { Navbar } from "../components/layouts/navbar/navbar";
import { RadarChart } from "../components/radarChart";
import { ContributionDialog } from "../components/contributionDialog";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
} from "recharts";

const streetData = {
    name: "Av. Arequipa",
    district: "Miraflores",
    overallScore: 8.5,
    totalReviews: 245,
    lastUpdated: "Hace 2 horas",
    coordinates: "-12.1234, -77.5678",
    categories: [
        { name: "Seguridad", value: 8.2, icon: AlertTriangle, change: +0.3 },
        { name: "Calidad del Aire", value: 7.8, icon: Wind, change: -0.2 },
        { name: "Nivel de Ruido", value: 5.5, icon: Volume2, change: +0.5 },
        { name: "Accesibilidad", value: 9.0, icon: Accessibility, change: +0.1 },
        { name: "Tranquilidad", value: 7.2, icon: Heart, change: -0.1 },
    ],
    externalMetrics: [
        { label: "Índice de Criminalidad", value: "Bajo", status: "positive", score: 8.5 },
        { label: "Calidad del Aire (PM2.5)", value: "32 µg/m³", status: "neutral", score: 6.5 },
        { label: "Nivel de Ruido Promedio", value: "65 dB", status: "negative", score: 5.0 },
        { label: "Acceso a Transporte", value: "Excelente", status: "positive", score: 9.0 },
        { label: "Proximidad a Parques", value: "5 parques", status: "positive", score: 8.0 },
        { label: "Iluminación Nocturna", value: "Buena", status: "positive", score: 7.5 },
    ],
    reviews: [
        {
            id: 1,
            user: "María González",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
            rating: 9,
            date: "Hace 3 días",
            comment: "Excelente calle para vivir. Muy segura y con todos los servicios cerca. El único problema es el ruido durante las horas pico.",
            photos: 2,
            likes: 12,
        },
        {
            id: 2,
            user: "Carlos Ruiz",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
            rating: 8,
            date: "Hace 5 días",
            comment: "Buena ubicación y accesibilidad. Las veredas están en buen estado y hay rampas para personas con discapacidad.",
            photos: 1,
            likes: 8,
        },
        {
            id: 3,
            user: "Ana Martínez",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
            rating: 7,
            date: "Hace 1 semana",
            comment: "Me gusta la zona pero el tráfico es intenso. Recomendaría mejorar la sincronización de semáforos.",
            photos: 3,
            likes: 15,
        },
    ],
    trendData: [
        { month: "Ene", score: 7.8 },
        { month: "Feb", score: 8.0 },
        { month: "Mar", score: 8.2 },
        { month: "Abr", score: 8.1 },
        { month: "May", score: 8.3 },
        { month: "Jun", score: 8.5 },
    ],
};

export default function StreetDetail() {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [contributionDialogOpen, setContributionDialogOpen] = useState(false);
    const [contributionDefaultTab, setContributionDefaultTab] = useState<"evaluate" | "report">("evaluate");

    const radarData = streetData.categories.map((cat) => ({
        subject: cat.name,
        value: cat.value,
        fullMark: 10,
    }));

    const getScoreColor = (score: number) => {
        if (score >= 8) return "text-green-600";
        if (score >= 6) return "text-lime-600";
        if (score >= 4) return "text-yellow-600";
        if (score >= 2) return "text-orange-600";
        return "text-red-600";
    };

    const getScoreBgColor = (score: number) => {
        if (score >= 8) return "bg-green-50 border-green-200";
        if (score >= 6) return "bg-lime-50 border-lime-200";
        if (score >= 4) return "bg-yellow-50 border-yellow-200";
        if (score >= 2) return "bg-orange-50 border-orange-200";
        return "bg-red-50 border-red-200";
    };

    const getStatusColor = (status: string) => {
        if (status === "positive") return "text-green-600 bg-green-50 border-green-200";
        if (status === "neutral") return "text-yellow-600 bg-yellow-50 border-yellow-200";
        return "text-red-600 bg-red-50 border-red-200";
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <Navbar isAuthenticated={true} userName="María García" notificationCount={3} />

            <div className="pt-[70px]">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="mb-6">
                        <Button variant="ghost" className="mb-4" onClick={() => window.history.back()}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Volver al Mapa
                        </Button>

                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-4xl text-foreground">{streetData.name}</h1>
                                    <Badge variant="secondary" className="text-base">
                                        {streetData.district}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{streetData.coordinates}</span>
                                    </div>
                                    <Separator orientation="vertical" className="h-4" />
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>Actualizado {streetData.lastUpdated}</span>
                                    </div>
                                    <Separator orientation="vertical" className="h-4" />
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        <span>{streetData.totalReviews} evaluaciones</span>
                                    </div>
                                </div>
                            </div>

                            {/* Overall Score */}
                            <div className={`${getScoreBgColor(streetData.overallScore)} rounded-2xl p-6 border-2 text-center min-w-[160px]`}>
                                <p className="text-muted-foreground mb-1">Calificación General</p>
                                <div className={`text-5xl ${getScoreColor(streetData.overallScore)}`}>
                                    {streetData.overallScore.toFixed(1)}
                                </div>
                                <p className="text-muted-foreground mt-1">de 10.0</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-6">
                            <Button
                                style={{ backgroundColor: '#08A09C', color: '#FFFFFF' }}
                                className="hover:opacity-90"
                                onClick={() => {
                                    setContributionDefaultTab("evaluate");
                                    setContributionDialogOpen(true);
                                }}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Contribuir
                            </Button>
                            <Button variant="outline">
                                <Share2 className="w-4 h-4 mr-2" />
                                Compartir
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setIsBookmarked(!isBookmarked)}
                            >
                                <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? "fill-current" : ""}`} />
                                {isBookmarked ? "Guardado" : "Guardar"}
                            </Button>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Categories Breakdown */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Desglose por Categorías</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Tabs defaultValue="bars" className="w-full">
                                        <TabsList className="grid w-full grid-cols-2 mb-4">
                                            <TabsTrigger value="bars">Barras</TabsTrigger>
                                            <TabsTrigger value="radar">Radar</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="bars" className="space-y-4">
                                            {streetData.categories.map((category) => {
                                                const Icon = category.icon;
                                                return (
                                                    <div key={category.name} className="space-y-2">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <Icon className="w-4 h-4 text-muted-foreground" />
                                                                <span className="text-foreground">{category.name}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className={`text-lg ${getScoreColor(category.value)}`}>
                                                                    {category.value.toFixed(1)}
                                                                </span>
                                                                {category.change !== 0 && (
                                                                    <Badge
                                                                        variant={category.change > 0 ? "default" : "destructive"}
                                                                        className="text-xs"
                                                                    >
                                                                        {category.change > 0 ? (
                                                                            <TrendingUp className="w-3 h-3 mr-1" />
                                                                        ) : (
                                                                            <TrendingDown className="w-3 h-3 mr-1" />
                                                                        )}
                                                                        {Math.abs(category.change).toFixed(1)}
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <Progress value={category.value * 10} className="h-3" />
                                                    </div>
                                                );
                                            })}
                                        </TabsContent>

                                        <TabsContent value="radar">
                                            <div className="h-[400px]">
                                                <RadarChart data={radarData} />
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>

                            {/* Trend Chart */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Tendencia de Calificación</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[250px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={streetData.trendData}>
                                                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                                                <XAxis
                                                    dataKey="month"
                                                    tick={{ fill: "currentColor" }}
                                                    className="text-muted-foreground"
                                                />
                                                <YAxis
                                                    domain={[0, 10]}
                                                    tick={{ fill: "currentColor" }}
                                                    className="text-muted-foreground"
                                                />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: "hsl(var(--background))",
                                                        border: "1px solid hsl(var(--border))",
                                                        borderRadius: "0.5rem",
                                                    }}
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="score"
                                                    stroke="#14b8a6"
                                                    strokeWidth={3}
                                                    dot={{ fill: "#14b8a6", r: 5 }}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Reviews Section */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>Comentarios Recientes</span>
                                        <Badge variant="secondary">{streetData.totalReviews} total</Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ScrollArea className="h-[600px] pr-4">
                                        <div className="space-y-6">
                                            {streetData.reviews.map((review) => (
                                                <div key={review.id} className="space-y-3 pb-6 border-b border-border last:border-0">
                                                    <div className="flex items-start gap-3">
                                                        <Avatar>
                                                            <AvatarImage src={review.avatar} alt={review.user} />
                                                            <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between mb-1">
                                                                <h4 className="text-foreground">{review.user}</h4>
                                                                <span className="text-muted-foreground">{review.date}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <div className="flex">
                                                                    {Array.from({ length: 5 }, (_, i) => (
                                                                        <Star
                                                                            key={i}
                                                                            className={`w-4 h-4 ${i < Math.round(review.rating / 2)
                                                                                    ? "fill-orange-500 text-orange-500"
                                                                                    : "text-gray-300"
                                                                                }`}
                                                                        />
                                                                    ))}
                                                                </div>
                                                                <span className={getScoreColor(review.rating)}>
                                                                    {review.rating.toFixed(1)}
                                                                </span>
                                                            </div>
                                                            <p className="text-muted-foreground mb-3">{review.comment}</p>
                                                            {review.photos > 0 && (
                                                                <div className="flex items-center gap-2 mb-3">
                                                                    <ImageIcon className="w-4 h-4 text-muted-foreground" />
                                                                    <span className="text-muted-foreground">
                                                                        {review.photos} {review.photos === 1 ? "foto" : "fotos"}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            <div className="flex items-center gap-4">
                                                                <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                                                                    <ThumbsUp className="w-4 h-4" />
                                                                    <span>{review.likes}</span>
                                                                </button>
                                                                <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                                                                    <MessageSquare className="w-4 h-4" />
                                                                    <span>Responder</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="space-y-6">
                            {/* External Metrics */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Métricas Externas</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {streetData.externalMetrics.map((metric, index) => (
                                        <div
                                            key={index}
                                            className={`p-3 rounded-lg border ${getStatusColor(metric.status)}`}
                                        >
                                            <p className="text-sm mb-1">{metric.label}</p>
                                            <p className="font-medium">{metric.value}</p>
                                            <Progress value={metric.score * 10} className="h-1 mt-2" />
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Quick Stats */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Estadísticas Rápidas</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Total Evaluaciones</span>
                                        <span className="text-foreground">{streetData.totalReviews}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Promedio del Mes</span>
                                        <span className="text-green-600">8.3</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Tendencia</span>
                                        <Badge variant="default" className="bg-green-600">
                                            <TrendingUp className="w-3 h-3 mr-1" />
                                            +3.2%
                                        </Badge>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Ranking Distrito</span>
                                        <span className="text-foreground">#3 de 142</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Compare CTA */}
                            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                                <CardContent className="pt-6">
                                    <h3 className="text-foreground mb-2">Comparar con Otras Calles</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Analiza las diferencias con otras zonas de interés
                                    </p>
                                    <Button className="w-full">
                                        <TrendingUp className="w-4 h-4 mr-2" />
                                        Comenzar Comparación
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
