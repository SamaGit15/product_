/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, PortfolioProject, Testimonial, BlogPost, EventItem, Inquiry, GalleryItem, SiteSettings } from './types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 's1',
    title: 'AI-Powered Virtual Assistant',
    description: 'Advanced conversational agents trained on your specific business knowledge base to automate customer service and support 24/7.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    icon: 'MessageSquareText',
    features: [
      'Multi-channel integration (Web, WhatsApp, Slack)',
      'Secure context preservation & semantic memory',
      'Instant answers with automated human handoff',
      'Dynamic intent recognition & multilingual routing'
    ],
    pricing: 'From $1,500/mo',
    category: 'Conversational AI'
  },
  {
    id: 's2',
    title: 'Affordable Prototyping',
    description: 'Rapidly conceptualize, build, and test AI solution prototypes within days using state-of-the-art agile frameworks to prove ROI quickly.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200',
    icon: 'Cpu',
    features: [
      'Interactive Figma high-fidelity wireframes',
      'Functional Proof of Concept (PoC) build in 2 weeks',
      'Cloud deployment with scaled test databases',
      'User validation testing & detailed technical roadmapping'
    ],
    pricing: 'Flat $4,999 package',
    category: 'Product Strategy'
  },
  {
    id: 's3',
    title: 'Digital Employee Experience',
    description: 'Transform internal workflows with intelligent workspace assistants that search documentation, summarize reports, and automate reminders.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
    icon: 'Sparkles',
    features: [
      'Internal knowledge base semantic search',
      'Automated meeting transcript summaries',
      'Contextual onboarding bots for new hires',
      'Secure active-directory permission hierarchy'
    ],
    pricing: 'From $12/user/mo',
    category: 'Workplace Innovation'
  },
  {
    id: 's4',
    title: 'Predictive Analytics',
    description: 'Uncover hidden patterns and forecast future trends by leveraging enterprise historical data through machine learning models.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    icon: 'TrendingUp',
    features: [
      'Time-series forecasting for seasonal sales',
      'Customer churn risk detection & early indicators',
      'Dynamic real-time anomaly alerts',
      'Interactive executive BI report dashboards'
    ],
    pricing: 'Custom Enterprise pricing',
    category: 'Data Intelligence'
  },
  {
    id: 's5',
    title: 'Automation Engine',
    description: 'Eliminate tedious manual micro-tasks with seamless API orchestrators and smart robotic process automation (RPA) workflows.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1200',
    icon: 'Workflow',
    features: [
      'Document data extraction via OCR & LLMs',
      'Multi-platform automated copy-paste syncs',
      'Scheduled background reporting jobs',
      'Intelligent routing triggers & error catch gates'
    ],
    pricing: 'From $800/mo',
    category: 'Business Automation'
  },
  {
    id: 's6',
    title: 'Custom Software Architecture',
    description: 'End-to-end engineered software infrastructures built on next-generation React, Node.js, and secure cloud microservices.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1200',
    icon: 'Code',
    features: [
      'Highly responsive UI with sub-second page loads',
      'Secure OAuth2 and multi-factor authentication',
      'Fully documented REST / GraphQL API hooks',
      'Serverless auto-scaling node orchestration'
    ],
    pricing: 'Scope-based proposal',
    category: 'Custom Engineering'
  }
];

