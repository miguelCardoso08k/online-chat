import "socket.io";

declare module "socket.io" {
  interface Socket {
    user: {
      id: string;
      email: string;
    };
  }
}
