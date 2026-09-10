import React, { useState } from 'react';
import { Course, LiveClass, RecordedClass, CertificateData } from './types';
import { COURSES_DATA, UPCOMING_LIVE_CLASSES, RECORDED_CLASSES } from './data/coursesData';
import { INSTRUCTORS_DATA, TESTIMONIALS_DATA } from './data/instructorsData';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ServicesSection } from './components/ServicesSection';
import { LiveClassSection } from './components/LiveClassSection';
import { LiveClassRoomModal } from './components/LiveClassRoomModal';
import { RecordedClassSection } from './components/RecordedClassSection';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { CourseDetailModal } from './components/CourseDetailModal';
import { StudentDashboard } from './components/StudentDashboard';
import { InstructorsSection } from './components/InstructorsSection';
import { LearningProcess } from './components/LearningProcess';
import { Testimonials } from './components/Testimonials';
import { PricingSection } from './components/PricingSection';
import { FAQSection } from './components/FAQSection';
import { CommunitySection } from './components/CommunitySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { AIAdvisorModal } from './components/AIAdvisorModal';
import { EnrollmentDrawer } from './components/EnrollmentDrawer';
import { CertificateModal } from './components/CertificateModal';
import { CertificateVerifierModal } from './components/CertificateVerifierModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { ScrollToTop } from './components/ScrollToTop';
import { AnimatedSection } from './components/AnimatedSection';
import { useDocumentMeta } from './utils/useDocumentMeta';

