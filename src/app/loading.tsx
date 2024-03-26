export default function LoadingRootPage() {
  return (
    <div className="w-full h-dvh bg-gray-100 flex items-center justify-center">
      <div
        className="w-32 h-32 border-[6px] border-y-transparent flex items-center justify-center
      rounded-full animate-[spin_3s_linear_infinite] border-neutral-500 z-10"
      >
        <div
          className="w-24 h-24 border-[6px] border-y-transparent 
      rounded-full animate-[spin_3s_linear_infinite] border-neutral-500 z-10"
        ></div>
      </div>
    </div>
  );
}
