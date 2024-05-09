"use client";

export default function ButtonWhite({
  type = "button",
  name,
  icon,
  className,
  onClickFunction,
}: {
  type?: "button" | "reset" | "submit";
  name?: string;
  icon?: React.ReactNode;
  className?: string;
  onClickFunction?: (value?: any) => void;
}) {
  return (
    <button
      type={type}
      className={`bg-white border border-neutral-600 rounded-lg justify-center items-center flex 
      opacity-70 hover:opacity-100 active:scale-95 transition-all ${className}`}
      onClick={onClickFunction}
    >
      {name && <div className="text-center text-neutral-900">{name}</div>}
      {icon && <div className="text-center text-neutral-900">{icon}</div>}
    </button>
  );
}
