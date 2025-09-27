import { User, Mail, Calendar, BookOpen, Ticket, LogOut, Edit, Settings } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { mockCourses, mockEvents } from '../data/mock-data';

interface ProfilePageProps {
  user: {
    id: string;
    fullName: string;
    username: string;
    email: string;
    birthday: string;
    enrolledCourses: string[];
    purchasedEvents: string[];
  };
  onLogout: () => void;
  onNavigate: (screen: string, params?: any) => void;
}

export function ProfilePage({ user, onLogout, onNavigate }: ProfilePageProps) {
  const enrolledCourses = mockCourses.filter(course => user.enrolledCourses.includes(course.id));
  const purchasedEvents = mockEvents.filter(event => user.purchasedEvents.includes(event.id));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCompletionRate = () => {
    // Mock completion rate calculation
    return Math.floor(Math.random() * 100);
  };

  return (
    <div className="flex flex-col min-h-full bg-background">
      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-medium">{user.fullName}</h2>
                <p className="text-muted-foreground">@{user.username}</p>
              </div>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Born {formatDate(user.birthday)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Stats */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-medium mb-4">Learning Progress</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-semibold text-primary">{enrolledCourses.length}</div>
                <div className="text-sm text-muted-foreground">Courses Enrolled</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-success">{getCompletionRate()}%</div>
                <div className="text-sm text-muted-foreground">Completion Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enrolled Courses */}
        {enrolledCourses.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">My Courses</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onNavigate('courses')}
                >
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {enrolledCourses.slice(0, 3).map((course) => (
                  <div 
                    key={course.id}
                    className="flex items-center gap-3 p-3 bg-muted rounded-lg cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => onNavigate('course-detail', { courseId: course.id })}
                  >
                    <BookOpen className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{course.title}</div>
                      <div className="text-xs text-muted-foreground">{course.lessons} lessons • {course.duration}</div>
                    </div>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Purchased Events */}
        {purchasedEvents.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">My Events</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onNavigate('tickets')}
                >
                  View Tickets
                </Button>
              </div>
              <div className="space-y-3">
                {purchasedEvents.map((event) => (
                  <div 
                    key={event.id}
                    className="flex items-center gap-3 p-3 bg-muted rounded-lg cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => onNavigate('event-detail', { eventId: event.id })}
                  >
                    <Ticket className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{event.title}</div>
                      <div className="text-xs text-muted-foreground">{event.date} • {event.location}</div>
                    </div>
                    <Badge 
                      className={
                        event.status === 'available' ? 'bg-success text-success-foreground' :
                        event.status === 'closed' ? 'bg-destructive text-destructive-foreground' :
                        'bg-warning text-warning-foreground'
                      }
                    >
                      {event.status === 'available' ? 'Available' :
                       event.status === 'closed' ? 'Closed' : 'Coming Soon'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Settings */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-medium mb-4">Settings</h3>
            <div className="space-y-3">
              <Button 
                variant="ghost" 
                className="w-full justify-start h-auto p-3"
                onClick={() => {/* Handle settings */}}
              >
                <Settings className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium text-sm">Account Settings</div>
                  <div className="text-xs text-muted-foreground">Manage your account preferences</div>
                </div>
              </Button>
              
              <Separator />
              
              <Button 
                variant="ghost" 
                className="w-full justify-start h-auto p-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={onLogout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium text-sm">Sign Out</div>
                  <div className="text-xs text-muted-foreground">Sign out from your account</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}