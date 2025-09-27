import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { LessonRow } from '../components/ui/lesson-row';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Clock, BookOpen, Users, Star } from 'lucide-react';
import { mockCourses } from '../data/mock-data';

interface CourseDetailPageProps {
  courseId: string;
  onNavigate: (screen: string, params?: any) => void;
  isAuthenticated: boolean;
  userEnrolledCourses: string[];
}

export function CourseDetailPage({ 
  courseId, 
  onNavigate, 
  isAuthenticated,
  userEnrolledCourses 
}: CourseDetailPageProps) {
  const course = mockCourses.find(c => c.id === courseId);
  
  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-2">Course not found</h2>
          <Button onClick={() => onNavigate('courses')} variant="outline">
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  const isEnrolled = userEnrolledCourses.includes(courseId);
  const canAccessLessons = isEnrolled || course.price === 0;

  const handleCTAPress = () => {
    if (!isAuthenticated) {
      onNavigate('login');
      return;
    }

    if (course.price === 0) {
      // Free course - enroll directly
      onNavigate('success', { type: 'enrollment', item: course });
    } else {
      // Paid course - go to checkout
      onNavigate('checkout', { type: 'course', item: course });
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-background">
      {/* Hero Media */}
      <div className="aspect-video relative">
        <ImageWithFallback
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Course Header */}
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <h1 className="text-xl font-semibold">{course.title}</h1>
          <p className="text-muted-foreground">{course.description}</p>
        </div>

        {/* Meta Info */}
        <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>{course.lessons} lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>1.2k students</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-current text-yellow-500" />
            <span>4.8</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{course.level}</Badge>
          <Badge variant="secondary">{course.category}</Badge>
          <Badge 
            variant={course.price === 0 ? "secondary" : "default"}
            className={course.price === 0 ? "bg-success text-success-foreground" : ""}
          >
            {course.price === 0 ? 'FREE' : `Rp ${course.price.toLocaleString('id-ID')}`}
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-1">
        <Tabs defaultValue="lessons" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mx-4 bg-muted">
            <TabsTrigger 
              value="lessons" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Lessons
            </TabsTrigger>
            <TabsTrigger 
              value="description"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Description
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="lessons" className="mt-4 px-4">
            <div className="space-y-2">
              {course.lessons_content?.map((lesson, index) => (
                <LessonRow
                  key={index}
                  title={lesson.title}
                  duration={lesson.duration}
                  isLocked={!canAccessLessons || lesson.isLocked}
                  onPress={() => {
                    if (canAccessLessons && !lesson.isLocked) {
                      // Navigate to lesson player (not implemented in this demo)
                      console.log('Playing lesson:', lesson.title);
                    }
                  }}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="description" className="mt-4 px-4 pb-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Apa yang akan Anda pelajari</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {course.id === '1' && (
                    <>
                      <li>• Teknik dasar styling hijab untuk berbagai bentuk wajah</li>
                      <li>• Cara memilih jenis hijab yang sesuai dengan acara</li>
                      <li>• Tips memadukan warna hijab dengan outfit</li>
                      <li>• Gaya hijab untuk kegiatan sehari-hari dan formal</li>
                      <li>• Perawatan dan penyimpanan hijab yang benar</li>
                    </>
                  )}
                  {course.id === '2' && (
                    <>
                      <li>• Prinsip berpakaian modest sesuai syariat Islam</li>
                      <li>• Mix and match outfit muslimah yang stylish</li>
                      <li>• Memilih pakaian sesuai bentuk tubuh</li>
                      <li>• Trend fashion modest terkini</li>
                      <li>• Tips berbelanja fashion muslimah yang hemat</li>
                    </>
                  )}
                  {course.id === '3' && (
                    <>
                      <li>• Sejarah dan filosofi abaya dalam Islam</li>
                      <li>• Cara memilih abaya sesuai postur tubuh</li>
                      <li>• Styling abaya untuk berbagai kesempatan</li>
                      <li>• Memadukan aksesoris dengan abaya</li>
                      <li>• Perawatan abaya agar awet dan tetap indah</li>
                    </>
                  )}
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Prasyarat</h3>
                <p className="text-sm text-muted-foreground">
                  Tidak ada prasyarat khusus. Kursus ini cocok untuk pemula yang ingin belajar fashion muslimah dari dasar.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Spacing for Free Courses */}
      {isEnrolled && course.price === 0 && (
        <div className="h-4" />
      )}

      {/* Sticky CTA */}
      {!isEnrolled && (
        <div className="sticky bottom-0 p-4 bg-card border-t border-border">
          <Button 
            className="w-full"
            onClick={handleCTAPress}
          >
            {course.price === 0 ? 'ENROLL NOW' : `BUY NOW - Rp ${course.price.toLocaleString('id-ID')}`}
          </Button>
        </div>
      )}
    </div>
  );
}