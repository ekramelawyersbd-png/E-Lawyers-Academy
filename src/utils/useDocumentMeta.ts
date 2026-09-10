import { useEffect } from 'react';
import { Course, LiveClass, RecordedClass, CertificateData } from '../types';

interface DocumentMetaProps {
  currentView: 'public' | 'dashboard' | 'admin';
  selectedCourseDetail?: Course | null;
  activeLiveClass?: LiveClass | null;
  activeRecording?: RecordedClass | null;
  showAIAdvisor?: boolean;
  showCertVerifier?: boolean;
  selectedCertificate?: CertificateData | null;
}

/**
 * Helper function to dynamically update the document title and meta description
 * based on the user's active view, section, or modal dialog.
 */
export function updateDocumentMeta({
  currentView,
  selectedCourseDetail,
  activeLiveClass,
  activeRecording,
  showAIAdvisor,
  showCertVerifier,
  selectedCertificate,
}: DocumentMetaProps) {
  let title = 'E-Lawyers Academy | Tax & Legal Professional Training';
  let description =
    'Master Income Tax Act 2023, VAT & SD Act 2012, Corporate Tax Returns, and High Court Legal Drafting with live classes and NBR practitioner certification.';

  if (selectedCourseDetail) {
    title = `${selectedCourseDetail.title} | E-Lawyers Academy`;
    description = selectedCourseDetail.overview || description;
  } else if (activeLiveClass) {
    title = `Live Class: ${activeLiveClass.topic} | E-Lawyers Academy`;
    description = `Join live interactive session on ${activeLiveClass.topic} (${activeLiveClass.courseTitle}) hosted by ${activeLiveClass.instructor}.`;
  } else if (activeRecording) {
    title = `Watch Session: ${activeRecording.sessionTitle} | E-Lawyers Academy`;
    description = `Watch recorded lecture for ${activeRecording.courseTitle} - ${activeRecording.duration}.`;
  } else if (showAIAdvisor) {
    title = `AI Tax & Course Advisor | E-Lawyers Academy`;
    description = `Get instant AI-powered advice on income tax laws, VAT SROs, and personalized legal course recommendations.`;
  } else if (showCertVerifier) {
    title = `Verify Digital Certificate | E-Lawyers Academy`;
    description = `Verify authentic statutory tax practitioner and legal advisor completion certificates issued by E-Lawyers Academy.`;
  } else if (selectedCertificate) {
    title = `Certificate: ${selectedCertificate.studentName} | E-Lawyers Academy`;
    description = `Verified digital certificate for ${selectedCertificate.courseTitle} awarded to ${selectedCertificate.studentName}.`;
  } else if (currentView === 'dashboard') {
    title = `Student Portal & Dashboard | E-Lawyers Academy`;
    description = `Access enrolled tax courses, live class schedules, study planners, career roadmaps, and personal study notes.`;
  } else if (currentView === 'admin') {
    title = `Admin Management Panel | E-Lawyers Academy`;
    description = `Manage academy course catalogs, live streams, recorded modules, and student enrollment metrics.`;
  }

  // Update document title
  document.title = title;

  // Update or insert meta description tag
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);
}

/**
 * Custom React hook wrapper for automatic document metadata updates
 */
export function useDocumentMeta(props: DocumentMetaProps) {
  useEffect(() => {
    updateDocumentMeta(props);
  }, [
    props.currentView,
    props.selectedCourseDetail,
    props.activeLiveClass,
    props.activeRecording,
    props.showAIAdvisor,
    props.showCertVerifier,
    props.selectedCertificate,
  ]);
}
