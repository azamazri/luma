import { Home, BookOpen, Ticket, Calendar, User } from 'lucide-react';
import { Button } from '../ui/button';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'courses', icon: BookOpen, label: 'Courses' },
  { id: 'tickets', icon: Ticket, label: 'Tickets' },
  { id: 'events', icon: Calendar, label: 'Events' },
  { id: 'profile', icon: User, label: 'Profile' },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[360px] bg-card border-t border-border">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-1 h-auto p-2 ${
                isActive 
                  ? 'text-primary bg-accent' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}