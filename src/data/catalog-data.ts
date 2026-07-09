export type PublicationRecord = {
  id: string;
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
  cover: string;
  featured?: boolean;
  pdfUrl?: string;
  certificateUrl?: string;
};

export const publications: PublicationRecord[] = [
  {
    id: "publication-1",
    slug: "banking-and-insurance-service",
    title: "Banking and Insurance Service",
    author: "Dr. Nandkishor N. Dhondge, Prof. Pooja P. Ghulaxe, Prof. Apeksha G. Dubey, Prof. Vishakha V. Patil",
    year: "2026",
    edition: "First Edition",
    publicationType: "Book",
    category: "Books",
    isbn: "978-81-996327-5-2",
    publicationDate: "2026",
    description:
      "A Sant Gadge Baba Amravati University NEP 2020 commerce textbook for M.Com first year semester I, focused on banking and insurance services.",
    cover: "asset:book-1",
    featured: true,
  },
  {
    id: "publication-2",
    slug: "the-war-over-words",
    title: "The War Over Words",
    author: "Ms. Sneha Kulkarni",
    year: "2026",
    edition: "First Edition",
    publicationType: "Book",
    category: "Books",
    isbn: "978-81-995652-9-6",
    publicationDate: "2026",
    description:
      "A strategic studies title on terrorism, definition, conflict, and the power of public language.",
    cover: "asset:book-2",
    featured: true,
  },
  {
    id: "publication-3",
    slug: "dynamics-of-management-ii",
    title: "Dynamics of Management - II",
    author: "Dr. Bhushan S. Mangte, Dr. Komal A. Ghuma, Dr. Pavan D. Sharma",
    year: "2026",
    edition: "First Edition",
    publicationType: "Book",
    category: "Books",
    isbn: "978-81-997077-2-6",
    publicationDate: "2026",
    description:
      "A B.Com NEP management textbook covering management dynamics, organization, leadership, and business practice.",
    cover: "asset:book-3",
    featured: true,
  },
  {
    id: "publication-4",
    slug: "manures-and-organic-farming",
    title: "Manures and Organic Farming",
    author: "Dr. V.S. Pawar",
    year: "2026",
    edition: "First Edition",
    publicationType: "Book",
    category: "Books",
    isbn: "978-81-998524-4-0",
    publicationDate: "2026",
    description:
      "A practical agriculture title prepared for B.Sc. and B.Sc. Agriculture students, covering organic farming and manure practices.",
    cover: "asset:book-4",
    featured: true,
  },
  {
    id: "publication-5",
    slug: "basics-of-electrical-and-electronics-engineering",
    title: "Basics of Electrical and Electronics Engineering",
    author: "Prof. Rohan Pradeep Shinde",
    year: "2026",
    edition: "First Edition",
    publicationType: "Book",
    category: "Books",
    isbn: "978-81-685708-2-5",
    publicationDate: "2026",
    description:
      "An introductory engineering book covering core electrical and electronics engineering foundations for technical learners.",
    cover: "asset:book-5",
    featured: true,
  },
  {
    id: "publication-6",
    slug: "fundamentals-of-financial-accounting",
    title: "Fundamentals of Financial Accounting",
    author: "Dr. Yogesh Laxmanrao Patinge",
    year: "2026",
    edition: "First Edition",
    publicationType: "Book",
    category: "Books",
    isbn: "978-81-994421-4-6",
    publicationDate: "2026",
    description:
      "A practical accounting book focused on financial statements, bookkeeping, and classroom-ready commerce fundamentals.",
    cover: "asset:book-6",
    featured: true,
  },
  {
    id: "publication-7",
    slug: "the-meaning-we-withhold",
    title: "The Meaning We Withhold: Terrorism, Crisis, and the Cost of Ambiguity",
    author: "Ms. Sneha Vilas Kulkarni",
    year: "2026",
    edition: "First Edition",
    publicationType: "Book",
    category: "Books",
    isbn: "978-81-686297-4-5",
    publicationDate: "2026",
    description:
      "A strategic studies title examining terrorism, extremism, crisis communication, and the human cost of ambiguity.",
    cover: "asset:book-7",
    featured: true,
  },
];

export const publicationCategories = ["All", "Books", "Edited Books", "Articles", "Chapters", "Papers"];

export const authorProfiles = [
  {
    name: "Dr. Nandkishor N. Dhondge",
    role: "Commerce Author",
    initials: "ND",
    slug: "banking-and-insurance-service",
  },
  {
    name: "Ms. Sneha Kulkarni",
    role: "Strategic Studies Author",
    initials: "SK",
    slug: "the-war-over-words",
  },
  {
    name: "Dr. V.S. Pawar",
    role: "Agriculture Author",
    initials: "VP",
    slug: "manures-and-organic-farming",
  },
];

export type ProductRecord = {
  id: string;
  slug: string;
  title: string;
  author: string;
  category: string;
  format: "Ebook" | "Hard Copy" | "Both";
  price: string;
  offerPrice?: string;
  stock: string;
  isbn: string;
  year: string;
  description: string;
  cover: string;
  featured?: boolean;
  newArrival?: boolean;
  popular?: boolean;
  status?: "draft" | "active" | "out_of_stock" | "archived";
};

