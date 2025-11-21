import { useState } from "react";
import {
	Search,
	MapPin,
	Star,
	Map,
	Info,
	ChevronDown,
	LayoutDashboard,
	Heart,
	FileText,
	Settings,
	HelpCircle,
	LogOut,
	Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { TopBar } from "./topBar";
import { MainNavbar } from "./mainNavbar";
import { SearchBar } from "./SearchBar";
import { SearchDialog } from "./SearchDialog";
import { QuickAccessBar } from "./QuickAccessBar"; */

interface NavbarProps {
	isAuthenticated?: boolean;
	userName?: string;
	userAvatar?: string;
	notificationCount?: number;
	showTopBar?: boolean;
	showQuickAccess?: boolean;
	onNavigate?: (page: string) => void;
}

export function Navbar({
	isAuthenticated = false,
	userName = "Usuario",
	userAvatar,
	notificationCount = 0,
	showTopBar = true,
	showQuickAccess = true,
	onNavigate,
}: NavbarProps) {
	const [searchValue, setSearchValue] = useState("");
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [searchDialogOpen, setSearchDialogOpen] = useState(false);
	const [contributionDialogOpen, setContributionDialogOpen] = useState(false);
	const [contributionDefaultTab, setContributionDefaultTab] = useState<"evaluate" | "report">("evaluate");

	// Mock data para distritos
	const distritos = [
		"Miraflores",
		"San Isidro",
		"Barranco",
		"Surco",
		"La Molina",
		"San Borja",
		"Jesús María",
		"Lince",
	];

	return (
		<>
			{/* Three-tier navbar for desktop */}
			<div className="fixed top-0 left-0 right-0 z-50">
				{/* Top Bar - Only on desktop */}
				{showTopBar && (
					<div className="hidden lg:block">
						<TopBar />
					</div>
				)}

				{/* Main Navbar */}
				<MainNavbar
					isAuthenticated={isAuthenticated}
					userName={userName}
					userAvatar={userAvatar}
					notificationCount={notificationCount}
					onMenuClick={() => setMobileMenuOpen(true)}
					onSearchClick={() => setSearchDialogOpen(true)}
					onNavigate={onNavigate}
				/>

				{/* Quick Access Bar - Only on desktop */}
				{showQuickAccess && (
					<div className="hidden lg:block">
						<QuickAccessBar />
					</div>
				)}
			</div>

			{/* Search Dialog */}
			<SearchDialog
				open={searchDialogOpen}
				onOpenChange={setSearchDialogOpen}
			/>

			{/* Mobile Menu Sheet */}
			<Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
				<SheetContent side="left" className="w-[300px] overflow-y-auto">
					<div className="flex flex-col gap-6 py-6">
						{/* Logo */}
						<div className="mb-4">
							<h2 className="text-primary">Zonas de Quietud</h2>
						</div>

						{/* Mobile Search */}
						<div className="relative">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
								<Input
									placeholder="Buscar..."
									className="pl-9"
									value={searchValue}
									onChange={(e) => setSearchValue(e.target.value)}
								/>
							</div>
						</div>

						{/* Mobile Links */}
						<div className="flex flex-col gap-2">
							<Button
								variant="ghost"
								className="justify-start"
								onClick={() => {
									setSearchDialogOpen(true);
									setMobileMenuOpen(false);
								}}
							>
								<Search className="w-4 h-4 mr-2" />
								Buscar
							</Button>

							<Button
								variant="ghost"
								className="justify-start"
								onClick={() => setMobileMenuOpen(false)}
								asChild
							>
								<a href="/mapa">
									<Map className="w-4 h-4 mr-2" />
									Explorar Mapa
								</a>
							</Button>

							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" className="justify-start">
										<MapPin className="w-4 h-4 mr-2" />
										Distritos
										<ChevronDown className="w-4 h-4 ml-auto" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="start" className="w-48">
									{distritos.map((distrito) => (
										<DropdownMenuItem key={distrito}>
											{distrito}
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>

							<Button
								variant="ghost"
								className="justify-start"
								onClick={() => setMobileMenuOpen(false)}
								asChild
							>
								<a href="/como-funciona">
									<Info className="w-4 h-4 mr-2" />
									Cómo Funciona
								</a>
							</Button>

							<Button
								variant="ghost"
								className="justify-start"
								onClick={() => setMobileMenuOpen(false)}
								asChild
							>
								<a href="/planes">Planes</a>
							</Button>
						</div>

						{/* Mobile Action Buttons - Ya no se usan aquí, se usa el FAB */}
						{isAuthenticated && (
							<div className="flex flex-col gap-2 pt-4 border-t">
								<p className="text-xs text-muted-foreground text-center">
									Usa el botón flotante "+" para contribuir
								</p>
							</div>
						)}

						{/* Mobile User Menu */}
						{isAuthenticated ? (
							<div className="flex flex-col gap-2 pt-4 border-t">
								<Button
									variant="ghost"
									className="justify-start"
									onClick={() => setMobileMenuOpen(false)}
								>
									<LayoutDashboard className="w-4 h-4 mr-2" />
									Mi Dashboard
								</Button>
								<Button
									variant="ghost"
									className="justify-start"
									onClick={() => setMobileMenuOpen(false)}
								>
									<Star className="w-4 h-4 mr-2" />
									Mis Calificaciones
								</Button>
								<Button
									variant="ghost"
									className="justify-start"
									onClick={() => setMobileMenuOpen(false)}
								>
									<Heart className="w-4 h-4 mr-2" />
									Mis Zonas de Interés
								</Button>
								<Button
									variant="ghost"
									className="justify-start"
									onClick={() => setMobileMenuOpen(false)}
								>
									<FileText className="w-4 h-4 mr-2" />
									Mis Reportes
								</Button>
								<Button
									variant="ghost"
									className="justify-start"
									onClick={() => setMobileMenuOpen(false)}
								>
									<Settings className="w-4 h-4 mr-2" />
									Configuración
								</Button>
								<Button
									variant="ghost"
									className="justify-start"
									onClick={() => setMobileMenuOpen(false)}
								>
									<HelpCircle className="w-4 h-4 mr-2" />
									Ayuda
								</Button>
								<Button
									variant="ghost"
									className="justify-start text-destructive hover:text-destructive"
									onClick={() => setMobileMenuOpen(false)}
								>
									<LogOut className="w-4 h-4 mr-2" />
									Cerrar Sesión
								</Button>
							</div>
						) : (
							<div className="flex flex-col gap-2 pt-4 border-t">
								<Button variant="outline" className="w-full">
									Iniciar Sesión
								</Button>
								<Button className="w-full">Registrarse</Button>
							</div>
						)}
					</div>
				</SheetContent>
			</Sheet>

			{/* Floating Action Buttons (Mobile Only) */}
			<div className="fixed bottom-6 right-6 lg:hidden z-40 flex flex-col gap-3">
				{/* Search Button - Always visible */}
				<Button
					size="lg"
					className="rounded-full shadow-lg w-14 h-14 p-0"
					style={{ backgroundColor: '#007BFF', color: '#FFFFFF' }}
					onClick={() => setSearchDialogOpen(true)}
				>
					<Search className="w-6 h-6" />
				</Button>

				{/* Contribute Button - Only when authenticated */}
				{isAuthenticated && (
					<Button
						size="lg"
						className="rounded-full shadow-lg w-14 h-14 p-0 hover:opacity-90"
						style={{ backgroundColor: '#08A09C', color: '#FFFFFF' }}
						onClick={() => {
							setContributionDefaultTab("evaluate");
							setContributionDialogOpen(true);
						}}
					>
						<Plus className="w-6 h-6" />
					</Button>
				)}
			</div>

			{/* Contribution Dialog */}
			<ContributionDialog
				isOpen={contributionDialogOpen}
				onClose={() => setContributionDialogOpen(false)}
				defaultTab={contributionDefaultTab}
			/>
		</>
	);
}
