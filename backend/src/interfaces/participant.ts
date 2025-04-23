import { RoleEnum } from "../schemas/conversation";

export interface Participant {
  id: string;
  userId: string;
  conversationId: string;
  role: string;
  joinedAt: Date;
}

export interface CreateParticipantInput {
  userId: string;
  conversationId: string;
  role?: RoleEnum;
}

export interface ParticipantRepositoryPrisma {
  create(data: CreateParticipantInput): Promise<Participant>;
  findAll(conversationId: string): Promise<Participant[]>;
  findById(id: string): Promise<Participant | null>;
  updateRole(id: string, role: RoleEnum): Promise<Participant | null>;
  delete(id: string): Promise<Participant | null>;
}
