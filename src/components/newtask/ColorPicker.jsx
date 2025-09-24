export default function ColorPicker({ selectedColor, onSelect }) {
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
  return (
    <div className="flex flex-wrap gap-3.5 lg:gap-8 md:mt-8">
      {cardColors.map((color) => (
        <div
          key={color}
          className={`w-10 lg:w-12 h-10 lg:h-12 rounded-4xl border-2 lg:border-6 cursor-pointer ${
            selectedColor === color ? "border-gray-500" : "border-[#EDEAEA]"
          }`}
          style={{ backgroundColor: color }}
          onClick={() => onSelect(color)}
        />
      ))}
    </div>
  );
}