export default function LoadingManagerPage() {
  return (
    <>
      <div className="flex gap-3 animate-pulse">
        <div className="w-24 h-6 bg-neutral-200 rounded"></div> <span>›</span>
        <div className="w-24 h-6 bg-neutral-200 rounded"></div>
      </div>

      <div className="mt-5 h-full w-full pb-12">
        <div className="w-full h-full rounded-[10px] animate-pulse bg-neutral-200"></div>
      </div>
    </>
  );
}
