import z from "zod";

export const MessageTypeEnumSchema = z.enum([
  "TEXT",
  "AUDIO",
  "IMAGE",
  "VIDEO",
]);

export const MessageInputSchema = z.object({
  content: z.string().optional(),
  mediaUrl: z.string().optional(),
  type: MessageTypeEnumSchema,
  conversationId: z.string().cuid(),
});

export const MessageResponseSchema = z.object({
  id: z.string().cuid(),
  content: z.string().nullable(),
  mediaUrl: z.string().nullable(),
  type: MessageTypeEnumSchema,
  senderId: z.string().cuid(),
  conversationId: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const MessageResponseArraySchema = z.array(MessageResponseSchema);

export type MessageTypeEnum = z.infer<typeof MessageTypeEnumSchema>;
export type MessageResponse = z.infer<typeof MessageResponseSchema>;
export type MessageResponseArray = z.infer<typeof MessageResponseArraySchema>;
export type MessageInput = z.infer<typeof MessageInputSchema>;
