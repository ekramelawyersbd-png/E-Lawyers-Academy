import { QuizQuestion } from '../types';

export interface CourseQuiz {
  id: string;
  courseId: string;
  courseTitle: string;
  category: 'Taxation' | 'VAT' | 'Corporate' | 'Drafting';
  title: string;
  description: string;
  durationMinutes: number;
  passPercentage: number;
  badgeRewardId: string;
  badgeRewardName: string;
  questions: QuizQuestion[];
}

export const INCOME_TAX_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Under the Bangladesh Income Tax Act, what is the maximum investment limit allowed for tax rebate eligibility in a tax year?',
    options: [
      '15% of total taxable income or BDT 1 Crore (whichever is lower)',
      '20% of total taxable income or BDT 1.5 Crore (whichever is lower)',
      '25% of total taxable income or BDT 50 Lakhs',
      'No upper ceiling exists for tax rebates',
    ],
    correctAnswer: 0,
    explanation: 'As per current tax guidelines, allowable investment for tax rebate is calculated at 15% of total taxable income (excluding exempt income) or actual investment or BDT 10 million (1 Crore), whichever is lower.',
  },
  {
    id: 2,
    question: 'Which official NBR portal URL is used for completing online E-Return filing in Bangladesh?',
    options: [
      'www.incometax.gov.bd',
      'etaxnbr.gov.bd',
      'e-return.nbr.bd.com',
      'taxservice.gov.bd',
    ],
    correctAnswer: 1,
    explanation: 'The official e-Return portal maintained by the National Board of Revenue (NBR) is etaxnbr.gov.bd.',
  },
  {
    id: 3,
    question: 'What is the mandatory form number for individual income tax return filing in Bangladesh?',
    options: ['Form IT-11GA', 'Mushak 9.1', 'Form RJSC IX', 'Form e-TIN 02'],
    correctAnswer: 0,
    explanation: 'Form IT-11GA is the standard individual return form prescribed for individual tax payers in Bangladesh.',
  },
  {
    id: 4,
    question: 'Which document is generated instantly by the NBR E-Return system upon successful submission of an online return?',
    options: [
      'Trade License Certificate',
      'Tax Acknowledgement Receipt & System-Generated Certificate',
      'RJSC Name Clearance Letter',
      'BIN Certificate',
    ],
    correctAnswer: 1,
    explanation: 'Upon submitting your e-Return, the system automatically verifies the payment and issues an instant downloadable Tax Acknowledgement Receipt & E-Return Certificate.',
  },
  {
    id: 5,
    question: 'What is the tax rate on dividend income received from a Bangladesh resident company by an individual resident taxpayer holding e-TIN?',
    options: ['5%', '10%', '15%', '25%'],
    correctAnswer: 1,
    explanation: 'For resident individuals having e-TIN, tax deducted at source (TDS) on dividend income is 10%. (If no e-TIN, it is 15%).',
  },
];

