import { z } from "zod";

/** Strip control characters (prevents header/log injection) and trim. */
const clean = (s: string) => s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();

export const contactSchema = z.object({
  name: z.string().transform(clean).pipe(z.string().min(1, "Please enter your name.").max(120)),
  email: z
    .string()
    .transform(clean)
    .pipe(z.string().email("Please enter a valid email address.").max(200)),
  subject: z
    .string()
    .transform(clean)
    .pipe(z.string().min(1, "Please enter a subject.").max(200))
    .transform((s) => s.replace(/[\r\n]+/g, " ")),
  message: z
    .string()
    .transform(clean)
    .pipe(z.string().min(10, "Please write at least 10 characters.").max(5000)),
  honeypot: z.string().optional()
});

export type ContactInput = z.infer<typeof contactSchema>;
