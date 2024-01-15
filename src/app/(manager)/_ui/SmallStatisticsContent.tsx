"use client";

export default function SmallStatisticsContent({
  name,
  value,
}: {
  name: string;
  value: string;
}) {
  return (
    <div className="w-[180px] h-24 p-4 flex-col justify-between items-start flex">
      <div className="text-neutral-500 text-xs font-medium ">{name}</div>
      <div className=" text-neutral-800 text-lg font-semibold ">{value}</div>
    </div>
  );
}
