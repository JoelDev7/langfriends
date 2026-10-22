import z, { nullable } from "zod";

export const profileDataSchema = z.object({
    username: z.string().trim().min(3, "Username must be at least 3 characters long").max(30,"Username must not be more than 30 characters long"),
  country: z.string().trim().min(1,"Country is required"),
  native_language: z.string().trim().min(1,"Native language is required"),
  learning_language: z.string().trim().min(1,"Learning language is required"),
  date_of_birth: z.iso.date({error:"Invalid date format, please see the example above"}),
  email:z.email().optional()
    , practice_schedule:z.string().nullable().or(z.literal(""))
    , full_name:z.string().nullable().or(z.literal(""))
    , biography:z.string().trim()
}) 

export type ProfileData = z.infer<typeof profileDataSchema>