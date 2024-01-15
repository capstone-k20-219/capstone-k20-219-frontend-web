"use client";

//Assets
import SearchIcon from "../../../img/search.png";

//Libraries
import Image from "next/image";
import Button from "../_ui/Button";

//Define

export default function SearchBar() {
  return (
    <form className="w-3/4 h-10 justify-center items-center gap-4 inline-flex">
      <div className="w-full h-10 px-3.5 py-2.5 rounded-lg border border-neutral-300 justify-start items-center gap-3 flex">
        <Image src={SearchIcon} alt="" className="w-5 h-5 relative" />
        <input
          className="w-full text-neutral-400 text-sm font-normal leading-4 outline-none border-none"
          placeholder="Search..."
        ></input>
      </div>
      <Button name="Search" className="p-3 text-sm font-normal leading-4" />
    </form>
  );
}
