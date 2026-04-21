import { Router } from "express";
import { z } from "zod";

import { asyncHandler } from "../../lib/async-handler.js";
import { ApiError, createOkResponse } from "../../lib/http.js";
import { notifyChannels } from "../../lib/notifications.js";
import { db, pushActivity } from "../../lib/store.js";
import { createId, matchesSearch, now, paginate, toNumber } from "../../lib/utils.js";
import { authenticate, authorize } from "../../middleware/auth.js";
import { upload } from "../../middleware/upload.js";
import { validateBody } from "../../middleware/validate.js";

const router = Router();

const callForPaperSchema = z.object({
  title: z.string().min(2),
  submissionDeadline: z.string().min(4),
  publicationDate: z.string().min(4),
  fee: z.coerce.number().min(0),
  type: z.enum(["ISBN", "ISSN"]),
  mode: z.string().min(2),
  brochureUrl: z.string().optional(),
  status: z.enum(["active", "closed"]).default("active")
});

const paperSubmissionSchema = z.object({
  callForPaperId: z.string().min(2),
  authorName: z.string().min(2),
  paperTitle: z.string().min(2),
  email: z.string().email(),
  mobile: z.string().min(10),
  subjectArea: z.string().min(2),
  message: z.string().optional()
});

const paperSubmissionUpdateSchema = z.object({
  paymentStatus: z.enum(["pending", "paid"]).optional(),
  publicationStatus: z.enum(["submitted", "under-review", "accepted", "rejected", "payment-pending", "published"]).optional()
});

const publicationSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(2),
  authorName: z.string().min(2),
  publicationType: z.enum(["Book", "ISBN Paper", "Edited Book"]),
  category: z.enum(["Books", "Edited Books", "Articles", "Chapters", "Papers"]),
  isbn: z.string().min(4),
  publicationDate: z.string().min(4),
  description: z.string().min(10),
  featured: z.coerce.boolean().default(false)
});

const publicationUpdateSchema = publicationSchema.partial();

const journalSchema = z.object({
  name: z.string().min(2),
  issn: z.string().min(2),
  description: z.string().min(10),
  type: z.string().min(2),
  websiteUrl: z.string().optional(),
  currentIssueUrl: z.string().optional(),
  status: z.enum(["active", "coming-soon"])
});

const blogSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  content: z.string().min(20),
  category: z.string().min(2),
  seoTitle: z.string().min(2),
  metaDescription: z.string().min(10),
  publishDate: z.string().min(4)
});

const testimonialSchema = z.object({
  authorName: z.string().min(2),
  designation: z.string().min(2),
  reviewText: z.string().min(10),
  rating: z.coerce.number().min(1).max(5),
  placements: z.array(z.string()).min(1)
});

const cmsSchema = z.object({
  title: z.string().min(2),
  heroTitle: z.string().min(2),
  heroSubtitle: z.string().min(2),
  sections: z.array(
    z.object({
      heading: z.string().min(2),
      body: z.string().min(2)
    }),
  ),
  seoTitle: z.string().min(2),
  metaDescription: z.string().min(10)
});

router.get(
  "/call-for-papers",
  asyncHandler(async (request, response) => {
    const status = typeof request.query.status === "string" ? request.query.status : undefined;
    const data = db.callForPapers.filter((item) => (!status ? true : item.status === status));
    response.json(createOkResponse(data, "Call for paper records loaded."));
  }),
);

router.get(
  "/call-for-papers/current",
  asyncHandler(async (_request, response) => {
    const current = db.callForPapers.find((item) => item.status === "active") ?? null;
    response.json(createOkResponse(current, "Current call for paper loaded."));
  }),
);

router.post(
  "/paper-submissions",
  upload.single("paper"),
  validateBody(paperSubmissionSchema),
  asyncHandler(async (request, response) => {
    const payload = request.body as z.infer<typeof paperSubmissionSchema>;
    const callForPaper = db.callForPapers.find((item) => item.id === payload.callForPaperId);

    if (!callForPaper) {
      throw new ApiError(404, "Call for paper not found.");
    }

    const createdAt = now();
    const record = {
      id: createId("paper"),
      ...payload,
      uploadedFile: request.file ? `/uploads/${request.file.filename}` : undefined,
      paymentStatus: "pending" as const,
      publicationStatus: "submitted" as const,
      createdAt,
      updatedAt: createdAt
    };

    db.paperSubmissions.unshift(record);
    db.contacts.unshift({
      id: createId("lead"),
      source: "call-for-paper",
      name: payload.authorName,
      email: payload.email,
      mobile: payload.mobile,
      subject: payload.paperTitle,
      message: payload.message,
      status: "new",
      createdAt,
      updatedAt: createdAt
    });

    pushActivity(`New paper submitted: ${payload.paperTitle}`);
    await notifyChannels({
      title: "New paper submission",
      message: `${payload.authorName} submitted "${payload.paperTitle}"`,
      emailTo: payload.email,
      whatsappNumber: payload.mobile
    });

    response.status(201).json(createOkResponse(record, "Paper submission created."));
  }),
);

