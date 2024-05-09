"use client";

import Image, { StaticImageData } from "next/image";
import { FaCamera } from "react-icons/fa";
import User from "@/img/user.jpg";
import { useState } from "react";

export default function UserAvatar({
  imageSrc,
  onChangeImageSrc,
  onChangeImageFile,
}: {
  imageSrc: string;
  onChangeImageSrc: (val: string) => void;
  onChangeImageFile: (val: Blob | ArrayBuffer | Uint8Array) => void;
}) {
  const handleOnChange = (e: any) => {
    const files = e.target.files;
    onChangeImageFile(files[0]);
    const filesLength = files.length;
    if (filesLength > 0) {
      const newImageSrc = URL.createObjectURL(files[0]);
      onChangeImageSrc(newImageSrc);
    }
  };

  return (
    <div
      className="w-[150px] min-w-[150px] aspect-square cursor-pointer rounded-full 
    bg-neutral-400 relative"
    >
      <Image
        src={imageSrc ? imageSrc : User}
        alt="user-image"
        loading="lazy"
        className="rounded-full w-full h-full object-cover object-center"
        width={150}
        height={150}
      />
      <input
        type="file"
        accept="image/*"
        name="avatar"
        id="avatar"
        hidden
        onChange={(e) => handleOnChange(e)}
      />
      <label
        htmlFor="avatar"
        className="w-7 h-7 absolute right-6 bottom-0 bg-neutral-700 
        rounded-full flex justify-center items-center cursor-pointer"
      >
        <FaCamera
          style={{ width: 12, height: 12, zIndex: 10, color: "#ffffff" }}
        />
      </label>
    </div>
  );
}
