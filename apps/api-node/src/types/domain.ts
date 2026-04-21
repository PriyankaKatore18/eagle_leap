export type UserRole =
  | "super-admin"
  | "content-manager"
  | "store-manager"
  | "publication-manager"
  | "accounts-admin-support"
  | "admin"
  | "sub-admin"
  | "buyer"
  | "author"
  | "distributor";

export type UserStatus = "active" | "pending" | "disabled";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  passwordHash: string;
  status: UserStatus;
  businessName?: string;
  discountLevel?: number;
  createdAt: string;
  updatedAt: string;
}

export interface PublishRequestRecord {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  bookTitle: string;
  numberOfPages: number;
  language?: string;
  bookType: string;
  selectedPackage: string;
  message?: string;
  manuscriptFile?: string;
  status: "new" | "contacted" | "in-discussion" | "payment-pending" | "in-process" | "completed";
  createdAt: string;
  updatedAt: string;
}

export interface PrintingEnquiryRecord {
  id: string;
  name: string;
  organization?: string;
  mobile: string;
  serviceType: string;
  quantity: number;
  message?: string;
  attachmentFile?: string;
  status: "new" | "quoted" | "approved" | "in-production" | "delivered";
  createdAt: string;
  updatedAt: string;
}

export interface CallForPaperRecord {
  id: string;
  title: string;
  submissionDeadline: string;
  publicationDate: string;
  fee: number;
  type: "ISBN" | "ISSN";
  mode: string;
  brochureUrl?: string;
  status: "active" | "closed";
  createdAt: string;
  updatedAt: string;
}

export interface PaperSubmissionRecord {
  id: string;
  callForPaperId: string;
  authorName: string;
  paperTitle: string;
  email: string;
  mobile: string;
  subjectArea: string;
  message?: string;
  uploadedFile?: string;
  paymentStatus: "pending" | "paid";
  publicationStatus: "submitted" | "under-review" | "accepted" | "rejected" | "payment-pending" | "published";
  createdAt: string;
  updatedAt: string;
}

export interface PublicationRecord {
  id: string;
  slug: string;
  title: string;
  authorName: string;
  publicationType: "Book" | "ISBN Paper" | "Edited Book";
  category: "Books" | "Edited Books" | "Articles" | "Chapters" | "Papers";
  isbn: string;
  publicationDate: string;
  description: string;
  coverImage?: string;
  pdfFile?: string;
  certificateFile?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JournalRecord {
  id: string;
  name: string;
  issn: string;
  description: string;
  type: string;
  websiteUrl?: string;
  currentIssueUrl?: string;
  coverImage?: string;
  status: "active" | "coming-soon";
  createdAt: string;
  updatedAt: string;
}

export interface ProductRecord {
  id: string;
  slug: string;
  title: string;
  authorName: string;
  category: string;
  format: "Ebook" | "Hard Copy" | "Both";
  price: number;
  description: string;
  coverImage?: string;
  isbn?: string;
  stock: number;
  featured: boolean;
  newArrival: boolean;
  popular: boolean;
  ebookFile?: string;
  viewerAccessEnabled: boolean;
  watermarkEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderRecord {
  id: string;
  customerId: string;
  productId: string;
  quantity: number;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  shippingStatus: "new-order" | "processing" | "packed" | "shipped" | "delivered" | "cancelled";
  address: string;
  trackingId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogRecord {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  seoTitle: string;
  metaDescription: string;
  featuredImage?: string;
  publishDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface TestimonialRecord {
  id: string;
  authorName: string;
  designation: string;
  reviewText: string;
  photo?: string;
  rating: number;
  placements: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ContactRecord {
  id: string;
  source: "contact" | "publish-my-book" | "call-for-paper" | "printing";
  name: string;
  email?: string;
  mobile?: string;
  subject?: string;
  message?: string;
  status: "new" | "contacted" | "closed";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MediaRecord {
  id: string;
  name: string;
  url: string;
  mimeType: string;
  folder: string;
  size: number;
  createdAt: string;
}

export interface CmsPageRecord {
  slug: string;
  title: string;
  heroTitle: string;
  heroSubtitle: string;
  sections: Array<{ heading: string; body: string }>;
  seoTitle: string;
  metaDescription: string;
  updatedAt: string;
}

export interface NotificationRecord {
  id: string;
  title: string;
  message: string;
  channel: "dashboard" | "email" | "whatsapp";
  createdAt: string;
}

export interface ActivityRecord {
  id: string;
  message: string;
  createdAt: string;
}
