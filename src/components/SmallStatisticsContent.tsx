export default function SmallStatisticsContent({
  name,
  value,
}: {
  name: string;
  value: string;
}) {
  return (
    <div className="p-4 py-3 flex-col justify-between flex gap-1 w-full h-full">
      <div className="text-neutral-500 text-xs font-medium ">{name}</div>
      <div className=" text-neutral-800 text-base font-semibold ">{value}</div>
    </div>
  );
}
