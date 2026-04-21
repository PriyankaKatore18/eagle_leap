import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bell,
  BookOpen,
  FilePenLine,
  FileText,
  ImageIcon,
  LayoutTemplate,
  Megaphone,
  MessageSquareQuote,
  NotebookText,
  PackageCheck,
  PhoneCall,
  Printer,
  Search,
  ShoppingBag,
  UsersRound,
} from "lucide-react";

export type AdminModuleRecord = {
  slug: string;
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  stats: Array<{ label: string; value: string; detail: string }>;
  focus: string[];
  actions: string[];
  access: string[];
  table: {
    columns: string[];
    rows: string[][];
  };
};

export const adminOverviewCards = [
  { label: "Open Leads", value: "148", detail: "Publish-book, contact, and printing pipelines" },
  { label: "Live Publications", value: "64", detail: "Books, edited volumes, and paper releases" },
  { label: "Store Revenue", value: "INR 3.8L", detail: "Current month paid and processing orders" },
  { label: "Pending Reviews", value: "19", detail: "Call-for-paper and journal moderation queue" },
];

export const adminRecentActivity = [
  "A distributor registration was approved and added to the margin workflow.",
  "The active call-for-paper deadline was updated for the May 2026 title.",
  "Two new store orders moved from paid to packed status.",
  "A new publication certificate was generated for an author dashboard account.",
];

export const adminRoleMatrix = [
  {
    role: "Super Admin",
    scope: "Full platform control, role assignment, reports, settings, and approvals.",
  },
  {
    role: "Content Manager",
    scope: "CMS pages, blogs, testimonials, media assets, and SEO content updates.",
  },
  {
    role: "Publication Manager",
    scope: "Call for paper, journals, publications, paper submissions, and certificates.",
  },
  {
    role: "Store Manager",
    scope: "Products, pricing, stock, viewer access, and order fulfillment.",
  },
  {
    role: "Accounts/Admin Support",
    scope: "Leads, distributor approvals, operational follow-up, and report visibility.",
  },
];

