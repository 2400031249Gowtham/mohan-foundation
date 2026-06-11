export interface Course {
  id: string;
  image: string;
  tag: string;
  title: string;
  lessons: number;
  weeks: number;
  rating: number;
  reviews: number;
  price: string;
  // Extended Details
  description: string;
  objectives: string[];
  eligibility: string;
  certificate: string;
  cpdAccreditation: string;
  benefits: string[];
}

export const professionalCourses: Course[] = [
  {
    id: "1",
    image: "/courses-1/FamilyCourse.jpg",
    tag: "#Organ Donation",
    title: "Family Counselling and Conversations on Organ Donation",
    lessons: 20,
    weeks: 3,
    rating: 5,
    reviews: 148,
    price: "₹999",
    description: "This comprehensive course equips healthcare professionals and coordinators with the essential communication skills required for grief counselling and approaching families for organ donation.",
    objectives: [
      "Understand the psychological stages of grief.",
      "Learn evidence-based communication strategies for family approach.",
      "Navigate difficult conversations with empathy and clarity.",
      "Address common concerns and myths regarding organ donation."
    ],
    eligibility: "Healthcare professionals, social workers, and transplant coordinators.",
    certificate: "Certificate of Completion awarded by MOHAN Foundation.",
    cpdAccreditation: "Accredited for 15 CPD credits.",
    benefits: [
      "Enhanced communication skills",
      "Better family consent rates",
      "Professional networking opportunities",
      "Access to exclusive resource materials"
    ]
  },
  {
    id: "2",
    image: "/courses-1/LegalCourse.jpg",
    tag: "#Legal & Ethics",
    title: "Legal Aspects of Organ Donation and Transplantation",
    lessons: 20,
    weeks: 3,
    rating: 5,
    reviews: 112,
    price: "₹999",
    description: "Navigate the complex legal and ethical landscape surrounding organ donation and transplantation in India, focusing on the THOA Act and its amendments.",
    objectives: [
      "Understand the Transplantation of Human Organs Act (THOA).",
      "Learn the legal requirements for living and deceased donation.",
      "Explore ethical dilemmas in organ allocation.",
      "Understand the medico-legal formalities involved in brainstem death certification."
    ],
    eligibility: "Doctors, hospital administrators, lawyers, and transplant coordinators.",
    certificate: "Certificate of Completion awarded by MOHAN Foundation.",
    cpdAccreditation: "Accredited for 12 CPD credits.",
    benefits: [
      "Comprehensive understanding of Indian laws",
      "Risk mitigation for healthcare institutions",
      "Guidance on legal documentation",
      "Expert-led case study discussions"
    ]
  },
  {
    id: "3",
    image: "/courses-1/Orgains.jpg",
    tag: "#Transplant Coordination",
    title: "Transplant Coordination Professional Certificate",
    lessons: 40,
    weeks: 6,
    rating: 5,
    reviews: 97,
    price: "₹4,500",
    description: "A specialized program designed to train individuals in the end-to-end process of transplant coordination, from donor identification to organ retrieval.",
    objectives: [
      "Master the clinical criteria for brainstem death.",
      "Learn the logistics of organ retrieval and allocation.",
      "Develop skills in donor maintenance.",
      "Understand the coordination required between hospitals, police, and transport agencies."
    ],
    eligibility: "Graduates in life sciences, nursing professionals, and medical social workers.",
    certificate: "Professional Certificate in Transplant Coordination.",
    cpdAccreditation: "Accredited for 30 CPD credits.",
    benefits: [
      "In-demand professional certification",
      "Practical knowledge of the transplant ecosystem",
      "Placement assistance guidance",
      "Interactive workshops"
    ]
  },
  {
    id: "4",
    image: "/courses-1/PGDTC.jpg",
    tag: "#PG Diploma",
    title: "Post Graduate Diploma in Transplant Coordination and Grief Counselling",
    lessons: 52,
    weeks: 52,
    rating: 5,
    reviews: 63,
    price: "₹15,000",
    description: "An intensive, one-year blended learning program providing deep expertise in all facets of organ donation, transplant coordination, and specialized grief counselling.",
    objectives: [
      "Acquire advanced knowledge of organ systems and transplant immunology.",
      "Master advanced grief counselling techniques.",
      "Learn hospital policy formulation for organ donation.",
      "Conduct independent research and case studies."
    ],
    eligibility: "Medical graduates, post-graduates in life sciences or social work.",
    certificate: "Post Graduate Diploma awarded by MOHAN Foundation.",
    cpdAccreditation: "Accredited for 50 CPD credits.",
    benefits: [
      "Highest level of professional certification",
      "Mentorship from industry pioneers",
      "Extensive clinical exposure",
      "Alumni network access"
    ]
  },
  {
    id: "5",
    image: "/courses-1/BrainCourse.jpg",
    tag: "#Medical Professionals",
    title: "Brainstem Death – Identification, Certification and Donor Optimization",
    lessons: 20,
    weeks: 3,
    rating: 5,
    reviews: 134,
    price: "₹999",
    description: "A crucial clinical course for intensivists and neurologists focusing on the precise medical protocols for identifying brainstem death and maintaining the donor.",
    objectives: [
      "Perform clinical tests for brainstem death accurately.",
      "Understand the legal prerequisites for certification.",
      "Learn physiological changes post-brainstem death.",
      "Implement donor optimization protocols to preserve organ viability."
    ],
    eligibility: "ICU doctors, neurologists, neurosurgeons, and senior nurses.",
    certificate: "Clinical Certificate in Donor Optimization.",
    cpdAccreditation: "Accredited for 20 CPD credits.",
    benefits: [
      "Improved donor organ retrieval rates",
      "Confidence in legal and medical compliance",
      "Access to standard operating procedures (SOPs)",
      "Interactive clinical simulations"
    ]
  },
  {
    id: "6",
    image: "/courses-1/ESSENTIAL.jpg",
    tag: "#Medical Professionals",
    title: "Essential Course On Organ Donation For Medical Professionals",
    lessons: 20,
    weeks: 3,
    rating: 5,
    reviews: 189,
    price: "₹999",
    description: "A foundational course covering the clinical, legal, and ethical basics of organ donation specifically tailored for doctors and medical students.",
    objectives: [
      "Understand the national organ donation landscape.",
      "Identify potential organ donors in clinical settings.",
      "Learn the basics of transplant immunology.",
      "Understand the role of the treating physician in the donation process."
    ],
    eligibility: "Medical students, residents, and practicing physicians.",
    certificate: "Certificate of Completion.",
    cpdAccreditation: "Accredited for 10 CPD credits.",
    benefits: [
      "Foundational medical knowledge",
      "Enhanced patient care perspectives",
      "Quick, high-yield learning modules",
      "Flexible online access"
    ]
  },
  {
    id: "7",
    image: "/courses-1/SAVINGLIVES.jpg",
    tag: "#Paramedical",
    title: "Saving Lives – A Course for Paramedical Professionals",
    lessons: 20,
    weeks: 3,
    rating: 4,
    reviews: 156,
    price: "₹799",
    description: "Empowering paramedical staff, nurses, and technicians with the necessary knowledge to support the organ donation and retrieval process in critical care settings.",
    objectives: [
      "Understand the vital role of paramedical staff in donation.",
      "Learn basic life support and donor maintenance basics.",
      "Understand infection control during organ retrieval.",
      "Learn proper documentation and handover procedures."
    ],
    eligibility: "Nurses, paramedics, and allied healthcare workers.",
    certificate: "Certificate of Participation.",
    cpdAccreditation: "Accredited for 8 CPD credits.",
    benefits: [
      "Role-specific training",
      "Improved career prospects in ICU settings",
      "Practical, applicable skills",
      "Affordable and accessible format"
    ]
  },
  {
    id: "8",
    image: "/courses-1/Orgains.jpg",
    tag: "#Transplant Ecosystem",
    title: "Organ Transplantation Ecosystem: A Comprehensive Induction Course",
    lessons: 30,
    weeks: 4,
    rating: 5,
    reviews: 78,
    price: "₹4,999",
    description: "An overarching induction program designed for professionals newly entering the transplant network, providing a 360-degree view of the entire ecosystem.",
    objectives: [
      "Map out the entire deceased donation pathway.",
      "Understand the roles of NOTTO, ROTTO, and SOTTO.",
      "Explore the economics and logistics of transplantation.",
      "Analyze global vs. Indian models of organ donation."
    ],
    eligibility: "Healthcare administrators, policy makers, and NGO professionals.",
    certificate: "Induction Certificate in Transplant Ecosystems.",
    cpdAccreditation: "Accredited for 25 CPD credits.",
    benefits: [
      "Holistic system understanding",
      "Strategic policy insights",
      "Networking with national transplant bodies",
      "Comprehensive digital library access"
    ]
  }
];

