import {
  UserLoginInput,
  UserRegisterInput,
  UserUpdatePasswordInput,
} from "@/schemas/user";
import { apiRequest } from "./request";

export const User = {
  async create(data: UserRegisterInput) {
    const { email, name, password } = data;

    const response = await fetch(`user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, password }),
    });
    console.log(response);
    return await response.json();
  },

  login(data: UserLoginInput) {
    return apiRequest("login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  logout() {
    return apiRequest("logout", {
      method: "POST"})
  },

  async get(jwt: string) {
    const response = await fetch(`user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return await response.json();
  },

  async updatePassword(data: UserUpdatePasswordInput) {
    const { password, newPassword } = data;

    const response = await fetch(`user/password`, {
      method: "PATCH",
      body: JSON.stringify({ password, newPassword }),
    });

    return await response.json();
  },

  async delete() {},
};
