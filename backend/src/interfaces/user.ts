export interface User {
  id: string;
  name: string;
  email: string;
  password: string | null;
  avatarUrl: string | null;
  createdAt: Date;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string | null;
}

export interface UserRepositoryPrisma {
  create(data: CreateUserInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  delete(id: string): Promise<User>;
  updatePassword(id: string, value: string): Promise<User>;
  listAll(): Promise<User[]>;
}
