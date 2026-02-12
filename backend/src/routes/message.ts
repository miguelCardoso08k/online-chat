import z from "zod";
import { FastifyTypedInstance } from "../types";
import { jwtRegex } from "../utils/formtDate";
import { MessageInputSchema, MessageResponseSchema } from "../schemas/message";
import { MessageController } from "../controller/message";

export const messageRoutes = async (fastify: FastifyTypedInstance) => {
  /*  fastify.post(
    "/message",
    {
      preHandler: [fastify.authenticate],
      schema: {
        tags: ["Message"],
        summary: "Create a message",
        description: "User sender message",
        security: [{ bearerAuth: [] }],
        headers: z.object({
          authorization: z
            .string()
            .regex(jwtRegex)
            .describe("Authorization header with JWT token"),
        }),
        body: MessageInputSchema,
        response: {
          201: z.object({
            message: z.literal("message created"),
            info: MessageResponseSchema,
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
    MessageController.create,
  );*/

  /*  fastify.patch(
    "/message/:id",
    {
      preHandler: [fastify.authenticate],
      schema: {
        tags: ["Message"],
        summary: "Update the message",
        description:
          "You can only update the message if its type is equals to 'TEXT'",
        security: [{ bearerAuth: [] }],
        headers: z.object({
          authorization: z
            .string()
            .regex(jwtRegex)
            .describe("Authorization header with JWT token"),
        }),
        body: z.object({ content: z.string() }),
        response: {
          200: z.object({
            message: z.literal("message updated"),
            info: MessageResponseSchema,
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
    MessageController.update,
  ); */

  fastify.delete(
    "/message/:id",
    {
      preHandler: [fastify.authenticate],
      schema: {
        tags: ["Message"],
        summary: "Delete the message",
        description: "Delete message",
        security: [{ bearerAuth: [] }],
        headers: z.object({
          authorization: z
            .string()
            .regex(jwtRegex)
            .describe("Authorization header with JWT token"),
        }),
        response: {
          200: z.object({
            message: z.literal("message deleted"),
            info: MessageResponseSchema,
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
    MessageController.delete,
  );
};
