import { useState, useEffect } from 'react';
import { SearchInput } from '../components/ui/search-input';
import { CategoryPills } from '../components/ui/category-pills';
import { CourseCard } from '../components/ui/course-card';
import { EventCard } from '../components/ui/event-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { mockCourses, mockEvents, categories } from '../data/mock-data';

interface SearchPageProps {
  onNavigate: (screen: string, params?: any) => void;
  searchQuery?: string;
}

export function SearchPage({ onNavigate, searchQuery = '' }: SearchPageProps) {
  const [query, setQuery] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('courses');

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(query.toLowerCase()) ||
                         course.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(query.toLowerCase()) ||
                         event.description.toLowerCase().includes(query.toLowerCase()) ||
                         event.speaker.toLowerCase().includes(query.toLowerCase());
    return matchesSearch;
  });

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  return (
    <div className="flex flex-col min-h-full bg-background">
      {/* Search Input */}
      <div className="p-4">
        <SearchInput
          placeholder="Search courses and events..."
          value={query}
          onChange={setQuery}
        />
      </div>

      {/* Search Results Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="grid w-full grid-cols-2 mx-4">
          <TabsTrigger value="courses">
            Courses ({filteredCourses.length})
          </TabsTrigger>
          <TabsTrigger value="events">
            Events ({filteredEvents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="mt-4">
          {/* Categories for courses */}
          <CategoryPills
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />

          {/* Course Results */}
          <div className="px-4 py-4">
            {query && (
              <p className="text-sm text-muted-foreground mb-4">
                {filteredCourses.length} courses found for "{query}"
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              </p>
            )}

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
            ) : query ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="font-medium mb-2">No courses found</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Try different keywords or browse all courses
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="font-medium mb-2">Search for courses</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Enter keywords to find relevant courses
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="events" className="mt-4">
          <div className="px-4 py-4">
            {query && (
              <p className="text-sm text-muted-foreground mb-4">
                {filteredEvents.length} events found for "{query}"
              </p>
            )}

            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    {...event}
                    onPress={() => onNavigate('event-detail', { eventId: event.id })}
                  />
                ))}
              </div>
            ) : query ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="font-medium mb-2">No events found</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Try different keywords or browse all events
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">📅</span>
                </div>
                <h3 className="font-medium mb-2">Search for events</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Enter keywords to find relevant events
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}