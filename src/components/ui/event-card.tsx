import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  poster: string;
  date: string;
  time: string;
  speaker: string;
  location: string;
  quota: number;
  registered: number;
  status: 'available' | 'closed' | 'coming-soon';
  onPress?: () => void;
}

export function EventCard({ 
  title, 
  description, 
  poster, 
  date, 
  time, 
  speaker,
  location,
  quota,
  registered,
  status,
  onPress 
}: EventCardProps) {
  const statusColors = {
    'available': 'bg-success text-success-foreground',
    'closed': 'bg-destructive text-destructive-foreground',
    'coming-soon': 'bg-warning text-warning-foreground'
  };
  
  const statusLabels = {
    'available': 'Available',
    'closed': 'Closed',
    'coming-soon': 'Coming Soon'
  };

  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onPress}
    >
      <div className="aspect-video relative overflow-hidden">
        <ImageWithFallback
          src={poster}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="font-medium text-lg mb-1">{title}</h3>
          <p className="text-sm opacity-90">{speaker}</p>
        </div>
        <Badge 
          className={`absolute top-4 right-4 ${statusColors[status]}`}
        >
          {statusLabels[status]}
        </Badge>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{registered}/{quota} registered</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}