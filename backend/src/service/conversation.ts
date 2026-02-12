import { group } from "console";
import { CreateConversationInput } from "../interfaces/conversation";
import { ConversationRepository } from "../repository/conversation";
import { RoleEnum } from "../schemas/conversation";
import { formatDate } from "../utils/formtDate";
import { MessageServices } from "./message";
import { ParticipantServices } from "./participant";
import { UserServices } from "./user";
interface User {
  id: string;
  role?: RoleEnum;
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
    const conversations = await ConversationRepository.findByUserId(userId);

    if (!conversations) return null;

    return await Promise.all(
      conversations.map(async (conversation) => {
        const participants = await ParticipantServices.getAll(conversation.id);
        const participantsFiltered = participants.filter((participant) => {
          const { id, role, joinedAt } = participant;
          if (participant.userId !== userId) {
            return {
              id,
              userId: participant.userId,
              role,
              joinedAt,
            };
          }
        });

        return {
          id: conversation.id,
          title: conversation.title,
          isGroup: conversation.isGroup,
          createdAt: formatDate(conversation.createdAt),
          participants: participantsFiltered.map((participant) => {
            const { id, joinedAt, role, userId } = participant;
            return {
              id,
              userId,
              role,
              joinedAt: formatDate(joinedAt),
            };
          }),
        };
      }),
    );
  },

  async getMyGroups(userId: string) {
    const myGroups = await ConversationRepository.findMyGroups(userId);
    return await Promise.all(
      myGroups.map(async (group) => {
        const participants = await ParticipantServices.getAll(group.id);
        const participantsFiltered = participants.filter((participant) => {
          const { id, role, joinedAt } = participant;
          if (participant.userId !== userId) {
            return { id, userId: participant.userId, role, joinedAt };
          }
        });
        return {
          id: group.id,
          title: group.title,
          isGroup: group.isGroup,
          createdAt: formatDate(group.createdAt),
          participants: participantsFiltered.map((participant) => {
            const { id, joinedAt, role, userId } = participant;
            return {
              id,
              userId,
              role,
              joinedAt: formatDate(joinedAt),
            };
          }),
        };
      }),
    );
  },

  async getById(id: string) {
    const conversation = await ConversationRepository.findById(id);

    if (!conversation) return null;
    const { isGroup, createdAt, title } = conversation;
    const participants = await ParticipantServices.getAll(id);
    const messages = await MessageServices.getByConversation(id);

    return {
      id,
      title,
      isGroup,
      createdAt: formatDate(createdAt),
      participants: await Promise.all(
        participants.map(async (participant) => {
          const user = await UserServices.getById(participant.userId);
          if (!user) return null;
          return {
            id: participant.id,
            userId: user.id,
            name: user.name,
            avatarUrl: user.avatarUrl,
            role: participant.role,
            joinedAt: formatDate(participant.joinedAt),
            messages: messages.filter(
              (message) => message.senderId === user.id,
            ),
          };
        }),
      ),
    };
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
