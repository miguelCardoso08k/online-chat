import { z } from "zod";

export const RoleEnumSchema = z.enum(["OWNER", "ADMIN", "USER"]).optional();

export const ConversationCreateSchema = z.object({
  title: z.string().optional(),
  isGroup: z.boolean().default(false).optional(),
  users: z.array(
    z.object({
      id: z.string().cuid(),
      role: RoleEnumSchema,
    })
  ),
});

export const ConversationResponseSchema = z.object({
  id: z.string().cuid(),
  title: z.string().nullable(),
  isGroup: z.boolean(),
  createdAt: z.string().date(),
});

export const ConversationArrayResponse = z.array(ConversationResponseSchema);

export type RoleENum = z.infer<typeof RoleEnumSchema>;
export type ConversationCreateInput = z.infer<typeof ConversationCreateSchema>;
export type ConversationResponse = z.infer<typeof ConversationResponseSchema>;
