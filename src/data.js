/* ─── All portfolio content lives here. Edit this file to update the site. ─── */

/* Contact form delivery via Web3Forms (https://web3forms.com).
   Enter your email there, paste the access key it emails you below. The key is designed
   to be public, so it's safe to commit. While empty, the form falls back to opening the
   visitor's mail app. */
export const CONTACT_FORM_KEY = "06e045c6-a47b-439c-9b95-9c2b2759d603";

export const PROFILE = {
  name: "Nasser Alsarabi",
  firstName: "Nasser",
  lastName: "Alsarabi",
  headline: "Business Information Technology Graduate",
  focus: ["Software Development", "Business Analysis", "Data Analysis"],
  tagline: "I build software, automate business processes, and turn operational data into decisions.",
  summary:
    "Business Information Technology graduate with hands-on experience building full-stack web applications (React, PostgreSQL), automating business processes, and turning operational data into dashboards. At NESR, an oilfield services company in Dubai, I automated the manual Goods Receipt Note process with a custom web app and built 7+ n8n automation workflows. Skilled in Python, SQL, Power BI and requirements gathering, with a strong foundation in software engineering, databases and cloud.",
  seeking: "Open to roles in software development, business analysis, data analysis and business technology.",
  email: "alsarabinasser47@gmail.com",
  linkedin: "https://www.linkedin.com/in/nasser-alsarabi/",
  linkedinLabel: "linkedin.com/in/nasser-alsarabi",
  github: "https://github.com/Sarabi-N",
  githubLabel: "github.com/Sarabi-N",
  citizenship: "Jordanian & Romanian (EU) Citizen",
  availability: "Available Immediately",
  locations: [
    {
      city: "Dubai",
      country: "UAE",
      phone: "+971 55 886 6504",
      tel: "+971558866504",
      cv: "/Nasser_Alsarabi_CV_UAE.pdf",
      cvName: "Nasser_Alsarabi_CV_UAE.pdf",
    },
    {
      city: "Amman",
      country: "Jordan",
      phone: "+962 79 078 4567",
      tel: "+962790784567",
      cv: "/Nasser_Alsarabi_CV_Jordan.pdf",
      cvName: "Nasser_Alsarabi_CV_Jordan.pdf",
    },
  ],
};

export const STATS = [
  { value: 7, suffix: "+", label: "n8n workflows built" },
  { value: 4, suffix: "", label: "Certifications" },
  { value: 3, suffix: "", label: "Languages" },
  { value: 2, suffix: "nd", label: "BIT Hackathon" },
];

