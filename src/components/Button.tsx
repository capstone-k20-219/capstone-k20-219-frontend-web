export default function Button({
  type = "button",
  name,
  className,
  icon,
  onClickFunction,
}: {
  type?: "button" | "reset" | "submit";
  name?: string;
  className?: string;
  icon?: React.ReactNode;
  onClickFunction?: (value?: any) => void;
}) {
  return (
    <button
      type={type}
      className={`bg-neutral-900 rounded-md justify-center items-center flex 
      hover:bg-neutral-800 active:scale-95 transition-all ${className}`}
      onClick={onClickFunction}
    >
      {name && <div className="text-center text-white">{name}</div>}
      {icon && <div className="text-center text-white">{icon}</div>}
    </button>
  );
}
