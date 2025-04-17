import "@fastify/jwt";
import {
  FastifyPluginAsync,
  FastifyRequest,
  FastifyReply,

} from "fastify";
import fp from "fastify-plugin";
import { isTokenRevoked } from "../utils/revokeTokens";

const authPlugin: FastifyPluginAsync = async (app) => {
  app.decorate(
    "authenticate",
    async function (req: FastifyRequest, reply: FastifyReply) {
      try {
        const authHeader = req.headers.authorization;

        if (!authHeader)
          return reply.code(401).send({ message: "Unauthorized" });

        const token = authHeader.replace("Bearer ", "");

        if (isTokenRevoked(token)) {
          return reply.code(401).send({ message: "Unauthorized" });
        }

        const payload: {
          sub: string;
          email: string;
          iat: number;
          exp: number;
        } = await req.jwtVerify();

        req.user = {
          id: payload.sub,
          email: payload.email,
        };
      } catch (err) {
        return reply.status(401).send({ message: "Unauthorized" });
      }
    }
  );
};

export default fp(authPlugin);
