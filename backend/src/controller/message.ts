import { FastifyReply, FastifyRequest } from "fastify";
import { MessageInput } from "../schemas/message";
import { MessageServices } from "../service/message";

export const MessageController = {
  async create(req: FastifyRequest, reply: FastifyReply) {
    const { conversationId, type, content, mediaUrl } =
      req.body as MessageInput;

    const message = await MessageServices.create(
      { conversationId, type, content, mediaUrl },
      req.user.id
    );

    if (!message) return reply.code(500).send("Erro");

    return reply.code(201).send({ message: "message created", info: message });
  },

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };

    const message = await MessageServices.delete(id);

    if (!message) return reply.code(500).send("Erro");

    return reply.code(200).send({ message: "message deleted", info: message });
  },
};