export const ALL_COURSE_QUIZZES: CourseQuiz[] = [
  {
    id: 'quiz-income-tax',
    courseId: 'course-income-tax',
    courseTitle: 'Personal Income Tax & E-Return Filing Masterclass',
    category: 'Taxation',
    title: 'Income Tax & E-Return Knowledge Assessment',
    description: 'Test your practical knowledge on Bangladesh Income Tax Act 2023, investment rebates, tax slabs, and online e-Return submission.',
    durationMinutes: 10,
    passPercentage: 80,
    badgeRewardId: 'badge-tax-quiz-whiz',
    badgeRewardName: 'Income Tax Quiz Whiz',
    questions: INCOME_TAX_QUIZ,
  },
  {
    id: 'quiz-vat-compliance',
    courseId: 'course-vat-compliance',
    courseTitle: 'VAT & Tax Compliance Professional Training',
    category: 'VAT',
    title: 'VAT & SD Compliance Practice Assessment',
    description: 'Evaluate your understanding of Value Added Tax and Supplementary Duty Act 2012, Mushak forms, VDS rules, and online 9.1 returns.',
    durationMinutes: 10,
    passPercentage: 80,
    badgeRewardId: 'badge-vat-act-specialist',
    badgeRewardName: 'VAT Act Specialist',
    questions: [
      {
        id: 1,
        question: 'Which mandatory Mushak form is submitted monthly by a registered taxpayer for VAT return filing in Bangladesh?',
        options: ['Mushak 6.1', 'Mushak 6.3', 'Mushak 9.1', 'Mushak 4.3'],
        correctAnswer: 2,
        explanation: 'Mushak 9.1 is the monthly VAT return form submitted online before the 15th day of the following month.',
      },
      {
        id: 2,
        question: 'Under VAT Act 2012, which form serves as the standard Tax Invoice issued at the time of sale?',
        options: ['Mushak 6.3', 'Mushak 6.1', 'Mushak 6.6', 'Mushak 2.3'],
        correctAnswer: 0,
        explanation: 'Mushak 6.3 is the prescribed Tax Invoice issued for goods and services sold to customers.',
      },
      {
        id: 3,
        question: 'What is the standard rate of VAT in Bangladesh unless specifically exempted or reduced?',
        options: ['5%', '10%', '15%', '20%'],
        correctAnswer: 2,
        explanation: '15% is the default standard rate of VAT under the VAT and Supplementary Duty Act 2012.',
      },
      {
        id: 4,
        question: 'Which Mushak form is issued to suppliers as proof of VAT Deducted at Source (VDS)?',
        options: ['Mushak 6.6', 'Mushak 6.2', 'Mushak 9.1', 'Mushak 11'],
        correctAnswer: 0,
        explanation: 'Mushak 6.6 is the VDS Certificate provided to sellers showing tax deducted at source.',
      },
      {
        id: 5,
        question: 'By which day of the month must the monthly VAT return (Mushak 9.1) be submitted to avoid penalty?',
        options: ['10th day', '15th day', '20th day', 'Last day of the month'],
        correctAnswer: 1,
        explanation: 'Monthly VAT return must be filed by the 15th of the following calendar month.',
      },
    ],
  },
  {
    id: 'quiz-corporate-compliance',
    courseId: 'course-corporate-compliance',
    courseTitle: 'Corporate Legal Compliance Course',
    category: 'Corporate',
    title: 'RJSC Company Law & Incorporation Practice Test',
    description: 'Assess your legal understanding of the Companies Act 1994, RJSC incorporation steps, board resolutions, and statutory filings.',
    durationMinutes: 12,
    passPercentage: 80,
    badgeRewardId: 'badge-rjsc-master',
    badgeRewardName: 'RJSC Corporate Specialist',
    questions: [
      {
        id: 1,
        question: 'What is the minimum number of directors required for incorporating a Private Limited Company in Bangladesh?',
        options: ['1 Director (Single Person Company)', '2 Directors', '3 Directors', '5 Directors'],
        correctAnswer: 1,
        explanation: 'Standard Private Limited Companies require a minimum of 2 directors (or 1 for One Person Company - OPC).',
      },
      {
        id: 2,
        question: 'Which document outlines the fundamental internal regulations and management rules of a company?',
        options: [
          'Memorandum of Association (MoA)',
          'Articles of Association (AoA)',
          'Trade License Copy',
          'Form IX',
        ],
        correctAnswer: 1,
        explanation: 'The Articles of Association (AoA) contains internal governance rules, director powers, and meeting guidelines.',
      },
      {
        id: 3,
        question: 'Which statutory form must be filed with RJSC to notify consent to act as a Director?',
        options: ['Form IX', 'Form XII', 'Schedule X', 'Form 23B'],
        correctAnswer: 0,
        explanation: 'Form IX is the consent letter signed by directors accepting their appointment in the company.',
      },
      {
        id: 4,
        question: 'How frequently must a Private Limited Company hold its Annual General Meeting (AGM)?',
        options: [
          'Every 6 months',
          'Once in every calendar year (within 15 months of previous AGM)',
          'Every 2 years',
          'Only when requested by shareholders',
        ],
        correctAnswer: 1,
        explanation: 'An AGM must be held at least once in every calendar year and not more than 15 months after the previous AGM.',
      },
      {
        id: 5,
        question: 'Which government authority issues Name Clearance and Incorporation Certificates for companies in Bangladesh?',
        options: ['BIDA', 'NBR', 'RJSC (Registrar of Joint Stock Companies and Firms)', 'City Corporation'],
        correctAnswer: 2,
        explanation: 'RJSC is the regulatory body managing company incorporation, name clearance, and statutory returns.',
      },
    ],
  },
  {
    id: 'quiz-legal-drafting',
    courseId: 'course-legal-drafting',
    courseTitle: 'Professional Legal Drafting Course',
    category: 'Drafting',
    title: 'Legal Contracts & Agreement Drafting Practice Quiz',
    description: 'Test your expertise on structuring legal notices, indemnity clauses, dispute resolution terms, and commercial contract drafting.',
    durationMinutes: 10,
    passPercentage: 80,
    badgeRewardId: 'badge-drafting-pro',
    badgeRewardName: 'Precision Legal Drafter',
    questions: [
      {
        id: 1,
        question: 'What is the purpose of a "Recitals" section in a commercial contract?',
        options: [
          'To state the governing jurisdiction',
          'To set out the background context and intentions of the parties',
          'To specify the liquidated damages',
          'To list the signatures and witnesses',
        ],
        correctAnswer: 1,
        explanation: 'Recitals (usually starting with "WHEREAS") provide background context and explain why parties are entering into the agreement.',
      },
      {
        id: 2,
        question: 'Which clause protects a contracting party from liability caused by extraordinary, uncontrollable events like natural disasters?',
        options: ['Indemnity Clause', 'Force Majeure Clause', 'Severability Clause', 'Entire Agreement Clause'],
        correctAnswer: 1,
        explanation: 'A Force Majeure clause excuses performance obligations when unforeseen events outside reasonable control prevent fulfillment.',
      },
      {
        id: 3,
        question: 'What statutory notice period is generally required under Section 138 of the Negotiable Instruments Act for cheque dishonor legal notices?',
        options: ['7 days', '15 days', '30 days', '60 days'],
        correctAnswer: 2,
        explanation: 'A 30-day notice must be served to the drawer giving them 30 days to pay the dishonored amount before filing a criminal complaint.',
      },
      {
        id: 4,
        question: 'Which legal principle states that written terms of a signed formal contract supersede prior oral negotiations?',
        options: ['Parol Evidence Rule & Entire Agreement Clause', 'Res Judicata', 'Locus Standi', 'Caveat Emptor'],
        correctAnswer: 0,
        explanation: 'An "Entire Agreement" clause establishes that the written agreement represents the complete final understanding of the parties.',
      },
      {
        id: 5,
        question: 'What is the primary distinction between an "Indemnity" and a "Guarantee" under contract law?',
        options: [
          'An indemnity involves three parties, a guarantee has two',
          'An indemnity is a primary obligation to make good a loss; a guarantee is a secondary obligation upon debtor default',
          'Indemnities are only valid for real estate contracts',
          'There is no difference in legal practice',
        ],
        correctAnswer: 1,
        explanation: 'Indemnity creates a direct primary liability to save from loss, whereas a guarantee is collateral backup when a primary debtor defaults.',
      },
    ],
  },
];
