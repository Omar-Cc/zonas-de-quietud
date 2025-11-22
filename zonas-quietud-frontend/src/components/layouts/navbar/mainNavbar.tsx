import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
	MapPin,
	Star,
	AlertTriangle,
	Bell,
	Menu,
	ChevronDown,
	LayoutDashboard,
	Heart,
	FileText,
	Settings,
	HelpCircle,
	LogOut,
	Map,
	Info,
	Search,
	Video,
	MessageCircle,
	Award,
	Users,
	Calendar,
	Newspaper,
	TrendingUp,
	BarChart3,
	GraduationCap,
	Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ContributionDialog } from "../../contributionDialog";

interface MainNavbarProps {
	isAuthenticated?: boolean;
	userName?: string;
	userAvatar?: string;
	notificationCount?: number;
	onMenuClick?: () => void;
	onSearchClick?: () => void;

}

export function MainNavbar({
	isAuthenticated = false,
	userName = "Usuario",
	userAvatar,
	notificationCount = 0,
	onMenuClick,
	onSearchClick,
}: MainNavbarProps) {
	const [isScrolled, setIsScrolled] = useState(false);
	const [contributionDialogOpen, setContributionDialogOpen] = useState(false);
	const [contributionDefaultTab, setContributionDefaultTab] = useState<"evaluate" | "report">("evaluate");

	// Recursos dropdown items
	const recursosItems = [
		{ icon: Info, label: "Cómo Funciona", page: "recursosPage" },
		{ icon: HelpCircle, label: "Centro de Ayuda", page: "ayuda" },
		{ icon: MessageCircle, label: "FAQ", page: "faq" },
		{ icon: GraduationCap, label: "Guía de Calificación", page: "guia" },
		{ icon: Video, label: "Video Tutoriales", page: "tutoriales" },
		{ icon: BarChart3, label: "Estadísticas", page: "statistics" },
	];

	// Comunidad dropdown items
	const comunidadItems = [
		{ icon: Newspaper, label: "Blog", page: "blog" },
		{ icon: Users, label: "Foro de Discusión", page: "foro" },
		{ icon: Star, label: "Testimonios", page: "testimonios" },
		{ icon: Award, label: "Embajadores", page: "embajadores" },
		{ icon: Calendar, label: "Eventos", page: "eventos" },
		{ icon: TrendingUp, label: "Ranking de Calles", page: "ranking" },
	];

	// Handle scroll effect
	if (typeof window !== "undefined") {
		window.addEventListener("scroll", () => {
			setIsScrolled(window.scrollY > 20);
		});
	}

	return (
		<nav
			className={`bg-white border-b border-border transition-all duration-300 ${isScrolled ? "shadow-md" : "shadow-sm"
				}`}
		>
			<div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
				{/* LEFT SECTION */}
				<div className="flex items-center gap-6">
					{/* Mobile Menu Toggle */}
					<Button
						variant="ghost"
						size="icon"
						className="lg:hidden"
						onClick={onMenuClick}
					>
						<Menu className="w-5 h-5" />
					</Button>

					{/* Logo */}
					<Link
						to="/"
						className="flex items-center gap-2 hover:opacity-80 transition-opacity"
					>
						<MapPin className="w-6 h-6" style={{ color: '#08A09C' }} />
						<span className="hidden md:block" style={{ color: '#08A09C' }}>Zonas de Quietud</span>
					</Link>

					{/* Desktop Navigation Links */}
					<div className="hidden lg:flex items-center gap-1">
						<Link to="/">
							<Button variant="ghost">
								Inicio
							</Button>
						</Link>

						<Link to="/app/mapa">
							<Button variant="ghost" style={{ color: '#08A09C' }}>
								<Map className="w-4 h-4 mr-2" />
								Explorar Mapa
							</Button>
						</Link>

						{/* Recursos Dropdown */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>

								<Button variant="ghost">
									Recursos
									<ChevronDown className="w-4 h-4 ml-1" />
								</Button>

							</DropdownMenuTrigger>
							<DropdownMenuContent align="start" className="w-56">
								<DropdownMenuLabel>Aprende y Explora</DropdownMenuLabel>
								<DropdownMenuSeparator />
								{recursosItems.map((item) => {
									const Icon = item.icon;
									const to = `/app/recursos?tab=${encodeURIComponent(item.label)}`;
									return (
										<DropdownMenuItem key={item.label} asChild>
											<Link to={to} className="flex items-center gap-2">
												<Icon className="w-4 h-4 mr-2" style={{ color: '#08A09C' }} />
												{item.label}
											</Link>
										</DropdownMenuItem>
									);
								})}
							</DropdownMenuContent>
						</DropdownMenu>

						{/* Comunidad Dropdown */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost">
									Comunidad
									<ChevronDown className="w-4 h-4 ml-1" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start" className="w-56">
								<DropdownMenuLabel>Conecta con Otros</DropdownMenuLabel>
								<DropdownMenuSeparator />
								{comunidadItems.map((item) => {
									const Icon = item.icon;
									const to = `/app/comunidad?tab=${encodeURIComponent(item.label)}`;
									return (
										<DropdownMenuItem key={item.label} asChild>
											<Link to={to} className="flex items-center gap-2">
												<Icon className="w-4 h-4 mr-2" style={{ color: '#007BFF' }} />
												{item.label}
											</Link>
										</DropdownMenuItem>
									);
								})}
							</DropdownMenuContent>
						</DropdownMenu>

						<Link to="/app/planes">
							<Button variant="ghost">
								Planes
							</Button>
						</Link>
					</div>
				</div>
				<div className="flex items-center gap-2">
					{/* Search Button (Desktop) */}
					<Button
						variant="ghost"
						className="hidden lg:flex items-center gap-2"
						onClick={onSearchClick}
					>
						<Search className="w-4 h-4" style={{ color: '#08A09C' }} />
						<span className="text-sm hidden xl:inline" style={{ color: '#6c757d' }}>
							Buscar
						</span>

					</Button>

					{isAuthenticated ? (
						<>
							{/* Action Button (Desktop) - Contribuir Unificado */}
							<div className="hidden lg:flex items-center gap-2">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button style={{ backgroundColor: '#08A09C', color: '#FFFFFF' }} className="hover:opacity-90">
											<Plus className="w-4 h-4 mr-2" />
											Contribuir
											<ChevronDown className="w-4 h-4 ml-1" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end" className="w-56">
										<DropdownMenuLabel>¿Cómo quieres contribuir?</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem
											onClick={() => {
												setContributionDefaultTab("evaluate");
												setContributionDialogOpen(true);
											}}
											className="cursor-pointer"
										>
											<Star className="w-4 h-4 mr-2" style={{ color: '#08A09C' }} />
											<div>
												<div className="font-medium">Evaluar Zona</div>
												<div className="text-xs text-muted-foreground">Califica los criterios de la calle</div>
											</div>
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => {
												setContributionDefaultTab("report");
												setContributionDialogOpen(true);
											}}
											className="cursor-pointer"
										>
											<AlertTriangle className="w-4 h-4 mr-2" style={{ color: '#FF9800' }} />
											<div>
												<div className="font-medium">Reportar Problema</div>
												<div className="text-xs text-muted-foreground">Alerta sobre un incidente urgente</div>
											</div>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>

							{/* Notifications */}
							<div className="relative">
								<Link to="/app/notificaciones">
								<Button variant="ghost" size="icon" className="relative">
									<Bell className="w-5 h-5" />
									{notificationCount > 0 && (
										<Badge
											variant="destructive"
											className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 animate-pulse"
										>
											{notificationCount}
										</Badge>
									)}
								</Button>
								</Link>
							</div>

							{/* User Menu */}
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" className="relative h-9 w-9 rounded-full">
										<Avatar className="h-9 w-9">
											<AvatarImage src={userAvatar} alt={userName} />
											<AvatarFallback>{userName.charAt(0)}</AvatarFallback>
										</Avatar>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="w-56">
									<DropdownMenuLabel>
										<div className="flex flex-col space-y-1">
											<p>{userName}</p>
											<p className="text-muted-foreground">usuario@email.com</p>
										</div>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild>
										<Link to="/app/miDashboard" className="flex items-center gap-4">
											<LayoutDashboard className="w-4 h-4 mr-2" />
											Mi Dashboard
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link to="/app/calificaciones" className="flex items-center gap-4">
											<Star className="w-4 h-4 mr-2" />
											Mis Calificaciones
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link to="/app/zonasInteres" className="flex items-center gap-4">
											<Heart className="w-4 h-4 mr-2" />
											Mis Zonas de Interés
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link to="/app/reportes" className="flex items-center gap-4">
											<FileText className="w-4 h-4 mr-2" />
											Mis Reportes
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild>
										<Link to="/app/configuracion" className="flex items-center gap-4">
											<Settings className="w-4 h-4 mr-2" />
											Configuración
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link to="/app/ayuda" className="flex items-center gap-4">
											<HelpCircle className="w-4 h-4 mr-2" />
											Ayuda
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem className="text-destructive focus:text-destructive">
										{/* <Link to="/app/logout" className="flex items-center gap-4"> */}
											<LogOut className="w-4 h-4 mr-2" />
											Cerrar Sesión
										{/* </Link> */}
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</>
					) : (
						<>
							{/* Not Authenticated */}
							<Button variant="outline" className="hidden md:flex">
								Iniciar Sesión
							</Button>
							<Button>Registrarse</Button>
						</>
					)}
				</div>
			</div>

			{/* Contribution Dialog */}
			<ContributionDialog
				isOpen={contributionDialogOpen}
				onClose={() => setContributionDialogOpen(false)}
				defaultTab={contributionDefaultTab}
			/>
		</nav>
	);
}
