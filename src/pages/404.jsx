import { useNavigate } from "react-router-dom";
function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex items-center justify-center w-full">
      <button
        className="bg-hover_primary p-2 transform ease-linear duration-300 rounded-xl hover:bg-[#40A2D8] hover:text-white"
        onClick={() => navigate("/")}
      >
        بازگشت به داشبورد
      </button>
    </div>
  );
}

export default PageNotFound;
