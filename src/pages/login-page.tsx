import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  onLogin: (credentials: { username: string; password: string }) => void;
  onNavigate: (screen: string, params?: any) => void;
}

export function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin({ username, password });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center px-4">
      <div className="max-w-sm mx-auto w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-primary">Luma</h1>
          <h2 className="text-xl font-medium">Welcome back</h2>
          <p className="text-muted-foreground">Sign in to continue your learning journey</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username or Email</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username or email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading || !username.trim() || !password.trim()}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Forgot Password */}
        <div className="text-center">
          <button className="text-sm text-primary hover:underline">
            Forgot your password?
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Don't have an account?
            </span>
          </div>
        </div>

        {/* Register Link */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => onNavigate('register')}
        >
          Create Account
        </Button>

        {/* Demo Credentials */}
        <div className="text-center text-xs text-muted-foreground space-y-1">
          <p>Demo credentials:</p>
          <p>Username: demo | Password: demo123</p>
        </div>
      </div>
    </div>
  );
}