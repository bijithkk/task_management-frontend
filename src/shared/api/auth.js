import { authClient } from "./axiosInstance";

export async function registerUser(requestData) {
  const response = await authClient.post("/auth/register", requestData);
  return response.data;
}

export async function loginUser(requestData) {
  const response = await authClient.post("/auth/login", requestData);
  return response.data; 
}
