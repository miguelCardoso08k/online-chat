import { CreateUserInput } from "../interfaces/user";
import { UserRepository } from "../repository/user";
import bcrypt from "bcryptjs";
import { formatDate } from "../utils/formtDate";
import { UserLoginInput } from "../schemas/user";
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/errors";

export const UserServices = {
  async create(data: CreateUserInput) {
    const userExists = await this.getByEmail(data.email);

    if (userExists) throw new ConflictError("Email already registered");

    const password = data.password
      ? await bcrypt.hash(data.password, 10)
      : null;

    data.password = password;

    const user = await UserRepository.create(data);
    const { createdAt, email, id, name, avatarUrl } = user;

    return { id, name, email, avatarUrl, createdAt: formatDate(createdAt) };
  },

  async login(data: UserLoginInput) {
    const { email, password } = data;

    const user = await this.getByEmail(email);

    if (!user) throw new UnauthorizedError("Invalid credentials");

    if (!user.password) return null;

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new UnauthorizedError("Invalid credentials");
    const { id, name, avatarUrl, createdAt } = user;

    return { id, name, email, avatarUrl, createdAt: formatDate(createdAt) };
  },

  async getAll() {
    return await UserRepository.listAll();
  },

  async getById(id: string) {
    const user = await UserRepository.findById(id);

    if (!user) throw new NotFoundError("User not found");

    const { name, email, avatarUrl, createdAt } = user;

    return { id, name, email, avatarUrl, createdAt: formatDate(createdAt) };
  },

  async getByEmail(email: string) {
    return await UserRepository.findByEmail(email);
  },

  async updatePassword(id: string, value: string) {
    const userExists = await this.getById(id);

    if (!userExists) throw new NotFoundError("User not found");

    const password = await bcrypt.hash(value, 10);

    const user = await UserRepository.updatePassword(id, password);

    const { name, email, avatarUrl, createdAt } = user;

    return { id, name, email, avatarUrl, createdAt };
  },

  async delete(id: string) {
    const userExists = await this.getById(id);

    if (!userExists) throw new NotFoundError("User not found");

    return await UserRepository.delete(id);
  },
};
