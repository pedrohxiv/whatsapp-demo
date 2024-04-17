"use node";

import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { v } from "convex/values";
import { Webhook } from "svix";

import { internalAction } from "./_generated/server";

export const fulfill = internalAction({
  args: {
    headers: v.any(),
    payload: v.string(),
  },
  handler: async (_, args) => {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

    const payload = webhook.verify(args.payload, args.headers) as WebhookEvent;

    return payload;
  },
});
