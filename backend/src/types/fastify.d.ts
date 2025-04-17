import "fastify";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}

declare module "fastify" {
  interface FastifyRequest {
    user: {
      id: string;
      email: string;
    };
  }
}
