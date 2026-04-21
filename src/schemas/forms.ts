import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().optional(),
  service: z.string().min(2, "Select a service."),
  message: z.string().min(10, "Tell us a little more about your requirement."),
});

export const publishBookSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  mobile: z.string().min(10, "Enter a valid mobile number."),
  email: z.string().email("Enter a valid email address."),
  bookTitle: z.string().min(2, "Enter your book title."),
  numberOfPages: z.coerce.number().min(1, "Enter the number of pages."),
  language: z.string().optional(),
  bookType: z.string().min(2, "Select a book type."),
  selectedPackage: z.string().min(2, "Select a package."),
  message: z.string().optional(),
});

export const printingSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  organization: z.string().optional(),
  mobile: z.string().min(10, "Enter a valid mobile number."),
  serviceType: z.string().min(2, "Select a service."),
  quantity: z.coerce.number().min(1, "Enter a valid quantity."),
  message: z.string().optional(),
});

export const paperSubmissionSchema = z.object({
  authorName: z.string().min(2, "Please enter the author name."),
  paperTitle: z.string().min(2, "Enter the paper title."),
  email: z.string().email("Enter a valid email address."),
  mobile: z.string().min(10, "Enter a valid mobile number."),
  subjectArea: z.string().min(2, "Select a subject area."),
  message: z.string().optional(),
});

export const loginSchema = z.object({
  role: z.enum(["buyer", "author", "distributor", "admin"]),
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(6, "Password should be at least 6 characters."),
});

export const registerSchema = z
  .object({
    role: z.enum(["buyer", "author", "distributor"]),
    name: z.string().min(2, "Please enter your full name."),
    email: z.string().email("Enter a valid email address."),
    phone: z.string().min(10, "Enter a valid mobile number.").optional().or(z.literal("")),
    businessName: z.string().optional().or(z.literal("")),
    password: z.string().min(6, "Password should be at least 6 characters."),
  })
  .superRefine((value, ctx) => {
    if (value.role === "distributor" && !value.businessName?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["businessName"],
        message: "Please enter the distributor or business name.",
      });
    }
  });

export type ContactValues = z.infer<typeof contactSchema>;
export type PublishBookValues = z.infer<typeof publishBookSchema>;
export type PrintingValues = z.infer<typeof printingSchema>;
export type PaperSubmissionValues = z.infer<typeof paperSubmissionSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
