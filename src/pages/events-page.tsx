import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { EventCard } from "../components/ui/event-card";
import { mockEvents } from "../data/mock-data";

interface EventsPageProps {
  onNavigate: (screen: string, params?: any) => void;
}

export function EventsPage({ onNavigate }: EventsPageProps) {
  const [activeTab, setActiveTab] = useState("available");

  const availableEvents = mockEvents.filter((e) => e.status === "available");
  const closedEvents = mockEvents.filter((e) => e.status === "closed");
  const comingSoonEvents = mockEvents.filter((e) => e.status === "coming-soon");

  return (
    <div className="min-h-screen bg-muted/20">
      {/* ===== Sticky tabs di bawah Header ===== */}
      <div className="sticky top-14 z-40 bg-background border-b">
        <div className="px-4 pt-3 pb-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex w-full gap-2 bg-transparent p-0">
              <TabsTrigger
                value="available"
                className={`shrink-0 px-5 h-9 rounded-full text-sm font-medium
                            data-[state=active]:bg-emerald-600 data-[state=active]:text-white
                            bg-muted text-muted-foreground`}
              >
                Available ({availableEvents.length})
              </TabsTrigger>
              <TabsTrigger
                value="closed"
                className={`shrink-0 px-5 h-9 rounded-full text-sm font-medium
                            data-[state=active]:bg-emerald-600 data-[state=active]:text-white
                            bg-muted text-muted-foreground`}
              >
                Closed ({closedEvents.length})
              </TabsTrigger>
              <TabsTrigger
                value="coming-soon"
                className={`shrink-0 px-5 h-9 rounded-full text-sm font-medium
                            data-[state=active]:bg-emerald-600 data-[state=active]:text-white
                            bg-muted text-muted-foreground`}
              >
                Coming ({comingSoonEvents.length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* ===== Konten list ===== */}
      <div className="px-4 pb-8 space-y-4">
        <Tabs value={activeTab}>
          <TabsContent value="available" className="m-0">
            {availableEvents.map((e) => (
              <EventCard
                key={e.id}
                {...e}
                onClick={() => onNavigate("event-detail", { id: e.id })}
              />
            ))}
          </TabsContent>
          <TabsContent value="closed" className="m-0">
            {closedEvents.map((e) => (
              <EventCard
                key={e.id}
                {...e}
                onClick={() => onNavigate("event-detail", { id: e.id })}
              />
            ))}
          </TabsContent>
          <TabsContent value="coming-soon" className="m-0">
            {comingSoonEvents.map((e) => (
              <EventCard
                key={e.id}
                {...e}
                onClick={() => onNavigate("event-detail", { id: e.id })}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
