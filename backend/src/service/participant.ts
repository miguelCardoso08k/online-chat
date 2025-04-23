import { CreateParticipantInput } from "../interfaces/participant";
import { PartipantRepository } from "../repository/participant";
import { RoleEnum } from "../schemas/conversation";
import { formatDate } from "../utils/formtDate";

export const ParticipantServices = {
  async create(data: CreateParticipantInput[]) {
    const participants = await Promise.all(
      data.map(async (info) => {
        const participant = await PartipantRepository.create(info);
        const { conversationId, id, joinedAt, role, userId } = participant;
        return {
          id,
          conversationId,
          userId,
          role,
          joinedAt: formatDate(joinedAt),
        };
      })
    );

    return participants.length < 2 ? null : participants;
  },

  async getAll(id: string) {
    return await PartipantRepository.findAll(id);
  },

  async getById(id: string) {
    return await PartipantRepository.findById(id);
  },

  async updateTitle(id: string, role: RoleEnum) {
    return await PartipantRepository.updateRole(id, role);
  },

  async delete(id: string) {
    const participantExist = await this.getById(id);

    return !participantExist ? null : await PartipantRepository.delete(id);
  },
};
