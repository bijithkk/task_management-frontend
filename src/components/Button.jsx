export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-[#F8F9FA] text-black font-semibold py-2 px-6 rounded-xl shadow-sm 
                  hover:bg-blue-700 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed 
                  ${className}`}
    >
      {children}
    </button>
  );
}
