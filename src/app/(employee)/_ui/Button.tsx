"use client";

export default function Button({
  name,
  className,
  onClickFunction,
}: {
  name: string;
  className?: string;
  onClickFunction?: (value?: any) => void;
}) {
  return (
    <button
      type="button"
      className={`bg-neutral-900 rounded-lg justify-center items-center flex ${className}`}
    >
      <div className="text-center text-white">{name}</div>
    </button>
  );
}
