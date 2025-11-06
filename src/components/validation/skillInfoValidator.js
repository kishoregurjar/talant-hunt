
import { z } from "zod";

export const skillInfoValidator = z.object({
  /* ✅ Step 1: Cricket Profile */
  role: z.string().min(1, "Please select playing role"),
  battingStyle: z.string().optional(),
  bowlingStyle: z.string().optional(),
  level: z.string().min(1, "Please select current level"),
  experience: z
    .preprocess((val) => {
      if (val === "" || val === null || val === undefined) return null;
      const num = Number(val);
      return Number.isFinite(num) ? num : undefined;
    }, z.number({ invalid_type_error: "Enter valid years of experience" }).min(0, "Experience cannot be negative").nullable()),


  // teamName: z.string().trim().min(2, "Team/Club name must be at least 2 characters").max(100, "Too long").optional(),
teamName: z.preprocess(
  (val) => {
    if (val === "" || val === null || val === undefined) return null; // ✅ user skipped input
    return String(val).trim();
  },
  z
    .string()
    .trim()
    .min(2, "Team/Club name must be at least 2 characters")
    .max(60, "Too long")
    .nullable() // ✅ allow null values
),


highestScore: z.preprocess(
  (val) => {
    // convert number (or anything) to string for regex validation
    if (typeof val === "number") return String(val);
    if (typeof val === "string") return val.trim();
    return val;
  },
  z
    .string()
    .regex(/^\d{1,3}$/, "Highest score must be a number between 0–999")
    .transform((val) => Number(val)) // store as number
),







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







tournaments: z.preprocess(
  (val) => {
    if (val === "" || val === null || val === undefined) return null; // allow skip

    // Handle numbers safely
    if (typeof val === "number") return val;

  
  const trimmed = String(val).trim();
    // Check if it's a valid non-negative integer
    if (/^\d+$/.test(trimmed)) return Number(trimmed);

    // Otherwise treat it as a string (like a tournament name)
    return trimmed;
  },
  z
    .union([
      z
        .number({
          invalid_type_error: "Enter tournaments count or names",
        })
        .min(0, "Tournaments cannot be negative")
        .max(50, "Too many tournaments"),
      z
        .string()
        .min(3, "Write tournament names or number (min 3 chars)")
    ])
    .nullable()
),


 
achievements: z.preprocess(
  (val) => {
    if (val === "" || val === null || val === undefined) return null; // user skipped input
    return String(val).trim();
  },
  z
    .string()
    .min(3, "Write at least 3 characters")
    .max(300, "Too long (max 300 characters)")
    .refine(
      (val) =>
        /^[a-zA-Z0-9 ,.'()\-/&]+$/.test(val) || val.toLowerCase() === "none",
      "Enter valid achievements text or type 'None'"
    )
    .nullable() // ✅ allow null directly inside
),


videoLink: z.preprocess(
  (val) => {
    if (val === "" || val === null || val === undefined) return null; // user skipped input
    return String(val).trim();
  },
  z
    .string()
    .url("Enter a valid URL")
    .nullable() // allow null values
),


  consent: z.boolean({
    required_error: "You must agree to the consent to proceed",
  }).refine((val) => val === true, {
    message: "You must agree to the consent to proceed",
  }),

}).superRefine((obj, ctx) => {
  const role = (obj.role || "").trim();

  // For batsman, battingStyle is required
  if (role === "Batsman" && (!obj.battingStyle || obj.battingStyle.trim() === "")) {
    ctx.addIssue({
      path: ["battingStyle"],
      code: "custom",
      message: "Please select batting style",
    });
  }

  // For bowler, both required
  if (role === "Bowler") {
    if (!obj.battingStyle || obj.battingStyle.trim() === "") {
      ctx.addIssue({
        path: ["battingStyle"],
        code: "custom",
        message: "Please select batting style",
      });
    }
    if (!obj.bowlingStyle || obj.bowlingStyle.trim() === "") {
      ctx.addIssue({
        path: ["bowlingStyle"],
        code: "custom",
        message: "Please select bowling style",
      });
    }
  }

  // For all-rounder, both required
  if (role === "All-Rounder") {
    if (!obj.battingStyle || obj.battingStyle.trim() === "") {
      ctx.addIssue({
        path: ["battingStyle"],
        code: "custom",
        message: "Please select batting style",
      });
    }
    if (!obj.bowlingStyle || obj.bowlingStyle.trim() === "") {
      ctx.addIssue({
        path: ["bowlingStyle"],
        code: "custom",
        message: "Please select bowling style",
      });
    }
  }

  // For wicket keeper, batting required but bowling not allowed
  if (role === "Wicket Keeper") {
    if (!obj.battingStyle || obj.battingStyle.trim() === "") {
      ctx.addIssue({
        path: ["battingStyle"],
        code: "custom",
        message: "Please select batting style",
      });
    }
  }
});