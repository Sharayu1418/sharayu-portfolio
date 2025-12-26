export type EducationItem = {
  school: string;
  degree: string;
  location?: string;
  period: string;
  highlights?: string[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  location?: string;
  period: string;
  focusAreas: string[];
  technologies?: string[];
};

export type Metric = {
  label: string;
  value: string;
  variant?: "positive" | "warning" | "accent";
};

export type ProjectItem = {
  slug: string;
  name: string;
  shortDescription: string;
  problem: string;
  solution: string;
  impact?: string;
  techStack: string[];
  metrics: Metric[];
  tags?: string[];
};

export type SkillCategory = {
  name: string;
  description?: string;
  icon?: string;
  skills: {
    name: string;
    level: "working" | "advanced" | "expert";
  }[];
};

export type LeadershipItem = {
  organization: string;
  role: string;
  period: string;
  highlights: string[];
};

export const HERO = {
  name: "Sharayu Rasal",
  title: "Software Engineer • Machine Learning Engineer • Cloud Engineer",
  subtitle:
    "I design and build AI systems, distributed services, and cloud‑native products that move from prototype to production reliably.",
  ctaPrimaryLabel: "View Projects",
  ctaPrimaryHref: "/projects",
  ctaSecondaryLabel: "Download Resume",
  ctaSecondaryHref: "/Sharayu_Rasal_Resume.pdf",
  ctaTertiaryLabel: "Contact",
  ctaTertiaryHref: "/contact",
} as const;

export const EDUCATION: EducationItem[] = [
  {
    school: "New York University",
    degree: "Master of Engineering in Computer Science (GPA: 3.78)",
    location: "New York, USA",
    period: "",
    highlights: [
      "Graduate-level training in computer science with a focus on systems and ML foundations.",
    ],
  },
  {
    school: "AISSMS College of Engineering",
    degree: "Bachelor of Engineering in Computer Science (Honors in Data Science)",
    location: "Pune, India",
    period: "",
    highlights: [
      "Completed an honors track in Data Science alongside the core computer science curriculum.",
    ],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Bharat Forge",
    role: "Research & Development Intern – Computer Vision",
    location: "Pune, India",
    period: "Jul 2023 – Nov 2023",
    focusAreas: [
      "- Developed an OpenCV-based computer vision pipeline for real-time target detection in unmanned turret systems, achieving an 18% latency reduction.",
      "- Implemented and validated custom data transmission protocols to improve drone communication reliability under bandwidth constraints.",
      "- Collaborated with DRDO engineers to integrate embedded modules, documenting API specifications and hardware interfaces for production deployment.",
    ],
    technologies: ["Python", "OpenCV", "Embedded Systems", "Computer Vision"],
  },
  {
    company: "Posit Source",
    role: "Software Engineering Intern",
    location: "Pune, India",
    period: "Mar 2023 – May 2023",
    focusAreas: [
      "- Designed and automated scalable Python-based ETL pipelines for large-scale logistics datasets, improving data consistency and enabling data-informed decision-making.",
      "- Designed and deployed RESTful APIs and interactive dashboards for real-time analytics, reducing manual reporting workload by 60%.",
      "- Enhanced caching and scheduling logic for a same-day delivery system, improving task execution efficiency and cutting delivery lead time by 30%.",
      "- Collaborated in an Agile environment through code reviews, design discussions, and planning sessions to ensure scalable engineering decisions.",
    ],
    technologies: ["Python", "ETL", "REST APIs", "SQL", "Redis", "Analytics"],
  },
  {
    company: "Oniv Beverages",
    role: "Technical Product Intern – Web & Marketing",
    location: "Mumbai, India",
    period: "Oct 2023 – Feb 2024",
    focusAreas: [
      "- Constructed and deployed a customer-facing marketing website, integrating Google Search Console to increase organic reach by 30%.",
      "- Initiated a strategic partnership with Indobevs Brewery, leading to the #UnitedWeDrink x #TheFirstWinemakersOfIndia event and expanding brand engagement.",
      "- Worked across web, growth, and product to run experiments, instrument analytics, and translate campaign results into product insights.",
    ],
    technologies: ["React", "Web Analytics", "Marketing Tech", "A/B Testing"],
  },
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    slug: "smartcache-ai",
    name: "SmartCache AI",
    shortDescription:
      "End‑to‑end intelligent caching platform that accelerates API responses using workload‑aware ML.",
    problem:
      "High‑volume learning platforms lacked consistent content retrieval, causing slow recomputation and no reliable way to deliver offline personalized content for users with limited connectivity.",
    solution:
      "Built a full‑stack AI recommender using Django REST, React, PostgreSQL, and AWS S3, with Celery and Redis handling async ingestion, caching, and aggregation. Added an ML‑driven ranking module using vector embeddings, cosine similarity, and top‑K matching for fast, personalized suggestions.",
    impact:
      "Shows how combining classical IR, lightweight ML, and distributed caching enables fast, offline‑friendly, production‑grade personalization with strong reliability and cloud scalability.",
    techStack: [
      "Django REST",
      "React",
      "PostgreSQL",
      "Celery",
      "Redis",
      "AWS S3",
      "Docker",
    ],
    metrics: [
      {
        label: "P95 latency",
        value: "~XXX ms",
        variant: "positive",
      },
      {
        label: "Cache hit‑rate",
        value: "XX–YY %",
        variant: "accent",
      },
      {
        label: "Throughput uplift",
        value: "TODO: +X%",
        variant: "warning",
      },
    ],
    tags: ["Caching", "MLOps", "Distributed Systems"],
  },
  {
    slug: "multimodal-depression-detection",
    name: "Multimodal Depression Detection",
    shortDescription:
      "Research‑grade pipeline for detecting depressive symptoms from physiological and audio signals.",
    problem:
      "Early detection of depression from longitudinal data is challenging and often under‑instrumented.",
    solution:
      "Combined HRV features with a 1D‑CNN and emotion‑aware CNN pipeline to classify depression severity from multimodal inputs.",
    impact:
      "Demonstrates how multimodal signals can be fused for more robust mental‑health screening tools.",
    techStack: ["Python", "1D‑CNN", "Signal Processing", "HRV", "Pandas", "NumPy"],
    metrics: [
      { label: "Accuracy", value: "XX.X %", variant: "positive" },
      { label: "AUC", value: "0.XX", variant: "accent" },
      { label: "Inference latency", value: "~XXX ms", variant: "warning" },
    ],
    tags: ["Multimodal ML", "Healthcare", "Time Series"],
  },
  {
    slug: "ai-photo-album-pipeline",
    name: "AI Photo Album Pipeline",
    shortDescription:
      "Intelligent photo album web app that enables natural language photo search using AWS services.",
    problem:
      "Users needed an intuitive way to search through large photo collections using everyday language queries like 'show me photos with dogs' instead of manual tagging.",
    solution:
      "Built a serverless architecture using Amazon Lex V2 for natural language processing, Rekognition for automatic image labeling, OpenSearch for full-text search, and S3 for scalable storage. Lambda functions handle photo indexing and search, with API Gateway exposing REST endpoints.",
    impact:
      "Demonstrates how to combine multiple AWS AI/ML services into a cohesive, production-ready application with CI/CD automation using CodePipeline and CloudFormation.",
    techStack: ["AWS Lambda", "Amazon Lex", "Rekognition", "OpenSearch", "S3", "API Gateway", "CloudFormation", "CodePipeline"],
    metrics: [
      { label: "Search latency", value: "~200 ms", variant: "positive" },
      { label: "Auto-labeling accuracy", value: "95%+", variant: "accent" },
      { label: "Infrastructure as Code", value: "100%", variant: "positive" },
    ],
    tags: ["AWS", "Serverless", "NLP"],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Programming",
    description: "",
    icon: "/icons/Programming.png",
    skills: [
      { name: "Python", level: "expert" },
      { name: "JavaScript", level: "advanced" },
      { name: "TypeScript", level: "advanced" },
      { name: "C++", level: "working" },
      { name: "SQL", level: "advanced" },
    ],
  },
  {
    name: "Backend & APIs",
    description: "",
    icon: "/icons/Backend & APIs.png",
    skills: [
      { name: "Django", level: "advanced" },
      { name: "FastAPI", level: "advanced" },
      { name: "Flask", level: "working" },
      { name: "Node.js", level: "working" },
      { name: "Express", level: "working" },
      { name: "REST APIs", level: "advanced" },
      { name: "Kafka", level: "working" },
      { name: "Celery", level: "working" },
      { name: "System Design", level: "working" },
    ],
  },
  {
    name: "Frontend",
    description: "",
    icon: "/icons/Frontend.png",
    skills: [
      { name: "React", level: "advanced" },
      { name: "HTML5", level: "advanced" },
      { name: "CSS3", level: "advanced" },
      { name: "Bootstrap", level: "working" },
    ],
  },
  {
    name: "Machine Learning & AI",
    description: "",
    icon: "/icons/Machine Learning & AI.png",
    skills: [
      { name: "PyTorch", level: "advanced" },
      { name: "TensorFlow", level: "working" },
      { name: "HuggingFace", level: "advanced" },
      { name: "Scikit-learn", level: "advanced" },
      { name: "OpenCV", level: "working" },
      { name: "Classical ML", level: "advanced" },
    ],
  },
  {
    name: "Cloud & DevOps",
    description: "",
    icon: "/icons/Cloud & DevOps.png",
    skills: [
      { name: "AWS", level: "advanced" },
      { name: "Lambda", level: "advanced" },
      { name: "Lex", level: "working" },
      { name: "Rekognition", level: "working" },
      { name: "S3", level: "advanced" },
      { name: "RDS", level: "working" },
      { name: "DynamoDB", level: "working" },
      { name: "OpenSearch", level: "working" },
      { name: "SES", level: "working" },
      { name: "SQS", level: "working" },
      { name: "API Gateway", level: "working" },
      { name: "CloudFormation", level: "working" },
      { name: "CodePipeline", level: "working" },
      { name: "Amazon Bedrock", level: "working" },
      { name: "EKS", level: "working" },
      { name: "GCP", level: "working" },
      { name: "Docker", level: "advanced" },
      { name: "Kubernetes", level: "working" },
      { name: "kubectl", level: "working" },
      { name: "CI/CD", level: "advanced" },
      { name: "CLI", level: "working" },
    ],
  },
  {
    name: "Databases",
    description: "",
    icon: "/icons/Databases.png",
    skills: [
      { name: "PostgreSQL", level: "advanced" },
      { name: "MongoDB", level: "working" },
      { name: "Firebase", level: "working" },
      { name: "MySQL", level: "working" },
    ],
  },
  {
    name: "Data Tools",
    description: "",
    icon: "/icons/datatools.png",
    skills: [
      { name: "Pandas", level: "expert" },
      { name: "NumPy", level: "expert" },
      { name: "PySpark", level: "working" },
      { name: "Matplotlib", level: "working" },
      { name: "Seaborn", level: "working" },
    ],
  },
  {
    name: "Infrastructure & Monitoring",
    description: "",
    icon: "/icons/Infrastructure & Monitoring.png",
    skills: [
      { name: "Prometheus", level: "working" },
      { name: "CloudWatch", level: "working" },
      { name: "OpenSearch", level: "working" },
    ],
  },
  {
    name: "Tools & Productivity",
    description: "",
    icon: "/icons/Tools & Productivity.png",
    skills: [
      { name: "Git", level: "advanced" },
      { name: "GitHub", level: "advanced" },
      { name: "Redis", level: "working" },
      { name: "Postman", level: "advanced" },
      { name: "MongoDB Compass", level: "working" },
      { name: "Docker Hub", level: "working" },
      { name: "VS Code", level: "advanced" },
      { name: "Swagger", level: "working" },
    ],
  },
];

