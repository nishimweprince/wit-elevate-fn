const LoadingCard = () => {
  const styles = {
    border: {
      border: "0px 10px 20px 0px rgba(194, 194, 194, 0.16)",
    },
    shadow: {
      boxShadow: "1px 4px 24px 0px rgba(3, 2, 41, 0.06)",
    },
  };
  return (
    <div
      role="status"
      className="max-w-md p-4 space-y-4 bg-white rounded animate-pulse md:p-6 "
    >
      <div className="flex items-center justify-between" style={styles.shadow}>
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
      </div>
    </div>
  );
};

export default LoadingCard;
