function InputSkeleton() {
  return (
    <div className="flex flex-col gap-1 animate-pulse">
      <div className="w-3/5 h-6 bg-neutral-200 rounded-md"></div>
      <div className="w-full h-10 bg-neutral-200 rounded-md"></div>
    </div>
  );
}

function ButtonSkeleton() {
  return (
    <div className="h-10 bg-neutral-200 rounded-md col-span-2 animate-pulse"></div>
  );
}

function AvatarSkeleton() {
  return (
    <div className="w-[150px] min-w-[150px] aspect-square rounded-full bg-neutral-200 animate-pulse"></div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="w-full h-full items-start flex flex-col gap-10 px-1 md:px-6">
      <div className="w-full md:items-end gap-6 flex flex-col md:flex-row items-start">
        <AvatarSkeleton />
        <div className="flex flex-col gap-1 animate-pulse w-full">
          <span className="w-full h-8 bg-neutral-200 rounded-md"></span>
          <i className="w-2/5 h-5 bg-neutral-200 rounded-md"></i>
        </div>
      </div>
      <div className="w-full gap-2 gap-y-6 grid grid-cols-2 sm:gap-4">
        <InputSkeleton />
        <InputSkeleton />
        <InputSkeleton />
        <InputSkeleton />
        <ButtonSkeleton />
      </div>
    </div>
  );
}

export { InputSkeleton, ButtonSkeleton, ProfileSkeleton };
