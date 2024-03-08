import ProfileCard from "@/components/ProfileCard";

export default function Profile() {
  return (
    <div className="w-full h-[100dvh] px-4 pt-20 pb-6 overflow-hidden relative">
      <div className="absolute inset-0 z-0 w-full h-52 bg-neutral-800 p-4 px-6">
        <span className="text-white font-semibold uppercase text-xl">
          Your Profile
        </span>
      </div>
      <div className="w-full relative mx-auto h-full md:w-4/5 xl:w-3/5">
        <ProfileCard />
      </div>
    </div>
  );
}
