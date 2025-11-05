import { z } from "zod";

export const personalInfoSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[A-Za-z\s]+$/, "Name must only contain letters"),
    
  email: z.string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters long"),
    
  phone: z.string()
    .regex(/^[1-9]\d{9}$/, "Phone number must be 10 digits and cannot start with 0"),
    
  gender: z.string()
    .min(1, "Please select your gender"),
    
  dob: z.string()
    .min(10, "Please select your date of birth")
    .refine((dob) => {
      const today = new Date();
      const birthDate = new Date(dob);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      // Check if user is at least 13 years old
      if (age > 5) return true;
      if (age === 5 && monthDiff >= 0) return true;
      return false;
    }, "You must be at least 5 years old"),
    
  permanentAddress: z.string()
    .min(5, "Permanent address must be at least 5 characters long")
    .max(200, "Permanent address must be less than 200 characters"),
    
  currentAddress: z.string()
    .min(5, "Current address must be at least 5 characters long")
    .max(200, "Current address must be less than 200 characters"),
}).refine((data) => data.permanentAddress !== data.currentAddress, {
  message: "Current address cannot be the same as permanent address",
  path: ["currentAddress"],
});



export const skillInfoSchema = z.object({
  /* ✅ Step 1: Cricket Profile */
  role: z.string().min(1, "Please select playing role"),
  battingStyle: z.string().min(1, "Please select batting style"),
  bowlingStyle: z.string().min(1, "Please select bowling style"),
  level: z.string().min(1, "Please select current level"),
  experience: z
    .preprocess((val) => {
      if (val === "" || val === null || val === undefined) return undefined;
      const num = Number(val);
      return Number.isFinite(num) ? num : undefined;
    }, z.number({ invalid_type_error: "Enter valid years of experience" }).min(0, "Experience cannot be negative").optional()),
  teamName: z.string().trim().min(2, "Team/Club name must be at least 2 characters").max(100, "Too long").optional(),

  /* ✅ Highest Score (0–999 allowed) */
  highestScore: z.preprocess(
    (val) => {
      if (val === "" || val === null || val === undefined) return undefined;
      const num = Number(val);
      return Number.isFinite(num) ? num : undefined;
    },
    z
      .number({
        required_error: "Highest score is required",
        invalid_type_error: "Enter a valid number",
      })
      .min(0, "Score cannot be negative")
      .max(999, "Score cannot be more than 3 digits")
  ),

  /* ✅ Best Bowling → format wickets/runs like 5/23 */
  bestBowling: z
    .string({
      required_error: "Best bowling figure is required",
    })
    .regex(/^\d+\/\d+$/, "Format must be like 5/23")
    .refine((val) => {
      const [w, r] = val.split("/").map(Number);
      return w >= 0 && w <= 10;
    }, "Wickets must be between 0–10")
    .refine((val) => {
      const [w, r] = val.split("/").map(Number);
      return r >= 0 && r <= 999;
    }, "Runs must be between 0–999"),

  /* ✅ Tournaments → Number (0–500) OR Text (min 3 chars) */
  tournaments: z.union([
    z.preprocess(
      (val) => {
        if (val === "" || val === null || val === undefined) return undefined;
        if (typeof val === "number") return val;
        const trimmed = String(val).trim();
        if (/^\d+$/.test(trimmed)) return Number(trimmed);
        return val;
      },
      z
        .number({
          invalid_type_error: "Enter tournaments count or names",
        })
        .min(0, "Tournaments cannot be negative")
        .max(500, "Too many tournaments (max 500)")
    ),
    z
      .string()
      .min(3, "Write tournament names or number (min 3 chars)")
  ]),

  /* ✅ Achievements → text or "None" allowed */
  achievements: z
    .string({
      required_error: "Please enter achievements or 'None'",
    })
    .trim()
    .min(3, "Write at least 3 characters")
    .max(300, "Too long (max 300 characters)")
    .refine(
      (val) => /^[a-zA-Z0-9 ,.'()\-/&]+$/.test(val) || val.toLowerCase() === "none",
      "Enter valid achievements text or type 'None'"
    ),

  /* ✅ Step 3: Media & Verification (optional) */
  videoLink: z
    .string()
    .trim()
    .url("Enter a valid URL")
    .optional()
    .or(z.literal("")).optional(),
  consent: z.boolean().optional(),
});