export const storeProducts: ProductRecord[] = [
  {
    id: "product-1",
    slug: "banking-and-insurance-service",
    title: "Banking and Insurance Service",
    author: "Dr. Nandkishor N. Dhondge, Prof. Pooja P. Ghulaxe, Prof. Apeksha G. Dubey, Prof. Vishakha V. Patil",
    category: "Commerce",
    format: "Hard Copy",
    price: "Contact for Price",
    stock: "In Stock",
    isbn: "978-81-996327-5-2",
    year: "2026",
    description:
      "A Sant Gadge Baba Amravati University NEP 2020 commerce textbook for M.Com first year semester I, focused on banking and insurance services.",
    cover: "asset:book-1",
    featured: true,
    popular: true,
  },
  {
    id: "product-2",
    slug: "the-war-over-words",
    title: "The War Over Words",
    author: "Ms. Sneha Kulkarni",
    category: "Strategic Studies",
    format: "Hard Copy",
    price: "Contact for Price",
    stock: "In Stock",
    isbn: "978-81-995652-9-6",
    year: "2026",
    description:
      "A strategic studies title on terrorism, definition, conflict, and the power of public language.",
    cover: "asset:book-2",
    featured: true,
    newArrival: true,
  },
  {
    id: "product-3",
    slug: "dynamics-of-management-ii",
    title: "Dynamics of Management - II",
    author: "Dr. Bhushan S. Mangte, Dr. Komal A. Ghuma, Dr. Pavan D. Sharma",
    category: "Management",
    format: "Hard Copy",
    price: "INR 250",
    stock: "In Stock",
    isbn: "978-81-997077-2-6",
    year: "2026",
    description:
      "A B.Com NEP management textbook covering management dynamics, organization, leadership, and business practice.",
    cover: "asset:book-3",
    featured: true,
    newArrival: true,
  },
  {
    id: "product-4",
    slug: "manures-and-organic-farming",
    title: "Manures and Organic Farming",
    author: "Dr. V.S. Pawar",
    category: "Agriculture",
    format: "Hard Copy",
    price: "INR 250",
    stock: "In Stock",
    isbn: "978-81-998524-4-0",
    year: "2026",
    description:
      "A practical agriculture title prepared for B.Sc. and B.Sc. Agriculture students, covering organic farming and manure practices.",
    cover: "asset:book-4",
    featured: true,
    popular: true,
  },
  {
    id: "product-5",
    slug: "basics-of-electrical-and-electronics-engineering",
    title: "Basics of Electrical and Electronics Engineering",
    author: "Prof. Rohan Pradeep Shinde",
    category: "Engineering",
    format: "Hard Copy",
    price: "INR 499",
    stock: "In Stock",
    isbn: "978-81-685708-2-5",
    year: "2026",
    description:
      "An introductory engineering book covering core electrical and electronics engineering foundations for technical learners.",
    cover: "asset:book-5",
    featured: true,
    popular: true,
  },
  {
    id: "product-6",
    slug: "fundamentals-of-financial-accounting",
    title: "Fundamentals of Financial Accounting",
    author: "Dr. Yogesh Laxmanrao Patinge",
    category: "Accounting",
    format: "Hard Copy",
    price: "INR 400",
    stock: "In Stock",
    isbn: "978-81-994421-4-6",
    year: "2026",
    description:
      "A practical accounting title covering financial records, statements, and classroom-ready concepts for commerce learners.",
    cover: "asset:book-6",
    featured: true,
    popular: true,
  },
  {
    id: "product-7",
    slug: "the-meaning-we-withhold",
    title: "The Meaning We Withhold: Terrorism, Crisis, and the Cost of Ambiguity",
    author: "Ms. Sneha Vilas Kulkarni",
    category: "Strategic Studies",
    format: "Hard Copy",
    price: "Contact for Price",
    stock: "In Stock",
    isbn: "978-81-686297-4-5",
    year: "2026",
    description:
      "A strategic studies title examining terrorism, crisis, extremism, and the cost of ambiguity in public discourse.",
    cover: "asset:book-7",
    featured: true,
    newArrival: true,
  },
];

export const storeCategories = [
  "All",
  "Commerce",
  "Strategic Studies",
  "Management",
  "Agriculture",
  "Engineering",
  "Accounting",
  "Hard Copy Books",
  "New Arrivals",
  "Featured Titles",
];

export const storeCategoryHighlights = [
  {
    title: "Commerce",
    description: "Curriculum-ready commerce titles for university and postgraduate learners.",
  },
  {
    title: "Strategic Studies",
    description: "Focused books on terrorism, crisis, ambiguity, and public discourse.",
  },
  {
    title: "Management",
    description: "Management textbooks for business, organization, and leadership study.",
  },
  {
    title: "Agriculture",
    description: "Practical titles for organic farming, manures, and agriculture students.",
  },
  {
    title: "Engineering",
    description: "Technical foundations for electrical and electronics engineering learners.",
  },
  {
    title: "Accounting",
    description: "Accounting titles covering records, statements, and finance fundamentals.",
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
