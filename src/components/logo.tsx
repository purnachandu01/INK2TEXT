import { ScanText } from "lucide-react";
import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <ScanText className="h-6 w-6 text-primary" />
      <span className="font-bold text-lg font-headline text-foreground">
        Ink2Text Pro
      </span>
    </div>
  );
};

export default Logo;
