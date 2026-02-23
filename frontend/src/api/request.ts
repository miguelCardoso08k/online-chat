import Cookies from "js-cookie";

export default class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const BASE_URL = "http://localhost:3333/";

export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const token = Cookies.get("token");
  const hasBody = options?.body !== undefined;

  const response = await fetch(`${BASE_URL}${endpoint}`,{
    ...options,
    headers: {
     ...(hasBody && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);

    throw new ApiError(
      errorBody?.message || "An error occurred",
      response.status,
    );
  }

  return response.json();
}
