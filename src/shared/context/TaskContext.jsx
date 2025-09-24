import { createContext, useContext } from "react";
import { useTasks } from "../hooks";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const {
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
  } = useTasks();

  return (
    <TaskContext.Provider
      value={{
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
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTaskContext = () => useContext(TaskContext);