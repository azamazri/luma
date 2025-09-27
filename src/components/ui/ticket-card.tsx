import { QrCode, Calendar, Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from './card';
import { Badge } from './badge';

interface TicketCardProps {
  id: string;
  eventTitle: string;
  date: string;
  time: string;
  location: string;
  ticketCode: string;
  status: 'active' | 'used' | 'expired';
  onPress?: () => void;
}

export function TicketCard({ 
  eventTitle, 
  date, 
  time, 
  location, 
  ticketCode,
  status,
  onPress 
}: TicketCardProps) {
  const statusColors = {
    'active': 'bg-success text-success-foreground',
    'used': 'bg-muted text-muted-foreground',
    'expired': 'bg-destructive text-destructive-foreground'
  };
  
  const statusLabels = {
    'active': 'Active',
    'used': 'Used',
    'expired': 'Expired'
  };

  return (
    <Card 
      className={`overflow-hidden cursor-pointer hover:shadow-lg transition-shadow ${
        status !== 'active' ? 'opacity-75' : ''
      }`}
      onClick={onPress}
    >
      <div className="bg-gradient-to-r from-primary to-primary/80 p-4 text-white relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-lg mb-2">{eventTitle}</h3>
            <div className="space-y-1 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                <span>{time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                <span>{location}</span>
              </div>
            </div>
          </div>
          <div className="bg-white/20 p-2 rounded-lg">
            <QrCode className="h-8 w-8" />
          </div>
        </div>
        <Badge 
          className={`absolute top-4 right-4 ${statusColors[status]}`}
        >
          {statusLabels[status]}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Ticket Code</p>
          <p className="font-mono text-sm font-medium">{ticketCode}</p>
        </div>
      </CardContent>
    </Card>
  );
}