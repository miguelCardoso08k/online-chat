import { apiRequest } from "./request";

export const Conversation = {
  baseUrl: "conversation",

   get() {
   return apiRequest(this.baseUrl, {
      method: "GET",
    });
  },

  async getById(id: string, jwt: string) {
    console.log(id);
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const data = await response.json();

    return data;
  },
};
