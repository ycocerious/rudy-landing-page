import { z } from "zod";
import { redis } from "./redis";

const WAITLIST_KEY = "waitlist";
const emailSchema = z.string().email("Please enter a valid email address");

export async function getWaitlist(): Promise<string[]> {
  try {
    const emails = (await redis.smembers(WAITLIST_KEY)) as string[];
    return emails;
  } catch (error) {
    console.error("Error fetching waitlist:", error);
    return [];
  }
}

export async function addToWaitlist(email: string): Promise<void> {
  const validEmail = emailSchema.parse(email);

  const exists = await redis.sismember(WAITLIST_KEY, validEmail);
  if (exists) {
    throw new Error("Email already exists");
  }

  await redis.sadd(WAITLIST_KEY, validEmail);
}
