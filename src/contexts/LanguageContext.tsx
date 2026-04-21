import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "mr";

const dict = {
  en: {
    nav: { home: "Home", about: "About", services: "Services", packages: "Packages", store: "Store", contact: "Contact", cta: "Publish Book" },
    hero: { title: "Publish. Print. Promote.", sub: "Your Journey from Manuscript to Masterpiece Starts Here. India's Emerging Hub for Quality Publishing.", cta1: "Publish My Book", cta2: "View Packages" },
    uvp: { title: "Why Authors Trust Us", isbn: "ISBN Registration", isbnD: "Official ISBN allocation for global recognition of your title.", global: "Global Distribution", globalD: "Reach 10+ countries via Amazon, Flipkart, Kindle & more.", premium: "Premium Printing", premiumD: "World-class offset and digital printing, premium paper finishes." },
    process: { title: "From Manuscript to Masterpiece", s1: "Submit Manuscript", s2: "Review & Editing", s3: "Design & Printing", s4: "Global Distribution" },
    featured: { title: "Featured Books", buy: "Buy Now" },
    stats: { books: "Books Published", authors: "Authors Satisfied", countries: "Countries Reached", years: "Years of Excellence" },
    footer: { tagline: "India's emerging hub for quality publishing.", quick: "Quick Links", newsletter: "Newsletter", subscribe: "Subscribe", emailPh: "Your email", rights: "All rights reserved." },
  },
  mr: {
    nav: { home: "मुख्यपृष्ठ", about: "आमच्याबद्दल", services: "सेवा", packages: "पॅकेजेस", store: "स्टोअर", contact: "संपर्क", cta: "पुस्तक प्रकाशित करा" },
    hero: { title: "प्रकाशित करा. छापा. प्रचार करा.", sub: "तुमच्या हस्तलिखितापासून उत्कृष्ट कलाकृतीपर्यंतचा प्रवास इथून सुरू होतो. भारतातील दर्जेदार प्रकाशनाचे उदयोन्मुख केंद्र.", cta1: "माझे पुस्तक प्रकाशित करा", cta2: "पॅकेजेस पहा" },
    uvp: { title: "लेखक आमच्यावर का विश्वास ठेवतात", isbn: "ISBN नोंदणी", isbnD: "तुमच्या शीर्षकाला जागतिक ओळखीसाठी अधिकृत ISBN.", global: "जागतिक वितरण", globalD: "Amazon, Flipkart, Kindle द्वारे १०+ देशांमध्ये पोहोचा.", premium: "उत्तम छपाई", premiumD: "जागतिक दर्जाची ऑफसेट व डिजिटल छपाई, उत्तम कागद." },
    process: { title: "हस्तलिखितापासून उत्कृष्टतेकडे", s1: "हस्तलिखित सबमिट करा", s2: "पुनरावलोकन व संपादन", s3: "डिझाइन व छपाई", s4: "जागतिक वितरण" },
    featured: { title: "वैशिष्ट्यपूर्ण पुस्तके", buy: "आता खरेदी करा" },
    stats: { books: "पुस्तके प्रकाशित", authors: "समाधानी लेखक", countries: "देश गाठले", years: "वर्षांचा अनुभव" },
    footer: { tagline: "भारतातील दर्जेदार प्रकाशनाचे उदयोन्मुख केंद्र.", quick: "द्रुत दुवे", newsletter: "वृत्तपत्र", subscribe: "सदस्यता घ्या", emailPh: "तुमचा ईमेल", rights: "सर्व हक्क राखीव." },
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: typeof dict.en };
const LanguageContext = createContext<Ctx | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");
  return <LanguageContext.Provider value={{ lang, setLang, t: dict[lang] }}>{children}</LanguageContext.Provider>;
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be inside LanguageProvider");
  return ctx;
};
