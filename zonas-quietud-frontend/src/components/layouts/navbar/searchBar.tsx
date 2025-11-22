import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onClick?: () => void;
}

export function SearchBar({ onClick }: SearchBarProps) {
  return (
    <div className="bg-white border-b border-border">
      <div className="max-w-[1400px] mx-auto px-4 py-3">
        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground h-11 px-4"
          onClick={onClick}
        >
          <Search className="w-4 h-4 mr-2" />
          <span>Buscar calle, distrito o punto de interés en Lima...</span>
        </Button>
      </div>
    </div>
  );
}
