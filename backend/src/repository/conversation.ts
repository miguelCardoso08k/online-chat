import { prisma } from "../../prisma/prisma-client";
import { ConversationRepositoryPrisma } from "../interfaces/conversation";

export const ConversationRepository: ConversationRepositoryPrisma = {
  async create(data) {
    const { isGroup, title } = data;

    return await prisma.conversation.create({
      data: {
        title,
        isGroup,
      },
    });
  },

  async findByUserId(userId) {
    return await prisma.conversation.findMany({
      where: { participants: { some: { userId } } },
    });
  },

  async findById(id) {
    return await prisma.conversation.findUnique({ where: { id } });
  },

  async updateTitle(id, title) {
    return await prisma.conversation.update({ where: { id }, data: { title } });
  },

  async delete(id) {
    return await prisma.conversation.delete({ where: { id } });
  },
};