export const PILLARS = [
  {
    key: "dev",
    title: "Software Development",
    text: "Full-stack web applications with React, Tailwind CSS and PostgreSQL, connected to other systems through REST APIs.",
    tags: ["React.js", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    key: "ba",
    title: "Business Analysis",
    text: "Requirements gathering with business teams, as-is / to-be process mapping and data flow modeling to find what's worth automating.",
    tags: ["Requirements", "Process Mapping", "Data Flows"],
  },
  {
    key: "data",
    title: "Data Analysis",
    text: "Interactive Power BI dashboards and Python analysis that turn raw operational data into executive-level reporting.",
    tags: ["Power BI", "Pandas", "SQL"],
  },
  {
    key: "auto",
    title: "Automation & Low-Code",
    text: "API-driven workflows in n8n plus apps and approval flows in Power Apps, Power Automate and Zoho Creator.",
    tags: ["n8n", "Power Automate", "Zoho Creator"],
  },
];

export const PROCESS = [
  { step: "01", title: "Gather", text: "Requirements from the people who do the work" },
  { step: "02", title: "Map As-Is", text: "Document today's process and data flows" },
  { step: "03", title: "Design To-Be", text: "Find the automation opportunities" },
  { step: "04", title: "Build", text: "Web apps, low-code apps and API workflows" },
  { step: "05", title: "Measure", text: "Dashboards that show the impact" },
];

export const EXPERIENCE = {
  company: "National Energy Services Reunited Corp. (NESR)",
  companyShort: "NESR",
  companyNote: "Oilfield services",
  role: "Software & Automation Developer",
  location: "Dubai, UAE",
  dates: "Feb 2026 – Aug 2026",
  highlights: [
    {
      metric: "GRN App",
      title: "Goods Receipt Note automation",
      text: "Internal React + PostgreSQL web app that replaced a manual GRN process, increasing processing speed and reducing data-entry errors.",
    },
    {
      metric: "7+",
      title: "n8n automation workflows",
      text: "Integrated the company's daily-use applications through APIs, replacing repetitive manual tasks across operations.",
    },
    {
      metric: "Power BI",
      title: "Executive dashboards",
      text: "Interactive dashboards for executive-level reporting on operational data.",
    },
  ],
  groups: [
    {
      label: "Build",
      items: [
        "Built an internal web application with React and PostgreSQL that automated the previously manual Goods Receipt Note (GRN) process, increasing processing speed and reducing data-entry errors",
        "Built internal low-code applications and approval workflows with Power Apps, Power Automate and Zoho Creator to digitize document handling",
      ],
    },
    {
      label: "Automate",
      items: [
        "Developed 7+ automation workflows in n8n integrating the company's daily-use applications through APIs, replacing repetitive manual tasks across operations",
      ],
    },
    {
      label: "Analyze",
      items: [
        "Designed interactive Power BI dashboards for executive-level reporting on operational data",
        "Gathered requirements from supply chain and procurement teams and documented as-is and to-be process flows and data flows to identify automation opportunities",
      ],
    },
    {
      label: "Operate",
      items: [
        "Created and processed GRNs in SAP for procurement and inventory, ensuring accuracy and compliance with company procedures",
        "Supported IT administration across Microsoft 365 (users, licenses, Exchange Online), Microsoft Intune device policies, Mimecast email security and N-able RMM",
      ],
    },
  ],
  stack: [
    "React", "PostgreSQL", "n8n", "Power BI", "Power Apps", "Power Automate",
    "Zoho Creator", "SAP", "Microsoft 365", "Intune", "Mimecast", "N-able RMM",
  ],
};

export const GRN_FLOW = {
  asIs: [
    { title: "Goods received", text: "Delivery arrives at the site" },
    { title: "Manual GRN process", text: "Every receipt handled by hand" },
    { title: "Slow & error-prone", text: "Long processing, data-entry mistakes" },
  ],
  toBe: [
    { title: "Goods received", text: "Delivery arrives at the site" },
    { title: "GRN web app", text: "Built with React" },
    { title: "PostgreSQL", text: "One structured source of record" },
    { title: "Faster & accurate", text: "Quicker processing, fewer errors" },
  ],
};

export const SKILLS = [
  { group: "Programming", items: ["Python", "JavaScript", "TypeScript", "Java", "C/C++", "Dart", "HTML", "CSS"] },
  { group: "Web Development", items: ["React.js", "Node.js", "Tailwind CSS", "REST APIs", "API Integration", "Git", "GitHub"] },
  { group: "Databases", items: ["SQL", "PostgreSQL", "MySQL", "Firebase"] },
  { group: "Data Analysis & BI", items: ["Power BI", "Python (Pandas, Matplotlib)", "Data Visualization", "Dashboard Reporting", "Excel"] },
  { group: "Business Analysis", items: ["Requirements Gathering", "Business Process Modeling", "As-Is / To-Be Process Mapping", "Data Flow Modeling"] },
  { group: "Automation & Low-Code", items: ["n8n", "Microsoft Power Apps", "Power Automate", "Zoho Creator (Deluge)"] },
  { group: "Enterprise Systems & Cloud", items: ["SAP (Procurement, Inventory, GRN)", "Microsoft 365", "Azure Active Directory", "Microsoft Intune", "AWS"] },
];

/* Short labels for the 3D skill globe */
export const GLOBE_SKILLS = [
  "Python", "JavaScript", "TypeScript", "React", "Node.js", "PostgreSQL", "SQL", "Power BI", "n8n", "Power Apps",
  "Power Automate", "Zoho Creator", "SAP", "AWS", "Tailwind", "REST APIs", "Java", "C/C++",
  "Dart", "MySQL", "Firebase", "Pandas", "Matplotlib", "Excel", "Git", "GitHub",
  "Microsoft 365", "Azure AD", "Intune", "HTML", "CSS", "Deluge", "Process Modeling", "Data Flows",
];

export const MARQUEE = [
  "React.js", "TypeScript", "Node.js", "PostgreSQL", "Python", "SQL", "Power BI", "n8n", "Power Apps", "Power Automate",
  "Zoho Creator", "SAP", "JavaScript", "Tailwind CSS", "REST APIs", "AWS", "Microsoft 365",
  "Azure AD", "Intune", "Pandas", "MySQL", "Firebase", "Git", "Java", "Dart", "C/C++",
];

export const PROJECT = {
  badge: "Graduation Project",
  name: "RedStone",
  subtitle: "AI-Powered Workflow Automation Platform",
  dates: "Sep 2025 – Jan 2026",
  description:
    "An AI-driven SaaS/iPaaS platform that lets individuals and small-to-medium teams connect applications, build intelligent workflows, and receive real-time AI optimization suggestions — all from one interface.",
  modules: [
    { name: "Flow Builder", text: "A node-based visual canvas for building workflows without technical knowledge." },
    { name: "AI Assistant", text: "A natural-language assistant that helps users build, debug and optimize workflows." },
    { name: "AI Evaluation", text: "A module that detects errors, inefficiencies and performance issues and recommends improvements." },
  ],
};

export const EDUCATION = {
  degree: "Bachelor of Business Information Technology",
  school: "Princess Sumaya University for Technology (PSUT)",
  faculty: "King Talal School of Business Technology",
  location: "Amman, Jordan",
  dates: "Oct 2022 – Jan 2026",
  gpa: "3.2 / 4.0 (Very Good)",
};

export const CERTIFICATIONS = [
  { name: "AWS Academy Cloud Foundations", issuer: "Amazon Web Services" },
  { name: "Data Analysis with Python", issuer: "IBM" },
  { name: "Cybersecurity Tools and Technologies", issuer: "Microsoft" },
  { name: "Introduction to Web Development", issuer: "PSUT" },
];

export const COURSES = [
  { name: "Introduction to Software, Programming and Databases", issuer: "IBM" },
  { name: "Introduction to Data Science", issuer: "Cisco Networking Academy" },
];

export const AWARD = {
  title: "2nd Place — BIT Hackathon",
  org: "Princess Sumaya University for Technology",
  date: "May 2025",
};

export const LANGUAGES = [
  { name: "Arabic", level: "Native" },
  { name: "Romanian", level: "Native" },
  { name: "English", level: "Full Professional Proficiency" },
];
