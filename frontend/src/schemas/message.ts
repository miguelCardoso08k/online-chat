import { z } from "zod";

export const MessageTypeEnumSchema = z.enum([
  "TEXT",
  "AUDIO",
  "IMAGE",
  "VIDEO",
]);

export const MessageSchema = z.object({
  id: z.string(),
  content: z.string(),
  mediaUrl: z.string().nullable(),
  type: MessageTypeEnumSchema,
  senderId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Message = z.infer<typeof MessageSchema>;
export type MessageTypeEnum = z.infer<typeof MessageTypeEnumSchema>;
