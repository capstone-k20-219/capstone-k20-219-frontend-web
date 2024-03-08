import Image from "next/image";
import { FaCamera } from "react-icons/fa";
import User from "@/img/user.jpg";

export default function UserAvatar() {
  return (
    // missing uploading image function
    <div className="w-[150px] min-w-[150px] aspect-square cursor-pointer rounded-full bg-neutral-400 relative">
      <Image
        src={User}
        alt="user-image"
        priority={true}
        className="rounded-full w-full h-full"
      />
      <div
        className="w-7 h-7 absolute right-6 bottom-0 bg-neutral-800 
      rounded-full flex justify-center items-center"
      >
        <FaCamera
          style={{ width: 12, height: 12, zIndex: 10, color: "#ffffff" }}
        />
      </div>
    </div>
  );
}
