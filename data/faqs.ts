export type CategoryId = 'general' | 'access' | 'fees';

export const categories: { id: CategoryId; label: string }[] = [
  { id: 'general', label: 'General' },
  { id: 'access', label: 'Access' },
  { id: 'fees', label: 'Fees' },
];

export const faqData: Record<CategoryId, { id: number; question: string; answer: string }[]> = {
  "general": [
    {
      "id": 1,
      "question": "Are MOHAN Foundation's online training programs accredited by any educational institute or any other organisations?",
      "answer": "<b>Yes</b>, MOHAN Foundation has been an accredited CPD provider since 2025. This accreditation allows the organization to issue formal CPD certificates after successful completion of eligible training programmes, helping participants fulfil mandatory and reflective CPD requirements. While the courses are not affiliated with international universities, they are well recognised and respected by transplant hospitals and healthcare institutions across India. The programmes are structured to meet professional standards and are designed to address the practical and regulatory needs of organ donation and transplantation.<br>Check us out on CPD’s Member Directory - <a href=\"https://directory.cpdstandards.com/providers/mohan-foundation/\" target=\"_blank\">https://directory.cpdstandards.com/providers/mohan-foundation/</a>"
    },
    {
      "id": 2,
      "question": "Can a working professional join the course?",
      "answer": "YES. The online learning platform provides the convenience of studying while working. This also offers participants the flexibility to learn at their own pace."
    },
    {
      "id": 3,
      "question": "Can international students participate in courses?",
      "answer": "Yes, they can. Our courses have been taken by many candidates from abroad due to low fee structure and high quality of the course. All candidates who take the course are expected to rate the course and this is shown on our site."
    },
    {
      "id": 4,
      "question": "What is the medium of the course - English, Hindi, or any other regional language?",
      "answer": "The medium of instruction is English. All course materials are provided in English."
    },
    {
      "id": 5,
      "question": "Can students be assured of job opportunities?",
      "answer": "NO. MOHAN Foundation does not have a placement cell. However, when MF is approached by any institution, the job opportunity will be circulated within the Alumni group. The candidates are encouraged to approach the institutions directly. Having said this most hospitals do value candidates trained by MOHAN Foundation as over 70% of successful coordinators in the country have been trained by MOHAN Foundation."
    },
    {
      "id": 6,
      "question": "How and when do courses take place?",
      "answer": "MOHAN Foundation provides a range of online courses. Short-term courses are available throughout the year (online modules), while long-term courses are conducted in scheduled batches (online modules and webinars)."
    },
    {
      "id": 7,
      "question": "Can anyone sign up for a course?",
      "answer": "The eligibility for each course is available on its respective course details page."
    },
    {
      "id": 8,
      "question": "Can I join a course that has already started?",
      "answer": "Short-term courses - You can join the course at any time.\n\nLong-term courses - It is recommended to join at the start of the course to optimize your learning pace, receive timely answers from the course educators, and participate fully in discussions with other learners."
    },
    {
      "id": 9,
      "question": "How many courses can I take?",
      "answer": "There is no limit to the number of courses you can take."
    },
    {
      "id": 10,
      "question": "Will there be any online interactions?",
      "answer": "For the one year and 6 weeks course there are regular online meetings. For short term meetings can be done as and when the need arises, virtual meetings will be conducted. For gift of Life course too there are meetings if you progress to the next stage."
    },
    {
      "id": 11,
      "question": "Do I need to be available at specific times?",
      "answer": "The long-term courses include webinars held at periodic intervals. Details about these virtual meetings will be provided well in advance to ensure you can make yourself available."
    },
    {
      "id": 12,
      "question": "I have paid my fees but I have not received any update",
      "answer": "After successfully paying the fee, you will receive an email confirming your registration and payment. Course access will be provided to your registered email ID. For short-term courses, you will receive the credentials within a few days. For long-term courses, such as the Transplant Coordination Professional Certificate and the Post-Graduate Diploma in Transplant Coordination, access will be shared a few days before the course start date."
    },
    {
      "id": 13,
      "question": "I am not from a medical or paramedical background. Can I still enrol in the course?",
      "answer": "Kindly select the course you wish to enrol in. You can find all the details on the course landing page at el.mohanfoundation.org"
    },
    {
      "id": 14,
      "question": "I'm interested in volunteering for organ donation. Could you advise me on which course to enrol in?",
      "answer": "Thank you for your decision to volunteer for the noble cause of organ donation. Please visit the page to become an ambassador for organ donation: <a href=\"https://www.mohanfoundation.org/organ-donation-ambassador.asp\" target=\"_blank\">Organ Donation Ambassador Page</a>"
    },
    {
      "id": 15,
      "question": "I want to become a transplant coordinator. Which course should I enrol in?",
      "answer": "Two courses are available to learn about transplant coordination. <br><br> <a href=\"https://el1.mohanfoundation.org/coursedetails.php?courseid=10\" target=\"_blank\">Post Graduate Diploma in Transplant Coordinators' Training & Grief Counselling (One year)</a> <br><a href=\"https://el1.mohanfoundation.org/coursedetails.php?courseid=9\" target=\"_blank\">Transplant Coordination Professional Certificate (Six weeks)</a>"
    },
    {
      "id": 16,
      "question": "I want to learn about counselling for organ donation. What course should I do?",
      "answer": "Enrol for a 20-hour online course on Family Counselling and Conversations on Organ Donation <br><a href=\"https://el1.mohanfoundation.org/coursedetails.php?courseid=3\" target=\"_blank\">Course Link</a>"
    },
    {
      "id": 17,
      "question": "Want to learn about transplant law. Which course should I enrol in?",
      "answer": "Enrol for a 40-hour online course on Legal Aspects of Organ Donation and Transplantation <br><a href=\"https://el1.mohanfoundation.org/coursedetails.php?courseid=5\" target=\"_blank\">Course Link</a>"
    },
    {
      "id": 18,
      "question": "Is the course recognized internationally or in foreign countries?",
      "answer": "We do not have any international university affiliations. However, there are limited training opportunities available in Asia, especially in South Asia. Our program aims to fill this gap by providing comprehensive training in this specialized field. While our course is not affiliated with international universities, it is designed to meet the specific needs of the region and can be a valuable resource for professionals seeking to enhance their knowledge and skills."
    },
    {
      "id": 19,
      "question": "Will I receive a NOTTO ID?",
      "answer": "The certificate will be issued solely by MOHAN Foundation and not by the National Organ and Tissue Transplant Organisation (NOTTO)/any state body."
    },
    {
      "id": 20,
      "question": "Do I have to come for contact classes",
      "answer": "For the one-year and six-week courses, the contact sessions are conducted as webinars, so there is no need for travel."
    },
    {
      "id": 21,
      "question": "Are there any offline course that I can join?",
      "answer": "Masterclasses on subjects such as deceased donation, counselling, soft skills, and communication are conducted as face-to-face programs. Please keep checking our website for updates - www.mohanfoundation.org"
    },
    {
      "id": 22,
      "question": "Can I do the course using my mobile phone?",
      "answer": "Yes, you can complete the course using your mobile phone."
    },
    {
      "id": 23,
      "question": "Can I visit the office in case of any registration issues?",
      "answer": "Certainly, you can either visit our branch office or give us a call for assistance with any registration issues. Feel free to explore our office locations - www.mohanfoundation.org"
    },
    {
      "id": 24,
      "question": "Can I add these courses in my resume?",
      "answer": "Yes, you can include these courses on your resume."
    },
    {
      "id": 25,
      "question": "Is it necessary to donate our organs for enrolment of courses?",
      "answer": "NO. This course aims to provide you with knowledge on various aspects of organ donation and transplant."
    }
  ],
  "access": [
    {
      "id": 26,
      "question": "How will I receive my course access details?",
      "answer": "Once the registration process (including fee payment) is completed, you will be receiving the access details such as username and password to the registered email address."
    },
    {
      "id": 27,
      "question": "How can I access my courses?",
      "answer": "After logging in, you will see the list of courses that are available on our platform. If you click on the particular course that you have enrolled for, you will be taken to the course material page."
    },
    {
      "id": 28,
      "question": "I didn't get my username and password",
      "answer": "Once you complete the registration process, your username and password will be sent to you via email. Access details for long-term courses will be provided a few days prior to the course start date. For short-term courses, access details will be shared within a few days after successful registration."
    },
    {
      "id": 29,
      "question": "Are there are any deadline for completion of courses?",
      "answer": "For long-term courses, there are specific deadlines to adhere to. However, for short-term courses, access is granted for a longer duration than the course itself. This extended access allows you to complete the course within the provided timeline."
    },
    {
      "id": 30,
      "question": "Can I access the course content after a course ends?",
      "answer": "NO. The students can apply for annual subscription so that they can avail the access to the resource materials even after the course duration"
    },
    {
      "id": 31,
      "question": "Can I download the material from the course(s) that I have enrolled for?",
      "answer": "You can download only a limited amount of material, not all of it. Please acknowledge the source if you use any of the material."
    },
    {
      "id": 32,
      "question": "Would I receive the hard copy of material that is available online?",
      "answer": "No, you will not receive any hardcopy of course material. However soft copies are sent and can be printed. This is to save costs and be environmentally friendly."
    },
    {
      "id": 33,
      "question": "What do I do if I cannot access a course that I have signed up for?",
      "answer": "If you are not able to access the course that you have signed up for, with the username and password provided by us, contact our support team at elearning@mohanfoundation.org for assistance."
    },
    {
      "id": 34,
      "question": "I forgot my password. How can I reset it?",
      "answer": "Go to your login page and click ‘Forgot Password'. Type your username or registered Email id and click ‘Submit'. You will receive an email with instructions on how to reset your password."
    },
    {
      "id": 35,
      "question": "Can I retake assessments / tests?",
      "answer": "You can retake the assessments that are available, but you cannot retake an examination."
    },
    {
      "id": 36,
      "question": "How will I write my exam?",
      "answer": "For long-term courses, completing the online exams is mandatory to finish the course and receive the certificate. The exam will be accessible on your learning platform on the scheduled date."
    },
    {
      "id": 37,
      "question": "I am not able to access the course materials",
      "answer": "Please ensure you are accessing the course with the correct course ID, username, and link. Additionally, make sure you have a good internet connection, as the platform features high-definition videos and other materials."
    },
    {
      "id": 38,
      "question": "I am unable to locate the exam link. Where can I find it?",
      "answer": "The exam is accessible on the same platform where you accessed your study materials. You won't receive a separate link. However, the exam will become available only if you have completed the prerequisites."
    },
    {
      "id": 39,
      "question": "The materials are not loading and are taking a long time.",
      "answer": "The course materials include high-quality videos and lectures. Therefore, please ensure you have a strong internet connection, preferably 5G."
    },
    {
      "id": 40,
      "question": "I did not have time to complete the modules. What is the next option?",
      "answer": "If you have not completed the mandatory prerequisites, you will not be able to appear for the exam. You may apply for a reattempt if the course offers this option, but please note that the reattempt option is available for only a limited number of courses."
    },
    {
      "id": 41,
      "question": "I failed in the reattempt as well. What is the next option?",
      "answer": "In this case, you will need to reapply for the course and start from the beginning."
    }
  ],
  "fees": [
    {
      "id": 42,
      "question": "How much does it cost to join a course?",
      "answer": "Multiple courses are offered on our platform. The course details page for each course will have all details about the course including the fee structure. Most of our courses are offered at a subsidised cost. The fee starts from Rs 500 and can go up to Rs.15,000/- Overseas candidates fees is higher due to many factors."
    },
    {
      "id": 43,
      "question": "Are there any scholarship policies that are accessible or can be utilized?",
      "answer": "YES. There is an educational grant which can be availed only by the candidates from government and non profit institutions. This grant is available only for the long-term one year and 6 week courses."
    },
    {
      "id": 44,
      "question": "How to apply for scholarship",
      "answer": "The scholarship is available for candidates from government and non-profit institutions. A sample letter is provided on the registration form for each course. Applications must adhere strictly to the prescribed format."
    },
    {
      "id": 45,
      "question": "Are there any hidden charges?",
      "answer": "No, once you have paid the registration fee there are no further payments to be made."
    },
    {
      "id": 46,
      "question": "When will I get my certificate?",
      "answer": "Online certificates are available. Upon completing course requirements, you will be able to download your course completion certificate."
    },
    {
      "id": 47,
      "question": "In which currencies do you accept the registration fee?",
      "answer": "We accept the registration fee in United States Dollars (USD) and Indian Rupees (INR)"
    },
    {
      "id": 48,
      "question": "I am unable to download my course completion certificate?",
      "answer": "The certificate is accessible on the same platform where you accessed your study materials. However, submitting feedback is mandatory to receive your certificate. If you encounter any difficulties, please send an email to elearning@mohanfoundation.org"
    },
    {
      "id": 49,
      "question": "Is the certificate from the online course recognized for job opportunities in hospitals?",
      "answer": "While our courses are not accredited by any institutions or educational universities, they are recognized among transplant hospitals. Candidates of our online courses have found job opportunities throughout the country."
    },
    {
      "id": 50,
      "question": "How do I pay my registration fee?",
      "answer": "The registration page will provide options for online fee payments, including credit card, debit card, internet banking, and UPI."
    }
  ]
};
