

import { z } from "zod";

export const skillInfoValidator = z
  .object({
    /* ✅ Step 1: Cricket Profile */
    role: z.string().min(1, "Please select playing role"),

    battingStyle: z.string().optional(),
    bowlingStyle: z.string().optional(),

    level: z.string().min(1, "Please select current level"),

    experience: z.preprocess(
      (val) => {
        if (val === "" || val === null || val === undefined) return null;
        const num = Number(val);
        return Number.isFinite(num) ? num : undefined;
      },
      z
        .number({
          invalid_type_error: "Enter valid years of experience",
        })
        .min(0, "Experience cannot be negative")
        .nullable()
    ),

    teamName: z.preprocess(
      (val) => {
        if (val === "" || val === null || val === undefined) return null;
        return String(val).trim();
      },
      z
        .string()
        .trim()
        .min(2, "Team/Club name must be at least 2 characters")
        .max(60, "Too long")
        .nullable()
    ),



    videoLink: z
  .string({
    required_error: "Video link is required",
    invalid_type_error: "Video link must be a string",
  })
  .min(1, "Video link is required")
  .url("Enter a valid URL"),


    consent: z
      .boolean({
        required_error: "You must agree to the consent to proceed",
      })
      .refine((val) => val === true, {
        message: "You must agree to the consent to proceed",
      }),
  })
  .superRefine((obj, ctx) => {
    const role = (obj.role || "").trim();

    // ✅ For Batsman
    if (role === "Batsman") {
      if (!obj.battingStyle || obj.battingStyle.trim() === "") {
        ctx.addIssue({
          path: ["battingStyle"],
          code: "custom",
          message: "Batting style is required for Batsman",
        });
      }
   
    }

    // ✅ For Bowler
    if (role === "Bowler") {
      if (!obj.battingStyle || obj.battingStyle.trim() === "") {
        ctx.addIssue({
          path: ["battingStyle"],
          code: "custom",
          message: "Batting style is required for Bowler",
        });
      }
      if (!obj.bowlingStyle || obj.bowlingStyle.trim() === "") {
        ctx.addIssue({
          path: ["bowlingStyle"],
          code: "custom",
          message: "Bowling style is required for Bowler",
        });
      }
    }

    // ✅ For All-Rounder
    if (role === "All-Rounder") {
      if (!obj.battingStyle || obj.battingStyle.trim() === "") {
        ctx.addIssue({
          path: ["battingStyle"],
          code: "custom",
          message: "Batting style is required for All-Rounder",
        });
      }
      if (!obj.bowlingStyle || obj.bowlingStyle.trim() === "") {
        ctx.addIssue({
          path: ["bowlingStyle"],
          code: "custom",
          message: "Bowling style is required for All-Rounder",
        });
      }
    }

    // ✅ For Wicket Keeper
    if (role === "Wicket Keeper") {
      if (!obj.battingStyle || obj.battingStyle.trim() === "") {
        ctx.addIssue({
          path: ["battingStyle"],
          code: "custom",
          message: "Batting style is required for Wicket Keeper",
        });
      }
      // Bowling is disabled → no validation here
    }
  });