export const INITIAL_PORTFOLIO: PortfolioProject[] = [
  {
    id: 'p1',
    title: 'HealthSync AI',
    description: 'AI-powered healthcare workflow and patient management platform.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    tags: ['Healthcare', 'Patient Management', 'AI'],
    features: [
      'Automated appointment scheduling',
      'Predictive patient risk alerts',
      'Real-time record synchronization',
      'AI-assisted diagnostics',
      'Wearable device integration'
    ],
    rating: 4.9,
    client: '',
    year: '2026'
  },
  {
    id: 'p2',
    title: 'RetailMind',
    description: 'Retail analytics and customer behavior intelligence solution.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
    tags: ['Retail', 'Analytics', 'Customer Intelligence'],
    features: [
      'Customer movement tracking',
      'Sales forecasting',
      'Inventory optimization',
      'Product placement recommendations',
      'POS and CRM integration'
    ],
    rating: 4.8,
    client: '',
    year: '2026'
  },
  {
    id: 'p3',
    title: 'EduNova',
    description: 'AI-based adaptive learning and education management system.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800',
    tags: ['EdTech', 'Adaptive Learning', 'AI'],
    features: [
      'Personalized learning modules',
      'Automated grading',
      'AI-generated quizzes',
      'Student engagement analytics',
      'Multilingual support'
    ],
    rating: 4.9,
    client: '',
    year: '2026'
  },
  {
    id: 'p4',
    title: 'FleetPilot AI',
    description: 'Transportation and logistics optimization platform.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    tags: ['Logistics', 'Transportation', 'Optimization'],
    features: [
      'Live vehicle tracking',
      'Route optimization',
      'Fuel prediction analytics',
      'Driver performance insights',
      'Delivery scheduling automation'
    ],
    rating: 4.8,
    client: '',
    year: '2026'
  },
  {
    id: 'p5',
    title: 'SecureVision',
    description: 'AI-driven surveillance and security monitoring solution.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    tags: ['Security', 'Surveillance', 'AI Monitoring'],
    features: [
      'Real-time threat detection',
      'Facial recognition access control',
      'Suspicious activity alerts',
      'Cloud-based security analytics',
      'Remote monitoring dashboard'
    ],
    rating: 4.8,
    client: '',
    year: '2026'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Dr. Melissa Carter',
    role: '',
    company: 'Horizon Care',
    content: 'HealthSync AI improved our hospital operations significantly and reduced patient waiting times.',
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 't2',
    name: 'Daniel Brooks',
    role: '',
    company: 'UrbanStyle',
    content: 'RetailMind helped us understand customer behavior better and increase overall revenue.',
    rating: 4.7,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 't3',
    name: 'Priya Sharma',
    role: '',
    company: 'Nova International College',
    content: 'EduNova transformed the learning experience for our students with personalized AI recommendations.',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 't4',
    name: 'Eric Thompson',
    role: '',
    company: 'SwiftMove Logistics',
    content: 'FleetPilot AI streamlined our delivery network and improved fuel efficiency.',
    rating: 4.6,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 't5',
    name: 'Karen White',
    role: '',
    company: 'Nexa Corporate Solutions',
    content: 'SecureVision strengthened our security infrastructure with real-time monitoring and alerts.',
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Future of AI Agent Swarms in Modern Customer Service',
    excerpt: 'How multi-agent coordinated systems are outperforming traditional single-prompt retrieval chatbots and reducing escalations.',
    content: 'AI chatbots are evolving into coordinated multi-agent swarms. In this architecture, a primary concierge agent greets customers, identifies intent, and delegates tasks to specialized micro-agents: one with complete billing system records, another trained in product features, and a third skilled in recovery flows.\n\nThis workflow isolates security contexts and provides massive improvements in response correctness and response duration, reducing modern team ticket overhead by up to 65%. For the Product Development assignment, CET333, we showcase how these can be built quickly with custom schemas.',
    category: 'Conversational AI',
    readTime: '5 min read',
    date: 'June 05, 2026',
    author: 'Elena Rostova, Lead AI Scientist',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b2',
    title: 'Minimizing Defect Overhead via Computer Vision at the Edge',
    excerpt: 'Why edge deployment models are replacing cloud-dependent neural networks in fast-paced precision pharmaceutical factories.',
    content: 'At the modern manufacturing plant, a single millisecond delay can translate to thousands of dollars in lost yield. Streaming high-resolution camera feeds to centralized cloud services introduced severe bandwidth charges and latency spikes.\n\nBy optimizing deep convolutional neural networks down to quantized edge hardware, we perform defect evaluations directly on site with sub-millisecond lag. This article breaks down the conversion framework utilized in our flagship SecureVision client build.',
    category: 'Industrial Tech',
    readTime: '7 min read',
    date: 'May 28, 2026',
    author: 'Jameson Thorne, Senior Edge Engineer',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b3',
    title: 'Designing Trust: Human-in-the-Loop AI in High-stakes Routing',
    excerpt: 'Practical UI guide on how to display safety scores, feedback loops, and intuitive override mechanisms for supervisors.',
    content: 'Artificial Intelligence should enhance human judgment, not completely block it out. This is especially true in critical industries like healthcare and energy logistics. A successful AI interface doesn\'t just present a recommended action; it shows why the recommendation was made alongside a confidence percentage.\n\nMost importantly, it integrates a "Human-in-the-Loop" override panel, allowing safety specialists to correct mistakes effortlessly. We explore safe routing designs that balance advanced automated speed with executive oversight.',
    category: 'UI/UX Design',
    readTime: '4 min read',
    date: 'April 19, 2026',
    author: 'Sarah Jenkins, Head of UX Strategy',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b4',
    title: 'How Predictive Analytics Improves Business Planning',
    excerpt: 'Why forecasting tools help teams make faster and smarter operational decisions.',
    content: 'Predictive analytics helps organizations identify demand patterns, estimate risk, and make better strategic decisions using historical data and machine learning insights.',
    category: 'Data Intelligence',
    readTime: '6 min read',
    date: 'March 11, 2026',
    author: 'Michael Rowan',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b5',
    title: 'Building Better Digital Workflows with Automation',
    excerpt: 'A look at how automation reduces repetitive tasks and improves operational consistency.',
    content: 'Business automation can reduce errors, improve response speed, and free employees to focus on higher-value work by connecting systems and eliminating repetitive manual steps.',
    category: 'Business Automation',
    readTime: '5 min read',
    date: 'February 27, 2026',
    author: 'Sophie Turner',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b6',
    title: 'Five Practical Uses of AI in Higher Education',
    excerpt: 'Examples of how AI tools can improve learning, assessment, and student support.',
    content: 'Educational institutions can use AI to personalize learning pathways, generate assessments, support tutors, and better understand student engagement patterns.',
    category: 'EdTech',
    readTime: '5 min read',
    date: 'January 18, 2026',
    author: 'Priya Desai',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b7',
    title: 'Designing Dashboards That Executives Actually Use',
    excerpt: 'Why clarity, hierarchy, and context matter more than visual complexity.',
    content: 'Executive dashboards should prioritize clarity, relevance, and decision support, making sure the most important operational information is immediately visible and easy to understand.',
    category: 'Product Strategy',
    readTime: '4 min read',
    date: 'December 09, 2025',
    author: 'Laura Chen',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b8',
    title: 'Why Secure Image Handling Matters in Modern Web Apps',
    excerpt: 'From file uploads to static delivery, secure media handling is a core product concern.',
    content: 'Modern applications need careful image upload validation, folder handling, and static delivery routes to keep media workflows reliable and secure across content systems.',
    category: 'Web Engineering',
    readTime: '6 min read',
    date: 'November 21, 2025',
    author: 'Daniel Foster',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800'
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'e1',
    title: 'AI Startup Summit 2026',
    description: 'Networking and pitching evening featuring high-impact AI models, funding strategy keynotes, and active investor matching.',
    date: 'July 15, 2026',
    time: '18:00 - 21:30 PST',
    location: 'SOMA Innovation Centre, SF & Virtual',
    type: 'Hybrid',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'e2',
    title: 'CET333 Product Presentation Gala',
    description: 'A showcase of high-end university engineering prototypes. AI-Solutions will present our flagship analytics and inquiry portal live.',
    date: 'August 10, 2026',
    time: '10:00 - 15:00 GMT',
    location: 'Main Engineering Quad, Campus Hall',
    type: 'In-Person',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'e3',
    title: 'Masterclass: Scalable LLM Finetuning on Client Budgets',
    description: 'Hands-on live coding workshop showcasing Low-Rank Adaptation (LoRA) and quantization parameter setups to construct custom models cheaply.',
    date: 'September 22, 2026',
    time: '14:00 - 17:30 EST',
    location: 'Online Webinar Link provided to RSVP',
    type: 'Virtual',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=800'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Model-6 Training Cluster',
    category: 'Infrastructure',
    description: 'High-performance compute nodes customized for real-time model alignment and batch optimization workflows.',
    date: 'March 2026',
    location: 'David Goldman Informatics Centre, Sunderland',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gal-2',
    title: 'AI Solutions Showcase',
    category: 'Summits',
    description: 'Presentation moments from university and industry-facing events demonstrating AI-Solutions products.',
    date: 'April 2026',
    location: 'University of Sunderland',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gal-3',
    title: 'Research Lab Collaboration',
    category: 'Collaboration',
    description: 'Cross-functional sprint sessions shaping the user experience and delivery roadmap for client products.',
    date: 'May 2026',
    location: 'St Peter\'s Campus, Sunderland',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gal-4',
    title: 'Innovation Workshop Session',
    category: 'Workshops',
    description: 'Collaborative planning session focused on rapid prototyping and solution discovery.',
    date: 'May 2026',
    location: 'Innovation Lab, Sunderland',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gal-5',
    title: 'Team Collaboration Hub',
    category: 'Collaboration',
    description: 'Cross-functional product meeting aligning engineering, design, and client requirements.',
    date: 'June 2026',
    location: 'AI-Solutions Studio',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gal-6',
    title: 'Live Product Demonstration',
    category: 'Showcase',
    description: 'Demonstration of AI dashboards and automation workflows for visitors and partners.',
    date: 'June 2026',
    location: 'Technology Expo Hall',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gal-7',
    title: 'Client Strategy Review',
    category: 'Consultation',
    description: 'Strategic review session focused on aligning AI roadmaps with client business objectives.',
    date: 'July 2026',
    location: 'Executive Meeting Suite',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800'
  }
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  brandName: 'AI-Solutions',
  brandTagline: 'Applied Intelligence',
  logoInitials: 'AI',
  logoImage: '',
  footerDescription: 'AI-Solutions creates intelligent products, automation workflows, analytics experiences, and custom software designed to help organizations modernize with confidence.',
  contactHeading: 'AI-Solutions at the University of Sunderland',
  contactAddress: 'David Goldman Informatics Centre, University of Sunderland, St Peter\'s Campus, Sunderland SR6 0DD, United Kingdom.',
  contactEmail: 'integrations@ai-solutions.co.uk',
  contactPhone: '+44 (0)191 515 2000',
  primaryTimezone: 'UK Time',
  contactTimezone: 'Mon - Fri: 09:00 - 17:00 UK Time',
  footerCopyright: '(c) 2026 AI-Solutions. Built as a polished AI SaaS demonstration experience.',
  footerCtaLabel: 'Start a conversation'
};

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-01',
    name: 'Sarah Carter',
    email: 's.carter@healthnet.org',
    phone: '+1 415 555 0142',
    company: 'Metropolitan Health Network',
    service: 'AI-Powered Virtual Assistant',
    country: 'United States',
    message: 'We are looking to implement a HIPAA-compliant virtual assistant on our public portal to answer medical facility questions, location hours, and direct patients to the correct emergency intake centers. We would love a demo layout and prototype quotation.',
    status: 'In Progress',
    adminNotes: 'Spoke with Sarah on Monday. Ready to arrange a high-fidelity visual demonstration of the avatar response latency.',
    createdAt: '2026-06-08T10:14:00.000Z'
  },
  {
    id: 'inq-02',
    name: 'Jonathan Tan',
    email: 'jtan@apexretail.sg',
    phone: '+65 6123 8841',
    company: 'Apex Global Retailers',
    service: 'Predictive Analytics',
    country: 'Singapore',
    message: 'Our regional operations team wants to integrate custom predictive demand forecasting across 80 supermarkets. Can we connect the prediction feed to our existing SAP enterprise cloud database system?',
    status: 'New',
    createdAt: '2026-06-10T14:35:00.000Z'
  },
  {
    id: 'inq-03',
    name: 'Maximilian Schwarz',
    email: 'm.schwarz@microtech.de',
    phone: '+49 30 2555 1020',
    company: 'MicroTech Semiconductors Inc.',
    service: 'Custom Software Architecture',
    country: 'Germany',
    message: 'SecureVision inspection is performing flawlessly in our cleanroom line. We now need a complete administrative content dashboard to track wafer reject reasons and download automated weekly audit reports.',
    status: 'Closed',
    adminNotes: 'Wafers management dashboard deployed successfully. Client checked and approved transaction on June 10th.',
    createdAt: '2026-06-05T09:20:00.000Z'
  },
  {
    id: 'inq-04',
    name: 'Charlotte Dubois',
    email: 'charlotte@luxe-auto.fr',
    phone: '+33 1 87 55 0194',
    company: 'Luxe Automatisation',
    service: 'Automation Engine',
    country: 'France',
    message: 'Hello, we require automated workflow triggers linking invoice receipt emails in Google Outlook directly into our localized accounts receivable ledger system to bypass tedious manual processing.',
    status: 'New',
    createdAt: '2026-06-11T02:44:00.000Z'
  },
  {
    id: 'inq-05',
    name: 'Aiden Mitchell',
    email: 'amitchell@titanlogistics.com.au',
    phone: '+61 2 5550 7821',
    company: 'Titan Logistics Corp',
    service: 'Affordable Prototyping',
    country: 'Australia',
    message: 'Enquiring about the Flat $4,999 Agile prototyping Package. We want to test a cellular signal telemetry mapper to track cargo container container health. Please send over standard timeline terms.',
    status: 'In Progress',
    adminNotes: 'Scheduling proposal review call for next Friday.',
    createdAt: '2026-06-07T23:15:00.000Z'
  }
];
