import { z } from "zod";
import { MessageSchema } from "./message";

export const RoleSchema = z.enum(["OWNER", "ADMIN", "USER"]);

export const ConversationDetailSchema = z.object({
  id: z.string().cuid(),
  title: z.string().nullable(),
  isGroup: z.boolean(),
  imageUrl: z.string().nullable(),
  createdAt: z.string().date(),
  participants: z.array(
    z.object({
      id: z.string().cuid(),
      userId: z.string().cuid(),
      name: z.string(),
      avatarUrl: z.string().nullable(),
      role: RoleSchema,
      joinedAt: z.string().date(),
      messages: z.array(MessageSchema),
    })
  ),
});

export const ConversationDetailResponseSchema = z.object({
  message: z.string(),
  conversation: ConversationDetailSchema,
});

export const ConversationSchema = z.object({
  id: z.string().cuid(),
  title: z.string().nullable(),
  isGroup: z.boolean(),
  imageUrl: z.string().nullable(),
  createdAt: z.string().date(),
  participants: z.array(
    z.object({
      id: z.string().cuid(),
      userId: z.string().cuid(),
      name: z.string(),
      avatarUrl: z.string().nullable(),
      role: RoleSchema,
      joinedAt: z.string().date(),
    })
  ),
});

export type ConversationDetailResponse = z.infer<
  typeof ConversationDetailResponseSchema
>;
export type ConversationDetail = z.infer<typeof ConversationDetailSchema>;

export type Conversation = z.infer<typeof ConversationSchema>;
export type UserRole = z.infer<typeof RoleSchema>;
