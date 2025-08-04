import { useState } from "react";
import toast from "react-hot-toast";

function AddCategoryModal({ isOpen, onClose, onAddCategory, isLoading }) {
  const [categoryData, setCategoryData] = useState({
    name: "",
  });

  const generateRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";

    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!categoryData.name.trim()) {
      toast.error("لطفا نام دسته بندی را وارد کنید!");
      return;
    }

    // Generate code automatically when submitting
    const categoryWithCode = {
      name: categoryData.name,
      code: generateRandomCode(),
    };

    onAddCategory(categoryWithCode);
    setCategoryData({ name: "" });
  };

  const handleClose = () => {
    setCategoryData({ name: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-bg_main rounded-xl p-6 w-96 max-w-[90vw]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-secondary font-bold text-lg">افزودن دسته بندی جدید</h3>
          <button
            onClick={handleClose}
            className="text-secondary hover:text-primary transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-label_text text-sm">نام دسته بندی</label>
            <input
              type="text"
              value={categoryData.name}
              onChange={(e) =>
                setCategoryData({ ...categoryData, name: e.target.value })
              }
              className="w-full bg-bg_input p-3 rounded-lg border-none outline-none text-secondary"
              placeholder="نام دسته بندی"
            />
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-bold hover:bg-gray-600 transition-colors"
            >
              انصراف
            </button>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-1 bg-secondary text-white py-3 rounded-lg font-bold transition-colors ${
                isLoading ? "opacity-75" : "hover:bg-secondary/90"
              }`}
            >
              {isLoading ? "در حال اضافه کردن..." : "افزودن"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCategoryModal; 