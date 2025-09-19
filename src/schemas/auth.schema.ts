import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(6, "Min 6 characters"),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Min 2 characters"),
    email: z.string().trim().email("Enter a valid email"),
    password: z.string().min(6, "Min 6 characters"),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

// (not necessary, but sometimes useful)
export const strictRegisterSchema = registerSchema.strict();

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
