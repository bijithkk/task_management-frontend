import { useState } from "react";
import {
  createTask,
  getTasks,
  getTodayTaskCount,
  getTodayTasks,
  updateTask,
} from "../api/tasks";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [todayCount, setTodayCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(res.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTodayTasks = async () => {
    try {
      const res = await getTodayTasks();
      setTodayTasks(res);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchTodayCount = async () => {
    try {
      const res = await getTodayTaskCount();
      setTodayCount(res.count || 0);
    } catch (err) {
      setError(err.message);
    }
  };

  const addTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateTaskById = async (taskId, updateData) => {
    try {
      const updatedTask = await updateTask(taskId, updateData);
      // Update in local state
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? updatedTask : task))
      );
      return updatedTask;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    tasks,
    todayTasks,
    todayCount,
    loading,
    error,
    addTask,
    fetchTasks,
    fetchTodayTasks,
    fetchTodayCount,
    updateTaskById
  };
}
