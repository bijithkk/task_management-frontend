import Input from "../Input";
import Button from "../Button";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function RepeatCard({
  taskData,
  setTaskData,
  currentTag,
  setCurrentTag,
}) {
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

  const handleRemoveTag = (tagToRemove) => {
    setTaskData({
      ...taskData,
      tags: taskData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="flex flex-col bg-[#F8F9FACC] rounded-2xl shadow-md px-10 py-6 mt-6">
      <p className="text-xl text-[#1E1C1CCC] font-semibold mt-4">Repeat</p>
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
              <Input
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
          <div className="px-2 py-2 w-full bg-white mt-4">
            <div className="flex flex-col py-2 text-lef bg-white rounded-xl">
              <Input
                name="tag"
                placeholder="Set a tag for your task"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleTagKeyPress}
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
                  <Button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-red-500 hover:text-red-700 font-bold text-sm"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