export const LEADERSHIP: LeadershipItem[] = [
  {
    organization: "Google Developer Student Clubs (GDSC)",
    role: "Core Team",
    period: "",
    highlights: [
      "Organized workshops and study jams on cloud, ML, and modern web development.",
      "Mentored peers on building real projects that go beyond tutorial‑level complexity.",
    ],
  },
  {
    organization: "NYU Ambassador",
    role: "STUDENT AMBASSADOR",
    period: "",
    highlights: [
      "Represented the program to prospective students and helped them navigate academic decisions.",
      "Collaborated with faculty and staff to run events and outreach initiatives.",
    ],
  },
  {
    organization: "Microsoft Students Club",
    role: "Student Coordinator",
    period: "",
    highlights: [
      "Promoted Microsoft services for game development by conducting technical sessions on game-building for 200+ participants.",
      "Identified and approached guest speakers for hands-on workshops and events.",
    ],
  },
  {
    organization: "Institute of Engineers (India) – Western Regional Conclave",
    role: "",
    period: "",
    highlights: [
      "Secured 3rd place in a regional app-building competition focused on sustainable technologies.",
      "",
    ],
  },
  {
    organization: "New York University - Special Events, Enrollment Management",
    role: "Graduate Assistant",
    period: "",
    highlights: [
      "Coordinated event logistics including setup, registration, staffing, and faculty collaboration for major university events.",
      "Interacted with prospective and admitted students and supported the Office for Undergraduate Operations and Special Events.",
    ],
  },
  {
    organization: "Robinhood Army",
    role: "Robin Volunteer",
    period: "Aug 2021",
    highlights: [
      "Volunteered as a Robin with Robinhood Army to support community-driven food distribution and local initiatives.",
      "",
    ],
  },
  {
    organization: "Aundh Vikas Mandal",
    role: "Animal Welfare Activist",
    period: "Jun 2023 – Sep 2023",
    highlights: [
      "Coordinated and participated in local animal welfare drives and awareness campaigns.",
      "",
    ],
  },
  {
    organization: "CCP Environment Foundation",
    role: "Climate Change Activist",
    period: "May 2023 – Jul 2023",
    highlights: [
      "Contributed to climate change awareness initiatives and environmental conservation activities.",
      "",
    ],
  },
];

export const ABOUT_SUMMARY = {
  headline:
    "AI/ML engineer and cloud builder who cares deeply about reliability, performance, and real‑world impact.",
  body: [
    "I enjoy working at the intersection of applied machine learning, backend engineering, and cloud infrastructure. My work spans research‑driven projects like multimodal depression detection to production systems such as ML‑aware caching platforms and transformer‑based microservices.",
    "I value pragmatic engineering, strong observability, and tight feedback loops with stakeholders. My goal is to ship systems that are not just clever in isolation, but reliable in messy real‑world environments.",
  ],
};

export const COUNTERS = {
  yearsCoding: 0,
  projectsBuilt: 0,
  cloudDeployments: 0,
};
