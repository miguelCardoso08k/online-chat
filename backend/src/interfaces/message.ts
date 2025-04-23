import { MessageTypeEnum } from "../schemas/message";

export interface Message {
  id: string;
  content: string | null;
  mediaUrl: string | null;
  type: string;
  senderId: string;
  conversationId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMessageInput {
  content?: string;
  mediaUrl?: string;
  type: MessageTypeEnum;
  senderId: string;
  conversationId: string;
}

export interface MessageRepositoryPrisma {
  create(data: CreateMessageInput): Promise<Message | null>;
  getById(id: string): Promise<Message | null>;
  getByConversationId(conversationId: string): Promise<Message[]>;
  update(id: string, content: string): Promise<Message>;
  delete(id: string): Promise<Message | null>;
}
