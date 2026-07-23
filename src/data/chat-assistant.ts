export type ChatAssistantTopic = {
  id: string;
  label: string;
  question: string;
  service: string;
  keywords: string[];
  answer: string;
  leadPrompt: string;
  cta?: {
    label: string;
    href: string;
  };
};

export const chatAssistantWelcome = [
  "Hi! I'm the Eagle Leap publishing assistant.",
  "Ask me about ISBN support, publishing packages, printing, marketplace listing, or paper submission and I will point you in the right direction.",
] as const;

export const chatAssistantTopics: ChatAssistantTopic[] = [
  {
    id: "publisher-fit",
    label: "Choose a publisher",
    question: "How do I choose the right publisher?",
    service: "Book Publishing",
    keywords: ["publisher", "publishing partner", "choose publisher", "right publisher", "book publishing"],
    answer:
      "The right publisher should be clear about editing, cover design, ISBN support, production quality, timelines, distribution, and royalties. At Eagle Leap, we guide authors end to end so you can compare packages with clarity before you commit.",
    leadPrompt: "I want help choosing the right publishing package for my book.",
    cta: {
      label: "Explore packages",
      href: "/packages",
    },
  },
  {
    id: "pricing",
    label: "Editing and design cost",
    question: "What will be the cost of editing and cover design?",
    service: "Publishing Packages",
    keywords: ["cost", "price", "pricing", "package", "editing", "cover design", "budget"],
    answer:
      "Editing and cover design costs depend on your manuscript length, service depth, and production goals. The quickest way to estimate it is to share your manuscript stage and page count, then we can suggest the best package without overcommitting you.",
    leadPrompt: "I need a publishing cost estimate for editing, cover design, and production.",
    cta: {
      label: "View package options",
      href: "/packages",
    },
  },
  {
    id: "marketplaces",
    label: "Sell on Amazon",
    question: "How will my book be sold on Amazon and Flipkart?",
    service: "Distribution Support",
    keywords: ["amazon", "flipkart", "sell book", "marketplace", "distribution", "listing"],
    answer:
      "We help prepare the essentials needed for marketplace listing, including metadata, cover-ready files, pricing guidance, and publication details. That makes it easier to move your book from production into online discovery and sales channels.",
    leadPrompt: "I want help listing my book on Amazon and Flipkart after publishing.",
    cta: {
      label: "Start publishing",
      href: "/publish-my-book",
    },
  },
  {
    id: "isbn",
    label: "ISBN guidance",
    question: "How do I get an ISBN number?",
    service: "ISBN Support",
    keywords: ["isbn", "barcode", "registration", "book number"],
    answer:
      "ISBN is one of the key pieces of book setup, and we can guide you through the registration and documentation path as part of the publishing process. If you're preparing your first title, we can also explain when ISBN, barcode, and interior files are needed.",
    leadPrompt: "I need ISBN guidance for my book project.",
    cta: {
      label: "Publish my book",
      href: "/publish-my-book",
    },
  },
  {
    id: "marketing",
    label: "Marketing support",
    question: "Who will handle marketing and promotion?",
    service: "Marketing Guidance",
    keywords: ["marketing", "promotion", "promote book", "launch", "advertising"],
    answer:
      "Marketing works best when it starts early. We can guide you on launch positioning, reader-facing assets, platform readiness, and practical promotional next steps so your book is not left without a visibility plan after publishing.",
    leadPrompt: "I want help with marketing and promotion planning for my book.",
    cta: {
      label: "Talk to our team",
      href: "/contact",
    },
  },
  {
    id: "printing",
    label: "Printing support",
    question: "Can you help with book or bulk printing only?",
    service: "Printing Services",
    keywords: ["printing", "print", "bulk print", "hardcopy", "paperback", "hardcover"],
    answer:
      "Yes. If you only need printing, we can help with book printing as well as institutional or bulk print requirements. Share your quantity, trim size, binding preference, and timeline, and we can guide you to the right printing path.",
    leadPrompt: "I need a printing quote for my book or bulk print project.",
    cta: {
      label: "Open printing page",
      href: "/printing",
    },
  },
  {
    id: "paper-submission",
    label: "Submit a paper",
    question: "How do I submit a paper or chapter?",
    service: "Paper Submission",
    keywords: ["paper", "journal", "chapter", "submit paper", "call for paper", "research"],
    answer:
      "You can submit a paper or chapter through our guided call-for-paper flow. If you are unsure about the format or subject area, our team can help you pick the correct submission route before you upload anything.",
    leadPrompt: "I want help submitting a paper or chapter through Eagle Leap.",
    cta: {
      label: "Go to paper submission",
      href: "/call-for-paper#paper-submission-form",
    },
  },
];

export const chatAssistantFallback = {
  answer:
    "I can help with book publishing, ISBN guidance, pricing, printing, Amazon listing, marketing support, and paper submission. If your requirement is a little different, share a few details and our team will take it from there.",
  leadPrompt: "I need help with a custom publishing requirement.",
  cta: {
    label: "Contact Eagle Leap",
    href: "/contact",
  },
} as const;