router.get(
  "/publications",
  asyncHandler(async (request, response) => {
    const category = typeof request.query.category === "string" ? request.query.category : undefined;
    const search = typeof request.query.search === "string" ? request.query.search : undefined;
    const data = db.publications
      .filter((item) => (!category ? true : item.category === category))
      .filter((item) => matchesSearch([item.title, item.authorName, item.slug], search));
    response.json(createOkResponse(data, "Publications loaded."));
  }),
);

router.get(
  "/publications/featured",
  asyncHandler(async (_request, response) => {
    response.json(createOkResponse(db.publications.filter((item) => item.featured), "Featured publications loaded."));
  }),
);

router.get(
  "/publications/:id",
  asyncHandler(async (request, response) => {
    const record =
      db.publications.find((item) => item.id === request.params.id) ??
      db.publications.find((item) => item.slug === request.params.id);
    if (!record) {
      throw new ApiError(404, "Publication not found.");
    }
    response.json(createOkResponse(record, "Publication loaded."));
  }),
);

router.get(
  "/journals/current",
  asyncHandler(async (_request, response) => {
    const current = db.journals.find((item) => item.status === "active") ?? null;
    response.json(createOkResponse(current, "Current journal loaded."));
  }),
);

router.get(
  "/journals/upcoming",
  asyncHandler(async (_request, response) => {
    response.json(createOkResponse(db.journals.filter((item) => item.status === "coming-soon"), "Upcoming journals loaded."));
  }),
);

router.get(
  "/blogs",
  asyncHandler(async (request, response) => {
    const search = typeof request.query.search === "string" ? request.query.search : undefined;
    const data = db.blogs.filter((item) => matchesSearch([item.title, item.slug, item.category], search));
    response.json(createOkResponse(data, "Blogs loaded."));
  }),
);

router.get(
  "/blogs/:id",
  asyncHandler(async (request, response) => {
    const record = db.blogs.find((item) => item.id === request.params.id) ?? db.blogs.find((item) => item.slug === request.params.id);
    if (!record) {
      throw new ApiError(404, "Blog not found.");
    }
    response.json(createOkResponse(record, "Blog loaded."));
  }),
);

router.get(
  "/testimonials",
  asyncHandler(async (_request, response) => {
    response.json(createOkResponse(db.testimonials, "Testimonials loaded."));
  }),
);

router.use(authenticate, authorize("super-admin", "admin", "sub-admin", "content-manager", "publication-manager"));

router.post(
  "/call-for-papers",
  validateBody(callForPaperSchema),
  asyncHandler(async (request, response) => {
    const payload = request.body as z.infer<typeof callForPaperSchema>;
    const createdAt = now();
    const record = {
      id: createId("cfp"),
      ...payload,
      createdAt,
      updatedAt: createdAt
    };
    db.callForPapers.unshift(record);
    pushActivity(`New call for paper added: ${record.title}`);
    response.status(201).json(createOkResponse(record, "Call for paper created."));
  }),
);

router.patch(
  "/call-for-papers/:id",
  validateBody(callForPaperSchema.partial()),
  asyncHandler(async (request, response) => {
    const record = db.callForPapers.find((item) => item.id === request.params.id);
    if (!record) {
      throw new ApiError(404, "Call for paper not found.");
    }
    Object.assign(record, request.body, { updatedAt: now() });
    response.json(createOkResponse(record, "Call for paper updated."));
  }),
);

router.delete(
  "/call-for-papers/:id",
  asyncHandler(async (request, response) => {
    const index = db.callForPapers.findIndex((item) => item.id === request.params.id);
    if (index === -1) {
      throw new ApiError(404, "Call for paper not found.");
    }
    const [record] = db.callForPapers.splice(index, 1);
    response.json(createOkResponse(record, "Call for paper deleted."));
  }),
);

