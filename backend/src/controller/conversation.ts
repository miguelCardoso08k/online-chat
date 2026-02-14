import { FastifyReply, FastifyRequest } from "fastify";
import { ConversationCreateInput, RoleEnum } from "../schemas/conversation";
import { ConversationServices } from "../service/conversation";

export const ConversationController = {
  async create(req: FastifyRequest, reply: FastifyReply) {
    const { users, isGroup, title } = req.body as ConversationCreateInput;
    const preparedUser = users.map((user) => {
      const { id } = user;
      const role: RoleEnum = id === req.user.id ? "OWNER" : "USER";

      return {
        ...user,
        role,
      };
    });
    const result = await ConversationServices.create({
      users: preparedUser,
      conversation: { isGroup, title },
    });

    if (!result) return reply.code(500).send("Erro");

    return reply.code(201).send({
      message: "conversation created",
      conversation: {
        info: result.conversation,
        participants: result.participants,
      },
    });
  },

  async getAll(req: FastifyRequest, reply: FastifyReply) {
    const conversations = await ConversationServices.getAll(req.user.id);

    return reply
      .code(200)
      .send({ message: "found conversations", conversations });
  },

  async getAllGroups(req: FastifyRequest, reply: FastifyReply) {
    const groups = await ConversationServices.getAllGroups();
    
    return reply.code(200).send({ message: "found groups", groups });
  },

  async getMyGroups(req: FastifyRequest, reply: FastifyReply) {
    const myGroups = await ConversationServices.getMyGroups(req.user.id);

    return reply.code(200).send({ message: "found groups", groups: myGroups });
  },

  async getById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };

    const conversation = await ConversationServices.getById(id);

    if (!conversation) return reply.code(500).send("erro");

    return reply
      .code(200)
      .send({ message: "conversation found", conversation });
  },

  async updateTitle(req: FastifyRequest, reply: FastifyReply) {},

  async delete(req: FastifyRequest, reply: FastifyReply) {},
};
