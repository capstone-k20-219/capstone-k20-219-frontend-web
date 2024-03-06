"use client";

import Image from "next/image";
import CameraIcon from "@/img/camera.png";

export default function UserAvatar() {
  return (
    // missing uploading image function
    <div className="Group98 w-64 h-64 relative cursor-pointer">
      <div className="Ellipse15 w-64 h-64 left-0 top-0 absolute bg-zinc-300 rounded-full" />
      <div className="w-[52px] h-[52px] left-[175px] top-[204px] absolute bg-black rounded-full flex justify-center items-center">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* <input
            type="file"
            className="w-full h-full abcolute left-0 top-0 outline-none border-none bg-transparent z-0"
          /> */}
          <Image
            src={CameraIcon}
            alt="camera-icon"
            className="w-4 h-4 relative z-10"
          />
        </div>
      </div>
    </div>
  );
}