router.get(
  "/paper-submissions",
  asyncHandler(async (request, response) => {
    const page = toNumber(request.query.page, 1);
    const limit = toNumber(request.query.limit, 10);
    const status = typeof request.query.status === "string" ? request.query.status : undefined;
    const data = db.paperSubmissions.filter((item) => (!status ? true : item.publicationStatus === status));
    response.json(createOkResponse(paginate(data, page, limit), "Paper submissions loaded."));
  }),
);

router.patch(
  "/paper-submissions/:id",
  validateBody(paperSubmissionUpdateSchema),
  asyncHandler(async (request, response) => {
    const record = db.paperSubmissions.find((item) => item.id === request.params.id);
    if (!record) {
      throw new ApiError(404, "Paper submission not found.");
    }
    Object.assign(record, request.body, { updatedAt: now() });
    pushActivity(`Paper submission updated: ${record.paperTitle}`);
    response.json(createOkResponse(record, "Paper submission updated."));
  }),
);

router.post(
  "/publications",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
    { name: "certificateFile", maxCount: 1 }
  ]),
  validateBody(publicationSchema),
  asyncHandler(async (request, response) => {
    const payload = request.body as z.infer<typeof publicationSchema>;
    const files = request.files as Record<string, Express.Multer.File[]> | undefined;
    const createdAt = now();
    const record = {
      id: createId("publication"),
      ...payload,
      coverImage: files?.coverImage?.[0] ? `/uploads/${files.coverImage[0].filename}` : undefined,
      pdfFile: files?.pdfFile?.[0] ? `/uploads/${files.pdfFile[0].filename}` : undefined,
      certificateFile: files?.certificateFile?.[0] ? `/uploads/${files.certificateFile[0].filename}` : undefined,
      createdAt,
      updatedAt: createdAt
    };
    db.publications.unshift(record);
    pushActivity(`New publication added: ${record.title}`);
    response.status(201).json(createOkResponse(record, "Publication created."));
  }),
);

router.patch(
  "/publications/:id",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
    { name: "certificateFile", maxCount: 1 }
  ]),
  validateBody(publicationUpdateSchema),
  asyncHandler(async (request, response) => {
    const record = db.publications.find((item) => item.id === request.params.id);
    if (!record) {
      throw new ApiError(404, "Publication not found.");
    }
    const files = request.files as Record<string, Express.Multer.File[]> | undefined;
    Object.assign(record, request.body, {
      coverImage: files?.coverImage?.[0] ? `/uploads/${files.coverImage[0].filename}` : record.coverImage,
      pdfFile: files?.pdfFile?.[0] ? `/uploads/${files.pdfFile[0].filename}` : record.pdfFile,
      certificateFile: files?.certificateFile?.[0] ? `/uploads/${files.certificateFile[0].filename}` : record.certificateFile,
      updatedAt: now()
    });
    response.json(createOkResponse(record, "Publication updated."));
  }),
);

router.delete(
  "/publications/:id",
  asyncHandler(async (request, response) => {
    const index = db.publications.findIndex((item) => item.id === request.params.id);
    if (index === -1) {
      throw new ApiError(404, "Publication not found.");
    }
    const [record] = db.publications.splice(index, 1);
    response.json(createOkResponse(record, "Publication deleted."));
  }),
);

router.put(
  "/journals/current/:id",
  upload.single("coverImage"),
  validateBody(journalSchema),
  asyncHandler(async (request, response) => {
    const record = db.journals.find((item) => item.id === request.params.id);
    if (!record) {
      throw new ApiError(404, "Journal not found.");
    }
    Object.assign(record, request.body, {
      coverImage: request.file ? `/uploads/${request.file.filename}` : record.coverImage,
      updatedAt: now()
    });
    response.json(createOkResponse(record, "Current journal updated."));
  }),
);

router.post(
  "/journals",
  upload.single("coverImage"),
  validateBody(journalSchema),
  asyncHandler(async (request, response) => {
    const payload = request.body as z.infer<typeof journalSchema>;
    const createdAt = now();
    const record = {
      id: createId("journal"),
      ...payload,
      coverImage: request.file ? `/uploads/${request.file.filename}` : undefined,
      createdAt,
      updatedAt: createdAt
    };
    db.journals.unshift(record);
    response.status(201).json(createOkResponse(record, "Journal created."));
  }),
);

