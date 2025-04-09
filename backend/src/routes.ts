import { z } from "zod";
import { FastifyTypedInstance } from "./types";

export const routes = (fastify: FastifyTypedInstance) => {
  fastify.get(
    "/user",
    {
      schema: {
        tags: ["user"],
        description: "test",
        response: { 200: z.object({ msg: z.string() }) },
      },
    },
    async (req, reply) => {
      return reply.code(200).send({ msg: "hello world" });
    }
  );
};