export const adminModules: AdminModuleRecord[] = [
  {
    slug: "cms",
    label: "CMS",
    title: "CMS Content Editor",
    description: "Manage hero sections, page blocks, SEO copy, footer content, and conversion-focused CTAs without disturbing the visual theme.",
    icon: LayoutTemplate,
    accent: "Brand-safe content control",
    stats: [
      { label: "Managed Pages", value: "12", detail: "Home, About, Packages, Contact, policies, and more" },
      { label: "Editable Sections", value: "46", detail: "Hero, trust, testimonials, FAQ, and CTA blocks" },
      { label: "SEO Drafts", value: "09", detail: "Pages queued for meta optimization" },
    ],
    focus: [
      "Homepage hero and CTA hierarchy",
      "About page founder and mission sections",
      "Package page blocks linked to dynamic pricing content",
      "Footer and policy updates with publishing trust signals",
    ],
    actions: [
      "Edit page copy and modular sections",
      "Swap hero images and promotional banners",
      "Update meta titles, descriptions, and OG media",
      "Preview content before publishing changes live",
    ],
    access: ["super-admin", "content-manager"],
    table: {
      columns: ["Section", "Page", "Status", "Updated"],
      rows: [
        ["Hero Banner", "Home", "Published", "21 Apr 2026"],
        ["Founder Story", "About", "Draft", "20 Apr 2026"],
        ["Package Matrix Intro", "Packages", "Published", "19 Apr 2026"],
      ],
    },
  },
  {
    slug: "publish-requests",
    label: "Publish Leads",
    title: "Publish My Book Enquiries",
    description: "Track incoming book publishing requests, package interest, manuscript readiness, and WhatsApp follow-up status.",
    icon: FilePenLine,
    accent: "Lead-to-consultation funnel",
    stats: [
      { label: "New Requests", value: "23", detail: "Fresh leads from the public publish-my-book form" },
      { label: "In Discussion", value: "11", detail: "Consultation and package review stage" },
      { label: "Ready for Payment", value: "07", detail: "Leads waiting on commercial approval" },
    ],
    focus: [
      "Package preference tracking",
      "Manuscript upload review",
      "WhatsApp routing after submission",
      "Lead assignment to publishing coordinators",
    ],
    actions: [
      "Review lead details and attached manuscripts",
      "Assign requests to a staff owner",
      "Update status from new to completed",
      "Trigger email and WhatsApp follow-up",
    ],
    access: ["super-admin", "publication-manager", "accounts-admin-support"],
    table: {
      columns: ["Lead", "Package", "Pages", "Status"],
      rows: [
        ["Sandesh Kulkarni", "Academic Plus", "164", "Contacted"],
        ["Riya More", "Starter ISBN", "96", "New"],
        ["Prof. Deore", "Premium Reach", "212", "In Discussion"],
      ],
    },
  },
  {
    slug: "printing-enquiries",
    label: "Printing",
    title: "Printing Enquiry Manager",
    description: "Handle institutional printing leads for magazines, ID cards, practical books, awards, and custom print jobs.",
    icon: Printer,
    accent: "Institutional print operations",
    stats: [
      { label: "Open Quotes", value: "14", detail: "Requests awaiting commercial response" },
      { label: "Production Jobs", value: "06", detail: "Active institutional printing batches" },
      { label: "Delivered Jobs", value: "48", detail: "Completed print orders this quarter" },
    ],
    focus: [
      "Bulk quantity planning",
      "Deadline-sensitive print coordination",
      "Finishing and dispatch tracking",
      "Institution account follow-up",
    ],
    actions: [
      "Prepare and approve quotations",
      "Move approved jobs into production",
      "Attach proofs, layouts, or artwork references",
      "Update delivery milestones for colleges and institutions",
    ],
    access: ["super-admin", "accounts-admin-support"],
    table: {
      columns: ["Client", "Service", "Quantity", "Stage"],
      rows: [
        ["Pragati College", "College Magazine", "600", "Quoted"],
        ["City Academy", "ID Cards", "1200", "In Production"],
        ["Rising School", "Certificates", "900", "Delivered"],
      ],
    },
  },
  {
    slug: "call-for-paper",
    label: "CFP",
    title: "Call for Paper Manager",
    description: "Operate the active monthly title, fee, deadlines, brochure links, and status for edited volumes and journal-linked submission campaigns.",
    icon: Megaphone,
    accent: "Research submission control",
    stats: [
      { label: "Live Titles", value: "03", detail: "Currently visible to researchers" },
      { label: "Submissions", value: "52", detail: "Across active calls and volumes" },
      { label: "Upcoming Deadlines", value: "02", detail: "Publishing windows closing this month" },
    ],
    focus: [
      "Monthly running title updates",
      "Deadline and fee accuracy",
      "Brochure upload management",
      "Submission routing into review workflows",
    ],
    actions: [
      "Launch and archive calls",
      "Edit fee, dates, and publication type",
      "Publish brochure assets",
      "Monitor the submission funnel",
    ],
    access: ["super-admin", "publication-manager"],
    table: {
      columns: ["Title", "Fee", "Deadline", "Status"],
      rows: [
        ["Emerging Trends in Multidisciplinary Research 2026", "1499", "30 May 2026", "Active"],
        ["Commerce and Management Perspectives", "1299", "18 May 2026", "Active"],
        ["Applied Humanities Annual", "1599", "10 Jun 2026", "Scheduled"],
      ],
    },
  },
  {
    slug: "publications",
    label: "Publications",
    title: "Publications Manager",
    description: "Manage books, edited volumes, ISBN papers, certificates, publication metadata, and public detail pages.",
    icon: BookOpen,
    accent: "Publication catalogue control",
    stats: [
      { label: "Live Titles", value: "64", detail: "Visible across publication and store sections" },
      { label: "Featured Works", value: "11", detail: "Highlighted for credibility and conversion" },
      { label: "Certificates", value: "88", detail: "Issued to authors and contributors" },
    ],
    focus: [
      "Title metadata, ISBN, and edition details",
      "Author association and recognition",
      "Certificate availability and attachments",
      "Publication page visibility and featured placement",
    ],
    actions: [
      "Create or edit publication entries",
      "Link PDFs and certificates",
      "Push selected publications to the store",
      "Manage featured and homepage placements",
    ],
    access: ["super-admin", "publication-manager", "content-manager"],
    table: {
      columns: ["Title", "Author", "Type", "Visibility"],
      rows: [
        ["Multidisciplinary Perspectives on Learning", "Dr. Priya Kulkarni", "Edited Book", "Featured"],
        ["Digital Literacy and Academic Growth", "Shivprasad D. Pahukar", "ISBN Paper", "Published"],
        ["Contemporary Voices in Commerce", "Dr. Meera Joshi", "Edited Book", "Published"],
      ],
    },
  },
  {
    slug: "journals",
    label: "Journals",
    title: "Journal Manager",
    description: "Maintain ISSN journal identity, issue links, cover assets, descriptions, and future journal launches.",
    icon: NotebookText,
    accent: "ISSN and issue operations",
    stats: [
      { label: "Active Journals", value: "01", detail: "Currently published and public" },
      { label: "Coming Soon", value: "03", detail: "Future launches in planning" },
      { label: "Issue Links", value: "04", detail: "Current and archive navigation entries" },
    ],
    focus: [
      "ISSN presentation and trust markers",
      "Current issue publishing links",
      "Upcoming journal brand announcements",
      "Journal-specific cover and metadata updates",
    ],
    actions: [
      "Update journal overview sections",
      "Publish current issue URLs",
      "Manage launch timeline for new journals",
      "Refresh descriptions and access badges",
    ],
    access: ["super-admin", "publication-manager"],
    table: {
      columns: ["Journal", "ISSN", "Type", "State"],
      rows: [
        ["BODHIVRUKSHA JOURNAL OF DIVERSE DISCIPLINE", "3139-1486", "Open Access", "Active"],
        ["ARTHAVRUKSHA", "Coming Soon", "Commerce", "Coming Soon"],
        ["SAHITYAVRUKSHA", "Coming Soon", "Humanities", "Planning"],
      ],
    },
  },
  {
    slug: "store",
    label: "Store",
    title: "Store Management",
    description: "Control catalogue listings, pricing, stock, secure ebook access, and reader protection rules without changing the storefront theme.",
    icon: ShoppingBag,
    accent: "Commerce and ebook control",
    stats: [
      { label: "Listed Products", value: "42", detail: "Across hard copy, ebook, and both formats" },
      { label: "Secure Reader Titles", value: "17", detail: "Protected with watermark and no-download flags" },
      { label: "Low Stock", value: "05", detail: "Products needing replenishment" },
    ],
    focus: [
      "Price and inventory management",
      "Format visibility and bundle logic",
      "Secure ebook viewer access",
      "New arrival and popular product placement",
    ],
    actions: [
      "Create and update products",
      "Set stock, price, and access rules",
      "Upload covers and ebook files",
      "Control featured, popular, and new-arrival flags",
    ],
    access: ["super-admin", "store-manager"],
    table: {
      columns: ["Product", "Format", "Price", "Stock"],
      rows: [
        ["Research Methods for Applied Scholarship", "Both", "699", "28"],
        ["Digital Literacy and Academic Growth", "Ebook", "349", "Secure Reader"],
        ["Contemporary Voices in Commerce", "Both", "599", "42"],
      ],
    },
  },
  {
    slug: "orders",
    label: "Orders",
    title: "Orders and Fulfillment",
    description: "Track payments, packing, shipping, invoice status, distributor-linked sales, and after-purchase ebook access rules.",
    icon: PackageCheck,
    accent: "Post-purchase execution",
    stats: [
      { label: "New Orders", value: "18", detail: "Placed in the current 7-day window" },
      { label: "Shipped", value: "31", detail: "Orders already dispatched" },
      { label: "Pending Payment", value: "04", detail: "Waiting on confirmation or retry" },
    ],
    focus: [
      "Payment and shipping status flow",
      "Tracking ID visibility",
      "Invoice readiness for buyers and institutions",
      "Distributor-linked order accounting",
    ],
    actions: [
      "Move orders through fulfillment stages",
      "Attach tracking IDs and courier notes",
      "Monitor refunds or failed payments",
      "Grant ebook sessions after successful purchase",
    ],
    access: ["super-admin", "store-manager", "accounts-admin-support"],
    table: {
      columns: ["Order", "Customer", "Amount", "Status"],
      rows: [
        ["ELP-ORDER-1001", "Rohan Joshi", "1478", "Shipped"],
        ["ELP-ORDER-1002", "College Central Library", "5290", "Packed"],
        ["ELP-ORDER-1003", "Asha Nair", "699", "Paid"],
      ],
    },
  },
  {
    slug: "users",
    label: "Users",
    title: "Users and Roles",
    description: "Manage admin staff, authors, buyers, distributors, statuses, access permissions, and password resets from one control point.",
    icon: UsersRound,
    accent: "RBAC and account lifecycle",
    stats: [
      { label: "Total Users", value: "286", detail: "Combined admin, author, buyer, and distributor accounts" },
      { label: "Pending Approvals", value: "12", detail: "Accounts waiting for role verification" },
      { label: "Distributor Accounts", value: "21", detail: "Margin-enabled commerce partners" },
    ],
    focus: [
      "Role assignment and permission boundaries",
      "Author, buyer, and distributor registrations",
      "Status updates and password control",
      "Distributor business account verification",
    ],
    actions: [
      "Approve or disable accounts",
      "Reset passwords and update profile basics",
      "Create internal admin users with scoped access",
      "Review role-linked dashboard access",
    ],
    access: ["super-admin", "admin", "sub-admin"],
    table: {
      columns: ["User", "Role", "Status", "Last Action"],
      rows: [
        ["admin@eagleleap.in", "Super Admin", "Active", "Role audit"],
        ["author@eagleleap.in", "Author", "Active", "Certificate issued"],
        ["distributor@eagleleap.in", "Distributor", "Active", "Discount review"],
      ],
    },
  },
  {
    slug: "blogs",
    label: "Blogs",
    title: "Blog System",
    description: "Create trust-building publishing content, manage categories, optimize SEO, and schedule educational posts for inbound growth.",
    icon: FileText,
    accent: "Search-led content growth",
    stats: [
      { label: "Published Articles", value: "18", detail: "Live educational and publishing support content" },
      { label: "Drafts", value: "07", detail: "Upcoming author and printing content" },
      { label: "Top Category", value: "Publishing Tips", detail: "Best-performing category for organic discovery" },
    ],
    focus: [
      "Author education and publishing trust",
      "Research paper readiness articles",
      "Institutional printing guidance",
      "SEO-structured article publishing",
    ],
    actions: [
      "Create, edit, and schedule blog posts",
      "Assign categories and featured images",
      "Manage meta titles and descriptions",
      "Promote selected articles to the homepage",
    ],
    access: ["super-admin", "content-manager"],
    table: {
      columns: ["Post", "Category", "Date", "State"],
      rows: [
        ["How ISBN Publication Helps First-Time Authors", "Publishing Tips", "12 Apr 2026", "Published"],
        ["Submitting Better Multidisciplinary Research Papers", "Research", "28 Mar 2026", "Published"],
        ["Printing Checklist for Colleges", "Printing", "26 Apr 2026", "Draft"],
      ],
    },
  },
  {
    slug: "testimonials",
    label: "Testimonials",
    title: "Testimonials Manager",
    description: "Control proof-building testimonials across the homepage, packages, and about sections to support conversion and trust.",
    icon: MessageSquareQuote,
    accent: "Social proof placement",
    stats: [
      { label: "Active Reviews", value: "24", detail: "Testimonials currently approved for display" },
      { label: "Homepage Spots", value: "08", detail: "Visible in trust-focused homepage sections" },
      { label: "Awaiting Review", value: "05", detail: "Fresh submissions or migrated content" },
    ],
    focus: [
      "Placement across key conversion pages",
      "Review moderation and approval",
      "Author and institutional client balance",
      "Credibility support for packages and services",
    ],
    actions: [
      "Approve, edit, or archive testimonials",
      "Choose page placement toggles",
      "Attach profile images when available",
      "Refresh reviews for seasonal campaigns",
    ],
    access: ["super-admin", "content-manager"],
    table: {
      columns: ["Reviewer", "Type", "Rating", "Placement"],
      rows: [
        ["Anil Deshmukh", "Author", "5/5", "Home, About"],
        ["Dr. Priya Kulkarni", "Academic Contributor", "5/5", "Home, Packages"],
        ["Rohit Sharma", "Institutional Client", "5/5", "Home"],
      ],
    },
  },
  {
    slug: "media",
    label: "Media",
    title: "Media Library",
    description: "Store covers, brochures, certificates, blog images, hero media, and downloadable assets in an organized content library.",
    icon: ImageIcon,
    accent: "Centralized asset management",
    stats: [
      { label: "Assets", value: "312", detail: "Images, PDFs, brochures, certificates, and covers" },
      { label: "Folders", value: "17", detail: "Organized by page, content type, and campaign" },
      { label: "Recent Uploads", value: "21", detail: "Media added in the last 14 days" },
    ],
    focus: [
      "Image and PDF organization",
      "Secure certificate and brochure storage",
      "Media reuse across CMS and store",
      "Cleaner upload workflows for admins",
    ],
    actions: [
      "Upload images and documents",
      "Tag assets by folder and type",
      "Reuse files across pages and products",
      "Maintain clean asset references for SEO and UX",
    ],
    access: ["super-admin", "content-manager", "publication-manager", "store-manager"],
    table: {
      columns: ["Asset", "Folder", "Type", "Updated"],
      rows: [
        ["home-hero-books.jpg", "website/home", "Image", "21 Apr 2026"],
        ["cfp-may-2026-brochure.pdf", "cfp/brochures", "PDF", "20 Apr 2026"],
        ["certificate-priya-kulkarni.pdf", "certificates/2026", "PDF", "18 Apr 2026"],
      ],
    },
  },
  {
    slug: "leads",
    label: "Leads",
    title: "Contact Leads and Follow-Up",
    description: "Review website enquiries, assign owners, update notes, and close the loop across contact, publishing, and service inquiries.",
    icon: PhoneCall,
    accent: "Lead management and follow-up",
    stats: [
      { label: "Open Conversations", value: "37", detail: "Leads still active with the team" },
      { label: "Assigned Owners", value: "06", detail: "Internal staff handling follow-up" },
      { label: "Closed", value: "91", detail: "Leads resolved or converted" },
    ],
    focus: [
      "Unified contact inbox",
      "Assigned staff responsibility",
      "Lead notes and status tracking",
      "Conversion visibility across channels",
    ],
    actions: [
      "Review incoming leads",
      "Attach notes and update stages",
      "Assign leads to internal staff",
      "Monitor contact source and conversion quality",
    ],
    access: ["super-admin", "accounts-admin-support", "publication-manager"],
    table: {
      columns: ["Name", "Source", "Subject", "Status"],
      rows: [
        ["Ritika Shah", "Contact", "Book publishing enquiry", "New"],
        ["Arjun Kale", "Printing", "Magazine pricing", "Contacted"],
        ["Priya Desai", "Publish My Book", "ISBN package support", "Closed"],
      ],
    },
  },
  {
    slug: "seo-settings",
    label: "SEO",
    title: "SEO and Settings",
    description: "Maintain global metadata, social links, WhatsApp configuration, structured page defaults, and discoverability settings.",
    icon: Search,
    accent: "Visibility and platform settings",
    stats: [
      { label: "Tracked Pages", value: "15", detail: "Public pages covered by managed metadata" },
      { label: "Schema Blocks", value: "06", detail: "Structured metadata templates in use" },
      { label: "Open Issues", value: "03", detail: "Items flagged for on-page SEO refresh" },
    ],
    focus: [
      "Default meta and social configuration",
      "Canonical and indexing consistency",
      "WhatsApp and contact integration defaults",
      "Page-level optimization settings",
    ],
    actions: [
      "Update site identity and defaults",
      "Manage metadata templates",
      "Adjust WhatsApp and email settings",
      "Review indexability and content visibility",
    ],
    access: ["super-admin", "content-manager"],
    table: {
      columns: ["Setting", "Group", "Value", "State"],
      rows: [
        ["site_identity", "general", "Eagle Leap Publication", "Active"],
        ["default_meta", "seo", "Managed", "Active"],
        ["whatsapp", "notifications", "Enabled", "Active"],
      ],
    },
  },
  {
    slug: "reports",
    label: "Reports",
    title: "Reports and Analytics",
    description: "Track traffic, lead generation, publishing performance, product demand, and dashboard activity across the business.",
    icon: BarChart3,
    accent: "Operational visibility",
    stats: [
      { label: "Monthly Views", value: "12.9K", detail: "Across homepage, store, and publication content" },
      { label: "Lead Conversion", value: "18%", detail: "Lead-to-consultation performance benchmark" },
      { label: "Top Page", value: "/store", detail: "Highest engagement destination this month" },
    ],
    focus: [
      "Traffic and discovery patterns",
      "Publishing and store conversion trends",
      "Lead source effectiveness",
      "Operational activity visibility",
    ],
    actions: [
      "Review KPI summaries",
      "Export sales and lead reports",
      "Monitor page-view trends",
      "Share dashboards with leadership roles",
    ],
    access: ["super-admin", "store-manager", "accounts-admin-support"],
    table: {
      columns: ["Metric", "Current", "Previous", "Direction"],
      rows: [
        ["Homepage Views", "1200", "1040", "Up"],
        ["Store Views", "940", "820", "Up"],
        ["Call for Paper Views", "810", "760", "Up"],
      ],
    },
  },
  {
    slug: "notifications",
    label: "Alerts",
    title: "Notifications and Delivery Log",
    description: "Monitor dashboard notices, email sends, WhatsApp workflow notifications, and internal activity confirmations.",
    icon: Bell,
    accent: "Operational communication trail",
    stats: [
      { label: "Sent Alerts", value: "126", detail: "Across dashboard, email, and WhatsApp channels" },
      { label: "Pending Retries", value: "04", detail: "Messages waiting on delivery retry" },
      { label: "Templates", value: "09", detail: "Reusable operational notification formats" },
    ],
    focus: [
      "Dashboard and admin notices",
      "Email confirmation visibility",
      "WhatsApp workflow traceability",
      "Operational message troubleshooting",
    ],
    actions: [
      "Review delivery status across channels",
      "Retry failed notifications",
      "Audit system-generated notices",
      "Track message templates by workflow",
    ],
    access: ["super-admin", "accounts-admin-support"],
    table: {
      columns: ["Channel", "Title", "Status", "Time"],
      rows: [
        ["Dashboard", "Seed Completed", "Sent", "21 Apr 2026"],
        ["WhatsApp", "New publish request assigned", "Sent", "21 Apr 2026"],
        ["Email", "Order shipped confirmation", "Queued", "21 Apr 2026"],
      ],
    },
  },
];

export function getAdminModule(slug: string) {
  return adminModules.find((module) => module.slug === slug);
}
