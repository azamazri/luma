import { useState } from "react";
import { SearchInput } from "../components/ui/search-input";
import { CategoryPills } from "../components/ui/category-pills";
import { CourseCard } from "../components/ui/course-card";
import { mockCourses, categories } from "../data/mock-data";

interface CoursesPageProps {
  onNavigate: (screen: string, params?: any) => void;
}

export function CoursesPage({ onNavigate }: CoursesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-muted/20">
      {/* === Sticky toolbar tepat di bawah header === */}
      <div className="sticky top-14 z-40 bg-background border-b">
        <div className="px-4 pt-3 pb-4 space-y-3">
          <SearchInput
            placeholder="Search courses..."
            value={searchQuery}
            onChange={setSearchQuery}
          />

          {/* perhatikan: TIDAK lagi menambah 'All' manual */}
          <CategoryPills
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />

          <p className="text-sm text-muted-foreground">
            {filteredCourses.length} courses found
          </p>
        </div>
      </div>

      {/* ===== Konten list ===== */}
      <div className="px-4 pb-8 space-y-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              onClick={() => onNavigate("course-detail", { id: course.id })}
            />
          ))
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
