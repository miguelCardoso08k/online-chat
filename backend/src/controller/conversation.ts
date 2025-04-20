import { FastifyReply, FastifyRequest } from "fastify";
import { ConversationCreateInput } from "../schemas/conversation";
import { ConversationServices } from "../service/conversation";

export const ConversationController = {
  async create(req: FastifyRequest, reply: FastifyReply) {
    const { users, isGroup, title } = req.body as ConversationCreateInput;
    const result = await ConversationServices.create({
      users,
      conversation: { isGroup, title },
    });

    if (!result) return reply.code(500).send("Erro");

    const participants = result.participants.map((participant) => ({
      id: participant.id,
      userId: participant.userId,
      role: participant.role,
      joinedAt: participant.joinedAt,
    }));

    return reply.code(201).send({
      message: "conversation created",
      conversation: {
        info: result.conversation,
        participants,
      },
    });
  },

  async getAll(req: FastifyRequest, reply: FastifyReply) {
    const result = await ConversationServices.getAll(req.user.id);

    if (!result) return reply.code(500).send("not found");

    const conversations = result.map((conversation) => ({
      id: conversation.id,
      title: conversation.title,
      isGroup: conversation.isGroup,
      createdAt: conversation.createdAt,
      participants: conversation.participants,
    }));

    return reply
      .code(200)
      .send({ message: "found conversations", conversations });
  },

  async getById(req: FastifyRequest, reply: FastifyReply) {},

  async updateTitle(req: FastifyRequest, reply: FastifyReply) {},

  async delete(req: FastifyRequest, reply: FastifyReply) {},
};
