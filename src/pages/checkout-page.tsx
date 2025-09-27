import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { PaymentChannel } from '../components/ui/payment-channel';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { mockPaymentChannels } from '../data/mock-data';

interface CheckoutPageProps {
  item: any;
  type: 'course' | 'event';
  onNavigate: (screen: string, params?: any) => void;
}

export function CheckoutPage({ item, type, onNavigate }: CheckoutPageProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  if (!item) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-2">Item not found</h2>
          <Button onClick={() => onNavigate('home')} variant="outline">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError('');
    
    if (!file) return;

    // Validate file size (max 3MB)
    if (file.size > 3 * 1024 * 1024) {
      setUploadError('File size must be less than 3MB');
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Only JPG, PNG, and PDF files are allowed');
      return;
    }

    setSelectedFile(file);
  };

  const handleConfirmPayment = async () => {
    if (!selectedFile) {
      setUploadError('Please upload payment proof');
      return;
    }

    setIsUploading(true);
    
    // Simulate upload and payment confirmation
    setTimeout(() => {
      setIsUploading(false);
      onNavigate('success', { type, item });
    }, 2000);
  };

  const price = type === 'course' ? item.price : item.price;
  const title = item.title;
  const subtitle = type === 'course' 
    ? `${item.lessons} lessons • ${item.duration}` 
    : `${item.date} • ${item.time}`;

  return (
    <div className="flex flex-col min-h-full bg-background">
      <div className="flex-1 p-4 space-y-6">
        {/* Item Summary */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={type === 'course' ? item.thumbnail : item.poster}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium line-clamp-2 mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{subtitle}</p>
                <Badge variant="default" className="text-lg font-semibold">
                  Rp {price?.toLocaleString('id-ID')}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Channels */}
        <div className="space-y-3">
          <h3 className="font-medium">Choose Payment Method</h3>
          <div className="space-y-2">
            {mockPaymentChannels.map((channel) => (
              <PaymentChannel key={channel.id} {...channel} />
            ))}
          </div>
        </div>

        {/* Upload Payment Proof */}
        <div className="space-y-3">
          <Label htmlFor="payment-proof">Upload Payment Proof</Label>
          
          <div className="space-y-3">
            <div 
              className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
                selectedFile 
                  ? 'border-success bg-success/5' 
                  : 'border-border hover:border-primary/50 bg-muted/30'
              }`}
            >
              <input
                id="payment-proof"
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                  selectedFile ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {selectedFile ? (
                    <FileText className="h-6 w-6" />
                  ) : (
                    <Upload className="h-6 w-6" />
                  )}
                </div>
                
                <div className="space-y-1">
                  <p className="font-medium">
                    {selectedFile ? selectedFile.name : 'Choose file or take photo'}  
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedFile ? 'Tap to change file' : 'JPG, PNG, PDF • Max 3MB'}
                  </p>
                </div>
              </div>
            </div>
            
            {uploadError && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span>{uploadError}</span>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <Card className="bg-accent/50">
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Payment Instructions</h4>
            <ol className="text-sm text-muted-foreground space-y-1">
              <li>1. Transfer the exact amount to one of the accounts above</li>
              <li>2. Take a screenshot or photo of the payment confirmation</li>
              <li>3. Upload the proof and click "Confirm Payment"</li>
              <li>4. We'll verify your payment within 1-24 hours</li>
            </ol>
          </CardContent>
        </Card>
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 p-4 bg-card border-t border-border">
        <Button 
          className="w-full"
          onClick={handleConfirmPayment}
          disabled={isUploading || !selectedFile}
        >
          {isUploading ? 'Processing...' : 'CONFIRM PAYMENT'}
        </Button>
      </div>
    </div>
  );
}