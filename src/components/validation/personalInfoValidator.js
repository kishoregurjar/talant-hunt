import { z } from "zod";

export const personalInfoValidator = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[A-Za-z\s]+$/, "Name must only contain letters"),
    
  email: z.string().email("Invalid email address").min(5, "Email must be at least 5 characters long"),
    
phone: z.preprocess(
  (val) => {
    // convert number (or anything) to string for regex validation
    if (typeof val === "number") return String(val);
    if (typeof val === "string") return val.trim();
    return val;
  },
  z
    .string()
    .regex(/^[6-9]\d{9}$/, "Invalid Phone number")
    .transform((val) => Number(val)) // store as number
),

    
  gender: z.string()
    .min(1, "Please select your gender"),
    
   dob: z.object({
    day: z
      .string()
      .min(1, "Enter Complete Date of Birth")
      .refine((val) => Number(val) >= 1 && Number(val) <= 31, "Invalid day"),
    month: z
      .string()
      .min(1, "Enter Complete Date of Birth"),
    year: z
      .string()
      .min(4, "Enter Complete Date of Birth")
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
      .max(50, "City must be less than 50 characters")
     .regex(/^[A-Za-z\s]+$/, "City name cannot contain numbers or special characters"),
    state: z.string()
      .min(1, "Please select a state"),
    zip: z
  .string()
  .regex(/^[1-9][0-9]{5}$/, "Enter Valid Zip code")
  })
}).refine((data) => {
  
  const { address, city, state, zip } = data.address;
  const addressFields = [address, city, state, zip];
  const filledFields = addressFields.filter(field => field && field.trim() !== "");
  return filledFields.length === 0 || filledFields.length === addressFields.length;
}, {
  message: "Please fill all address fields or leave them all empty",
  path: ["address"]
});