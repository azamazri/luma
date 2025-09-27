import { Card, CardContent } from './card';
import { Button } from './button';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface PromoBannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  backgroundImage: string;
  onCtaPress?: () => void;
}

export function PromoBanner({ 
  title, 
  subtitle, 
  ctaText, 
  backgroundImage, 
  onCtaPress 
}: PromoBannerProps) {
  return (
    <Card className="overflow-hidden mx-4 my-4">
      <div className="relative aspect-[2/1]">
        <ImageWithFallback
          src={backgroundImage}
          alt="Promo banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
        <CardContent className="absolute inset-0 p-6 flex flex-col justify-center text-white">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-sm opacity-90 mb-4">{subtitle}</p>
          <Button 
            variant="secondary" 
            size="sm" 
            className="self-start"
            onClick={onCtaPress}
          >
            {ctaText}
          </Button>
        </CardContent>
      </div>
    </Card>
  );
}