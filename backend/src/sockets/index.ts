import { FastifyInstance } from "fastify";
import { Server, Socket } from "socket.io";
import { isTokenRevoked } from "../utils/revokeTokens";
import { MessageServices } from "../service/message";
import { MessageInput } from "../schemas/message";

export const RegisterSocketEvents = (io: Server, server: FastifyInstance) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    try {
      if (isTokenRevoked(token)) new Error("revoked token");

      const payload: { sub: string; email: string; iat: number } =
        server.jwt.verify(token);

      socket.data = payload;
      socket.user = { id: payload.sub, email: payload.email };
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket: Socket) => {
    console.log("New client connection:", socket.id);

    socket.on("send_message", async (data: MessageInput) => {
      console.log(data);
      console.log(socket.user);
      const message = await MessageServices.create(data, socket.user.id);
      console.log(message);
      io.emit("", message);
    });
  });
};
