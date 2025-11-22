import { Info, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface TopBarProps {
	message?: string;
	showClose?: boolean;
}

export function TopBar({
	message = "🌱 Ayuda a mejorar Lima: Califica tu calle y gana insignias exclusivas",
	showClose = true
}: TopBarProps) {
	const [isVisible, setIsVisible] = useState(true);

	if (!isVisible) return null;

	return (
		<div className="text-white" style={{ backgroundColor: '#08A09C' }}>
			<div className="max-w-[1400px] mx-auto px-4 py-2">
				<div className="flex items-center justify-between gap-4 text-sm">
					{/* Left - Message */}
					<div className="flex items-center gap-2 flex-1">
						<span className="hidden md:inline">{message}</span>
						<span className="md:hidden">🌱 Califica tu calle y gana insignias</span>
					</div>

					{/* Right - Quick Links */}
					<div className="flex items-center gap-3">
						<a
							href="#ayuda"
							className="hidden sm:flex items-center gap-1 hover:underline"
						>
							<Info className="w-3.5 h-3.5" />
							<span className="hidden lg:inline">Ayuda</span>
						</a>
						<a
							href="#contacto"
							className="hidden sm:flex items-center gap-1 hover:underline"
						>
							<Phone className="w-3.5 h-3.5" />
							<span className="hidden lg:inline">Contacto</span>
						</a>

						{showClose && (
							<Button
								variant="ghost"
								size="icon"
								className="h-5 w-5 text-white hover:bg-white/20"
								onClick={() => setIsVisible(false)}
							>
								<X className="w-3.5 h-3.5" />
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
