const pexels = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1600`;

export const trustItems = [
  "ISBN Registered",
  "Amazon & Flipkart Listing",
  "100+ Authors",
  "Academic Publishing Experts",
];

export const siteMetrics = [
  { value: "500+", label: "Books, papers, and academic projects supported" },
  { value: "100+", label: "Authors, institutions, and research contributors served" },
  { value: "23+", label: "Years of printing and production backbone" },
  { value: "30%", label: "Distributor-ready commerce margin structure" },
];

export const homeHeroSlides = [
  {
    id: "publishing",
    badge: "Academic Publishing + Research + Printing",
    title: ["Publish Smarter.", "Grow Faster.", "Reach Wider."],
    accentLine: 1,
    description:
      "Transform your ideas into professionally published books, research papers, and academic works with complete support from manuscript to marketplace.",
    background: "/banners/home-hero-publishing.svg",
    primaryLabel: "Start Publishing",
    primaryHref: "/publish-my-book",
    secondaryLabel: "Submit Paper",
    secondaryHref: "/call-for-paper",
    panelEyebrow: "Publishing Command Center",
    panelTitle: "Professional support for books, papers, and academic publishing journeys.",
    panelItems: [
      { value: "500+", label: "Books, papers, and academic projects supported" },
      { value: "100+", label: "Authors, institutions, and research contributors served" },
      { value: "23+", label: "Years of printing and production backbone" },
      { value: "30%", label: "Distributor-ready commerce margin structure" },
    ],
  },
  {
    id: "research",
    badge: "Call for Paper + Journal + Research Visibility",
    title: ["Submit Stronger.", "Get Reviewed.", "Get Published."],
    accentLine: 1,
    description:
      "Share your paper, article, or chapter through structured ISBN and journal workflows with guided submission, faster review coordination, and author recognition.",
    background: "/banners/home-hero-research.svg",
    primaryLabel: "Submit Paper",
    primaryHref: "/call-for-paper",
    secondaryLabel: "Visit Journal",
    secondaryHref: "/journal",
    panelEyebrow: "Research Workflow",
    panelTitle: "A cleaner path from paper submission to publication visibility.",
    panelItems: [
      { value: "ISBN", label: "Edited volume publication support" },
      { value: "ISSN", label: "Journal-led trust and discoverability" },
      { value: "Fast", label: "Submission screening and review routing" },
      { value: "Proof", label: "Certificate and PDF delivery ready" },
    ],
  },
  {
    id: "printing-store",
    badge: "Printing + Store + Distribution + Bulk Orders",
    title: ["Print Better.", "Launch Faster.", "Sell Wider."],
    accentLine: 2,
    description:
      "Combine institutional printing, ecommerce-ready listings, secure ebook access, and distributor workflows inside one connected publishing ecosystem.",
    background: "/banners/home-hero-commerce.svg",
    primaryLabel: "Explore Printing",
    primaryHref: "/printing",
    secondaryLabel: "Visit Store",
    secondaryHref: "/store",
    panelEyebrow: "Commerce + Production",
    panelTitle: "Built for bulk printing, secure readers, and store-ready catalogue growth.",
    panelItems: [
      { value: "42", label: "Available titles for buyer and distributor discovery" },
      { value: "Bulk", label: "Institution and event printing quote flow" },
      { value: "Secure", label: "Protected ebook access for digital readers" },
      { value: "30%", label: "Distributor-ready margin support" },
    ],
  },
] as const;

export const ecosystemHighlights = [
  "Publishing, printing, store, and journal flows in one ecosystem",
  "Structured support from manuscript intake to final distribution",
  "Academic-first presentation with premium corporate credibility",
  "Role-based access for buyers, authors, distributors, and admins",
];

export const serviceCards = [
  {
    title: "Book Publishing",
    description: "End-to-end support from manuscript to published book with structured guidance at every stage.",
  },
  {
    title: "ISBN Paper / Chapter Publication",
    description: "Publish your research work in ISBN-based edited volumes with author recognition and certification.",
  },
  {
    title: "Printing Services",
    description: "Professional printing for institutions, authors, academic books, magazines, certificates, and event materials.",
  },
  {
    title: "Distribution & Listing",
    description: "Get your titles listed on major platforms with print-ready and reader-ready packaging.",
  },
];

export const publishingProcess = [
  "Submit Your Manuscript",
  "Review & ISBN Allocation",
  "Design & Formatting",
  "Printing & Publication",
  "Distribution & Delivery",
];

export const currentCallForPaper = {
  title: "Emerging Trends in Multidisciplinary Research 2026",
  submissionDeadline: "May 30, 2026",
  publicationDate: "June 20, 2026",
  publicationFee: "INR 1,499",
  mode: "Online Publication / ISBN Edited Book",
};

export const testimonials = [
  {
    name: "Anil Deshmukh",
    designation: "Author",
    review: "Smooth publishing process and great support from manuscript consultation to listing.",
  },
  {
    name: "Dr. Priya Kulkarni",
    designation: "Academic Contributor",
    review: "Highly professional and quick service, especially for edited book publication and author coordination.",
  },
  {
    name: "Rohit Sharma",
    designation: "Institutional Client",
    review: "Printing quality, delivery coordination, and communication were excellent throughout the project.",
  },
];

export const packageSupportPoints = [
  "Clear scope before project start so authors understand exactly what is included",
  "Professional design, formatting, and marketplace-readiness support",
  "Admin-manageable package matrix ready for future Google Sheet or CMS sync",
  "A consultation-led process designed to improve conversion and reduce confusion",
];

export const printingClients = [
  "Colleges & Universities",
  "Schools & Educational Institutes",
  "Coaching Classes",
  "Event Organizers",
];

export const paperBenefits = [
  "ISBN-based Publication",
  "Certificate of Publication",
  "PDF of Published Work",
  "Author Listing",
  "Fast Publication Process",
];

export const paperGuidelines = [
  "Submit an original manuscript in Word or PDF format with author details and subject area clearly mentioned.",
  "Ensure the title page includes paper title, author name, affiliation, email, and mobile number.",
  "Use clear citations, references, and a structured abstract aligned with your discipline.",
  "Final publication confirmation is shared after review and fee confirmation.",
];

export const paperFaqs = [
  {
    question: "How often can the running title be updated?",
    answer: "The current call for paper card is designed as a dynamic block so the title, fee, deadline, and brochure link can be updated monthly.",
  },
  {
    question: "Will authors receive a certificate?",
    answer: "Yes. The workflow supports certificate access along with published PDF visibility from the publication detail flow.",
  },
  {
    question: "Can institutions submit multiple papers together?",
    answer: "Yes. The form layout and future API design allow individual or grouped submissions for institutions and coordinators.",
  },
];

export const journalInfo = {
  name: "BODHIVRUKSHA JOURNAL OF DIVERSE DISCIPLINE",
  issn: "3139-1486",
  description:
    "A peer-reviewed, open-access, multidisciplinary journal providing a platform for researchers and academicians across diverse disciplines.",
  type: "Peer-Reviewed | Open Access | Multidisciplinary",
  features: [
    "Peer-Reviewed Process",
    "Open Access Publication",
    "Multidisciplinary Coverage",
    "Academic Research Focus",
    "ISSN Registered Journal",
  ],
};

export const upcomingJournals = [
  {
    name: "ARTHAVRUKSHA",
    focus: "Commerce, Finance & Management",
    status: "Coming Soon",
  },
  {
    name: "SHODHAVRUKSHA",
    focus: "Science, Innovation & Applied Technology",
    status: "Coming Soon",
  },
  {
    name: "SAHITYAVRUKSHA",
    focus: "Arts, Humanities & Language Studies",
    status: "Coming Soon",
  },
];

export const blogPosts = [
  {
    slug: "how-isbn-publication-helps-first-time-authors",
    title: "How ISBN Publication Helps First-Time Authors Build Credibility",
    excerpt:
      "A practical guide to ISBN-ready publishing, platform trust, and what authors should prepare before starting.",
    category: "Publishing Tips",
    publishDate: "April 12, 2026",
  },
  {
    slug: "submitting-better-multidisciplinary-research-papers",
    title: "Submitting Better Multidisciplinary Research Papers",
    excerpt:
      "Key structure, formatting, and review-readiness practices for edited volumes and academic collections.",
    category: "Research",
    publishDate: "March 28, 2026",
  },
  {
    slug: "institutional-printing-checklist-for-colleges",
    title: "Institutional Printing Checklist for Colleges and Universities",
    excerpt:
      "How to streamline ID cards, magazines, practical books, and certificate production with fewer errors and faster delivery.",
    category: "Printing",
    publishDate: "March 7, 2026",
  },
];

export const founderProfiles = [
  {
    name: "Sandesh D. Pahulakr",
    bio: "A visionary publishing professional committed to building a stronger academic publishing ecosystem through reliable ISBN and ISSN-led services for authors, researchers, and institutions.",
  },
  {
    name: "Shivprasad D. Pahukar",
    bio: "A digital publishing strategist focused on combining production quality, structured workflows, and dependable support for modern scholarly publishing.",
  },
];

export const contactResponsePoints = [
  "Dedicated support for publishing, printing, store, and research submission enquiries",
  "Structured lead capture designed for CRM, email, and WhatsApp follow-up",
  "Clear response path for authors, institutions, buyers, and distributors",
  "Corporate presentation that builds confidence from the first interaction",
];

export const buyerDashboard = {
  cards: [
    { label: "Orders", value: "06" },
    { label: "Invoices", value: "06" },
    { label: "Wishlist", value: "12" },
    { label: "Saved Addresses", value: "03" },
  ],
};

export const authorDashboard = {
  cards: [
    { label: "Published Titles", value: "04" },
    { label: "Pending Manuscripts", value: "02" },
    { label: "Certificates", value: "04" },
    { label: "Royalty Statements", value: "03" },
  ],
};

export const distributorDashboard = {
  cards: [
    { label: "Available Titles", value: "42" },
    { label: "Active Orders", value: "08" },
    { label: "Margin Level", value: "30%" },
    { label: "Bulk Quotes", value: "05" },
  ],
};

export const heroImages = {
  homeHero: pexels(31390421),
  homeEditorial: "/images/cd6fc9e5013ac7337d4634790f99bfa9.jpg",
  homeShowcase: "/images/7d881d0fec2c47fe6d052e42bcdc3e0e.jpg",
  homeResearch: "/images/3b0e82e82d74274a76cf9546f4fc0736.jpg",
  homePrinting: "/images/8b9b10edfe90c146d598b560cda5a513.jpg",
  aboutHero: pexels(5673481),
  aboutFeature: "/images/1958211c5f6bf6adc375a43a1787109b.jpg",
  printingHero: pexels(4880048),
  printingFeature: "/images/fa4c94f43a924c0acb9484b49a9c0589.jpg",
  storeHero: pexels(8460453),
  storeFeature: "/images/1524ab846b5143283713d6592d75ea32.jpg",
  packagesHero: pexels(5257454),
  packagesFeature: "/images/cd6fc9e5013ac7337d4634790f99bfa9.jpg",
  journalHero: pexels(31376345),
  journalFeature: "/images/72eb690fee6a7d05aa6c971c17186551.jpg",
  contactHero: pexels(5945799),
  contactSupport: "/images/1524ab846b5143283713d6592d75ea32.jpg",
  publishJourney: "/images/1958211c5f6bf6adc375a43a1787109b.jpg",
};

export function getBlogBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
