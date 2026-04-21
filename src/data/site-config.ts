export const siteConfig = {
  name: "Eagle Leap Publication",
  shortName: "Eagle Leap",
  description:
    "Professional ISBN book publishing, ISSN journal support, secure ebooks, academic printing, and distribution services from Pune.",
  email: "hello@eagleleap.in",
  phone: "+91 98765 43210",
  location: "Pune, Maharashtra, India",
  whatsappNumber: "919876543210",
  journalWebsite: "/journal",
  paperSubmissionLink: "/call-for-paper#paper-submission-form",
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/packages", label: "Packages" },
  { href: "/printing", label: "Printing" },
  { href: "/call-for-paper", label: "Call for Paper" },
  {
    href: "/publications",
    label: "Publications",
    children: [
      { href: "/journal", label: "Journal" },
      { href: "/publications", label: "All Publications" },
      { href: "/publications?category=Edited%20Books", label: "Edited Books" },
      { href: "/publications?category=Papers", label: "Papers & Chapters" },
    ],
  },
  { href: "/journal", label: "Journal" },
  { href: "/store", label: "Store" },
  { href: "/contact", label: "Contact" },
  { href: "/login", label: "Login" },
];
