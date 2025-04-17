import { CreateConversationInput } from "../interfaces/conversation";
import { ConversationRepository } from "../repository/conversation";
import { RoleENum } from "../schemas/conversation";
import { formatDate } from "../utils/formtDate";
import { ParticipantServices } from "./participant";
interface User {
  id: string;
  role?: RoleENum;
}

interface DataCreate {
  users: User[];
  conversation: CreateConversationInput;
}

export const ConversationServices = {
  async create(data: DataCreate) {
    const conversation = await ConversationRepository.create(data.conversation);

    if (!conversation) return null;

    const users = data.users.map((user) => {
      return {
        userId: user.id,
        role: user.role,
        conversationId: conversation.id,
      };
    });

    const participants = await ParticipantServices.create(users);

    if (!participants) return null;

    const { createdAt, id, isGroup, title } = conversation;

    return {
      conversation: { id, title, isGroup, createdAt: formatDate(createdAt) },
      participants,
    };
  },

  async getAll(userId: string) {
    return await ConversationRepository.findByUserId(userId);
  },

  async getById(id: string) {
    return await ConversationRepository.findById(id);
  },

  async updateTitle(id: string, title: string) {
    const conversationExist = await this.getById(id);

    if (!conversationExist) return null;

    if (!conversationExist.isGroup) return null;

    return await ConversationRepository.updateTitle(id, title);
  },

  async delete(id: string) {
    const conversationExist = await this.getById(id);

    if (!conversationExist) return null;

    return await ConversationRepository.delete(id);
  },
};
