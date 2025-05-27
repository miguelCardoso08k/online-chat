import { FastifyReply, FastifyRequest } from "fastify";
import { UserServices } from "../service/user";
import {
  UserCreateInput,
  UserLoginInput,
  UserUpdateInput,
} from "../schemas/user";
import { addRevokedToken } from "../utils/revokeTokens";

export const UserController = {
  async create(
    req: FastifyRequest<{ Body: UserCreateInput }>,
    reply: FastifyReply
  ) {
    const user = await UserServices.create(req.body);

    if (!user) return reply.code(500).send("Error");

    return reply.code(201).send({ message: "user created", user });
  },

  async login(
    req: FastifyRequest<{ Body: UserLoginInput }>,
    reply: FastifyReply
  ) {
    const user = await UserServices.login(req.body);

    if (!user) return reply.code(500).send("Error");

    const token = req.server.jwt.sign({
      sub: user.id,
      email: user.email,
    });

    return reply.code(200).send({ message: "user logged", user, token });
  },

  async logout(req: FastifyRequest, reply: FastifyReply) {
    const authHeader = req.headers.authorization;

    const token = authHeader!.replace("Bearer ", "");

    addRevokedToken(token);

    return reply.code(200).send({ message: "user logout" });
  },

  async get(req: FastifyRequest, reply: FastifyReply) {
    const user = await UserServices.getById(req.user.id);

    if (!user) return reply.code(500).send("erro");

    return reply.code(200).send({ user, message: "user info" });
  },

  async updatePassword(req: FastifyRequest, reply: FastifyReply) {
    const { value } = req.body as UserUpdateInput;

    const user = await UserServices.updatePassword(req.user.id, value);

    if (!user) return reply.code(500).send("Error");

    return reply.code(200).send({ message: "password updated" });
  },

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const user = await UserServices.delete(req.user.id);

    if (!user) return reply.code(500).send("Erro");
    const authHeader = req.headers.authorization;
    const token = authHeader!.replace("Bearer ", "");
    addRevokedToken(token);

    return reply.code(200).send({ message: "user deleted" });
  },
};
