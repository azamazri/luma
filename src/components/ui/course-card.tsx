import { Clock, BookOpen, Lock } from 'lucide-react';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  price: number;
  isLocked?: boolean;
  onPress?: () => void;
}

export function CourseCard({ 
  title, 
  description, 
  thumbnail, 
  level, 
  duration, 
  lessons, 
  price, 
  isLocked = false,
  onPress 
}: CourseCardProps) {
  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onPress}
    >
      <div className="aspect-video relative overflow-hidden">
        <ImageWithFallback
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        {isLocked && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Lock className="h-8 w-8 text-white" />
          </div>
        )}
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-medium line-clamp-2">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{lessons} lessons</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {level}
          </Badge>
          <Badge 
            variant={price === 0 ? "secondary" : "default"}
            className={price === 0 ? "bg-success text-success-foreground" : ""}
          >
            {price === 0 ? 'FREE' : `Rp ${price.toLocaleString('id-ID')}`}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}