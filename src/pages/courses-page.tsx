import { useState } from 'react';
import { SearchInput } from '../components/ui/search-input';
import { CategoryPills } from '../components/ui/category-pills';
import { CourseCard } from '../components/ui/course-card';
import { mockCourses, categories } from '../data/mock-data';

interface CoursesPageProps {
  onNavigate: (screen: string, params?: any) => void;
}

export function CoursesPage({ onNavigate }: CoursesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-full bg-background pt-16">
      {/* Sticky Header */}
      <div className="fixed top-16 left-0 right-0 bg-background z-10 border-b border-border/50">
        {/* Search */}
        <div className="p-4 pb-2">
          <SearchInput
            placeholder="Search courses..."
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {/* Categories */}
        <CategoryPills
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        {/* Results Header */}
        <div className="px-4 py-2 pb-4">
          <p className="text-sm text-muted-foreground">
            {filteredCourses.length} courses found
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>
      </div>

      {/* Scrollable Courses Grid */}
      <div className="px-4 pb-4 flex-1 overflow-auto mt-36">
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                {...course}
                onPress={() => onNavigate('course-detail', { courseId: course.id })}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="font-medium mb-2">No courses found</h3>
            <p className="text-sm text-muted-foreground text-center">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}