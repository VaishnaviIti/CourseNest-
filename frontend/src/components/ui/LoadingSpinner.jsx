const LoadingSpinner = ({ size = 'medium' }) => {
  const sizes = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`loading-spinner ${sizes[size]}`}></div>
    </div>
  );
};

export default LoadingSpinner;
