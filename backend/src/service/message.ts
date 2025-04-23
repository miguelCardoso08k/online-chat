import { MessageRepository } from "../repository/message";
import { MessageInput } from "../schemas/message";

export const MessageServices = {
  async create(data: MessageInput, userId: string) {
    const { conversationId, type, content, mediaUrl } = data;

    return await MessageRepository.create({
      conversationId,
      senderId: userId,
      type,
      content,
      mediaUrl,
    });
  },

  async getByConversation(id: string) {
    return await MessageRepository.getByConversationId(id);
  },

  async getById(id: string) {
    return await MessageRepository.getById(id);
  },

  async update(id: string, content: string, userId: string) {
    const message = await this.getById(id);

    if (!message) return null;

    if (message.type !== "TEXT") return null;

    if (message.senderId !== userId) return null;

    return await MessageRepository.update(id, content);
  },

  async delete(id: string) {
    const message = await this.getById(id);

    if (!message) return null;

    return await MessageRepository.delete(id);
  },
};
