/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";

function AddBuyerModal({ isOpen, onClose, onAddBuyer, isLoading }) {
  const [buyerData, setBuyerData] = useState({
    name: "",
    number: "",
    address: "",
    type: "شخص حقیقی",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!buyerData.name.trim()) {
      toast.error("لطفا نام مشتری را وارد کنید!");
      return;
    }

    if (!buyerData.number.trim()) {
      toast.error("لطفا شماره تماس مشتری را وارد کنید!");
      return;
    }

    onAddBuyer(buyerData);
    setBuyerData({
      name: "",
      number: "",
      address: "",
      type: "شخص حقیقی",
    });
  };

  const handleClose = () => {
    setBuyerData({
      name: "",
      number: "",
      address: "",
      type: "شخص حقیقی",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-bg_main rounded-xl p-6 w-96 max-w-[90vw]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-secondary font-bold text-lg">افزودن مشتری جدید</h3>
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
            <label className="text-label_text text-sm">نام مشتری *</label>
            <input
              type="text"
              value={buyerData.name}
              onChange={(e) =>
                setBuyerData({ ...buyerData, name: e.target.value })
              }
              className="w-full bg-bg_input p-3 rounded-lg border-none outline-none text-secondary"
              placeholder="نام مشتری"
            />
          </div>

          <div className="space-y-2">
            <label className="text-label_text text-sm">شماره تماس *</label>
            <input
              type="text"
              value={buyerData.number}
              onChange={(e) =>
                setBuyerData({ ...buyerData, number: e.target.value })
              }
              className="w-full bg-bg_input p-3 rounded-lg border-none outline-none text-secondary"
              placeholder="شماره تماس"
            />
          </div>

          <div className="space-y-2">
            <label className="text-label_text text-sm">آدرس</label>
            <textarea
              value={buyerData.address}
              onChange={(e) =>
                setBuyerData({ ...buyerData, address: e.target.value })
              }
              className="w-full bg-bg_input p-3 rounded-lg border-none outline-none text-secondary resize-none"
              placeholder="آدرس مشتری"
              rows="3"
            />
          </div>

          <div className="space-y-2">
            <label className="text-label_text text-sm">نوع مشتری</label>
            <select
              value={buyerData.type}
              onChange={(e) =>
                setBuyerData({ ...buyerData, type: e.target.value })
              }
              className="w-full bg-bg_input p-3 rounded-lg border-none outline-none text-secondary"
            >
              <option value="شخص حقیقی">شخص حقیقی</option>
              <option value="شخص حقوقی">شخص حقوقی</option>
            </select>
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

export default AddBuyerModal;
