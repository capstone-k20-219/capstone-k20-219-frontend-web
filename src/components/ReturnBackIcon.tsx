"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function ReturnBackIcon() {
  const router = useRouter();

  return (
    <div
      className="flex items-center gap-2 mb-4 mt-2 cursor-pointer"
      onClick={() => router.back()}
    >
      <FaArrowLeft style={{ width: 20, height: 20 }} />
      <div className="text-neutral-900 text-sm font-medium">Back</div>
    </div>
  );
}
