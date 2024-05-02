"use client";

import Button from "@/components/Button";
import { ChangeEvent, RefObject, useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";

export default function SearchBar({
  reset,
  handleReset,
  onReset,
  placeholder = "Search...",
}: {
  reset: boolean;
  handleReset: (val: boolean) => void;
  onReset: () => void;
  placeholder?: string;
}) {
  const handleOnChange = (val: string) => {
    if (val && reset) {
      handleReset(false);
    } else if (!val && !reset) {
      handleReset(true);
    }
  };

  return (
    <>
      <div
        className="w-full h-full p-2 px-3 rounded-md border border-neutral-300 
        items-center gap-3 flex focus-within:border-sky-600"
      >
        <IoSearch style={{ width: 16, height: 16 }} />
        <input
          className="w-full text-neutral-900 font-normal leading-4 outline-none border-none"
          placeholder={placeholder}
          name="key-search"
          onChange={(e) => handleOnChange(e.target.value)}
        ></input>
        {!reset && (
          <IoClose
            style={{ width: 16, height: 16, color: "gray" }}
            onClick={() => {
              onReset();
            }}
            className="hover:rounded hover:bg-gray-50 hover:fill-black/80"
          />
        )}
      </div>
      <Button name="Search" className="p-2.5 px-3 leading-4" type="submit" />
    </>
  );
}
