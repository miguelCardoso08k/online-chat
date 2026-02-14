export interface Conversation {
  id: string;
  title: string | null;
  isGroup: boolean;
  createdAt: Date;
}

export interface CreateConversationInput {
  title?: string;
  isGroup?: boolean;
}

export interface ConversationRepositoryPrisma {
  create(data: CreateConversationInput): Promise<Conversation | null>;
  findGroups(): Promise<Conversation[]>;
  findMyGroups(userId: string): Promise<Conversation[]>;
  findById(id: string): Promise<Conversation | null>;
  findByUserId(userId: string): Promise<Conversation[]>;
  updateTitle(id: string, title: string): Promise<Conversation | null>;
  delete(id: string): Promise<Conversation | null>;
}
