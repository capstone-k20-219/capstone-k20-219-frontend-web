"use client";

export default function ButtonWhite({
  type = "button",
  name,
  className,
  onClickFunction,
}: {
  type?: "button" | "reset" | "submit";
  name: string;
  className?: string;
  onClickFunction?: (value?: any) => void;
}) {
  return (
    <button
      type={type}
      className={`bg-white border border-neutral-600 rounded-lg justify-center items-center flex opacity-70 hover:opacity-100 ${className}`}
      onClick={onClickFunction}
    >
      <div className="text-center text-neutral-900">{name}</div>
    </button>
  );
}
