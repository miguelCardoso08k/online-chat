import z from "zod";
import { FastifyTypedInstance } from "../types";
import { jwtRegex } from "../utils/formtDate";
import {
  ConversationArrayResponse,
  ConversationCreateSchema,
  ConversationResponseSchema,
} from "../schemas/conversation";
import { ParticipantArrayResponse } from "../schemas/participant";
import { ConversationController } from "../controller/conversation";
import { MessageTypeEnumSchema } from "../schemas/message";

export const conversationRoutes = async (fastify: FastifyTypedInstance) => {
  fastify.post(
    "/conversation",
    {
      preHandler: [fastify.authenticate],
      schema: {
        tags: ["Conversation", "Group"],
        summary: "Create a conversation",
        description: "A authentication user create a new conversation",
        security: [{ bearerAuth: [] }],
        headers: z.object({
          authorization: z
            .string()
            .regex(jwtRegex)
            .describe("Authorization header with JWT token"),
        }),
        body: ConversationCreateSchema,
        response: {
          201: z.object({
            message: z.literal("conversation created"),
            conversation: z.object({
              info: ConversationResponseSchema,
              participants: ParticipantArrayResponse,
            }),
          }),
          400: z.object({ message: z.literal("email or password invalid") }),
          401: z.object({ message: z.literal("Unauthorized") }),
          500: z.string(),
        },
      },
    },
    ConversationController.create
  );

  fastify.get(
    "/conversation",
    {
      preHandler: [fastify.authenticate],
      schema: {
        tags: ["Conversation", "Group"],
        summary: "Get all conversation",
        description: "User gets all conversations he participates in",
        security: [{ bearerAuth: [] }],
        headers: z.object({
          authorization: z
            .string()
            .regex(jwtRegex)
            .describe("Authorization header with JWT token"),
        }),
        response: {
          200: z.object({
            message: z.literal("found conversations"),
            conversations: ConversationArrayResponse,
          }),
          400: z.object({ message: z.literal("email or password invalid") }),
          401: z.object({ message: z.literal("Unauthorized") }),
          500: z.string(),
        },
      },
    },
    ConversationController.getAll
  );

  fastify.get(
    "/conversation/:id",
    {
      preHandler: [fastify.authenticate],
      schema: {
        tags: ["Conversation", "Group"],
        summary: "Get a conversation",
        description:
          "User get information of conversation, like messages he participate in",
        security: [{ bearerAuth: [] }],
        params: z.object({ id: z.string().cuid() }),
        headers: z.object({
          authorization: z
            .string()
            .regex(jwtRegex)
            .describe("Authorization header with JWT token"),
        }),
        response: {
          200: z.object({
            message: z.literal("conversation found"),
            conversation: z.object({
              id: z.string().cuid(),
              title: z.string().nullable(),
              isGroup: z.boolean(),
              createdAt: z.string().date(),
              participants: z.array(
                z.object({
                  id: z.string().cuid(),
                  userId: z.string().cuid(),
                  name: z.string(),
                  avatarUrl: z.string().nullable(),
                  role: z.string(),
                  joinedAt: z.string().date(),
                  messages: z.array(
                    z.object({
                      id: z.string().cuid(),
                      content: z.string().nullable(),
                      mediaUrl: z.string().nullable(),
                      type: MessageTypeEnumSchema,
                      createdAt: z.date(),
                      updatedAt: z.date(),
                    })
                  ),
                })
              ),
            }),
          }),
          400: z.object({ message: z.literal("email or password invalid") }),
          401: z.object({ message: z.literal("Unauthorized") }),
          500: z.string(),
        },
      },
    },
    ConversationController.getById
  );

  fastify.patch(
    "/conversation/title/:id",
    {
      preHandler: [fastify.authenticate],
      schema: {
        tags: ["Group"],
        summary: "Update title the group",
        description: "User update title of group conversation",
        security: [{ bearerAuth: [] }],
        params: z.object({ id: z.string().cuid() }),
        headers: z.object({
          authorization: z
            .string()
            .regex(jwtRegex)
            .describe("Authorization header with JWT token"),
        }),
        response: {
          200: z.object({
            message: z.literal("updated title"),
            conversation: ConversationResponseSchema,
          }),
          400: z.object({ message: z.literal("email or password invalid") }),
          401: z.object({ message: z.literal("Unauthorized") }),
          500: z.string(),
        },
      },
    },
    () => {}
  );

  fastify.delete(
    "/conversation/:id",
    {
      preHandler: [fastify.authenticate],
      schema: {
        tags: ["Conversation"],
        summary: "Delete conversation",
        description: "User delete the conversation",
        security: [{ bearerAuth: [] }],
        params: z.object({ id: z.string().cuid() }),
        headers: z.object({
          authorization: z
            .string()
            .regex(jwtRegex)
            .describe("Authorization header with JWT token"),
        }),
        response: {
          200: z.object({
            message: z.literal("Conversation deleted"),
            conversation: z.object({
              info: ConversationResponseSchema,
              participants: ParticipantArrayResponse,
            }),
          }),
          400: z.object({ message: z.literal("email or password invalid") }),
          401: z.object({ message: z.literal("Unauthorized") }),
          500: z.string(),
        },
      },
    },
    () => {}
  );
};
