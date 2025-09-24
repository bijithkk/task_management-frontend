export default function Input({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className = "",
  required = false,
  onKeyDown,
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={className}
      onKeyDown={onKeyDown}
    />
  );
}
