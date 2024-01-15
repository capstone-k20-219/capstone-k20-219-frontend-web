"use client";

export default function Button({
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
      className={`bg-neutral-900 rounded-lg justify-center items-center flex hover:brightness-125 ${className}`}
      onClick={onClickFunction}
    >
      <div className="text-center text-white">{name}</div>
    </button>
  );
}
