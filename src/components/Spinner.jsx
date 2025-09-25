const Spinner = ({ className }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className={`${className} border-4 border-blue-500 border-dashed rounded-full animate-spin`}></div>
    </div>
  );
};

export default Spinner;
