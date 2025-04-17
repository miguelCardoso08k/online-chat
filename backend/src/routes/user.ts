import z from "zod";
import { UserController } from "../controller/user";
import {
  UserCreateSchema,
  UserLoginSchema,
  UserResponseSchema,
  UserUpdateSchema,
} from "../schemas/user";
import { FastifyTypedInstance } from "../types";
import { jwtRegex } from "../utils/formtDate";

export const userRoutes = async (fastify: FastifyTypedInstance) => {
  fastify.post(
    "/user",
    {
      schema: {
        tags: ["User"],
        summary: "Create a new user",
        description: "You create a new user",
        body: UserCreateSchema,
        response: {
          201: z.object({
            message: z.literal("user created"),
            user: UserResponseSchema,
          }),
          500: z.string(),
        },
      },
    },
    UserController.create
  );

  fastify.post(
    "/login",
    {
      schema: {
        tags: ["Auth"],
        summary: "Login and receive a JWT token",
        description: "Get your token",
        body: UserLoginSchema,
        response: {
          200: z.object({
            message: z.literal("user logged"),
            user: UserResponseSchema,
            token: z.string().jwt(),
          }),
          400: z.object({ message: z.literal("email or password invalid") }),
          500: z.string(),
        },
      },
    },
    UserController.login
  );

    fastify.post(
    "/logout",
    {
      preHandler: [fastify.authenticate],
      schema: {
        tags: ["Auth"],
        summary: "Logout and revoke your JWT token",
        description: "Revoke your token",
        security: [{ bearerAuth: [] }],
        headers: z
          .object({
            authorization: z.string().regex(jwtRegex),
          })
          .describe("Authorization header with JWT token"),
        response: {
          200: z.object({
            message: z.literal("user logout"),
          }),
          400: z.object({ message: z.literal("email or password invalid") }),
          401: z.object({ message: z.literal("Unauthorized") }),
          500: z.string(),
        },
      },
    },
    UserController.logout
  );

  fastify.get(
    "/user/me",
    {
      preHandler: [fastify.authenticate],
      schema: {
        tags: ["User"],
        summary: "Get your acount",
        description: "User get your data",
        security: [{ bearerAuth: [] }],
        headers: z
          .object({
            authorization: z.string().regex(jwtRegex),
          })
          .describe("Authorization header with JWT token"),
        response: {
          200: z.object({
            user: UserResponseSchema,
          }),
          401: z.object({ message: z.literal("Unauthorized") }),
          500: z.string(),
        },
      },
    },
    UserController.get
  );

  fastify.patch(
    "/user/password",
    {
      preHandler: [fastify.authenticate],
      schema: {
        tags: ["User"],
        summary: "User update your password",
        description: "User update password",
        security: [{ bearerAuth: [] }],
        headers: z
          .object({
            authorization: z.string().regex(jwtRegex),
          })
          .describe("Authorization header with JWT token"),
        body: UserUpdateSchema,
        response: {
          200: z.object({
            message: z.literal("password updated"),
          }),
          401: z.object({ message: z.literal("Unauthorized") }),
          500: z.string(),
        },
      },
    },
    UserController.updatePassword
  );

  fastify.delete(
    "/user",
    {
      preHandler: [fastify.authenticate],
      schema: {
        tags: ["User"],
        summary: "Delete acount",
        description: "User delete your acount",
        security: [{ bearerAuth: [] }],
        headers: z
          .object({
            authorization: z.string().regex(jwtRegex),
          })
          .describe("Authorization header with JWT token"),
        response: {
          200: z.object({
            message: z.literal("user deleted"),
          }),
          401: z.object({ message: z.literal("Unauthorized") }),
          500: z.string(),
        },
      },
    },
    UserController.delete
  );
};
