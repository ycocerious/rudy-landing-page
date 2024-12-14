import { kv } from "@vercel/kv";

if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
  throw new Error("Missing KV environment variables");
}

export const redis = kv;
