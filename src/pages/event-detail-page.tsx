import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Calendar, Clock, MapPin, Users, Speaker } from 'lucide-react';
import { mockEvents } from '../data/mock-data';

interface EventDetailPageProps {
  eventId: string;
  onNavigate: (screen: string, params?: any) => void;
  isAuthenticated: boolean;
}

export function EventDetailPage({ 
  eventId, 
  onNavigate, 
  isAuthenticated 
}: EventDetailPageProps) {
  const event = mockEvents.find(e => e.id === eventId);
  
  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-2">Event not found</h2>
          <Button onClick={() => onNavigate('events')} variant="outline">
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

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

  const handleCTAPress = () => {
    if (!isAuthenticated) {
      onNavigate('login');
      return;
    }

    if (event.status === 'available') {
      onNavigate('checkout', { type: 'event', item: event });
    }
  };

  const isCtaDisabled = event.status !== 'available';

  return (
    <div className="flex flex-col min-h-full bg-background">
      {/* Hero Section */}
      <div className="relative aspect-video">
        <ImageWithFallback
          src={event.poster}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-4 right-4 text-white">
          <h1 className="text-2xl font-semibold mb-2">{event.title}</h1>
          <div className="flex items-center gap-2 text-sm opacity-90">
            <Speaker className="h-4 w-4" />
            <span>by {event.speaker}</span>
          </div>
        </div>
        <Badge 
          className={`absolute top-4 right-4 ${statusColors[event.status]}`}
        >
          {statusLabels[event.status]}
        </Badge>
      </div>

      {/* Event Details */}
      <div className="p-4 space-y-6">
        {/* Meta Information */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Calendar className="h-5 w-5" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Clock className="h-5 w-5" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <MapPin className="h-5 w-5" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Users className="h-5 w-5" />
            <span>{event.registered}/{event.quota} registered</span>
          </div>
        </div>

        {/* Map Section (Static Preview) */}
        <div className="space-y-3">
          <h3 className="font-medium">Location</h3>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5" />
            <div className="text-center">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">{event.location}</p>
              <p className="text-xs text-muted-foreground">Tap to view in maps</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <h3 className="font-medium">About this event</h3>
          <p className="text-muted-foreground leading-relaxed">
            {event.description}
          </p>
          
          <div className="space-y-2">
            <h4 className="font-medium">What you'll get:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Access to all sessions and workshops</li>
              <li>• Networking opportunities with industry experts</li>
              <li>• Digital certificate of attendance</li>
              <li>• Access to exclusive event materials</li>
              <li>• Lunch and refreshments included</li>
            </ul>
          </div>
        </div>

        {/* Speaker Info */}
        <div className="space-y-3">
          <h3 className="font-medium">Speaker</h3>
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium">{event.speaker}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Industry expert with 10+ years of experience in tech innovation and digital transformation.
            </p>
          </div>
        </div>

        {/* Registration Status */}
        <div className="bg-accent/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Registration Status</p>
              <p className="text-sm text-muted-foreground">
                {event.quota - event.registered} spots remaining
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">Price</p>
              <p className="text-lg font-semibold text-primary">
                Rp {event.price?.toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 p-4 bg-card border-t border-border mt-auto">
        <Button 
          className="w-full"
          onClick={handleCTAPress}
          disabled={isCtaDisabled}
        >
          {event.status === 'available' 
            ? `BUY TICKET - Rp ${event.price?.toLocaleString('id-ID')}`
            : event.status === 'closed'
            ? 'REGISTRATION CLOSED'
            : 'COMING SOON'
          }
        </Button>
      </div>
    </div>
  );
}