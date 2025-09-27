import { useState } from 'react';
import { Calendar, Clock, MapPin, User, QrCode, Download, Share2, CheckCircle, Trophy, Key } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { mockTickets, mockEvents } from '../data/mock-data';

interface TicketDetailPageProps {
  ticketId: string;
  onNavigate: (screen: string, params?: any) => void;
}

export function TicketDetailPage({ ticketId, onNavigate }: TicketDetailPageProps) {
  const [quizCode, setQuizCode] = useState('');
  const [showQuizInput, setShowQuizInput] = useState(false);
  const [quizError, setQuizError] = useState('');
  
  const ticket = mockTickets.find(t => t.id === ticketId);
  const event = mockEvents.find(e => e.title === ticket?.eventTitle);

  if (!ticket) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <QrCode className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-medium mb-2">Ticket not found</h3>
        <p className="text-sm text-muted-foreground mb-4">
          The ticket you're looking for doesn't exist.
        </p>
        <Button onClick={() => onNavigate('tickets')}>
          Back to Tickets
        </Button>
      </div>
    );
  }

  const isActive = ticket.status === 'active';
  const isPast = ticket.status === 'used';

  const handleQuizAccess = () => {
    if (!quizCode.trim()) {
      setQuizError('Please enter quiz code');
      return;
    }

    // Valid quiz codes for demo
    const validCodes = ['QUIZ2024', 'TEST123', 'EVENT001'];
    
    if (!validCodes.includes(quizCode.toUpperCase())) {
      setQuizError('Invalid quiz code. Please check and try again.');
      return;
    }

    // Navigate to quiz
    onNavigate('quiz', { quizCode: quizCode.toUpperCase(), ticketId });
  };

  return (
    <div className="flex flex-col min-h-full bg-background">
      <div className="p-4 space-y-6">
        {/* Ticket Card */}
        <Card className="relative overflow-hidden">
          <CardHeader className={`pb-4 ${isActive ? 'bg-gradient-to-r from-primary/10 to-accent/10' : 'bg-muted/50'}`}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{ticket.eventTitle}</CardTitle>
              <Badge 
                variant={isActive ? 'default' : 'secondary'}
                className={
                  isActive 
                    ? 'bg-success text-success-foreground' 
                    : 'bg-muted text-muted-foreground'
                }
              >
                {isActive ? 'Active' : 'Used'}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            {/* Event Details */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">{ticket.date}</div>
                  <div className="text-sm text-muted-foreground">Event Date</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">{ticket.time}</div>
                  <div className="text-sm text-muted-foreground">Time</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">{ticket.location}</div>
                  <div className="text-sm text-muted-foreground">Venue</div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Ticket Information */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <QrCode className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium font-mono">{ticket.ticketCode}</div>
                  <div className="text-sm text-muted-foreground">Ticket Code</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">John Doe</div>
                  <div className="text-sm text-muted-foreground">Ticket Holder</div>
                </div>
              </div>
            </div>

            {/* QR Code Placeholder */}
            <div className="bg-muted rounded-lg p-8 flex flex-col items-center justify-center mb-6">
              <div className="w-32 h-32 bg-foreground rounded-lg mb-4 flex items-center justify-center">
                <QrCode className="h-16 w-16 text-background" />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Show this QR code at the event entrance
              </p>
            </div>

            {/* Status Message */}
            {isPast && (
              <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg text-success">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">This ticket has been used</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Event Information */}
        {event && (
          <Card>
            <CardHeader>
              <CardTitle>Event Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{event.description}</p>
              
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Speaker: {event.speaker}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm">Quota: {event.registered}/{event.quota} registered</span>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onNavigate('event-detail', { eventId: event.id })}
              >
                View Event Details
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Quiz Section */}
        {isActive && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Event Quiz
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Test your knowledge from this event and earn certificates!
              </p>
              
              {!showQuizInput ? (
                <Button 
                  onClick={() => setShowQuizInput(true)}
                  className="w-full"
                  variant="outline"
                >
                  <Key className="h-4 w-4 mr-2" />
                  Access Quiz
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="quiz-code">Enter Quiz Code</Label>
                    <Input
                      id="quiz-code"
                      type="text"
                      placeholder="e.g. QUIZ2024"
                      value={quizCode}
                      onChange={(e) => {
                        setQuizCode(e.target.value);
                        setQuizError('');
                      }}
                      className="font-mono uppercase"
                    />
                    {quizError && (
                      <p className="text-sm text-destructive">{quizError}</p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setShowQuizInput(false);
                        setQuizCode('');
                        setQuizError('');
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleQuizAccess}
                      className="flex-1"
                    >
                      Start Quiz
                    </Button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Quiz code will be provided during the event
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>

        {/* Help Text */}
        <Card className="bg-accent/50">
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Need Help?</h4>
            <p className="text-sm text-muted-foreground">
              If you have any issues with your ticket, please contact our support team at support@luma.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}