export function App() {
  // Navigation & View Mode
  const [currentView, setCurrentView] = useState<'public' | 'dashboard' | 'admin'>('public');

  // App Data State
  const [courses, setCourses] = useState<Course[]>(COURSES_DATA);
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>(UPCOMING_LIVE_CLASSES);
  const [recordedClasses, setRecordedClasses] = useState<RecordedClass[]>(RECORDED_CLASSES);

  // Modals & Drawers State
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<Course | null>(null);
  const [selectedEnrollCourse, setSelectedEnrollCourse] = useState<Course | null>(null);
  const [activeLiveClass, setActiveLiveClass] = useState<LiveClass | null>(null);
  const [activeRecording, setActiveRecording] = useState<RecordedClass | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateData | null>(null);
  const [showCertVerifier, setShowCertVerifier] = useState(false);
  const [showAIAdvisor, setShowAIAdvisor] = useState(false);

  // Dynamic document title and meta description management
  useDocumentMeta({
    currentView,
    selectedCourseDetail,
    activeLiveClass,
    activeRecording,
    showAIAdvisor,
    showCertVerifier,
    selectedCertificate,
  });

  // Handlers
  const handleAddCourse = (newCourse: Course) => {
    setCourses([newCourse, ...courses]);
  };

  const handleAddLiveClass = (newLive: LiveClass) => {
    setLiveClasses([newLive, ...liveClasses]);
  };

  const handleAddRecordedClass = (newRec: RecordedClass) => {
    setRecordedClasses([newRec, ...recordedClasses]);
  };

  const handleSelectRecommendedCourse = (courseTitle: string) => {
    const found = courses.find((c) =>
      c.title.toLowerCase().includes(courseTitle.toLowerCase())
    );
    if (found) {
      setSelectedCourseDetail(found);
    } else {
      setSelectedCourseDetail(courses[0]);
    }
  };

  const handleSelectPricingPlan = (planName: string) => {
    setSelectedEnrollCourse(courses[0]);
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedEnrollCourse(courses[0]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-600 selection:text-white flex flex-col justify-between">
      {/* Top Sticky Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={(v) => setCurrentView(v)}
        onOpenAIAdvisor={() => setShowAIAdvisor(true)}
        onOpenCertVerifier={() => setShowCertVerifier(true)}
      />

      {/* VIEW SWITCHER ROUTING */}
      {currentView === 'public' && (
        <main className="flex-grow">
          {/* Section 1: Hero Section */}
          <HeroSection
            onExploreCourses={() => {
              const el = document.getElementById('courses');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onJoinFreeSession={() => setActiveLiveClass(liveClasses[0])}
            onOpenAIAdvisor={() => setShowAIAdvisor(true)}
          />

          {/* Section 2: About E-Lawyers Academy */}
          <AnimatedSection>
            <AboutSection />
          </AnimatedSection>

          {/* Section 3: Why Choose Us */}
          <AnimatedSection>
            <WhyChooseUs />
          </AnimatedSection>

          {/* Section 3.5: Professional Legal & Tax Services */}
          <AnimatedSection>
            <ServicesSection onSelectService={handleSelectService} />
          </AnimatedSection>

          {/* Section 6: Live Class Section & Spotlight */}
          <AnimatedSection>
            <LiveClassSection
              liveClasses={liveClasses}
              onJoinLiveClass={(lc) => setActiveLiveClass(lc)}
            />
          </AnimatedSection>

          {/* Section 7: Recorded Class Section */}
          <AnimatedSection>
            <RecordedClassSection
              recordedClasses={recordedClasses}
              onWatchRecording={(rec) => setActiveRecording(rec)}
            />
          </AnimatedSection>

          {/* Section 9: Meet Our Instructors */}
          <AnimatedSection>
            <InstructorsSection
              onSelectCourseByTitle={(title) => {
                const found = courses.find((c) =>
                  c.title.toLowerCase().includes(title.toLowerCase()) ||
                  title.toLowerCase().includes(c.title.toLowerCase())
                );
                if (found) {
                  setSelectedCourseDetail(found);
                }
              }}
            />
          </AnimatedSection>

          {/* Section 10: How It Works */}
          <AnimatedSection>
            <LearningProcess />
          </AnimatedSection>

          {/* Section 11: Student Testimonials */}
          <AnimatedSection>
            <Testimonials />
          </AnimatedSection>

          {/* Section 12: Pricing Section */}
          <AnimatedSection>
            <PricingSection onSelectPlan={handleSelectPricingPlan} />
          </AnimatedSection>

          {/* Section 13: FAQ Section */}
          <AnimatedSection>
            <FAQSection />
          </AnimatedSection>

          {/* Section 14: Community Section */}
          <AnimatedSection>
            <CommunitySection />
          </AnimatedSection>

          {/* Section 15: Contact Us */}
          <AnimatedSection>
            <ContactSection />
          </AnimatedSection>
        </main>
      )}

      {currentView === 'dashboard' && (
        <main className="flex-grow">
          <StudentDashboard
            courses={courses}
            liveClasses={liveClasses}
            recordedClasses={recordedClasses}
            onWatchRecording={(rec) => setActiveRecording(rec)}
            onOpenCertificateModal={(cert) => setSelectedCertificate(cert)}
            onOpenCertVerifier={() => setShowCertVerifier(true)}
          />
        </main>
      )}

      {currentView === 'admin' && (
        <main className="flex-grow">
          <AdminPanel
            courses={courses}
            liveClasses={liveClasses}
            recordedClasses={recordedClasses}
            onAddCourse={handleAddCourse}
            onAddLiveClass={handleAddLiveClass}
            onAddRecordedClass={handleAddRecordedClass}
          />
        </main>
      )}

      {/* Global Footer */}
      <Footer
        onOpenCertVerifier={() => setShowCertVerifier(true)}
        onOpenAIAdvisor={() => setShowAIAdvisor(true)}
        setCurrentView={setCurrentView}
      />

      {/* MODALS & OVERLAYS */}
      {selectedCourseDetail && (
        <CourseDetailModal
          course={selectedCourseDetail}
          onClose={() => setSelectedCourseDetail(null)}
          onEnroll={(c) => {
            setSelectedCourseDetail(null);
            setSelectedEnrollCourse(c);
          }}
        />
      )}

      {/* Enrollment Drawer / Modal */}
      {selectedEnrollCourse && (
        <EnrollmentDrawer
          course={selectedEnrollCourse}
          onClose={() => setSelectedEnrollCourse(null)}
        />
      )}

      {/* Live Classroom / Streaming Modal */}
      {activeLiveClass && (
        <LiveClassRoomModal
          liveClass={activeLiveClass}
          onClose={() => setActiveLiveClass(null)}
        />
      )}

      {/* Recorded Class Video Player Modal */}
      {activeRecording && (
        <VideoPlayerModal
          recordedClass={activeRecording}
          onClose={() => setActiveRecording(null)}
        />
      )}

      {/* Certificate Display & Print Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />

      {/* Certificate Verifier Search Modal */}
      {showCertVerifier && (
        <CertificateVerifierModal onClose={() => setShowCertVerifier(false)} />
      )}

      {/* Gemini AI Course & Career Advisor Modal */}
      {showAIAdvisor && (
        <AIAdvisorModal
          onClose={() => setShowAIAdvisor(false)}
          onSelectRecommendedCourse={handleSelectRecommendedCourse}
        />
      )}

      {/* Persistent WhatsApp Floating Widget */}
      <WhatsAppWidget />

      {/* Cookie Consent Banner */}
      <CookieConsentBanner />

      {/* Scroll to Top Floating Trigger */}
      <ScrollToTop />
    </div>
  );
}

export default App;
