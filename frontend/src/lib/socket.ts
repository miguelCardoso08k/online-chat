import Cookies from "js-cookie";
import io from "socket.io-client";
// export const socket = io("http://localhost:3333", {
//   transports: ["websocket"],
//   autoConnect: false,
// });
const URL = "http://localhost:3333";

let socket: SocketIOClient.Socket | null = null;

const userId = Cookies.get("user");
const token = Cookies.get("token");
console.log(userId);
export const getSocket = () => {
  if (!socket) {
    socket = io(URL, {
      transports: ["websocket"],
      autoConnect: false,
      auth: {
        token,
        userId,
      },
    });
  }
  return socket;
};
