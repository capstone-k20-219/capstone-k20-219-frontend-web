import Image from "next/image";
import Logo from "@/img/logo-black.png";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { HiAcademicCap } from "react-icons/hi";
import ButtonDispatch from "@/components/ButtonDispatch";

export default function Page() {
  return (
    <div className="w-full h-dvh text-base bg-slate-100 flex flex-col justify-between relative overflow-hidden">
      <div
        className="absolute right-0 top-0 md:-right-[10rem] md:-top-[10rem] blur-[20rem] bg-blue-600 w-1/2 md:w-1/3 aspect-square rounded-full
      opacity-80 z-0"
      ></div>
      <div
        className="absolute left-0 bottom-0 md:-left-[10rem] md:-bottom-[10rem] blur-[20rem] bg-green-600 w-1/2 md:w-1/3 aspect-square rounded-full
      opacity-80 z-0"
      ></div>
      <div className="flex p-6 w-full z-10">
        <Image
          src={Logo}
          priority={true}
          alt="Logo"
          id="logo"
          className="h-[60px] aspect-[178.476/60]"
        />
      </div>
      <div className="h-full flex flex-col items-center justify-center gap-4 text-center p-4 z-10">
        <div className="animate-fadeTopIn2 w-full text-3xl md:text-6xl font-bold">
          Welcome back to PakiSlot!
        </div>
        <p className="animate-fadeTopIn2 delay-150">
          Let's go to work now. There's a lot of thing to do in your parking
          lot.
        </p>
        <ButtonDispatch />
      </div>
      <div className="mt-auto text-center p-3 z-10">
        <div className="flex items-center justify-center p-3 gap-3">
          <FaGithub />
          <FaLinkedin />
          <SiNextdotjs />
          <HiAcademicCap />
        </div>
        <span>@ All rights reserved 2024. VNU - HCMUT. MDT-330.</span>
        <span>Author: Nguyen Viet Hoa, Pham Chau Thanh, Pham Huu Duc.</span>
      </div>
    </div>
  );
}
