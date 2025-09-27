import { TicketCard } from '../components/ui/ticket-card';
import { Button } from '../components/ui/button';
import { mockTickets } from '../data/mock-data';

interface TicketsPageProps {
  onNavigate: (screen: string, params?: any) => void;
}

export function TicketsPage({ onNavigate }: TicketsPageProps) {
  const activeTickets = mockTickets.filter(ticket => ticket.status === 'active');
  const usedTickets = mockTickets.filter(ticket => ticket.status !== 'active');

  return (
    <div className="flex flex-col min-h-full bg-background">
      <div className="p-4 space-y-6">
        {/* Active Tickets */}
        {activeTickets.length > 0 && (
          <div className="space-y-3">
            <h2 className="font-medium">Active Tickets</h2>
            <div className="space-y-3">
              {activeTickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  {...ticket}
                  onPress={() => onNavigate('ticket-detail', { ticketId: ticket.id })}
                />
              ))}
            </div>
          </div>
        )}

        {/* Past Tickets */}
        {usedTickets.length > 0 && (
          <div className="space-y-3">
            <h2 className="font-medium">Past Tickets</h2>
            <div className="space-y-3">
              {usedTickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  {...ticket}
                  onPress={() => onNavigate('ticket-detail', { ticketId: ticket.id })}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {mockTickets.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🎫</span>
            </div>
            <h3 className="font-medium mb-2">No tickets yet</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Purchase event tickets to see them here
            </p>
            <Button onClick={() => onNavigate('events')}>
              Browse Events
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}