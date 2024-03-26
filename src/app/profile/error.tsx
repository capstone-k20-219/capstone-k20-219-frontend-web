"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { MdError, MdWifiTetheringError } from "react-icons/md";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="w-full h-dvh flex flex-col gap-3 items-center justify-center">
      <div className="w-3/4 bg-white border rounded-lg shadow-lg p-4 md:w-2/3">
        <div className="font-semibold text-xl text-red-800 text-center mb-4 md:text-3xl">
          <div className="flex gap-1 mb-2">
            <MdError
              style={{
                width: 32,
                height: 32,
                color: "red",
              }}
            />
            <MdWifiTetheringError
              style={{
                width: 32,
                height: 32,
                color: "red",
              }}
            />
          </div>
          {error.message}
        </div>
        <div className="w-full flex gap-3 items-center justify-center">
          <Button
            name="Go back"
            className="p-2 px-4 font-semibold w-full"
            onClickFunction={() => router.back()}
          />
          <Button
            name="Try again"
            className="p-2 px-4 font-semibold w-full"
            onClickFunction={() => reset()}
          />
        </div>
      </div>
    </div>
  );
}
