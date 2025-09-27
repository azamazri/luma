import { ArrowLeft, MoreVertical } from 'lucide-react';
import { Button } from '../ui/button';
import lumaLogo from 'figma:asset/8d1101853e0685ec37410200f2c1477cb637f829.png';

interface HeaderBarProps {
  title: string;
  onBack?: () => void;
  action?: React.ReactNode;
  showBack?: boolean;
}

export function HeaderBar({ title, onBack, action, showBack = true }: HeaderBarProps) {
  const isMainPages = ['Courses', 'My Tickets', 'Events', 'Profile'].includes(title);
  
  return (
    <div className={`flex items-center justify-between p-4 border-b border-border ${
      isMainPages ? 'bg-transparent backdrop-blur-sm' : 'bg-card'
    }`}>
      <div className="flex items-center gap-3">
        {showBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="h-8 w-8 p-0 hover:bg-secondary"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        {!showBack && <div className="w-8" />}
      </div>
      
      <div className="flex items-center gap-2">
        {title === 'Luma' && (
          <img src={lumaLogo} alt="Luma" className="h-6 w-auto" />
        )}
        <h1 className="text-lg font-medium text-center">{title}</h1>
      </div>
      
      <div className="w-8 flex justify-end">
        {action || <div />}
      </div>
    </div>
  );
}