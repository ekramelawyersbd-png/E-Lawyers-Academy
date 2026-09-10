import { Instructor, Testimonial } from '../types';

export const INSTRUCTORS_DATA: Instructor[] = [
  {
    id: 'inst-1',
    isTopRated: true,
    name: 'Advocate Tanvir Ahmed',
    followersCount: 15420,
    awardsAndRecognitions: [
      { id: "a1", title: "Top Mentor 2023", icon: "Trophy", color: "amber" },
      { id: "a2", title: "Tax Law Expert", icon: "Award", color: "indigo" }
    ],
    linkedInUrl: 'https://linkedin.com/in/adv-tanvir-ahmed-taxlaw',
    category: 'Tax',
    designation: 'Supreme Court Lawyer & Senior Tax Consultant',
    experience: '12+ Years',
    specialization: 'Income Tax, Tax Appeals & E-Return Portal Specialist',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    bio: 'Advocate Tanvir Ahmed is a distinguished practitioner at the Supreme Court of Bangladesh. He has trained over 4,000 lawyers, corporate professionals, and business owners in practical income tax filing and NBR e-services.',
    rating: 4.95,
    ratingDistribution: { 5: 85, 4: 10, 3: 3, 2: 1, 1: 1 },
    studentsTaught: 4200,
    coursesCount: 3,
    certifications: [
      'Advocate, Supreme Court of Bangladesh',
      'Enrolled Member, Dhaka Bar Association & SCBA',
      'Certified Income Tax Practitioner (ITP), NBR',
      'Master of Laws (LL.M.), University of Dhaka'
    ],
    coursesLed: [
      'Personal Income Tax & E-Return Filing Masterclass',
      'Practical Income Tax Assessment & Appeals Workshop',
      'NBR Digital Tax Portal & Surcharge Calculation Masterclass'
    ],
    fullBackground: [
      'Over 12 years of active legal practice at the Supreme Court of Bangladesh specializing in direct taxation, tax litigation, and appellate tribunal representations.',
      'Prominent faculty advisor and keynote speaker on NBR digital e-return filing workflows, having personally trained over 4,200 legal practitioners, accountants, and corporate managers.',
      'Retained consultant to leading business groups in Bangladesh for corporate tax structuring, AIT refund recovery, and statutory tax compliance.'
    ],
    notablePublications: [
      'Practical Guide to NBR E-Return (2024)',
      'Tax Appellate Strategies for Corporate Clients'
    ],
    socials: {
      linkedin: 'https://linkedin.com/in/adv-tanvir-ahmed-taxlaw',
      twitter: 'https://x.com/tanvir_taxlaw',
      website: 'https://elawyersbd.com/faculty/tanvir-ahmed',
      email: 'tanvir@elawyersbd.com'
    },
    teachingPhilosophy: 'Law and taxation should never remain abstract theory locked in heavy statute books. My core philosophy is "Practical Mastery First" — every session focuses on real NBR portal screens, live tax computation sheets, and actual appellate case studies so students gain immediate professional confidence.',
    upcomingClasses: [
      {
        id: 'cls-101',
        title: 'Personal Income Tax & E-Return Live Lab',
        date: 'Saturday, Aug 15, 2026',
        time: '8:00 PM - 10:00 PM BST',
        topic: 'Hands-on Tax Computation Sheet & NBR E-Portal Live Filing Walkthrough',
        mode: 'NBR Portal Lab'
      },
      {
        id: 'cls-102',
        title: 'Tax Assessment & Appellate Appeals Masterclass',
        date: 'Tuesday, Aug 18, 2026',
        time: '8:30 PM - 10:30 PM BST',
        topic: 'Drafting Grounds of Appeal before Commissioner (Appeals) & Tribunal Cases',
        mode: 'Live Zoom'
      }
    ]
  },
  {
    id: 'inst-2',
    isTopRated: true,
    name: 'Farhana Rahman, FCS',
    followersCount: 8900,
    awardsAndRecognitions: [
      { id: "a3", title: "VAT Specialist", icon: "ShieldCheck", color: "emerald" },
      { id: "a4", title: "Student Favorite", icon: "Star", color: "rose" }
    ],
    linkedInUrl: 'https://linkedin.com/in/farhana-rahman-fcs',
    category: 'Tax',
    designation: 'Chartered Secretary & VAT Advisor',
    experience: '10+ Years',
    specialization: 'VAT & Tax Compliance, VDS & NBR Audits',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'Farhana Rahman is a Fellow Chartered Secretary with deep expertise in Bangladesh VAT laws (2012 Act). She serves as a tax compliance consultant for leading multinational firms.',
    rating: 4.90,
    ratingDistribution: { 5: 85, 4: 10, 3: 3, 2: 1, 1: 1 },
    studentsTaught: 2800,
    coursesCount: 2,
    certifications: [
      'Fellow Chartered Secretary (FCS), ICSB',
      'Certified VAT Consultant, National Board of Revenue (NBR)',
      'PGD in International Trade & Business Law',
      'B.Sc. (Hons) in Accounting & Finance'
    ],
    coursesLed: [
      'VAT & Tax Compliance Professional Training',
      'Monthly Mushak 9.1 Return Filing & VDS Masterclass'
    ],
    fullBackground: [
      'Fellow Chartered Secretary with 10+ years of hands-on experience directing indirect tax and VAT compliance operations across retail, manufacturing, and MNC sectors.',
      'Specialist in the Value Added Tax and Supplementary Duty Act 2012, focusing on Mushak 6.1, 6.2, and 6.3 book maintenance, VDS deductions, and online e-VAT portal submissions.',
      'Extensive track record representing corporate clients during high-stakes NBR VAT audits and successfully defending cases before VAT Appellate Tribunals.'
    ],
    notablePublications: [
      'Practical Guide to NBR E-Return (2024)',
      'Tax Appellate Strategies for Corporate Clients'
    ],
    socials: {
      linkedin: 'https://linkedin.com/in/farhana-rahman-fcs',
      twitter: 'https://x.com/farhana_vatlaw',
      website: 'https://elawyersbd.com/faculty/farhana-rahman',
      email: 'farhana@elawyersbd.com'
    },
    teachingPhilosophy: 'VAT compliance is about absolute precision and systematic bookkeeping. I train my students to approach VAT not as a compliance burden, but as a strategic business control system that prevents costly penalties and streamlines audit defenses.',
    upcomingClasses: [
      {
        id: 'cls-201',
        title: 'Monthly Mushak 9.1 Return Filing Workshop',
        date: 'Sunday, Aug 16, 2026',
        time: '7:30 PM - 9:30 PM BST',
        topic: 'Live Input Tax Credit Reconciliations & e-VAT Portal Submission',
        mode: 'NBR Portal Lab'
      },
      {
        id: 'cls-202',
        title: 'VDS (VAT Deducted at Source) Masterclass',
        date: 'Thursday, Aug 20, 2026',
        time: '8:00 PM - 10:00 PM BST',
        topic: 'Issuing Mushak 6.3 Tax Invoices & VDS Certificates across 30+ Sectors',
        mode: 'Interactive Workshop'
      }
    ]
  },
  {
    id: 'inst-3',
    name: 'Barrister Rafiqul Hossain',
    followersCount: 12100,
    awardsAndRecognitions: [
      { id: "a5", title: "Business Elite", icon: "Crown", color: "purple" }
    ],
    linkedInUrl: 'https://linkedin.com/in/barrister-rafiqul-hossain',
    category: 'Business',
    designation: 'Head of Corporate Practice & RJSC Expert',
    experience: '14+ Years',
    specialization: 'Company Law, RJSC Incorporations & Cross-Border Deals',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Barrister Rafiqul Hossain has advised over 300 companies on company formation, FDI approvals with BIDA, and complex shareholder restructurings at RJSC.',
    rating: 4.92,
    ratingDistribution: { 5: 85, 4: 10, 3: 3, 2: 1, 1: 1 },
    studentsTaught: 3100,
    coursesCount: 2,
    certifications: [
      'Barrister-at-Law, Honorable Society of Lincoln’s Inn (UK)',
      'Advocate, High Court Division, Supreme Court of Bangladesh',
      'Certified Corporate Governance Specialist',
      'LL.B. (Hons), University of London'
    ],
    coursesLed: [
      'Corporate Legal Compliance Course',
      'RJSC Company Formation & Share Capital Restructuring Masterclass'
    ],
    fullBackground: [
      'Head of Corporate & Commercial Practice at a premier Dhaka law firm with 14+ years advising international investors, tech startups, and publicly listed entities.',
      'Specialized expertise in RJSC online portal filings, BIDA foreign investment clearances, joint venture structuring, and corporate governance frameworks.',
      'Has spearheaded over 300 successful corporate incorporations, M&A transactions, and cross-border commercial deals in Bangladesh.'
    ],
    notablePublications: [
      'Practical Guide to NBR E-Return (2024)',
      'Tax Appellate Strategies for Corporate Clients'
    ],
    socials: {
      linkedin: 'https://linkedin.com/in/barrister-rafiqul-hossain',
      twitter: 'https://x.com/rafiqul_hossain_law',
      website: 'https://elawyersbd.com/faculty/rafiqul-hossain',
      email: 'rafiqul@elawyersbd.com'
    },
    teachingPhilosophy: 'Corporate legal practice requires both meticulous statutory adherence and strategic commercial foresight. I aim to empower students to think like lead corporate counsel — anticipating risks, structuring bulletproof agreements, and navigating regulatory portals efficiently.',
    upcomingClasses: [
      {
        id: 'cls-301',
        title: 'RJSC Company Incorporation & Portal Masterclass',
        date: 'Monday, Aug 17, 2026',
        time: '8:00 PM - 10:00 PM BST',
        topic: 'Name Clearance, E-MoA/AoA Drafting, and Digital RJSC Approval Portal',
        mode: 'NBR Portal Lab'
      },
      {
        id: 'cls-302',
        title: 'Share Capital Restructuring & Annual Returns',
        date: 'Wednesday, Aug 22, 2026',
        time: '8:30 PM - 10:30 PM BST',
        topic: 'Form X, Form VIII, and Allotment Filings for Expanding Startups',
        mode: 'Live Zoom'
      }
    ]
  },
  {
    id: 'inst-4',
    name: 'Advocate Shamsul Alam',
    followersCount: 6500,
    awardsAndRecognitions: [
      { id: "a6", title: "Legal Drafting Guru", icon: "Medal", color: "blue" }
    ],
    linkedInUrl: 'https://linkedin.com/in/adv-shamsul-alam-drafting',
    category: 'Legal',
    designation: 'Senior Legal Drafting Specialist',
    experience: '15+ Years',
    specialization: 'Commercial Contracts, Statutory Notices & Deeds',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Advocate Shamsul Alam specializes in drafting airtight commercial contracts, partnership deeds, and statutory legal notices. His practical workshops are acclaimed nationwide.',
    rating: 4.98,
    ratingDistribution: { 5: 85, 4: 10, 3: 3, 2: 1, 1: 1 },
    studentsTaught: 3500,
    coursesCount: 2,
    certifications: [
      'Advocate, High Court Division, Supreme Court of Bangladesh',
      'Senior Member, Supreme Court Bar Association',
      'Certified Commercial Arbitrator & Legal Mediator',
      'LL.M. in Commercial Law'
    ],
    coursesLed: [
      'Professional Legal Drafting Course',
      'Airtight Contract Drafting & Statutory Legal Notice Masterclass'
    ],
    fullBackground: [
      '15+ years of litigation and precision legal drafting experience at the Supreme Court of Bangladesh and Dhaka Judge Court.',
      'Renowned nationwide for transforming complex legal frameworks into practical, enforceable contract clauses, power of attorney deeds, and statutory legal notices.',
      'Author of multiple practical drafting guides and templates utilized by junior advocates and corporate legal officers throughout the country.'
    ],
    notablePublications: [
      'Practical Guide to NBR E-Return (2024)',
      'Tax Appellate Strategies for Corporate Clients'
    ],
    socials: {
      linkedin: 'https://linkedin.com/in/adv-shamsul-alam-drafting',
      twitter: 'https://x.com/shamsul_drafting',
      website: 'https://elawyersbd.com/faculty/shamsul-alam',
      email: 'shamsul@elawyersbd.com'
    },
    teachingPhilosophy: 'Every word in a legal instrument carries real financial and legal weight. My goal is to eliminate vague template-copying and teach students how to draft custom, bulletproof clauses that protect client interests in any courtroom or tribunal.',
    upcomingClasses: [
      {
        id: 'cls-401',
        title: 'Commercial Agreement Drafting & Dispute Clauses',
        date: 'Friday, Aug 21, 2026',
        time: '8:00 PM - 10:00 PM BST',
        topic: 'Indemnity, Force Majeure, Termination & Arbitration Clause Construction',
        mode: 'Interactive Workshop'
      },
      {
        id: 'cls-402',
        title: 'Statutory Legal Notices & Power of Attorney Deeds',
        date: 'Sunday, Aug 23, 2026',
        time: '7:30 PM - 9:30 PM BST',
        topic: 'Section 138 NI Act Notices, Eviction Notices, and Irrevocable Power Deeds',
        mode: 'Live Zoom'
      }
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Advocate Mahmudul Hasan',
    category: 'Legal',
    followersCount: 3200,
    designation: 'Practicing Advocate, Dhaka Judge Court',
    content: 'E-Lawyers Academy helped me understand complex income tax and online E-Return submission through practical step-by-step examples. The live Q&A sessions with Senior Advocate Tanvir Ahmed were invaluable for my law practice!',
    rating: 5,
    ratingDistribution: { 5: 85, 4: 10, 3: 3, 2: 1, 1: 1 },
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'test-2',
    name: 'Shamima Akter',
    category: 'Tax',
    followersCount: 4100,
    designation: 'Senior Tax & Accounts Officer',
    company: 'FinCorp Logistics Ltd.',
    content: 'The VAT & Tax Compliance Professional Training course gave me hands-on experience with Mushak 6.1, 6.2, and online 9.1 return filing. I received my official certificate and got promoted at my firm within two months!',
    rating: 5,
    ratingDistribution: { 5: 85, 4: 10, 3: 3, 2: 1, 1: 1 },
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'test-3',
    name: 'Kamrul Islam',
    category: 'Business',
    followersCount: 2800,
    designation: 'Managing Director & Entrepreneur',
    company: 'TechSphere Bangladesh',
    content: 'As a startup founder, understanding RJSC corporate compliance and agreement drafting was essential. This academy bridged the gap between dry law books and real-world business requirements seamlessly.',
    rating: 5,
    ratingDistribution: { 5: 85, 4: 10, 3: 3, 2: 1, 1: 1 },
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
  },
];