router.post(
  "/blogs",
  upload.single("featuredImage"),
  validateBody(blogSchema),
  asyncHandler(async (request, response) => {
    const payload = request.body as z.infer<typeof blogSchema>;
    const createdAt = now();
    const record = {
      id: createId("blog"),
      ...payload,
      featuredImage: request.file ? `/uploads/${request.file.filename}` : undefined,
      createdAt,
      updatedAt: createdAt
    };
    db.blogs.unshift(record);
    pushActivity(`New blog published: ${record.title}`);
    response.status(201).json(createOkResponse(record, "Blog created."));
  }),
);

router.patch(
  "/blogs/:id",
  upload.single("featuredImage"),
  validateBody(blogSchema.partial()),
  asyncHandler(async (request, response) => {
    const record = db.blogs.find((item) => item.id === request.params.id);
    if (!record) {
      throw new ApiError(404, "Blog not found.");
    }
    Object.assign(record, request.body, {
      featuredImage: request.file ? `/uploads/${request.file.filename}` : record.featuredImage,
      updatedAt: now()
    });
    response.json(createOkResponse(record, "Blog updated."));
  }),
);

router.delete(
  "/blogs/:id",
  asyncHandler(async (request, response) => {
    const index = db.blogs.findIndex((item) => item.id === request.params.id);
    if (index === -1) {
      throw new ApiError(404, "Blog not found.");
    }
    const [record] = db.blogs.splice(index, 1);
    response.json(createOkResponse(record, "Blog deleted."));
  }),
);

router.post(
  "/testimonials",
  upload.single("photo"),
  validateBody(testimonialSchema),
  asyncHandler(async (request, response) => {
    const payload = request.body as z.infer<typeof testimonialSchema>;
    const createdAt = now();
    const record = {
      id: createId("testimonial"),
      ...payload,
      photo: request.file ? `/uploads/${request.file.filename}` : undefined,
      createdAt,
      updatedAt: createdAt
    };
    db.testimonials.unshift(record);
    response.status(201).json(createOkResponse(record, "Testimonial created."));
  }),
);

router.patch(
  "/testimonials/:id",
  upload.single("photo"),
  validateBody(testimonialSchema.partial()),
  asyncHandler(async (request, response) => {
    const record = db.testimonials.find((item) => item.id === request.params.id);
    if (!record) {
      throw new ApiError(404, "Testimonial not found.");
    }
    Object.assign(record, request.body, {
      photo: request.file ? `/uploads/${request.file.filename}` : record.photo,
      updatedAt: now()
    });
    response.json(createOkResponse(record, "Testimonial updated."));
  }),
);

router.delete(
  "/testimonials/:id",
  asyncHandler(async (request, response) => {
    const index = db.testimonials.findIndex((item) => item.id === request.params.id);
    if (index === -1) {
      throw new ApiError(404, "Testimonial not found.");
    }
    const [record] = db.testimonials.splice(index, 1);
    response.json(createOkResponse(record, "Testimonial deleted."));
  }),
);

router.get(
  "/cms/pages",
  asyncHandler(async (_request, response) => {
    response.json(createOkResponse(db.cmsPages, "CMS pages loaded."));
  }),
);

router.put(
  "/cms/pages/:slug",
  validateBody(cmsSchema),
  asyncHandler(async (request, response) => {
    const record = db.cmsPages.find((item) => item.slug === request.params.slug);
    if (!record) {
      throw new ApiError(404, "CMS page not found.");
    }
    Object.assign(record, request.body, { updatedAt: now() });
    response.json(createOkResponse(record, "CMS page updated."));
  }),
);

router.get(
  "/media",
  asyncHandler(async (request, response) => {
    const page = toNumber(request.query.page, 1);
    const limit = toNumber(request.query.limit, 10);
    const folder = typeof request.query.folder === "string" ? request.query.folder : undefined;
    const filtered = db.media.filter((item) => (!folder ? true : item.folder === folder));
    response.json(createOkResponse(paginate(filtered, page, limit), "Media library loaded."));
  }),
);

router.post(
  "/media",
  upload.single("file"),
  asyncHandler(async (request, response) => {
    if (!request.file) {
      throw new ApiError(400, "A file upload is required.");
    }
    const record = {
      id: createId("media"),
      name: request.file.originalname,
      url: `/uploads/${request.file.filename}`,
      mimeType: request.file.mimetype,
      folder: typeof request.body.folder === "string" ? request.body.folder : "general",
      size: request.file.size,
      createdAt: now()
    };
    db.media.unshift(record);
    response.status(201).json(createOkResponse(record, "Media uploaded."));
  }),
);

export default router;
