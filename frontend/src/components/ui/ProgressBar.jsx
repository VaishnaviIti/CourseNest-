const ProgressBar = ({ progress, className = '' }) => {
  return (
    <div className={`w-full bg-gray-700 rounded-full h-2.5 ${className}`}>
      <div
        className="bg-gradient-to-r from-primary to-secondary h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      ></div>
      {progress > 0 && (
        <span className="text-xs text-gray-300 mt-1 block">{progress}% completed</span>
      )}
    </div>
  );
};

export default ProgressBar;
