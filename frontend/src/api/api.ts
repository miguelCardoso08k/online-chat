import {
  UserLoginInput,
  UserRegisterInput,
  UserUpdatePasswordInput,
} from "@/schemas/user";

const rootUrl = "http://localhost:3333/";

export const Conversation = {
  baseUrl: `${rootUrl}conversation`,

  async get(jwt: string) {
    const response = await fetch(this.baseUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    console.log(response);

    return await response.json();
  },

  async getById(id: string, jwt: string) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return await response.json();
  },
};

export const User = {
  async create(data: UserRegisterInput) {
    const { email, name, password } = data;

    const response = await fetch(`${rootUrl}user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, password }),
    });
    console.log(response);
    return await response.json();
  },

  async login(data: UserLoginInput) {
    const response = await fetch(`${rootUrl}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return await response.json();
  },

  async logout(jwt: string) {
    const response = await fetch(`${rootUrl}logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response;
  },

  async get(jwt: string) {
    const response = await fetch(`${rootUrl}user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return await response.json();
  },

  async updatePassword(data: UserUpdatePasswordInput) {
    const { password, newPassword } = data;

    const response = await fetch(`${rootUrl}user/password`, {
      method: "PATCH",
      body: JSON.stringify({ password, newPassword }),
    });

    return await response.json();
  },

  async delete() {},
};
