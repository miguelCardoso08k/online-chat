import { prisma } from "../../prisma/prisma-client";
import { UserRepositoryPrisma } from "../interfaces/user";

export const UserRepository: UserRepositoryPrisma = {
  async create(data) {
    const { email, name, password } = data;
    return await prisma.user.create({ data: { email, name, password } });
  },

  async listAll() {
    return await prisma.user.findMany({});
  },

  async findByEmail(email) {
    return await prisma.user.findUnique({ where: { email } });
  },

  async findById(id) {
    return await prisma.user.findUnique({ where: { id } });
  },

  async updatePassword(id, value) {
    return await prisma.user.update({
      where: { id },
      data: { password: value },
    });
  },

  async delete(id) {
    return await prisma.user.delete({ where: { id } });
  },
};
