import Card from "./Card";

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

function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={`bg-neutral-200 rounded-[10px] border animate-pulse ${className}`}
    ></div>
  );
}

function SelectOptionSkeleton() {
  return (
    <div className="w-full h-10 rounded bg-neutral-200 animate-pulse"></div>
  );
}

/************************************* PAGE SKELETON *********************************** */

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

function MapPageSkeleton() {
  return (
    <>
      <div className="w-full h-24 items-center flex gap-3">
        <CardSkeleton className="w-full h-full"></CardSkeleton>
        <CardSkeleton className="w-full h-full"></CardSkeleton>
      </div>
      <CardSkeleton className="w-full h-full p-5"></CardSkeleton>
    </>
  );
}

function MapPageV2Skeleton() {
  return (
    <>
      <div className="w-full h-24 items-center flex gap-3">
        <CardSkeleton className="w-full h-12"></CardSkeleton>
      </div>
      <CardSkeleton className="w-full h-full p-5"></CardSkeleton>
    </>
  );
}

function ResultsServiceSkeleton() {
  return (
    <div className="flex flex-col gap-3 mt-4 h-full pb-5 animate-pulse">
      <div className="w-full h-14 bg-neutral-200 rounded"></div>
      <div className="w-full h-14 bg-neutral-200 rounded"></div>
      <div className="w-full h-14 bg-neutral-200 rounded"></div>
      <div className="w-full h-14 bg-neutral-200 rounded"></div>
    </div>
  );
}

function ResultsTableSkeleton() {
  return (
    <div className="w-full gap-3 mt-4 h-full pb-5 animate-pulse">
      <div className="w-full h-96 bg-neutral-200 rounded-[10px]"></div>
    </div>
  );
}

function FeedbackBoardSkeleton() {
  return (
    <>
      <SelectOptionSkeleton />
      <ResultsFeedbackSkeleton />
    </>
  );
}

function ServiceRequestBoardSkeleton() {
  return (
    <>
      <SelectOptionSkeleton />
      <ResultsTableSkeleton />
    </>
  );
}

function ResultsFeedbackSkeleton() {
  return (
    <div className="flex flex-col gap-3 w-full pb-5 animate-pulse items-start">
      <div className="w-2/5 h-6 bg-neutral-200 rounded-[10px] animate-pulse mb-4"></div>
      <div className="w-full h-14 bg-neutral-200 rounded-[10px]"></div>
      <div className="w-full h-14 bg-neutral-200 rounded-[10px]"></div>
      <div className="w-full h-14 bg-neutral-200 rounded-[10px]"></div>
      <div className="w-full h-14 bg-neutral-200 rounded-[10px]"></div>
      <div className="w-full h-14 bg-neutral-200 rounded-[10px]"></div>
    </div>
  );
}

export {
  InputSkeleton,
  ButtonSkeleton,
  ProfileSkeleton,
  MapPageSkeleton,
  MapPageV2Skeleton,
  ResultsServiceSkeleton,
  ResultsTableSkeleton,
  SelectOptionSkeleton,
  FeedbackBoardSkeleton,
  ResultsFeedbackSkeleton,
  ServiceRequestBoardSkeleton,
};
