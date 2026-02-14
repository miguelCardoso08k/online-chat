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

      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket: Socket) => {
    console.log("New client connection:", socket.id);
    const userId = socket.handshake.auth.userId;
    socket.join(`user-${userId}`);

    socket.on("send_message", async (data: MessageInput) => {
      const message = await MessageServices.create(data, userId);

      io.emit("received_message", message);
    });

    socket.on("disconnect", () => {
      console.log(`${socket.id} foi desconectado`);
    });
  });
};
/*
send_message *
received_message *
readed_message
deleted_message *
typing_message
online_user
ofline_user
*/
