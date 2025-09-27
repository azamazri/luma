import { Copy, Check } from 'lucide-react';
import { Card, CardContent } from './card';
import { Button } from './button';
import { Badge } from './badge';
import { useState } from 'react';

interface PaymentChannelProps {
  id: string;
  name: string;
  logo: string;
  accountNumber: string;
  accountName: string;
  isVerified?: boolean;
}

export function PaymentChannel({ 
  name, 
  logo, 
  accountNumber, 
  accountName, 
  isVerified = true 
}: PaymentChannelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
            <span className="text-xs font-medium">{logo}</span>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium">{name}</h3>
              {isVerified && (
                <Badge variant="secondary" className="text-xs bg-success text-success-foreground">
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{accountName}</p>
            <p className="text-sm font-mono">{accountNumber}</p>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="min-w-0 px-3"
          >
            {copied ? (
              <Check className="h-4 w-4 text-success" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}