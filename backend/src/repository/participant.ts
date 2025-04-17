import { prisma } from "../../prisma/prisma-client";
import { ParticipantRepositoryPrisma } from "../interfaces/participant";

export const PartipantRepository: ParticipantRepositoryPrisma = {
  async create(data) {
    const { conversationId, role, userId } = data;

    return await prisma.conversationParticipant.create({
      data: {
        conversationId,
        userId,
        role,
      },
    });
  },

  async findAll(conversationId) {
    return await prisma.conversationParticipant.findMany({
      where: { conversationId },
    });
  },

  async findById(id) {
    return await prisma.conversationParticipant.findUnique({ where: { id } });
  },

  async updateRole(id, role) {
    return await prisma.conversationParticipant.update({
      where: { id },
      data: { role },
    });
  },

  async delete(id) {
    return await prisma.conversationParticipant.delete({ where: { id } });
  },
};
