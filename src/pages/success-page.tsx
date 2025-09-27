import { Button } from '../components/ui/button';
import { CheckCircle, BookOpen, Ticket } from 'lucide-react';

interface SuccessPageProps {
  type: 'course' | 'event' | 'enrollment';
  item: any;
  onNavigate: (screen: string, params?: any) => void;
}

export function SuccessPage({ type, item, onNavigate }: SuccessPageProps) {
  const getSuccessContent = () => {
    switch (type) {
      case 'enrollment':
        return {
          icon: <BookOpen className="h-16 w-16 text-success" />,
          title: 'Successfully Enrolled!',
          message: `You're now enrolled in "${item?.title}". Start learning right away!`,
          primaryAction: {
            text: 'Start Learning',
            action: () => onNavigate('course-detail', { courseId: item?.id })
          },
          secondaryAction: {
            text: 'Browse More Courses',
            action: () => onNavigate('courses')
          }
        };
      
      case 'course':
        return {
          icon: <CheckCircle className="h-16 w-16 text-success" />,
          title: 'Payment Submitted!',
          message: `Your payment for "${item?.title}" has been submitted. We'll verify it within 1-24 hours and send you a confirmation.`,
          primaryAction: {
            text: 'View Course',
            action: () => onNavigate('course-detail', { courseId: item?.id })
          },
          secondaryAction: {
            text: 'Back to Home',
            action: () => onNavigate('home')
          }
        };
      
      case 'event':
        return {
          icon: <Ticket className="h-16 w-16 text-success" />,
          title: 'Ticket Purchased!',
          message: `Your ticket for "${item?.title}" has been purchased. We'll send you the confirmation and ticket details once payment is verified.`,
          primaryAction: {
            text: 'View My Tickets',
            action: () => onNavigate('tickets')
          },
          secondaryAction: {
            text: 'Browse More Events',
            action: () => onNavigate('events')
          }
        };
      
      default:
        return {
          icon: <CheckCircle className="h-16 w-16 text-success" />,
          title: 'Success!',
          message: 'Operation completed successfully.',
          primaryAction: {
            text: 'Continue',
            action: () => onNavigate('home')
          },
          secondaryAction: null
        };
    }
  };

  const content = getSuccessContent();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="max-w-sm mx-auto text-center space-y-6">
        {/* Success Icon */}
        <div className="flex justify-center">
          {content.icon}
        </div>

        {/* Success Message */}
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold">{content.title}</h1>
          <p className="text-muted-foreground leading-relaxed">
            {content.message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 w-full">
          <Button 
            className="w-full"
            onClick={content.primaryAction.action}
          >
            {content.primaryAction.text}
          </Button>
          
          {content.secondaryAction && (
            <Button 
              variant="outline" 
              className="w-full"
              onClick={content.secondaryAction.action}
            >
              {content.secondaryAction.text}
            </Button>
          )}
        </div>

        {/* Additional Info for Payment */}
        {(type === 'course' || type === 'event') && (
          <div className="bg-accent/50 rounded-lg p-4 text-left">
            <h3 className="font-medium mb-2">What's next?</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• We'll verify your payment within 1-24 hours</li>
              <li>• You'll receive a confirmation email</li>
              <li>• Access will be granted automatically</li>
              <li>• Contact support if you have questions</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}