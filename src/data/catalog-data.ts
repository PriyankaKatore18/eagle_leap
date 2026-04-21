import book1 from "@/assets/book-1.jpg";
import book2 from "@/assets/book-2.jpg";
import book3 from "@/assets/book-3.jpg";
import book4 from "@/assets/book-4.jpg";

export type PublicationRecord = {
  slug: string;
  title: string;
  author: string;
  year: string;
  edition: string;
  publicationType: "Book" | "ISBN Paper" | "Edited Book";
  category: "Books" | "Edited Books" | "Articles" | "Chapters" | "Papers";
  isbn: string;
  publicationDate: string;
  description: string;
  cover: typeof book1;
  featured?: boolean;
  pdfUrl?: string;
  certificateUrl?: string;
};

export const publications: PublicationRecord[] = [
  {
    slug: "multidisciplinary-perspectives-on-learning",
    title: "Multidisciplinary Perspectives on Learning",
    author: "Dr. Priya Kulkarni",
    year: "2026",
    edition: "First Edition",
    publicationType: "Edited Book",
    category: "Edited Books",
    isbn: "978-93-00000-11-1",
    publicationDate: "March 14, 2026",
    description:
      "A curated edited volume featuring research on education, humanities, commerce, and social innovation with ISBN certification and author recognition.",
    cover: book3,
    featured: true,
  },
  {
    slug: "research-methods-for-applied-scholarship",
    title: "Research Methods for Applied Scholarship",
    author: "Prof. Sandesh D. Pahulakr",
    year: "2025",
    edition: "Second Edition",
    publicationType: "Book",
    category: "Books",
    isbn: "978-93-00000-08-1",
    publicationDate: "December 18, 2025",
    description:
      "A practice-oriented academic title designed for students and researchers seeking structured guidance in manuscript preparation and publication readiness.",
    cover: book1,
    featured: true,
  },
  {
    slug: "digital-literacy-and-academic-growth",
    title: "Digital Literacy and Academic Growth",
    author: "Shivprasad D. Pahukar",
    year: "2025",
    edition: "First Edition",
    publicationType: "ISBN Paper",
    category: "Papers",
    isbn: "978-93-00000-06-7",
    publicationDate: "October 6, 2025",
    description:
      "An ISBN paper exploring the impact of digital transformation, publishing access, and online dissemination for modern academic communities.",
    cover: book2,
  },
  {
    slug: "contemporary-voices-in-commerce",
    title: "Contemporary Voices in Commerce",
    author: "Dr. Meera Joshi",
    year: "2024",
    edition: "First Edition",
    publicationType: "Edited Book",
    category: "Edited Books",
    isbn: "978-93-00000-04-3",
    publicationDate: "July 11, 2024",
    description:
      "A multidisciplinary commerce and management volume covering finance, entrepreneurship, human resources, and business analytics.",
    cover: book4,
    featured: true,
  },
  {
    slug: "knowledge-systems-and-community-impact",
    title: "Knowledge Systems and Community Impact",
    author: "Dr. R. Patil",
    year: "2024",
    edition: "First Edition",
    publicationType: "Book",
    category: "Books",
    isbn: "978-93-00000-03-6",
    publicationDate: "February 27, 2024",
    description:
      "A publication focused on research-led community impact models, capacity building, and applied social sciences.",
    cover: book3,
  },
];

export const publicationCategories = ["All", "Books", "Edited Books", "Articles", "Chapters", "Papers"];

export const authorProfiles = [
  {
    name: "Dr. Priya Kulkarni",
    role: "Education Researcher",
    initials: "PK",
    slug: "multidisciplinary-perspectives-on-learning",
  },
  {
    name: "Prof. Sandesh D. Pahulakr",
    role: "Founder & Publishing Mentor",
    initials: "SP",
    slug: "research-methods-for-applied-scholarship",
  },
  {
    name: "Shivprasad D. Pahukar",
    role: "Academic Publishing Strategist",
    initials: "SD",
    slug: "digital-literacy-and-academic-growth",
  },
];

