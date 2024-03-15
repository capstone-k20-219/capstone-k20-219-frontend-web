export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white rounded-[10px] border border-gray-200 ${className}`}
    >
      {children}
    </div>
  );
}
