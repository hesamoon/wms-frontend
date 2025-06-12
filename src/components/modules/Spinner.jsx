/* eslint-disable react/prop-types */
const Spinner = ({ size = 48 }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="animate-spin rounded-full border-4 border-t-[#e9edf7]"
        style={{
          width: size,
          height: size,
          borderColor: "#e9edf71f",
          borderTopColor: "#e9edf7",
        }}
      ></div>
    </div>
  );
};

export default Spinner;