export type ProductRecord = {
  slug: string;
  title: string;
  author: string;
  category: string;
  format: "Ebook" | "Hard Copy" | "Both";
  price: string;
  stock: string;
  isbn: string;
  year: string;
  description: string;
  cover: typeof book1;
  featured?: boolean;
  newArrival?: boolean;
  popular?: boolean;
};

export const storeProducts: ProductRecord[] = [
  {
    slug: "research-methods-for-applied-scholarship",
    title: "Research Methods for Applied Scholarship",
    author: "Prof. Sandesh D. Pahulakr",
    category: "Academic Books",
    format: "Both",
    price: "INR 699",
    stock: "In Stock",
    isbn: "978-93-00000-08-1",
    year: "2025",
    description:
      "Available in secure ebook access and printed format with academic-ready presentation, catalogue visibility, and institutional ordering support.",
    cover: book1,
    featured: true,
    popular: true,
  },
  {
    slug: "multidisciplinary-perspectives-on-learning",
    title: "Multidisciplinary Perspectives on Learning",
    author: "Dr. Priya Kulkarni",
    category: "Edited Volumes",
    format: "Hard Copy",
    price: "INR 849",
    stock: "Low Stock",
    isbn: "978-93-00000-11-1",
    year: "2026",
    description:
      "A collaborative edited volume built for colleges, libraries, and research communities needing quality printed access.",
    cover: book3,
    featured: true,
    newArrival: true,
  },
  {
    slug: "digital-literacy-and-academic-growth",
    title: "Digital Literacy and Academic Growth",
    author: "Shivprasad D. Pahukar",
    category: "Research Books",
    format: "Ebook",
    price: "INR 349",
    stock: "Secure Reader Access",
    isbn: "978-93-00000-06-7",
    year: "2025",
    description:
      "Secure reader delivery with watermarking, no direct download, and authenticated viewing access for academic readers.",
    cover: book2,
    newArrival: true,
  },
  {
    slug: "contemporary-voices-in-commerce",
    title: "Contemporary Voices in Commerce",
    author: "Dr. Meera Joshi",
    category: "General Books",
    format: "Both",
    price: "INR 599",
    stock: "In Stock",
    isbn: "978-93-00000-04-3",
    year: "2024",
    description:
      "A management-focused release available for direct purchase, gifting, classroom use, and digital reference access.",
    cover: book4,
    popular: true,
  },
  {
    slug: "knowledge-systems-and-community-impact",
    title: "Knowledge Systems and Community Impact",
    author: "Dr. R. Patil",
    category: "Featured Titles",
    format: "Hard Copy",
    price: "INR 749",
    stock: "In Stock",
    isbn: "978-93-00000-03-6",
    year: "2024",
    description:
      "A premium printed title for readers looking for community-based research, knowledge systems, and applied social impact references.",
    cover: book3,
    featured: true,
  },
];

export const storeCategories = [
  "All",
  "Academic Books",
  "Research Books",
  "Edited Volumes",
  "General Books",
  "Ebooks",
  "Hard Copy Books",
  "New Arrivals",
  "Featured Titles",
];

export const storeCategoryHighlights = [
  {
    title: "Academic Books",
    description: "Structured titles for colleges, universities, and curriculum-driven readers.",
  },
  {
    title: "Research Books",
    description: "Specialized works built for scholars, reviewers, and knowledge-focused institutions.",
  },
  {
    title: "Edited Volumes",
    description: "Collaborative publications with multi-author credibility and conference-ready relevance.",
  },
  {
    title: "General Books",
    description: "Reader-friendly publications that still benefit from premium presentation and discoverability.",
  },
  {
    title: "Ebooks",
    description: "Secure online viewing with protected-reader access and no-download delivery.",
  },
  {
    title: "Hard Copy Books",
    description: "Printed editions with delivery support, stock visibility, and institutional ordering options.",
  },
  {
    title: "New Arrivals",
    description: "Latest launches surfaced quickly for browsing and repeat visitors.",
  },
  {
    title: "Featured Titles",
    description: "Flagship books selected for trust-building and stronger storefront conversion.",
  },
];

export function getPublicationBySlug(slug: string) {
  return publications.find((publication) => publication.slug === slug);
}

export function getProductBySlug(slug: string) {
  return storeProducts.find((product) => product.slug === slug);
}
