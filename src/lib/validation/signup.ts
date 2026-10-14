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