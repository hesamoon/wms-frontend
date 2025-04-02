/* eslint-disable react/prop-types */
function Profit({ open }) {
  return (
    <div
      className={`flex flex-col gap-6 p-8 ${open ? "pr-64" : "pr-8"} w-full`}
    >
      {/* title */}
      {!open && (
        <h2
          className={`font-bold text-2xl transition-transform duration-300 ease-in-out`}
        >
          سود
        </h2>
      )}

      {/* body */}
      <h1 className="bg-bg_main rounded-xl p-4 space-y-10 ">Profit</h1>
    </div>
  );
}

export default Profit;
