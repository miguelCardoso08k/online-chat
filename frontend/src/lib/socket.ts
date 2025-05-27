import io from "socket.io-client";

// export const socket = io("http://localhost:3333", {
//   transports: ["websocket"],
//   autoConnect: false,
// });
const URL = "http://localhost:3333";

let socket: SocketIOClient.Socket | null = null;

export const getSocket = (jwt: string) => {
  if (!socket) {
    socket = io(URL, {
      transports: ["websocket"],
      autoConnect: false,
      auth: {
        token: jwt,
      },
    });
  }
  return socket;
};
