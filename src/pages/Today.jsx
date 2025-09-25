import { useEffect, useState } from "react";
import { GiOpenBook } from "react-icons/gi";
import { useTasks } from "../shared/hooks/useTasks";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Spinner from "../components/Spinner";

export default function Today() {
  const { tasks, fetchTasks, updateTaskById, loading } = useTasks();
  const [updatingTaskId, setUpdatingTaskId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCheckboxChange = async (taskId, isChecked) => {
    try {
      setUpdatingTaskId(taskId);
      await updateTaskById(taskId, { isCompleted: isChecked });

      if (isChecked) {
        toast.success("Task marked!");
      } else {
        toast.info("Task unmarked!");
      }

      fetchTasks();
    } catch (err) {
      console.error("Failed to update task:", err);
      toast.error("Failed to update task.");
    } finally {
      setUpdatingTaskId(null);
    }
  };

  const handleAddTask = () => {
    navigate("/dashboard/new-task");
  };

  if (loading) {
    return <Spinner className={`w-12 h-12`} />;
  }

  return (
    <div className="flex flex-col px-6 py-6">
      <h1 className="text-2xl font-bold mb-6">Today</h1>
      <div className="flex flex-col gap-4">
        {tasks.length === 0 && (
          <p className="text-gray-500">No tasks available</p>
        )}

        {tasks.map((task) => (
          <div
            key={task._id}
            className="flex items-center w-full px-2 py-2 rounded-2xl gap-4"
            style={{ backgroundColor: task.cardColor || "#f0f0f0" }}
          >
            <input
              type="checkbox"
              className="w-4 h-4 accent-[#1877F2]"
              checked={task.isCompleted || false}
              onChange={(e) => handleCheckboxChange(task._id, e.target.checked)}
              disabled={updatingTaskId === task._id}
            />
            <div className="flex items-center gap-0.5">
              <GiOpenBook className="text-xl" />
              <span>{task.task}</span>
            </div>
            {updatingTaskId === task._id && (
              <div className="ml-auto">
                <Spinner className={`w-8 h-8`} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-8">
        <Button
          onClick={handleAddTask}
          className="bg-[#F8F9FA] text-black px-4 py-4 rounded-full shadow-md hover:bg-[#0F5AD1] transition-all"
        >
          <FaPlus />
        </Button>
      </div>
    </div>
  );
}
