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
import {
  MessageResponseArraySchema,
  MessageTypeEnumSchema,
} from "../schemas/message";

export const conversationRoutes = async (fastify: FastifyTypedInstance) => {
  fastify.post(
    "/conversation/group",
    {
      preHandler: [fastify.authenticate],
      schema: {
        tags: ["Group"],
        summary: "Create a new group",
        description: "return a new group",
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
          400: z.object({ message: z.string() }),
          401: z.object({ message: z.string() }),
          403: z.object({ message: z.string() }),
          404: z.object({ message: z.string() }),
          409: z.object({ message: z.string() }),
          422: z.object({ message: z.string() }),
          500: z.object({ message: z.string() }),
        },
      },
    },
    ConversationController.create,
  );

  fastify.get(
    "/conversation",
    {
      preHandler: [fastify.authenticate],
      schema: {
        tags: ["Conversation"],
        summary: "Get your conversations",
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
          400: z.object({ message: z.string() }),
          401: z.object({ message: z.string() }),
          403: z.object({ message: z.string() }),
          404: z.object({ message: z.string() }),
          409: z.object({ message: z.string() }),
          422: z.object({ message: z.string() }),
          500: z.object({ message: z.string() }),
        },
      },
    },
    ConversationController.getAll,
  );

  fastify.get(
    "/conversation/groups",
    {
      preHandler: [fastify.authenticate],
      schema: {
        tags: ["Group"],
        summary: "Get groups",
        description: "Return all groups register in app",
        security: [{ bearerAuth: [] }],
        headers: z.object({
          authorization: z
            .string()
            .regex(jwtRegex)
            .describe("Authorization header with JWT token"),
        }),
        response: {
          200: z.object({
            message: z.literal("found groups"),
            groups: ConversationArrayResponse,
          }),
          400: z.object({ message: z.string() }),
          401: z.object({ message: z.string() }),
          403: z.object({ message: z.string() }),
          404: z.object({ message: z.string() }),
          409: z.object({ message: z.string() }),
          422: z.object({ message: z.string() }),
          500: z.object({ message: z.string() }),
        },
      },
    },
    ConversationController.getAllGroups,
  );

  fastify.get(
    "/conversation/groups/my",
    {
      preHandler: [fastify.authenticate],
      schema: {
        tags: ["Group"],
        summary: "Get your gruops",
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
            message: z.literal("found groups"),
            groups: ConversationArrayResponse,
          }),
          400: z.object({ message: z.string() }),
          401: z.object({ message: z.string() }),
          403: z.object({ message: z.string() }),
          404: z.object({ message: z.string() }),
          409: z.object({ message: z.string() }),
          422: z.object({ message: z.string() }),
          500: z.object({ message: z.string() }),
        },
      },
    },
    ConversationController.getMyGroups,
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
                }),
              ),
              messages: MessageResponseArraySchema,
            }),
          }),
          400: z.object({ message: z.string() }),
          401: z.object({ message: z.string() }),
          403: z.object({ message: z.string() }),
          404: z.object({ message: z.string() }),
          409: z.object({ message: z.string() }),
          422: z.object({ message: z.string() }),
          500: z.object({ message: z.string() }),
        },
      },
    },
    ConversationController.getById,
  );

  fastify.patch(
    "/conversation/title/:id",
    {
      preHandler: [fastify.authenticate],
      schema: {
        tags: ["Group", "Conversation"],
        summary: "Update title the conversation",
        description: "User update title of group or 1-1 conversation",
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
          400: z.object({ message: z.string() }),
          401: z.object({ message: z.string() }),
          403: z.object({ message: z.string() }),
          404: z.object({ message: z.string() }),
          409: z.object({ message: z.string() }),
          422: z.object({ message: z.string() }),
          500: z.object({ message: z.string() }),
        },
      },
    },
    () => {},
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
          400: z.object({ message: z.string() }),
          401: z.object({ message: z.string() }),
          403: z.object({ message: z.string() }),
          404: z.object({ message: z.string() }),
          409: z.object({ message: z.string() }),
          422: z.object({ message: z.string() }),
          500: z.object({ message: z.string() }),
        },
      },
    },
    () => {},
  );
};
