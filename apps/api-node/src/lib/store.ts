import bcrypt from "bcryptjs";

import type {
  ActivityRecord,
  BlogRecord,
  CallForPaperRecord,
  CmsPageRecord,
  ContactRecord,
  JournalRecord,
  MediaRecord,
  NotificationRecord,
  OrderRecord,
  PaperSubmissionRecord,
  PrintingEnquiryRecord,
  ProductRecord,
  PublicationRecord,
  PublishRequestRecord,
  TestimonialRecord,
  UserRecord
} from "../types/domain.js";
import { createId, now } from "./utils.js";

const adminPassword = bcrypt.hashSync("admin123", 10);
const buyerPassword = bcrypt.hashSync("buyer123", 10);
const authorPassword = bcrypt.hashSync("author123", 10);
const distributorPassword = bcrypt.hashSync("distributor123", 10);

export const db = {
  users: [
    {
      id: "user_admin_1",
      name: "Super Admin",
      email: "admin@eagleleap.in",
      phone: "+91 98765 43210",
      role: "super-admin",
      passwordHash: adminPassword,
      status: "active",
      createdAt: now(),
      updatedAt: now()
    },
    {
      id: "user_author_1",
      name: "Dr. Priya Kulkarni",
      email: "author@eagleleap.in",
      phone: "+91 98989 11111",
      role: "author",
      passwordHash: authorPassword,
      status: "active",
      createdAt: now(),
      updatedAt: now()
    },
    {
      id: "user_buyer_1",
      name: "Rohan Joshi",
      email: "buyer@eagleleap.in",
      phone: "+91 98888 22222",
      role: "buyer",
      passwordHash: buyerPassword,
      status: "active",
      createdAt: now(),
      updatedAt: now()
    },
    {
      id: "user_distributor_1",
      name: "Campus Distribution Hub",
      email: "distributor@eagleleap.in",
      phone: "+91 97777 33333",
      role: "distributor",
      passwordHash: distributorPassword,
      status: "active",
      businessName: "Campus Distribution Hub",
      discountLevel: 30,
      createdAt: now(),
      updatedAt: now()
    }
  ] as UserRecord[],
  publishRequests: [
    {
      id: "publish_1",
      fullName: "Sandesh Kulkarni",
      mobile: "+91 90111 22222",
      email: "sandesh@example.com",
      bookTitle: "Modern Academic Publishing",
      numberOfPages: 164,
      language: "English",
      bookType: "Academic",
      selectedPackage: "Academic Plus",
      message: "Need ISBN and listing support.",
      manuscriptFile: "/uploads/sample-manuscript.pdf",
      status: "contacted",
      createdAt: now(),
      updatedAt: now()
    }
  ] as PublishRequestRecord[],
  printingEnquiries: [
    {
      id: "print_1",
      name: "Pragati College",
      organization: "Pragati College",
      mobile: "+91 90000 11111",
      serviceType: "College Magazine Printing",
      quantity: 600,
      message: "Annual magazine with premium finish.",
      status: "quoted",
      createdAt: now(),
      updatedAt: now()
    }
  ] as PrintingEnquiryRecord[],
  callForPapers: [
    {
      id: "cfp_1",
      title: "Emerging Trends in Multidisciplinary Research 2026",
      submissionDeadline: "2026-05-30",
      publicationDate: "2026-06-20",
      fee: 1499,
      type: "ISBN",
      mode: "Online Publication / ISBN Edited Book",
      brochureUrl: "/documents/call-for-paper-brochure.pdf",
      status: "active",
      createdAt: now(),
      updatedAt: now()
    }
  ] as CallForPaperRecord[],
  paperSubmissions: [
    {
      id: "paper_1",
      callForPaperId: "cfp_1",
      authorName: "Dr. Neha Patil",
      paperTitle: "Digital Learning Models in Higher Education",
      email: "neha@example.com",
      mobile: "+91 96666 44444",
      subjectArea: "Education",
      paymentStatus: "paid",
      publicationStatus: "under-review",
      createdAt: now(),
      updatedAt: now()
    }
  ] as PaperSubmissionRecord[],
  publications: [
    {
      id: "pub_1",
      slug: "multidisciplinary-perspectives-on-learning",
      title: "Multidisciplinary Perspectives on Learning",
      authorName: "Dr. Priya Kulkarni",
      publicationType: "Edited Book",
      category: "Edited Books",
      isbn: "978-93-00000-11-1",
      publicationDate: "2026-03-14",
      description: "A curated edited volume featuring interdisciplinary research.",
      coverImage: "/uploads/publications/cover-1.jpg",
      pdfFile: "/uploads/publications/book-1.pdf",
      certificateFile: "/uploads/publications/certificate-1.pdf",
      featured: true,
      createdAt: now(),
      updatedAt: now()
    }
  ] as PublicationRecord[],
  journals: [
    {
      id: "journal_1",
      name: "BODHIVRUKSHA JOURNAL OF DIVERSE DISCIPLINE",
      issn: "3139-1486",
      description: "Peer-reviewed, open access, multidisciplinary scholarly journal.",
      type: "Peer-Reviewed | Open Access | Multidisciplinary",
      websiteUrl: "https://journal.example.com",
      currentIssueUrl: "https://journal.example.com/current-issue",
      status: "active",
      createdAt: now(),
      updatedAt: now()
    },
    {
      id: "journal_2",
      name: "ARTHAVRUKSHA",
      issn: "COMING-SOON",
      description: "Journal of Commerce, Business & Management",
      type: "Commerce, Finance & Management",
      status: "coming-soon",
      createdAt: now(),
      updatedAt: now()
    }
  ] as JournalRecord[],
  products: [
    {
      id: "product_1",
      slug: "research-methods-for-applied-scholarship",
      title: "Research Methods for Applied Scholarship",
      authorName: "Prof. Sandesh D. Pahulakr",
      category: "Academic Books",
      format: "Both",
      price: 699,
      description: "Printed and secure ebook format with academic-ready presentation.",
      isbn: "978-93-00000-08-1",
      stock: 28,
      featured: true,
      newArrival: false,
      popular: true,
      viewerAccessEnabled: true,
      watermarkEnabled: true,
      createdAt: now(),
      updatedAt: now()
    }
  ] as ProductRecord[],
  orders: [
    {
      id: "order_1",
      customerId: "user_buyer_1",
      productId: "product_1",
      quantity: 2,
      paymentStatus: "paid",
      shippingStatus: "shipped",
      address: "Pune, Maharashtra",
      trackingId: "ELP-TRACK-1001",
      createdAt: now(),
      updatedAt: now()
    }
  ] as OrderRecord[],
  blogs: [
    {
      id: "blog_1",
      title: "How ISBN Publication Helps First-Time Authors",
      slug: "how-isbn-publication-helps-first-time-authors",
      content: "A practical guide to ISBN publishing and trust-building for first-time authors.",
      category: "Publishing Tips",
      seoTitle: "ISBN Publication Guide for First-Time Authors",
      metaDescription: "ISBN publishing checklist and benefits for first-time authors.",
      publishDate: "2026-04-12",
      createdAt: now(),
      updatedAt: now()
    }
  ] as BlogRecord[],
  testimonials: [
    {
      id: "test_1",
      authorName: "Anil Deshmukh",
      designation: "Author",
      reviewText: "Smooth publishing process and great support.",
      rating: 5,
      placements: ["home", "about"],
      createdAt: now(),
      updatedAt: now()
    }
  ] as TestimonialRecord[],
  contacts: [
    {
      id: "lead_1",
      source: "contact",
      name: "Ritika Shah",
      email: "ritika@example.com",
      mobile: "+91 95555 11111",
      subject: "Book publishing enquiry",
      message: "Need help with an academic title.",
      status: "new",
      createdAt: now(),
      updatedAt: now()
    }
  ] as ContactRecord[],
  media: [] as MediaRecord[],
  cmsPages: [
    {
      slug: "home",
      title: "Home",
      heroTitle: "Publish Smarter. Grow Faster. Reach Wider.",
      heroSubtitle: "Transform your ideas into professionally published books, research papers, and academic works.",
      sections: [
        {
          heading: "Current Call for Paper",
          body: "Dynamic home page section connected to active call for paper records."
        }
      ],
      seoTitle: "Eagle Leap Publication Home",
      metaDescription: "Publishing, printing, journal, store, and contact ecosystem.",
      updatedAt: now()
    }
  ] as CmsPageRecord[],
  notifications: [] as NotificationRecord[],
  activities: [] as ActivityRecord[]
};

export function pushActivity(message: string) {
  db.activities.unshift({
    id: createId("activity"),
    message,
    createdAt: now()
  });
}
