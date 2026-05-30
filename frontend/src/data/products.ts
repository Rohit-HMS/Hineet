export interface PaymentOption {
  title: string;
  monthlyPrice?: string;
  yearlyPrice?: string;
  monthlyFeatures?: string[];
  yearlyFeatures?: string[];
  features?: string[];
  yearlyBonus?: string;
  isCustomise?: boolean;
}

export interface Product {
  imageUrl?: string;
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  features: string[];
  idealFor: string[];
  accent: string;
  border: string;
  shadow: string;
  dot: string;
  paymentOptions?: PaymentOption[];
}

export const products: Product[] = [
  {
    id: "wapex",
    imageUrl: "https://images.unsplash.com/photo-1778071057640-fa876f2b1c4b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "wapex",
    name: "Wapex",
    tagline: "WhatsApp CRM & Automation Platform",
    shortDescription: "Turn WhatsApp Into Your Complete Sales & Customer Management System",
    fullDescription: "Wapex is an AI-powered WhatsApp CRM platform designed to help businesses automate conversations, manage leads, increase conversions, and deliver faster customer support — all from one centralised dashboard.",
    category: "CRM & Sales",
    features: [
      "Multi-Agent WhatsApp Inbox",
      "AI Chatbot & Auto Replies",
      "Lead Management & CRM",
      "WhatsApp Campaign Broadcasting",
      "Sales Funnel Automation",
      "Team Assignment & Tracking",
      "Customer Follow-Up Automation",
      "Analytics & Reporting Dashboard",
      "API & CRM Integrations",
      "Mobile & Web Access",
    ],

    idealFor: ["Real Estate", "Education", "Healthcare", "Agencies", "E-commerce", "Service Businesses", "Startups"],
    accent: "from-[#7C3AED]/06 to-[#60A5FA]/04",
    border: "group-hover:border-[#7C3AED]/30",
    shadow: "group-hover:shadow-[0_20px_60px_rgba(124,58,237,0.12)]",
    dot: "bg-[#7C3AED]",
    paymentOptions: [
      {
        title: "Basic",
        monthlyPrice: "₹299",
        yearlyPrice: "₹2990",
        monthlyFeatures: ["Core features", "Email support only"],
        yearlyFeatures: ["Core features", "Priority email support", "Onboarding session"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Advance",
        monthlyPrice: "₹747",
        yearlyPrice: "₹7470",
        monthlyFeatures: ["Advanced features", "Priority support"],
        yearlyFeatures: ["Advanced features", "24/7 Priority support", "Dedicated account manager", "Custom reports"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Pro",
        monthlyPrice: "₹1495",
        yearlyPrice: "₹14950",
        monthlyFeatures: ["All features", "24/7 dedicated support"],
        yearlyFeatures: ["All features", "24/7 dedicated support", "SLA guarantee", "Quarterly business review"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Customise",
        features: ["Enterprise features", "Custom integrations"],
        isCustomise: true
      }
    ],
  },
  {
    id: "propwise",
    imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2942&auto=format&fit=crop",
    slug: "propwise",
    name: "Propwise",
    tagline: "Real Estate Management",
    shortDescription: "Smarter property operations and tenant management.",
    fullDescription: "An all-in-one real estate property management software for tracking listings, tenant relationships, maintenance requests, and automated rent collection.",
    category: "Real Estate",
    features: [
      "Property Listings",
      "Tenant Portal",
      "Maintenance Tracking",
      "Rent Collection",
    ],
    idealFor: ["Property Managers", "Real Estate Firms", "Asset Managers"],
    accent: "from-[#2563EB]/08 to-[#60A5FA]/04",
    border: "group-hover:border-[#2563EB]/30",
    shadow: "group-hover:shadow-[0_20px_60px_rgba(37,99,235,0.15)]",
    dot: "bg-[#2563EB]",
    paymentOptions: [
      {
        title: "Basic",
        monthlyPrice: "₹399",
        yearlyPrice: "₹3990",
        monthlyFeatures: ["Core features", "Email support only"],
        yearlyFeatures: ["Core features", "Priority email support", "Onboarding session"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Advance",
        monthlyPrice: "₹997",
        yearlyPrice: "₹9970",
        monthlyFeatures: ["Advanced features", "Priority support"],
        yearlyFeatures: ["Advanced features", "24/7 Priority support", "Dedicated account manager", "Custom reports"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Pro",
        monthlyPrice: "₹1995",
        yearlyPrice: "₹19950",
        monthlyFeatures: ["All features", "24/7 dedicated support"],
        yearlyFeatures: ["All features", "24/7 dedicated support", "SLA guarantee", "Quarterly business review"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Customise",
        features: ["Enterprise features", "Custom integrations"],
        isCustomise: true
      }
    ],
  },
  {
    id: "school-os",
    imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2942&auto=format&fit=crop",
    slug: "school-os",
    name: "School",
    tagline: "School Management System",
    shortDescription: "Digitize and streamline K-12 school operations.",
    fullDescription: "A comprehensive School Management System handling admissions, attendance, fees, examinations, and communication between teachers and parents.",
    category: "Education",
    features: [
      "Student Information",
      "Fee Management",
      "Attendance Tracking",
      "Parent App",
    ],
    idealFor: ["K-12 Schools", "Administrators", "Teachers"],
    accent: "from-[#8B5CF6]/06 to-[#60A5FA]/04",
    border: "group-hover:border-[#8B5CF6]/30",
    shadow: "group-hover:shadow-[0_20px_60px_rgba(139,92,246,0.12)]",
    dot: "bg-[#8B5CF6]",
    paymentOptions: [
      {
        title: "Basic",
        monthlyPrice: "₹499",
        yearlyPrice: "₹4990",
        monthlyFeatures: ["Core features", "Email support only"],
        yearlyFeatures: ["Core features", "Priority email support", "Onboarding session"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Advance",
        monthlyPrice: "₹1247",
        yearlyPrice: "₹12470",
        monthlyFeatures: ["Advanced features", "Priority support"],
        yearlyFeatures: ["Advanced features", "24/7 Priority support", "Dedicated account manager", "Custom reports"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Pro",
        monthlyPrice: "₹2495",
        yearlyPrice: "₹24950",
        monthlyFeatures: ["All features", "24/7 dedicated support"],
        yearlyFeatures: ["All features", "24/7 dedicated support", "SLA guarantee", "Quarterly business review"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Customise",
        features: ["Enterprise features", "Custom integrations"],
        isCustomise: true
      }
    ],
  },
  {
    id: "college",
    imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2942&auto=format&fit=crop",
    slug: "college",
    name: "College",
    tagline: "Higher Education Platform",
    shortDescription: "Advanced ERP for universities and colleges.",
    fullDescription: "Built for higher education, this platform manages complex course registrations, faculty scheduling, campus placements, and alumni networking.",
    category: "Education",
    features: [
      "Course Registration",
      "Campus Placements",
      "Faculty Management",
      "Alumni Network",
    ],
    idealFor: ["Universities", "Administrators", "IT Teams"],
    accent: "from-[#F59E0B]/06 to-[#60A5FA]/04",
    border: "group-hover:border-[#F59E0B]/30",
    shadow: "group-hover:shadow-[0_20px_60px_rgba(245,158,11,0.12)]",
    dot: "bg-[#F59E0B]",
    paymentOptions: [
      {
        title: "Basic",
        monthlyPrice: "₹599",
        yearlyPrice: "₹5990",
        monthlyFeatures: ["Core features", "Email support only"],
        yearlyFeatures: ["Core features", "Priority email support", "Onboarding session"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Advance",
        monthlyPrice: "₹1497",
        yearlyPrice: "₹14970",
        monthlyFeatures: ["Advanced features", "Priority support"],
        yearlyFeatures: ["Advanced features", "24/7 Priority support", "Dedicated account manager", "Custom reports"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Pro",
        monthlyPrice: "₹2995",
        yearlyPrice: "₹29950",
        monthlyFeatures: ["All features", "24/7 dedicated support"],
        yearlyFeatures: ["All features", "24/7 dedicated support", "SLA guarantee", "Quarterly business review"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Customise",
        features: ["Enterprise features", "Custom integrations"],
        isCustomise: true
      }
    ],
  },
  {
    id: "healthcare-sync",
    imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2942&auto=format&fit=crop",
    slug: "healthcare-sync",
    name: "Healthcare",
    tagline: "Unified Healthcare Data Management",
    shortDescription: "Streamline patient records and hospital operations.",
    fullDescription: "A fully compliant healthcare CRM and operations platform designed to help clinics and hospitals manage patient flow, electronic health records (EHR), and billing securely.",
    category: "Healthcare",
    features: [
      "EHR Management",
      "Telemedicine Portal",
      "Insurance Claim Processing",
      "Doctor Scheduling",
    ],
    idealFor: ["Clinics", "Hospitals", "Medical Staff"],
    accent: "from-[#14B8A6]/06 to-[#60A5FA]/04",
    border: "group-hover:border-[#14B8A6]/30",
    shadow: "group-hover:shadow-[0_20px_60px_rgba(20,184,166,0.12)]",
    dot: "bg-[#14B8A6]",
    paymentOptions: [
      {
        title: "Basic",
        monthlyPrice: "₹699",
        yearlyPrice: "₹6990",
        monthlyFeatures: ["Core features", "Email support only"],
        yearlyFeatures: ["Core features", "Priority email support", "Onboarding session"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Advance",
        monthlyPrice: "₹1747",
        yearlyPrice: "₹17470",
        monthlyFeatures: ["Advanced features", "Priority support"],
        yearlyFeatures: ["Advanced features", "24/7 Priority support", "Dedicated account manager", "Custom reports"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Pro",
        monthlyPrice: "₹3495",
        yearlyPrice: "₹34950",
        monthlyFeatures: ["All features", "24/7 dedicated support"],
        yearlyFeatures: ["All features", "24/7 dedicated support", "SLA guarantee", "Quarterly business review"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Customise",
        features: ["Enterprise features", "Custom integrations"],
        isCustomise: true
      }
    ],
  },
  {
    id: "hrms",
    imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2942&auto=format&fit=crop",
    slug: "hrms",
    name: "HRMS",
    tagline: "People Management Reimagined",
    shortDescription: "Modern tools for HR teams and employees.",
    fullDescription: "Streamline recruitment, onboarding, performance reviews, and employee engagement with a beautiful, self-serve HR platform.",
    category: "Human Resources",
    features: [
      "Applicant Tracking",
      "Automated Onboarding",
      "Performance Reviews",
      "Time & Attendance",
    ],
    idealFor: ["HR Teams", "Enterprises", "People Ops"],
    accent: "from-[#F43F5E]/06 to-[#60A5FA]/04",
    border: "group-hover:border-[#F43F5E]/30",
    shadow: "group-hover:shadow-[0_20px_60px_rgba(244,63,94,0.12)]",
    dot: "bg-[#F43F5E]",
    paymentOptions: [
      {
        title: "Basic",
        monthlyPrice: "₹799",
        yearlyPrice: "₹7990",
        monthlyFeatures: ["Core features", "Email support only"],
        yearlyFeatures: ["Core features", "Priority email support", "Onboarding session"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Advance",
        monthlyPrice: "₹1997",
        yearlyPrice: "₹19970",
        monthlyFeatures: ["Advanced features", "Priority support"],
        yearlyFeatures: ["Advanced features", "24/7 Priority support", "Dedicated account manager", "Custom reports"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Pro",
        monthlyPrice: "₹3995",
        yearlyPrice: "₹39950",
        monthlyFeatures: ["All features", "24/7 dedicated support"],
        yearlyFeatures: ["All features", "24/7 dedicated support", "SLA guarantee", "Quarterly business review"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Customise",
        features: ["Enterprise features", "Custom integrations"],
        isCustomise: true
      }
    ],
  },
  {
    id: "hrms-enterprise",
    imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2942&auto=format&fit=crop",
    slug: "hrms-enterprise",
    name: "HRMS Enterprise",
    tagline: "Global Workforce Operations",
    shortDescription: "Enterprise-grade human resource management.",
    fullDescription: "Advanced HRMS features tailored for large global workforces, featuring multi-region compliance, complex payroll integrations, and advanced analytics.",
    category: "Human Resources",
    features: [
      "Global Payroll",
      "Compliance Management",
      "Advanced Analytics",
      "Workforce Planning",
    ],
    idealFor: ["Large Enterprises", "Global HR", "Payroll Teams"],
    accent: "from-[#E11D48]/06 to-[#60A5FA]/04",
    border: "group-hover:border-[#E11D48]/30",
    shadow: "group-hover:shadow-[0_20px_60px_rgba(225,29,72,0.12)]",
    dot: "bg-[#E11D48]",
    paymentOptions: [
      {
        title: "Basic",
        monthlyPrice: "₹899",
        yearlyPrice: "₹8990",
        monthlyFeatures: ["Core features", "Email support only"],
        yearlyFeatures: ["Core features", "Priority email support", "Onboarding session"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Advance",
        monthlyPrice: "₹2247",
        yearlyPrice: "₹22470",
        monthlyFeatures: ["Advanced features", "Priority support"],
        yearlyFeatures: ["Advanced features", "24/7 Priority support", "Dedicated account manager", "Custom reports"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Pro",
        monthlyPrice: "₹4495",
        yearlyPrice: "₹44950",
        monthlyFeatures: ["All features", "24/7 dedicated support"],
        yearlyFeatures: ["All features", "24/7 dedicated support", "SLA guarantee", "Quarterly business review"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Customise",
        features: ["Enterprise features", "Custom integrations"],
        isCustomise: true
      }
    ],
  },
  {
    id: "billing",
    imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2942&auto=format&fit=crop",
    slug: "billing",
    name: "Billing",
    tagline: "Smart Invoicing & Payments",
    shortDescription: "Automated billing and invoicing for modern businesses.",
    fullDescription: "Create, send, and track invoices seamlessly. Integrate multiple payment gateways and automate recurring subscriptions.",
    category: "Finance",
    features: [
      "Automated Invoicing",
      "Recurring Subscriptions",
      "Payment Gateway Integration",
      "Tax Calculation",
    ],
    idealFor: ["Finance Teams", "SMBs", "Accounting"],
    accent: "from-[#10B981]/06 to-[#60A5FA]/04",
    border: "group-hover:border-[#10B981]/30",
    shadow: "group-hover:shadow-[0_20px_60px_rgba(16,185,129,0.12)]",
    dot: "bg-[#10B981]",
    paymentOptions: [
      {
        title: "Basic",
        monthlyPrice: "₹999",
        yearlyPrice: "₹9990",
        monthlyFeatures: ["Core features", "Email support only"],
        yearlyFeatures: ["Core features", "Priority email support", "Onboarding session"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Advance",
        monthlyPrice: "₹2497",
        yearlyPrice: "₹24970",
        monthlyFeatures: ["Advanced features", "Priority support"],
        yearlyFeatures: ["Advanced features", "24/7 Priority support", "Dedicated account manager", "Custom reports"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Pro",
        monthlyPrice: "₹4995",
        yearlyPrice: "₹49950",
        monthlyFeatures: ["All features", "24/7 dedicated support"],
        yearlyFeatures: ["All features", "24/7 dedicated support", "SLA guarantee", "Quarterly business review"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Customise",
        features: ["Enterprise features", "Custom integrations"],
        isCustomise: true
      }
    ],
  },
  {
    id: "ai-chatbot",
    imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2942&auto=format&fit=crop",
    slug: "ai-chatbot",
    name: "AI Chatbot",
    tagline: "Intelligent Chatbots for Smarter Support",
    shortDescription: "Intelligent Chatbots for Smarter Customer Support.",
    fullDescription: "Our customizable AI chatbots help businesses automate customer interactions across websites, WhatsApp, and other platforms using advanced natural language processing.",
    category: "Artificial Intelligence",
    features: [
      "24/7 Support",
      "Instant Resolution",
      "Lead Collection",
      "Multi-Language",
    ],
    idealFor: ["Support Teams", "Customer Success", "E-commerce"],
    accent: "from-[#0891B2]/06 to-[#60A5FA]/04",
    border: "group-hover:border-[#0891B2]/30",
    shadow: "group-hover:shadow-[0_20px_60px_rgba(8,145,178,0.12)]",
    dot: "bg-[#0891B2]",
    paymentOptions: [
      {
        title: "Basic",
        monthlyPrice: "₹1499",
        yearlyPrice: "₹14990",
        monthlyFeatures: ["Core features", "Email support only"],
        yearlyFeatures: ["Core features", "Priority email support", "Onboarding session"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Advance",
        monthlyPrice: "₹3747",
        yearlyPrice: "₹37470",
        monthlyFeatures: ["Advanced features", "Priority support"],
        yearlyFeatures: ["Advanced features", "24/7 Priority support", "Dedicated account manager", "Custom reports"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Pro",
        monthlyPrice: "₹7495",
        yearlyPrice: "₹74950",
        monthlyFeatures: ["All features", "24/7 dedicated support"],
        yearlyFeatures: ["All features", "24/7 dedicated support", "SLA guarantee", "Quarterly business review"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Customise",
        features: ["Enterprise features", "Custom integrations"],
        isCustomise: true
      }
    ],
  },
  {
    id: "ai-calling-agent",
    imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2942&auto=format&fit=crop",
    slug: "ai-calling-agent",
    name: "AI Calling Agent",
    tagline: "AI-Powered Voice Assistants",
    shortDescription: "AI-Powered Voice Agents That Talk Like Humans.",
    fullDescription: "Our AI Calling Agent helps businesses automate inbound and outbound calling processes using natural and intelligent voice conversations.",
    category: "Artificial Intelligence",
    features: [
      "Automated Customer Calls",
      "Lead Qualification",
      "Appointment Reminders",
      "24/7 Availability",
    ],
    idealFor: ["Call Centers", "Sales Teams", "Support Ops"],
    accent: "from-[#059669]/06 to-[#60A5FA]/04",
    border: "group-hover:border-[#059669]/30",
    shadow: "group-hover:shadow-[0_20px_60px_rgba(5,150,105,0.12)]",
    dot: "bg-[#059669]",
    paymentOptions: [
      {
        title: "Basic",
        monthlyPrice: "₹1999",
        yearlyPrice: "₹19990",
        monthlyFeatures: ["Core features", "Email support only"],
        yearlyFeatures: ["Core features", "Priority email support", "Onboarding session"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Advance",
        monthlyPrice: "₹4997",
        yearlyPrice: "₹49970",
        monthlyFeatures: ["Advanced features", "Priority support"],
        yearlyFeatures: ["Advanced features", "24/7 Priority support", "Dedicated account manager", "Custom reports"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Pro",
        monthlyPrice: "₹9995",
        yearlyPrice: "₹99950",
        monthlyFeatures: ["All features", "24/7 dedicated support"],
        yearlyFeatures: ["All features", "24/7 dedicated support", "SLA guarantee", "Quarterly business review"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Customise",
        features: ["Enterprise features", "Custom integrations"],
        isCustomise: true
      }
    ],
  },
  {
    id: "pos",
    imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2942&auto=format&fit=crop",
    slug: "pos",
    name: "POS",
    tagline: "Omnichannel Retail Point of Sale",
    shortDescription: "Point of Sale for the modern retail era.",
    fullDescription: "Seamlessly integrate your physical stores with your e-commerce channels. Manage inventory globally, process offline payments, and analyze foot traffic.",
    category: "Retail",
    features: [
      "Cloud POS Terminal",
      "E-commerce Sync",
      "Barcode Scanning",
      "Offline Mode",
    ],
    idealFor: ["Retailers", "Point-of-Sale Operators", "Store Managers"],
    accent: "from-[#EC4899]/06 to-[#60A5FA]/04",
    border: "group-hover:border-[#EC4899]/30",
    shadow: "group-hover:shadow-[0_20px_60px_rgba(236,72,153,0.12)]",
    dot: "bg-[#EC4899]",
    paymentOptions: [
      {
        title: "Basic",
        monthlyPrice: "₹2499",
        yearlyPrice: "₹24990",
        monthlyFeatures: ["Core features", "Email support only"],
        yearlyFeatures: ["Core features", "Priority email support", "Onboarding session"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Advance",
        monthlyPrice: "₹6247",
        yearlyPrice: "₹62470",
        monthlyFeatures: ["Advanced features", "Priority support"],
        yearlyFeatures: ["Advanced features", "24/7 Priority support", "Dedicated account manager", "Custom reports"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Pro",
        monthlyPrice: "₹12495",
        yearlyPrice: "₹124950",
        monthlyFeatures: ["All features", "24/7 dedicated support"],
        yearlyFeatures: ["All features", "24/7 dedicated support", "SLA guarantee", "Quarterly business review"],
        yearlyBonus: "2 months free"
      },
      {
        title: "Customise",
        features: ["Enterprise features", "Custom integrations"],
        isCustomise: true
      }
    ],
  },
  {
    id: "project-management",
    imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2942&auto=format&fit=crop",
    slug: "project-management",
    name: "Project Management",
    tagline: "Streamline Your Workflows",
    shortDescription: "Agile project tracking and team collaboration.",
    fullDescription: "A powerful tool for teams to plan, track, and execute projects. Features include Kanban boards, Gantt charts, time tracking, and team messaging.",
    category: "Productivity",
    features: [
      "Kanban Boards",
      "Time Tracking",
      "Gantt Charts",
      "Team Collaboration",
    ],
    idealFor: ["Product Teams", "Engineering Managers", "Agencies"],
    accent: "from-[#6366F1]/06 to-[#60A5FA]/04",
    border: "group-hover:border-[#6366F1]/30",
    shadow: "group-hover:shadow-[0_20px_60px_rgba(99,102,241,0.12)]",
    dot: "bg-[#6366F1]",
  }
];
