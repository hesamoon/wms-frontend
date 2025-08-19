/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

// modules
import Loader from "../modules/Loader";

function TowerModal({
  isOpen,
  onClose,
  onAddTower,
  onUpdateTower,
  isLoading,
  towerData = null,
  mode = "add",
}) {
  const [tower, setTower] = useState({
    name: "",
    size: 0,
  });

  // Initialize form with towerData if provided (for update mode)
  useEffect(() => {
    if (towerData && mode === "update") {
      setTower({
        name: towerData.name || "",
        size: towerData.size || 0,
      });
    } else {
      setTower({
        name: "",
        size: 0,
      });
    }
  }, [towerData, mode]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tower.name.trim()) {
      toast.error("لطفا نام را وارد کنید!");
      return;
    }

    if (!tower.size) {
      toast.error("لطفا ارتفاع دکل را وارد کنید!");
      return;
    }

    if (mode === "add") {
      onAddTower(tower);
    } else {
      onUpdateTower({ ...tower, id: towerData.object_id });
    }

    // Reset form
    setTower({
      name: "",
      size: 0,
    });
  };

  const handleClose = () => {
    setTower({
      name: "",
      size: 0,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-bg_main rounded-xl p-6 w-[500px] max-w-[90vw]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-secondary font-bold text-lg">
            {mode === "add" ? "افزودن دکل" : "بروزرسانی دکل"}
          </h3>
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* tower details */}
          {/* tower name */}
          <div className="space-y-1 flex-1">
            <label className="text-label_text text-sm">نام *</label>
            <div className="bg-bg_input p-2 rounded-lg">
              <input
                className="bg-transparent w-full border-none outline-none text-secondary"
                type="text"
                placeholder="نام"
                value={tower.name}
                onChange={(e) => setTower({ ...tower, name: e.target.value })}
              />
            </div>
          </div>

          {/* tower size */}
          <div className="space-y-1 flex-1">
            <label className="text-label_text text-sm">
              ارتفاع<span className="text-xs"> (متر)</span> *
            </label>
            <div className="flex items-center gap-2 bg-bg_input p-2 rounded-lg">
              <input
                className="bg-transparent w-full border-none outline-none text-secondary text-start input_number"
                type="number"
                value={tower.size}
                placeholder="0"
                onChange={(e) => setTower({ ...tower, size: e.target.value })}
              />
            </div>
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
              disabled={isLoading || !tower.name || !tower.size}
              className={`flex-1 bg-secondary text-white py-3 rounded-lg font-bold transition-colors ${
                isLoading || !tower.name || !tower.size
                  ? "opacity-75"
                  : "hover:bg-secondary/90"
              }`}
            >
              {isLoading ? (
                <>
                  {mode === "add"
                    ? "در حال اضافه کردن..."
                    : "در حال بروزرسانی..."}
                  <Loader />
                </>
              ) : mode === "add" ? (
                "افزودن"
              ) : (
                "بروزرسانی"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TowerModal;
