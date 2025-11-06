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
    .regex(/^[6-9]\d{9}$/, "Invalid Phone number"),

    
  gender: z.string()
    .min(1, "Please select your gender"),
    
   dob: z.object({
    day: z
      .string()
      .min(1, "Day is required")
      .refine((val) => Number(val) >= 1 && Number(val) <= 31, "Invalid day"),
    month: z
      .string()
      .min(1, "Month is required"),
    year: z
      .string()
      .min(4, "Year is required")
      .refine((val) => Number(val) >= 1900, "Invalid year"),
  })
  .refine((dob) => {
    // Convert month name to number (January = 0, February = 1, ...)
    const monthIndex = new Date(`${dob.month} 1, ${dob.year}`).getMonth();
    const birthDate = new Date(Number(dob.year), monthIndex, Number(dob.day));
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 5; // at least 5 years old
  }, { message: "You must be at least 5 years old" }),
    
  address: z.object({
    address: z.string()
      .min(5, "Permanent address must be at least 5 characters long")
      .max(200, "Permanent address must be less than 200 characters"),
    city: z.string()
      .min(2, "City must be at least 2 characters long")
      .max(50, "City must be less than 50 characters"),
    state: z.string()
      .min(1, "Please select a state"),
    zip: z
  .string()
  .regex(/^[1-9][0-9]{5}$/, "Enter Valid Zip code")
  })
}).refine((data) => {
  // Ensure all address fields are provided if any are filled
  const { address, city, state, zip } = data.address;
  const addressFields = [address, city, state, zip];
  const filledFields = addressFields.filter(field => field && field.trim() !== "");
  return filledFields.length === 0 || filledFields.length === addressFields.length;
}, {
  message: "Please fill all address fields or leave them all empty",
  path: ["address"]
});

export const skillInfoSchema = z.object({
  /* ✅ Step 1: Cricket Profile */
  role: z.string().min(1, "Please select playing role"),
  battingStyle: z.string().optional(),
  bowlingStyle: z.string().optional(),
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

  /* ✅ Tournaments → Number (0–50) OR Text (min 3 chars), optional when empty */
  tournaments: z
    .preprocess(
      (val) => {
        if (val === "" || val === null || val === undefined) return ""; // make empty optional
        return val;
      },
      z.union([
        z.preprocess(
          (val) => {
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
            .max(50, "Too many tournaments")
        ),
        z
          .string()
          .min(3, "Write tournament names or number (min 3 chars)")
      ])
    )
    .optional(),

  /* ✅ Achievements → text or "None" allowed */
 achievements: z.preprocess(
  (val) => {
    if (val === "" || val === null || val === undefined) return ""; // makes it optional
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
).optional(),




  /* ✅ Step 3: Media & Verification (optional) */
  videoLink: z
    .string()
    .trim()
    .url("Enter a valid URL")
    .optional()
    .or(z.literal("")).optional(),
  // consent: z.boolean(),

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

