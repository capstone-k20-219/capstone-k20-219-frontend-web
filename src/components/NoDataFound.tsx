export default function NoDataFound({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-full p-20 px-10 text-center text-neutral-600 
      text-md sm:text-base md:text-xl"
    >
      {children}
    </div>
  );
}
