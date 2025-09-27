import { ArrowLeft, MoreVertical } from "lucide-react";
import { Button } from "../ui/button";
import lumaLogo from "figma:asset/8d1101853e0685ec37410200f2c1477cb637f829.png";

interface HeaderBarProps {
  title: string;
  onBack?: () => void;
  action?: React.ReactNode;
  showBack?: boolean;
}

export function HeaderBar({
  title,
  onBack,
  action,
  showBack = true,
}: HeaderBarProps) {
  const isMainPages = ["Courses", "My Tickets", "Events", "Profile"].includes(
    title
  );

  return (
    <div
      className={`flex items-center justify-between border-b border-border
                  sticky top-0 z-50 h-14 px-4
                  bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="w-8">
        {showBack && !isMainPages ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            aria-label="Kembali"
            className="h-8 w-8 p-0"
          >
            <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </Button>
        ) : (
          <div />
        )}
      </div>

      <div className="flex items-center gap-2">
        {title === "Luma" && (
          <img src={lumaLogo} alt="Luma" className="h-6 w-auto" />
        )}
        <h1 className="text-lg font-medium text-center">{title}</h1>
      </div>

      <div className="w-8 flex justify-end">{action || <div />}</div>
    </div>
  );
}
