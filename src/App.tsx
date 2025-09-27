import { useState } from 'react';
import { MobileContainer } from './components/layout/mobile-container';
import { BottomNav } from './components/layout/bottom-nav';
import { HeaderBar } from './components/layout/header-bar';

// Pages
import { HomePage } from './pages/home-page';
import { CoursesPage } from './pages/courses-page';
import { CourseDetailPage } from './pages/course-detail-page';
import { EventsPage } from './pages/events-page';
import { EventDetailPage } from './pages/event-detail-page';
import { TicketsPage } from './pages/tickets-page';
import { TicketDetailPage } from './pages/ticket-detail-page';
import { ProfilePage } from './pages/profile-page';
import { LoginPage } from './pages/login-page';
import { RegisterPage } from './pages/register-page';
import { CheckoutPage } from './pages/checkout-page';
import { SuccessPage } from './pages/success-page';
import { QuizPage } from './pages/quiz-page';
import { SearchPage } from './pages/search-page';

import { mockUser } from './data/mock-data';

type Screen = 
  | 'home' 
  | 'courses' 
  | 'course-detail' 
  | 'search'
  | 'events' 
  | 'event-detail' 
  | 'tickets' 
  | 'ticket-detail'
  | 'profile' 
  | 'login' 
  | 'register' 
  | 'checkout' 
  | 'success'
  | 'quiz';

type NavigationState = {
  screen: Screen;
  params?: any;
  history: { screen: Screen; params?: any; }[];
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(mockUser);
  const [navigation, setNavigation] = useState<NavigationState>({
    screen: 'home',
    params: {},
    history: []
  });

  const navigate = (screen: Screen, params?: any) => {
    setNavigation(prev => ({
      screen,
      params,
      history: [...prev.history, { screen: prev.screen, params: prev.params }]
    }));
  };

  const goBack = () => {
    if (navigation.history.length > 0) {
      const previous = navigation.history[navigation.history.length - 1];
      setNavigation(prev => ({
        screen: previous.screen,
        params: previous.params,
        history: prev.history.slice(0, -1)
      }));
    }
  };

  const handleTabChange = (tab: string) => {
    if (!isAuthenticated && (tab === 'tickets' || tab === 'profile')) {
      navigate('login');
      return;
    }
    navigate(tab as Screen);
  };

  const handleLogin = (credentials: { username: string; password: string }) => {
    setIsAuthenticated(true);
    navigate('home');
  };

  const handleRegister = (userData: any) => {
    setUser({ ...user, ...userData });
    setIsAuthenticated(true);
    navigate('home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('home');
  };

  const renderScreen = () => {
    switch (navigation.screen) {
      case 'home':
        return <HomePage onNavigate={navigate} isAuthenticated={isAuthenticated} />;
      
      case 'courses':
        return <CoursesPage onNavigate={navigate} />;
      
      case 'course-detail':
        return (
          <CourseDetailPage 
            courseId={navigation.params?.courseId} 
            onNavigate={navigate}
            isAuthenticated={isAuthenticated}
            userEnrolledCourses={user.enrolledCourses}
          />
        );
      
      case 'search':
        return <SearchPage onNavigate={navigate} searchQuery={navigation.params?.query} />;
      
      case 'events':
        return <EventsPage onNavigate={navigate} />;
      
      case 'event-detail':
        return (
          <EventDetailPage 
            eventId={navigation.params?.eventId} 
            onNavigate={navigate}
            isAuthenticated={isAuthenticated}
          />
        );
      
      case 'tickets':
        if (!isAuthenticated) return <LoginPage onLogin={handleLogin} onNavigate={navigate} />;
        return <TicketsPage onNavigate={navigate} />;
      
      case 'ticket-detail':
        return <TicketDetailPage ticketId={navigation.params?.ticketId} onNavigate={navigate} />;
      
      case 'profile':
        if (!isAuthenticated) return <LoginPage onLogin={handleLogin} onNavigate={navigate} />;
        return <ProfilePage user={user} onLogout={handleLogout} onNavigate={navigate} />;
      
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigate={navigate} />;
      
      case 'register':
        return <RegisterPage onRegister={handleRegister} onNavigate={navigate} />;
      
      case 'checkout':
        return (
          <CheckoutPage 
            item={navigation.params?.item}
            type={navigation.params?.type}
            onNavigate={navigate} 
          />
        );
      
      case 'success':
        return (
          <SuccessPage 
            type={navigation.params?.type}
            item={navigation.params?.item}
            onNavigate={navigate} 
          />
        );
      
      case 'quiz':
        return (
          <QuizPage 
            onNavigate={navigate} 
            quizCode={navigation.params?.quizCode}
            ticketId={navigation.params?.ticketId}
          />
        );
      
      default:
        return <HomePage onNavigate={navigate} isAuthenticated={isAuthenticated} />;
    }
  };

  const showHeader = !['login', 'register', 'home'].includes(navigation.screen);
  const showBottomNav = !['login', 'register', 'checkout', 'success', 'quiz'].includes(navigation.screen);

  const getScreenTitle = () => {
    switch (navigation.screen) {
      case 'home': return 'Luma';
      case 'courses': return 'Courses';
      case 'course-detail': return 'Course Details';
      case 'search': return 'Search';
      case 'events': return 'Events';
      case 'event-detail': return 'Event Details';
      case 'tickets': return 'My Tickets';
      case 'ticket-detail': return 'Ticket Details';
      case 'profile': return 'Profile';
      case 'checkout': return 'Checkout';
      case 'success': return 'Success';
      case 'quiz': return 'Quiz';
      default: return 'Luma';
    }
  };

  return (
    <MobileContainer>
      {showHeader && (
        <HeaderBar
          title={getScreenTitle()}
          onBack={navigation.history.length > 0 ? goBack : undefined}
          showBack={navigation.screen !== 'home' && navigation.history.length > 0}
        />
      )}
      
      <div className={`flex-1 ${showBottomNav ? 'pb-16' : ''}`}>
        {renderScreen()}
      </div>
      
      {showBottomNav && (
        <BottomNav
          activeTab={['course-detail', 'search'].includes(navigation.screen) ? 'courses' : navigation.screen}
          onTabChange={handleTabChange}
        />
      )}
    </MobileContainer>
  );
}