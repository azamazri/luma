import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { CheckCircle, Clock, Trophy, RotateCcw } from 'lucide-react';
import { mockQuizQuestions, mockLeaderboard } from '../data/mock-data';

interface QuizPageProps {
  onNavigate: (screen: string, params?: any) => void;
  quizCode?: string;
  ticketId?: string;
}

export function QuizPage({ onNavigate, quizCode, ticketId }: QuizPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (isStarted && timeLeft > 0 && !isCompleted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isCompleted) {
      handleSubmitQuiz();
    }
  }, [isStarted, timeLeft, isCompleted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartQuiz = () => {
    setIsStarted(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < mockQuizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = () => {
    const correctAnswers = selectedAnswers.reduce((acc, answer, index) => {
      return answer === mockQuizQuestions[index].correctAnswer ? acc + 1 : acc;
    }, 0);
    
    const percentage = Math.round((correctAnswers / mockQuizQuestions.length) * 100);
    setScore(percentage);
    setIsCompleted(true);
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setIsCompleted(false);
    setScore(0);
    setTimeLeft(300);
    setIsStarted(false);
  };

  if (!isStarted) {
    return (
      <div className="flex flex-col min-h-full bg-background">
        <div className="p-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                {quizCode ? `Event Quiz - ${quizCode}` : 'React Fundamentals Quiz'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="font-medium mb-2">Test Your Knowledge</h3>
                <p className="text-sm text-muted-foreground">
                  Complete this quiz to test your understanding of React fundamentals
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">Questions</span>
                  <Badge variant="outline">{mockQuizQuestions.length}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">Time Limit</span>
                  <Badge variant="outline">5 minutes</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">Passing Score</span>
                  <Badge variant="outline">70%</Badge>
                </div>
              </div>

              <Button onClick={handleStartQuiz} className="w-full">
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    const isPassed = score >= 70;
    
    return (
      <div className="flex flex-col min-h-full bg-background">
        <div className="p-4 space-y-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                isPassed ? 'bg-success' : 'bg-destructive'
              }`}>
                {isPassed ? (
                  <CheckCircle className="h-10 w-10 text-success-foreground" />
                ) : (
                  <RotateCcw className="h-10 w-10 text-destructive-foreground" />
                )}
              </div>
              
              <h2 className="text-2xl font-semibold mb-2">
                {isPassed ? 'Congratulations!' : 'Keep Learning!'}
              </h2>
              
              <p className="text-muted-foreground mb-4">
                {isPassed 
                  ? 'You passed the quiz successfully!' 
                  : 'You need more practice to pass this quiz.'
                }
              </p>
              
              <div className="text-4xl font-bold mb-4 text-primary">
                {score}%
              </div>
              
              <Badge 
                className={`mb-6 ${
                  isPassed 
                    ? 'bg-success text-success-foreground' 
                    : 'bg-destructive text-destructive-foreground'
                }`}
              >
                {isPassed ? 'Passed' : 'Failed'}
              </Badge>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium">{selectedAnswers.filter((answer, index) => answer === mockQuizQuestions[index].correctAnswer).length}</div>
                  <div className="text-sm text-muted-foreground">Correct</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium">{selectedAnswers.filter((answer, index) => answer !== mockQuizQuestions[index].correctAnswer).length}</div>
                  <div className="text-sm text-muted-foreground">Incorrect</div>
                </div>
              </div>

              <div className="space-y-3">
                <Button onClick={handleRetakeQuiz} variant="outline" className="w-full">
                  Retake Quiz
                </Button>
                <Button 
                  onClick={() => ticketId ? onNavigate('ticket-detail', { ticketId }) : onNavigate('courses')} 
                  className="w-full"
                >
                  {ticketId ? 'Back to Ticket' : 'Continue Learning'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockLeaderboard.map((entry, index) => (
                <div key={entry.rank} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      entry.rank <= 3 ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                    }`}>
                      {entry.rank}
                    </div>
                    <span className="font-medium">{entry.name}</span>
                  </div>
                  <Badge variant="outline">{entry.score}%</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / mockQuizQuestions.length) * 100;
  const question = mockQuizQuestions[currentQuestion];

  return (
    <div className="flex flex-col min-h-full bg-background">
      <div className="p-4 space-y-6">
        {/* Header */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{formatTime(timeLeft)}</span>
              </div>
              <Badge variant="outline">
                Question {currentQuestion + 1} of {mockQuizQuestions.length}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Question */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border transition-colors ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:bg-muted'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-primary bg-primary'
                      : 'border-border'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <CheckCircle className="h-4 w-4 text-primary-foreground" />
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="flex-1"
          >
            Previous
          </Button>
          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="flex-1"
          >
            {currentQuestion === mockQuizQuestions.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}