import { RoleENum } from "../schemas/conversation";

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
  role?: RoleENum;
}

export interface ParticipantRepositoryPrisma {
  // create(data: CreateParticipantInput[]): Promise<{ count: number}>;
  create(data: CreateParticipantInput): Promise<Participant>;
  findAll(conversationId: string): Promise<Participant[]>;
  findById(id: string): Promise<Participant | null>;
  updateRole(id: string, role: RoleENum): Promise<Participant | null>;
  delete(id: string): Promise<Participant | null>;
}
