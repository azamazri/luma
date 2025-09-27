import { Search } from 'lucide-react';
import { Input } from './input';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function SearchInput({ 
  placeholder = "Search courses...", 
  value, 
  onChange,
  className = '' 
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="pl-10 bg-input-background border-border rounded-xl"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </div>
  );
}