import {
  ConversationsResponse,
  ConversationDetailResponse,
} from "@/schemas/conversation";
import { apiRequest } from "./request";

export const Conversation = {
  baseUrl: "conversation",

  get() {
    return apiRequest<ConversationsResponse>(this.baseUrl, {
      method: "GET",
    });
  },

  getById(id: string) {
    return apiRequest<ConversationDetailResponse>(`${this.baseUrl}/${id}`, {
      method: "GET",
    });
  },
};
