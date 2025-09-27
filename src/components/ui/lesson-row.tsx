import { Play, Lock, ChevronRight, Clock } from 'lucide-react';
import { Button } from './button';

interface LessonRowProps {
  title: string;
  duration: string;
  isLocked?: boolean;
  isCompleted?: boolean;
  onPress?: () => void;
}

export function LessonRow({ 
  title, 
  duration, 
  isLocked = false, 
  isCompleted = false,
  onPress 
}: LessonRowProps) {
  return (
    <Button
      variant="ghost"
      className="w-full h-auto p-4 justify-start hover:bg-secondary"
      onClick={onPress}
      disabled={isLocked}
    >
      <div className="flex items-center gap-3 w-full">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isLocked 
            ? 'bg-muted text-muted-foreground' 
            : isCompleted
            ? 'bg-success text-success-foreground'
            : 'bg-primary text-primary-foreground'
        }`}>
          {isLocked ? (
            <Lock className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </div>
        
        <div className="flex-1 text-left">
          <p className={`font-medium ${isLocked ? 'text-muted-foreground' : ''}`}>
            {title}
          </p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{duration}</span>
          </div>
        </div>
        
        <ChevronRight className={`h-4 w-4 ${
          isLocked ? 'text-muted-foreground' : 'text-foreground'
        }`} />
      </div>
    </Button>
  );
}