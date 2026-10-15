import { z } from 'zod'

export const signUpSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  username: z.string().trim().min(3).max(30),
  country: z.string().trim().min(1),
  native_language: z.string().trim().min(1),
  learning_language: z.string().trim().min(1),
  date_of_birth: z.iso.date(),
})

export type SignUpData = z.infer<typeof signUpSchema>

export const emailPasswordSchema = z.object({
  email: z.email({
    error: (issue) => 
      issue.input === "" 
        ? "Email is required" 
        : "Invalid email address"
  }),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword:z.string().min(8, "Password must be at least 8 characters long")
})

export type EmailPassword = z.infer<typeof emailPasswordSchema>

export const profileInfoSchema = z.object({
  username: z.string().trim().min(3, "Username must be at least 3 characters long").max(30,"Username must not be more than 30 characters long"),
  country: z.string().trim().min(1,"Country is required"),
  native_language: z.string().trim().min(1,"Native language is required"),
  learning_language: z.string().trim().min(1,"Learning language is required"),
  date_of_birth: z.iso.date({error:"Invalid date format, please see the example above"}),
}) 

export type ProfileInfo = z.infer<typeof profileInfoSchema>