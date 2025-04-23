import { prisma } from "../../prisma/prisma-client";
import { MessageRepositoryPrisma } from "../interfaces/message";

export const MessageRepository: MessageRepositoryPrisma = {
  async create(data) {
    const { conversationId, senderId, type, content, mediaUrl } = data;

    return await prisma.message.create({
      data: { type, content, conversationId, senderId, mediaUrl },
    });
  },

  async getById(id) {
    return await prisma.message.findUnique({
      where: { id },
    });
  },

  async getByConversationId(conversationId) {
    return await prisma.message.findMany({ where: { conversationId } });
  },

  async update(id, content) {
    return await prisma.message.update({ where: { id }, data: { content } });
  },

  async delete(id) {
    return await prisma.message.delete({ where: { id } });
  },
};
