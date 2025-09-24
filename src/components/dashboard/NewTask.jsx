import { useState } from "react";
import { toast } from "react-toastify";
import { useTaskContext } from "../../shared/context/TaskContext";
import { MdAddReaction } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const cardColors = [
  "#ADF7B699",
  "#A817C099",
  "#FFC09F99",
  "#B0FFFA99",
  "#FCFF52F0",
  "#4EFF31",
  "#5BFFD8FC",
  "#0038FF99",
  "#622BFF99",
  "#D21DFFD9",
  "#B9235099",
  "#FF0000",
  "#E9E3E899",
];

export default function NewTask() {
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

  const handleRepeatClick = (type) => {
    setTaskData({ ...taskData, recurrenceType: type });
  };

  const handleDayClick = (day) => {
    setTaskData((prevData) => {
      const isSelected = prevData.recurrenceDays.includes(day);
      const updatedDays = isSelected
        ? prevData.recurrenceDays.filter((d) => d !== day)
        : [...prevData.recurrenceDays, day];

      return {
        ...prevData,
        recurrenceDays: updatedDays,
      };
    });
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !taskData.tags.includes(currentTag.trim())) {
      setTaskData({
        ...taskData,
        tags: [...taskData.tags, currentTag.trim()],
      });
      setCurrentTag("");
    }
  };

  // Add this function to handle removing tags
  const handleRemoveTag = (tagToRemove) => {
    setTaskData({
      ...taskData,
      tags: taskData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  // Add this function to handle Enter key press
  const handleTagKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

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
    }
  };
  return (
    <>
      <div className="flex items-center gap-4 mb-5">
        <h1 className="text-lg md:text-2xl font-bold">New Task</h1>
        <MdAddReaction className="w-6 md:w-10 h-6 md:h-10" />
      </div>
      <div className="flex flex-col px-6 py-3 text-lef bg-[#F8F9FA] rounded-xl mb-2">
        <input
          type="text"
          name="task"
          placeholder="Name your new task"
          value={taskData.task}
          onChange={handleChange}
          className="w-full border-b border-gray-400 focus:outline-none focus:border-[#1877F2] bg-transparent"
        />
      </div>
      <div className="flex flex-col px-6 py-3 text-lef bg-[#F8F9FA] rounded-xl">
        <input
          type="text"
          name="description"
          placeholder="Describe your new task"
          value={taskData.description}
          onChange={handleChange}
          className="w-full border-b border-gray-400 focus:outline-none focus:border-[#1877F2] bg-transparent"
        />
      </div>

      <p className="text-[#1E1C1CCC] font-semibold mt-8">Card Color</p>

      <div className="flex flex-wrap gap-1 lg:gap-8 mt-8">
        {cardColors.map((color) => (
          <div
            key={color}
            className={`w-10 lg:w-12 h-10 lg:h-12 rounded-4xl border-2 lg:border-6 cursor-pointer ${
              taskData.cardColor === color
                ? "border-gray-500"
                : "border-[#EDEAEA]"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setTaskData({ ...taskData, cardColor: color })}
          />
        ))}
      </div>

      <div className="flex flex-col bg-[#F8F9FACC] rounded-2xl shadow-md px-6 py-4 mt-6">
        <p className="text-[#1E1C1CCC] font-semibold mt-4">Repeat</p>
        <div className="flex flex-col lg:flex-row gap-4 md:gap-20">
          {/* left */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center justify-between mt-2">
              <div className="flex flex-col py-3 text-lef bg-[#F8F9FA] rounded-xl">
                <p className="text-[#1E1C1CCC] flex-1 focus:outline-none bg-[#F8F9FA]">
                  Set a cycle for your task
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={taskData.isRecurring === true}
                  onChange={(e) =>
                    setTaskData({
                      ...taskData,
                      isRecurring: e.target.checked,
                    })
                  }
                />
                <div className="w-8 h-4 bg-gray-200 rounded-full peer peer-checked:bg-[#0f1010] transition-all"></div>
                <div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full peer-checked:translate-x-4 transition-transform"></div>
              </label>
            </div>
            <div className="w-full border-b border-[#00000099]"></div>

            <div className="flex items-center justify-between bg-[#EDEAEA] text-[#1E1C1CCC] rounded-4xl w-full h-10 mt-4">
              {["daily", "weekly", "monthly"].map((type) => (
                <p
                  key={type}
                  className={`flex-shrink-0 px-4 sm:px-6 py-2 text-center hover:bg-[#F8F9FA] hover:rounded-2xl cursor-pointer ${
                    taskData.recurrenceType === type
                      ? "bg-[#F8F9FA] hover:rounded-2xl"
                      : ""
                  }`}
                  onClick={() => handleRepeatClick(type)}
                >
                  {type}
                </p>
              ))}
            </div>

            <div className="w-full border-b border-[#00000099] mt-4"></div>

            <div className="flex items-center justify-between mt-4 gap-3 text-[#494849]">
              {days.map((day) => (
                <div
                  key={day}
                  className={`flex items-center justify-center w-10 h-10 border rounded-3xl cursor-pointer transition-colors text-sm md:text-md lg:text-md ${
                    taskData.recurrenceDays.includes(day)
                      ? "border-[#EDEAEA] bg-[#EDEAEA] text-[#494849]"
                      : "border-[#EDEAEA] hover:border-[#1877F2] hover:bg-[#F8F9FA]"
                  }`}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="w-full border-b border-[#00000099] mt-4"></div>

            <div className="flex justify-between text-[#494849] mt-4">
              <p>Repeat</p>
              <p>Every week</p>
            </div>
            <div className="w-full border-b border-[#00000099] mt-4"></div>
          </div>

          {/* right */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="px-2 py-2 w-full bg-white">
              <div className="flex flex-col py-2 text-lef bg-white rounded-xl">
                <input
                  type="text"
                  name="tag"
                  placeholder="Set a tag for your task"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                  className="flex-1 focus:outline-none bg-white rounded-l-xl"
                />
              </div>

              <div className="w-full border-b border-[#00000099]"></div>

              <div className="flex flex-wrap gap-2 text-[#494849] mt-2">
                {taskData.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="border border-[#EDEAEA] bg-[#F8F9FA] px-3 py-2 rounded-3xl flex items-center gap-2"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-red-500 hover:text-red-700 font-bold text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <button
          onClick={handleAddTask}
          className="bg-[#F8F9FA] text-black px-4 py-4 rounded-full shadow-md hover:bg-[#0F5AD1] transition-all"
        >
          <FaCheck />
        </button>
      </div>
    </>
  );
}
