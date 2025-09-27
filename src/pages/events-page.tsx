import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { EventCard } from '../components/ui/event-card';
import { mockEvents } from '../data/mock-data';

interface EventsPageProps {
  onNavigate: (screen: string, params?: any) => void;
}

export function EventsPage({ onNavigate }: EventsPageProps) {
  const [activeTab, setActiveTab] = useState('available');

  const availableEvents = mockEvents.filter(e => e.status === 'available');
  const closedEvents = mockEvents.filter(e => e.status === 'closed');
  const comingSoonEvents = mockEvents.filter(e => e.status === 'coming-soon');

  return (
    <div className="flex flex-col min-h-full bg-background pt-16">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        {/* Fixed Header */}
        <div className="fixed top-16 left-0 right-0 bg-background z-10 border-b border-border/50">
          <TabsList className="grid w-full grid-cols-3 mx-4 mt-4 mb-4 bg-muted">
            <TabsTrigger 
              value="available"
              className="data-[state=active]:bg-success data-[state=active]:text-success-foreground"
            >
              Available ({availableEvents.length})
            </TabsTrigger>
            <TabsTrigger 
              value="closed"
              className="data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground"
            >
              Closed ({closedEvents.length})
            </TabsTrigger>
            <TabsTrigger 
              value="coming-soon"
              className="data-[state=active]:bg-warning data-[state=active]:text-warning-foreground"
            >
              Coming ({comingSoonEvents.length})
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto mt-20">
          <TabsContent value="available" className="px-4 pb-4">
          {availableEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {availableEvents.map((event) => (
                <EventCard
                  key={event.id}
                  {...event}
                  onPress={() => onNavigate('event-detail', { eventId: event.id })}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="font-medium mb-2">No available events</h3>
              <p className="text-sm text-muted-foreground text-center">
                Check back later for new events
              </p>
            </div>
          )}
        </TabsContent>

          <TabsContent value="closed" className="px-4 pb-4">
            {closedEvents.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {closedEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    {...event}
                    onPress={() => onNavigate('event-detail', { eventId: event.id })}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-medium mb-2">No closed events</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Events that are no longer accepting registrations
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="coming-soon" className="px-4 pb-4">
            {comingSoonEvents.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {comingSoonEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    {...event}
                    onPress={() => onNavigate('event-detail', { eventId: event.id })}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">⏰</span>
                </div>
                <h3 className="font-medium mb-2">No upcoming events</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Stay tuned for exciting events coming soon
                </p>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}