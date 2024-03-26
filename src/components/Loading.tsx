function LoadingIcon() {
  return (
    <div
      className="w-12 h-12 rounded-full border-[6px] border-white border-opacity-50
    border-t-neutral-700 animate-[spin_3s_linear_finite]"
    ></div>
  );
}

function DashboardLoadingUI() {
  return (
    <div
      className="mt-5 h-full w-full pb-12 rounded-lg 
      bg-gray-200 opacity-50 flex items-center justify-center"
    >
      <LoadingIcon />
    </div>
  );
}

export { LoadingIcon, DashboardLoadingUI };
