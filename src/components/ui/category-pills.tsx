import { Button } from './button';
import { ScrollArea } from './scroll-area';

interface CategoryPillsProps {
  categories: string[];
  selectedCategory?: string;
  onCategorySelect?: (category: string) => void;
}

export function CategoryPills({ 
  categories, 
  selectedCategory, 
  onCategorySelect 
}: CategoryPillsProps) {
  return (
    <ScrollArea className="w-full">
      <div className="flex gap-2 px-4 py-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "secondary"}
            size="sm"
            onClick={() => onCategorySelect?.(category)}
            className="whitespace-nowrap rounded-full px-4"
          >
            {category}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}