export const generalCourses: Course[] = [
  {
    id: "9",
    image: "/courses-2/giftoflife.jpg",
    tag: "#Organ Donation",
    title: "Gift of Life – One-day Certificate Course on Organ Donation",
    lessons: 4,
    weeks: 1,
    rating: 5,
    reviews: 412,
    price: "₹499",
    description: "A brief, impactful course for the general public aiming to spread awareness about the noble act of organ donation and how one can pledge their organs.",
    objectives: [
      "Understand what organ donation is and who can donate.",
      "Bust common myths and misconceptions.",
      "Learn how to pledge organs and discuss it with family.",
      "Understand the difference between tissue and organ donation."
    ],
    eligibility: "Open to anyone above 18 years of age.",
    certificate: "Gift of Life Ambassador Certificate.",
    cpdAccreditation: "Not applicable.",
    benefits: [
      "Become an informed advocate for organ donation",
      "Clear doubts and myths",
      "Short, engaging format",
      "Join a community of lifesavers"
    ]
  },
  {
    id: "10",
    image: "/courses-2/KIDNEY.jpg",
    tag: "#Health & Wellness",
    title: "Taking Care of Your Kidneys",
    lessons: 3,
    weeks: 1,
    rating: 5,
    reviews: 267,
    price: "₹199",
    description: "A health awareness module designed to educate the public on kidney functions, preventing chronic kidney diseases, and maintaining optimal renal health.",
    objectives: [
      "Understand basic kidney anatomy and function.",
      "Identify risk factors for kidney disease.",
      "Learn dietary and lifestyle modifications for kidney health.",
      "Recognize early symptoms of renal failure."
    ],
    eligibility: "Open to the general public.",
    certificate: "Health Awareness Certificate.",
    cpdAccreditation: "Not applicable.",
    benefits: [
      "Preventive health knowledge",
      "Dietary tips and guidelines",
      "Easy-to-understand language",
      "Lifetime access to course material"
    ]
  },
  {
    id: "11",
    image: "/courses-2/LIVER.jpg",
    tag: "#Health & Wellness",
    title: "Taking Care of Your Liver",
    lessons: 3,
    weeks: 1,
    rating: 5,
    reviews: 234,
    price: "₹199",
    description: "Learn about the body's largest internal organ, its vital functions, and how lifestyle choices impact liver health and disease prevention.",
    objectives: [
      "Understand the crucial metabolic functions of the liver.",
      "Learn about fatty liver, hepatitis, and cirrhosis.",
      "Discover liver-friendly foods and habits.",
      "Understand the impact of alcohol and medications."
    ],
    eligibility: "Open to the general public.",
    certificate: "Health Awareness Certificate.",
    cpdAccreditation: "Not applicable.",
    benefits: [
      "Actionable health tips",
      "Awareness of modern lifestyle diseases",
      "Expert-curated content",
      "Interactive quizzes"
    ]
  },
  {
    id: "12",
    image: "/courses-2/LUNG.jpg",
    tag: "#Health & Wellness",
    title: "Taking Care of Your Lungs",
    lessons: 3,
    weeks: 1,
    rating: 5,
    reviews: 198,
    price: "₹199",
    description: "An essential course focusing on respiratory health, pollution protection, breathing exercises, and preventing common lung diseases.",
    objectives: [
      "Understand the respiratory system.",
      "Learn the effects of pollution and smoking on lungs.",
      "Practice basic lung-strengthening exercises.",
      "Understand conditions like asthma and COPD."
    ],
    eligibility: "Open to the general public.",
    certificate: "Health Awareness Certificate.",
    cpdAccreditation: "Not applicable.",
    benefits: [
      "Practical breathing techniques",
      "Environmental health awareness",
      "Family health benefits",
      "Quick completion time"
    ]
  },
  {
    id: "13",
    image: "/courses-2/gol.jpg",
    tag: "#Hindi",
    title: "जीवन का उपहार – Organ Donation Certificate Course (Hindi)",
    lessons: 4,
    weeks: 1,
    rating: 5,
    reviews: 321,
    price: "₹499",
    description: "The Hindi version of our highly popular 'Gift of Life' course, aimed at spreading organ donation awareness to Hindi-speaking populations across India.",
    objectives: [
      "अंगदान के महत्व को समझना (Understand the importance of organ donation).",
      "मिथकों और गलत धारणाओं को दूर करना (Bust myths and misconceptions).",
      "अंगदान की प्रक्रिया को जानना (Learn the donation process).",
      "परिवार के साथ बातचीत करना (Discussing with family)."
    ],
    eligibility: "सभी के लिए खुला (Open to all).",
    certificate: "जीवन का उपहार एंबेसडर प्रमाण पत्र (Gift of Life Ambassador Certificate).",
    cpdAccreditation: "लागू नहीं (Not applicable).",
    benefits: [
      "मातृभाषा में शिक्षा (Learning in native language)",
      "सांस्कृतिक रूप से प्रासंगिक (Culturally relevant content)",
      "जागरूकता फैलाने में सहायक (Helps spread awareness)",
      "आसान भाषा (Simple language)"
    ]
  }
];

export const allCourses: Course[] = [...professionalCourses, ...generalCourses];
