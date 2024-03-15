"use client";

import Button from "@/components/Button";
import { IoSearch } from "react-icons/io5";

export default function SearchBar() {
  return (
    <>
      <div
        className="w-full h-full p-2 px-3 rounded-md border border-neutral-300 
        items-center gap-3 flex focus-within:border-sky-600"
      >
        <IoSearch style={{ width: 16, height: 16 }} />
        <input
          className="w-full text-neutral-900 font-normal leading-4 outline-none border-none"
          placeholder="Search..."
          name="key-search"
        ></input>
      </div>
      <Button name="Search" className="p-2.5 px-3 leading-4" type="submit" />
    </>
  );
}
