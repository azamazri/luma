import { SearchInput } from '../components/ui/search-input';
import { PromoBanner } from '../components/ui/promo-banner';
import { CategoryPills } from '../components/ui/category-pills';
import { CourseCard } from '../components/ui/course-card';
import { mockCourses, categories } from '../data/mock-data';
import { useState } from 'react';
import lumaLogo from 'figma:asset/8d1101853e0685ec37410200f2c1477cb637f829.png';

interface HomePageProps {
  onNavigate: (screen: string, params?: any) => void;
  isAuthenticated: boolean;
}

export function HomePage({ onNavigate, isAuthenticated }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onNavigate('search', { query: searchQuery });
    }
  };

  const filteredCourses = mockCourses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesCategory;
  }).slice(0, 4); // Show only 4 courses on home

  return (
    <div className="flex flex-col min-h-full bg-background">
      {/* Header Greeting */}
      <div className="p-4 pt-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-3xl font-semibold mb-1">
              {isAuthenticated ? 'Welcome back!' : 'Welcome to Luma'}
            </h1>
            <p className="text-muted-foreground">
              {isAuthenticated 
                ? 'Continue your learning journey' 
                : 'Discover the beauty of Muslimah fashion'
              }
            </p>
          </div>
          <img src={lumaLogo} alt="Luma" className="h-12 w-auto" />
        </div>
      </div>

      {/* Search */}
      <div className="px-4 mb-4">
        <SearchInput
          placeholder="Search courses and events..."
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </div>

      {/* Promo Banner */}
      <PromoBanner
        title="Start Learning Today"
        subtitle="Join thousands of students in our interactive courses"
        ctaText="Explore Courses"
        backgroundImage="https://images.unsplash.com/photo-1709715357564-ab64e091ead9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByZXNlbnRhdGlvbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTg5NTcyNDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        onCtaPress={() => onNavigate('courses')}
      />

      {/* Categories */}
      <CategoryPills
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {/* Popular Courses */}
      <div className="px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Popular Courses</h2>
          <button 
            className="text-primary text-sm font-medium"
            onClick={() => onNavigate('courses')}
          >
            See All
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              onPress={() => onNavigate('course-detail', { courseId: course.id })}
            />
          ))}
        </div>
      </div>

      {/* Quick Access to Events */}
      <div className="px-4 py-4">
        <div className="bg-gradient-to-r from-accent to-secondary rounded-xl p-4">
          <h3 className="font-medium mb-2">Upcoming Events</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Join exclusive workshops and conferences
          </p>
          <button 
            className="text-primary font-medium text-sm"
            onClick={() => onNavigate('events')}
          >
            View Events →
          </button>
        </div>
      </div>
    </div>
  );
}