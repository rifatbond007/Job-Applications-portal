/**
 * Mock Job Data Configuration
 * Central source of truth for job listings
 */

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  locationType: "Remote" | "Hybrid" | "On-site";
  department: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  isNew: boolean;
  description: string;
  requirements: string[];
  postedDate: string;
  featured?: boolean;
}

export const MOCK_JOBS: JobListing[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    locationType: "Hybrid",
    department: "Engineering",
    salary: { min: 140000, max: 180000, currency: "USD" },
    isNew: true,
    description: "Join our team to build cutting-edge web applications using React, TypeScript, and modern tools.",
    requirements: ["5+ years React experience", "TypeScript proficiency", "Leadership skills"],
    postedDate: "2026-02-08T10:00:00Z",
    featured: true,
  },
  {
    id: "2",
    title: "Product Designer",
    company: "DesignHub",
    location: "New York, NY",
    locationType: "Remote",
    department: "Design",
    salary: { min: 100000, max: 140000, currency: "USD" },
    isNew: true,
    description: "Create beautiful, user-centric designs for our SaaS products.",
    requirements: ["3+ years product design", "Figma expert", "Portfolio required"],
    postedDate: "2026-02-07T14:30:00Z",
  },
  {
    id: "3",
    title: "DevOps Engineer",
    company: "CloudScale",
    location: "Austin, TX",
    locationType: "Remote",
    department: "Engineering",
    salary: { min: 120000, max: 160000, currency: "USD" },
    isNew: false,
    description: "Build and maintain our cloud infrastructure at scale.",
    requirements: ["AWS/GCP experience", "Kubernetes", "CI/CD pipelines"],
    postedDate: "2026-02-03T09:15:00Z",
  },
  {
    id: "4",
    title: "Data Scientist",
    company: "AI Innovations",
    location: "Boston, MA",
    locationType: "Hybrid",
    department: "Data Science",
    salary: { min: 130000, max: 170000, currency: "USD" },
    isNew: true,
    description: "Apply machine learning to solve complex business problems.",
    requirements: ["Python/R proficiency", "ML frameworks", "PhD preferred"],
    postedDate: "2026-02-09T11:00:00Z",
    featured: true,
  },
  {
    id: "5",
    title: "Product Manager",
    company: "StartupXYZ",
    location: "Seattle, WA",
    locationType: "Hybrid",
    department: "Product",
    salary: { min: 110000, max: 150000, currency: "USD" },
    isNew: false,
    description: "Drive product strategy and execution for our mobile platform.",
    requirements: ["3+ years PM experience", "Technical background", "User-focused"],
    postedDate: "2026-02-01T16:45:00Z",
  },
  {
    id: "6",
    title: "Backend Engineer",
    company: "DataFlow Systems",
    location: "Denver, CO",
    locationType: "Remote",
    department: "Engineering",
    salary: { min: 125000, max: 165000, currency: "USD" },
    isNew: false,
    description: "Build scalable backend systems handling millions of requests.",
    requirements: ["Node.js/Python", "Microservices", "Database design"],
    postedDate: "2026-01-30T13:20:00Z",
  },
  {
    id: "7",
    title: "UX Researcher",
    company: "UserFirst Labs",
    location: "Portland, OR",
    locationType: "Remote",
    department: "Design",
    salary: { min: 90000, max: 120000, currency: "USD" },
    isNew: true,
    description: "Conduct user research to inform product decisions.",
    requirements: ["Qualitative research", "Data analysis", "Communication skills"],
    postedDate: "2026-02-08T08:30:00Z",
  },
  {
    id: "8",
    title: "Full Stack Developer",
    company: "WebSolutions Co.",
    location: "Chicago, IL",
    locationType: "On-site",
    department: "Engineering",
    salary: { min: 100000, max: 135000, currency: "USD" },
    isNew: false,
    description: "Work on both frontend and backend of our enterprise applications.",
    requirements: ["React + Node.js", "SQL databases", "RESTful APIs"],
    postedDate: "2026-01-28T10:00:00Z",
  },
  {
    id: "9",
    title: "Security Engineer",
    company: "SecureNet",
    location: "Washington, DC",
    locationType: "Hybrid",
    department: "Security",
    salary: { min: 140000, max: 190000, currency: "USD" },
    isNew: true,
    description: "Protect our infrastructure and applications from security threats.",
    requirements: ["Security certifications", "Penetration testing", "Incident response"],
    postedDate: "2026-02-09T15:00:00Z",
    featured: true,
  },
  {
    id: "10",
    title: "Mobile Developer (iOS)",
    company: "AppMakers Inc.",
    location: "Los Angeles, CA",
    locationType: "Remote",
    department: "Engineering",
    salary: { min: 115000, max: 155000, currency: "USD" },
    isNew: false,
    description: "Build native iOS applications for millions of users.",
    requirements: ["Swift", "iOS SDK", "App Store experience"],
    postedDate: "2026-01-25T12:00:00Z",
  },
];

export const DEPARTMENTS = [
  "All Departments",
  "Engineering",
  "Design",
  "Product",
  "Data Science",
  "Security",
] as const;

export const LOCATION_TYPES = [
  "All Types",
  "Remote",
  "Hybrid",
  "On-site",
] as const;
