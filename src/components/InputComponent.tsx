"use client";

import { InputComponentType } from "@/lib/type";

export default function InputComponent({
  label,
  value,
  type,
  name,
  placeholder = "",
  disable = false,
  autoFocus = false,
  required = false,
  onChangeFunction,
}: InputComponentType) {
  return (
    <div className="w-full flex-col justify-start items-start gap-1 inline-flex text-sm">
      <label htmlFor={name} className="text-neutral-900 font-semibold">
        {label}
      </label>
      <input
        disabled={disable}
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        autoFocus={autoFocus}
        required={required}
        onChange={onChangeFunction}
        className={`w-full px-2 py-1.5 rounded-md border border-neutral-300 
        text-neutral-900 font-normal focus:border-sky-600 outline-none ${
          disable ? "bg-neutral-200" : "bg-white"
        }`}
      />
    </div>
  );
}
