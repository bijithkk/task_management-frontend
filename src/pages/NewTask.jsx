import { useState } from "react";
import { toast } from "react-toastify";
import { useTaskContext } from "../shared/context/TaskContext";
import { MdAddReaction } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

import Button from "../components/Button";
import Input from "../components/Input";
import ColorPicker from "../components/newtask/ColorPicker";
import RepeatCard from "../components/newtask/RepeatCard";
import Spinner from "../components/Spinner";

export default function NewTask() {
  const [loading, setLoading] = useState(false);
  const [taskData, setTaskData] = useState({
    task: "",
    description: "",
    cardColor: "#E9E3E899",
    isRecurring: false,
    recurrenceType: "weekly",
    recurrenceDays: [],
    tags: [],
  });
  const [currentTag, setCurrentTag] = useState("");

  const { addTask } = useTaskContext();

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  // Add this function to handle removing tags

  const handleAddTask = async () => {
    if (!taskData.task.trim()) {
      toast.error("Task name is required ❌");
      return;
    }
    if (!taskData.description.trim()) {
      toast.error("Task description is required ❌");
      return;
    }

    try {
      setLoading(true);
      await addTask({ ...taskData });
      toast.success("Task added successfully 🎉");

      setTaskData({
        task: "",
        description: "",
        cardColor: "",
        isRecurring: false,
        recurrenceType: "Daily",
        recurrenceDays: [],
        tags: [],
      });
    } catch (error) {
      toast.error(error.message || "Failed to add task ❌");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex items-center gap-4 mb-5">
        <h1 className="text-lg md:text-2xl font-bold">New Task</h1>
        <MdAddReaction className="w-6 md:w-10 h-6 md:h-10" />
      </div>
      <div className="flex flex-col px-6 py-3 text-lef bg-[#F8F9FA] rounded-xl mb-2">
        <Input
          name="task"
          placeholder="Name your new task"
          value={taskData.task}
          onChange={handleChange}
          className="w-full border-b border-gray-400 focus:outline-none focus:border-[#1877F2] bg-transparent"
        />
      </div>
      <div className="flex flex-col px-6 py-3 text-lef bg-[#F8F9FA] rounded-xl">
        <Input
          name="description"
          placeholder="Describe your new task"
          value={taskData.description}
          onChange={handleChange}
          className="w-full border-b border-gray-400 focus:outline-none focus:border-[#1877F2] bg-transparent"
        />
      </div>

      {/* Card Color */}
      <p className="text-[#1E1C1CCC] font-semibold mt-8">Card Color</p>

      <div className="flex flex-wrap gap-1 lg:gap-8 mt-8">
        <ColorPicker
          selectedColor={taskData.cardColor}
          onSelect={(color) => setTaskData({ ...taskData, cardColor: color })}
        />
      </div>

      {/* Repeat card */}
      <RepeatCard
        taskData={taskData}
        setTaskData={setTaskData}
        currentTag={currentTag}
        setCurrentTag={setCurrentTag}
      />

      <div className="flex justify-end mt-8">
        <Button
          onClick={handleAddTask}
          className="bg-[#F8F9FA] text-black px-4 py-4 rounded-full shadow-md hover:bg-[#0F5AD1] transition-all"
        >
          {loading ? <Spinner className={`w-8 h-8`} /> : <FaCheck />}
        </Button>
      </div>
    </>
  );
}
