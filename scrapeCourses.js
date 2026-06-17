const fs = require('fs');
const cheerio = require('cheerio');

// Map of our local course ID to official course ID
const localToOfficial = { 
  "1": 3, 
  "2": 5, 
  "3": 9, 
  "4": 10, 
  "5": 14, 
  "6": 18, 
  "7": 20, 
  "8": 28, 
  "9": 7, 
  "10": 8, 
  "11": 12, 
  "12": 13, 
  "13": 19 
};

// Hardcoded current basic data so we don't have to parse TS AST
const coursesData = [
  { id: "3", tag: "#Transplant Coordination", title: "Transplant Coordination Professional Certificate", duration: "6 Weeks (Study Hours: 100 Hours)", price: "₹ 4500", description: "Learn about Transplant Coordination", image: "/courses-official/course-3.jpg", isPro: true },
  { id: "1", tag: "#Grief Counselling", title: "Family Counselling and Conversations on Organ Donation", duration: "20 Hours", price: "₹ 999", description: "Learn about Grief Counselling & Organ Donation", image: "/courses-official/course-1.jpg", isPro: true },
  { id: "2", tag: "#Legal Framework", title: "Legal Aspects of Organ Donation and Transplantation", duration: "20 Hours", price: "₹ 999", description: "Learn about Legal Framework and Guidelines", image: "/courses-official/course-2.jpg", isPro: true },
  { id: "4", tag: "#Post Graduate", title: "Post Graduate Diploma in Transplant Coordination and Grief Counselling", duration: "1 Year", price: "₹ 15000", description: "Learn about Counselling & Transplant Coordination", image: "/courses-official/course-4.jpg", isPro: true },
  { id: "5", tag: "#Brainstem Death", title: "Brainstem Death - Identification, Certification and Donor Optimization", duration: "20 Hours", price: "₹ 999", description: "Learn about Brainstem Death & Organ Donation", image: "/courses-official/course-5.jpg", isPro: true },
  { id: "6", tag: "#Medical Professionals", title: "Essential Course On Organ Donation For Medical Professionals", duration: "20 Hours", price: "₹ 999", description: "Enhance Your Knowledge on Organ Donation", image: "/courses-official/course-6.jpg", isPro: true },
  { id: "7", tag: "#Paramedical", title: "Saving lives - A course for paramedical professionals", duration: "20 Hours", price: "₹ 799", description: "Enhance Your Knowledge on Organ Donation", image: "/courses-official/course-8.jpg", isPro: true },
  { id: "8", tag: "#Ecosystem", title: "Organ Transplantation Ecosystem: A Comprehensive Induction Course", duration: "30 Hours", price: "₹ INR 4999/-", description: "Organ Transplantation Ecosystem", image: "/courses-official/course-7.jpg", isPro: true },
  
  { id: "9", tag: "#Organ Donation", title: "Gift of Life - One-day Certificate Course on Organ Donation", duration: "4 hours", price: "₹ 499", description: "Learn about Organ Donation & Transplant", image: "/courses-official/course-9.jpg", isPro: false },
  { id: "10", tag: "#Kidney Health", title: "Taking Care of Your Kidneys", duration: "3 hours", price: "₹ 199", description: "Learn about Kidney Health", image: "/courses-official/course-10.jpg", isPro: false },
  { id: "11", tag: "#Liver Health", title: "Taking Care Of Your Liver", duration: "3 hours", price: "₹ 199", description: "Learn about Liver Health", image: "/courses-official/course-11.jpg", isPro: false },
  { id: "12", tag: "#Lungs Health", title: "Taking Care Of Your Lungs", duration: "3 hours", price: "₹ 199", description: "Learn about Lungs  Health", image: "/courses-official/course-12.jpg", isPro: false },
  { id: "13", tag: "#Organ Donation", title: "जीवन का उपहार - अंगदान पर एक दिन का सर्टिफिकेट कोर्स-हिन्दी", duration: "4 घंटे", price: "₹ 499", description: "रजीस्ट्रेशन", image: "/courses-official/course-13.jpg", isPro: false }
];

async function scrape() {
  for (let course of coursesData) {
    const offId = localToOfficial[course.id];
    console.log('Fetching', course.title, '...', offId);
    try {
      const res = await fetch('https://el.mohanfoundation.org/coursedetails.php?courseid=' + offId);
      const html = await res.text();
      const $ = cheerio.load(html);

      const cleanHtml = (id) => {
        const el = $(`#${id}`);
        if (!el.length) return '';
        // Remove the first h4 or h5 if it's just the tab title
        el.find('h4, h5').first().remove();
        
        let htmlContent = el.html() || '';
        
        // If the content is wrapped in an accordion, extract just the accordion-body content
        // to prevent Tailwind's 'collapse' class from hiding everything
        const accordionBody = el.find('.accordion-body');
        if (accordionBody.length > 0) {
          htmlContent = accordionBody.html() || '';
        }
        
        return htmlContent.trim();
      };

      course.aboutHtml = cleanHtml('about');
      course.objectivesHtml = cleanHtml('home');
      course.curriculumHtml = cleanHtml('curriculum');
      course.eligibilityHtml = cleanHtml('join');
      course.cpdHtml = cleanHtml('cpd');
      course.registrationStatus = "Registration Open";
      
    } catch (err) {
      console.error('Error fetching course', course.id, err);
    }
  }

  // Generate new TS file
  let tsCode = `export interface Course {
  id: string;
  image: string;
  tag: string;
  title: string;
  duration: string;
  price: string;
  registrationStatus: string;
  description: string;
  aboutHtml: string;
  objectivesHtml: string;
  curriculumHtml: string;
  eligibilityHtml: string;
  cpdHtml: string;
}\n\n`;

  const pro = coursesData.filter(c => c.isPro);
  const pub = coursesData.filter(c => !c.isPro);

  tsCode += `export const professionalCourses: Course[] = ${JSON.stringify(pro, null, 2)};\n\n`;
  tsCode += `export const generalCourses: Course[] = ${JSON.stringify(pub, null, 2)};\n\n`;
  tsCode += `export const allCourses: Course[] = [...professionalCourses, ...generalCourses];\n`;

  fs.writeFileSync('data/courses.ts', tsCode, 'utf8');
  console.log('Done!');
}

scrape();
