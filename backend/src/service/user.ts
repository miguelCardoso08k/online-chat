import { CreateUserInput } from "../interfaces/user";
import { UserRepository } from "../repository/user";
import bcrypt from "bcryptjs";
import { formatDate } from "../utils/formtDate";
import { UserLoginInput } from "../schemas/user";

export const UserServices = {
  async create(data: CreateUserInput) {
    const userExists = await this.getByEmail(data.email);

    if (!userExists) {
      const password = data.password
        ? await bcrypt.hash(data.password, 10)
        : null;

      data.password = password;

      const user = await UserRepository.create(data);
      const { createdAt, email, id, name, avatarUrl } = user;

      return { id, name, email, avatarUrl, createdAt: formatDate(createdAt) };
    }

    return null;
  },

  async login(data: UserLoginInput) {
    const { email, password } = data;

    const user = await this.getByEmail(email);

    if (!user) {
      console.log("User not found");
      return null;
    }
    if (!user.password) return null;

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log("Password invalid");
      return null;
    }
    const { id, name, avatarUrl, createdAt } = user;

    return { id, name, email, avatarUrl, createdAt: formatDate(createdAt) };
  },

  async getAll() {
    return await UserRepository.listAll();
  },

  async getById(id: string) {
    const user = await UserRepository.findById(id);

    if (!user) return null;

    const { name, email, avatarUrl, createdAt } = user;

    return { id, name, email, avatarUrl, createdAt: formatDate(createdAt) };
  },

  async getByEmail(email: string) {
    return await UserRepository.findByEmail(email);
  },

  async updatePassword(id: string, value: string) {
    const userExists = await this.getById(id);

    if (!userExists) return null;

    const password = await bcrypt.hash(value, 10);

    const user = await UserRepository.updatePassword(id, password);

    const { name, email, avatarUrl, createdAt } = user;

    return { id, name, email, avatarUrl, createdAt };
  },

  async delete(id: string) {
    const userExists = await this.getById(id);

    if (!userExists) return null;

    return await UserRepository.delete(id);
  },
};
