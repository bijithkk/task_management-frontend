import { apiClient } from "./axiosInstance";

export async function createTask(taskData) {
  const response = await apiClient.post("/task", taskData);
  return response.data;
}

export async function getTasks(params = {}) {
  const response = await apiClient.get("/task", { params });
  return response.data;
}

export async function getTodayTaskCount() {
  const response = await apiClient.get("/task/today/count");
  return response.data;
}

export async function getTodayTasks() {
  const response = await apiClient.get("/task/today");
  return response.data;
}

export async function updateTask(taskId, updateData) {
  const response = await apiClient.patch(`/task/${taskId}`, updateData);
  return response.data;
}
