"use client";

import { useEffect, useState } from "react";
//Assets
import User from "../../../img/user.jpg";

//Libraries
import Image from "next/image";
import { stringify } from "querystring";

export default function Header() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDate(new Date()), 1000);
  }, []);

  return (
    <div className="w-full h-20 px-6 py-4 bg-white justify-center items-center flex">
      <div className="grow shrink basis-0 self-stretch justify-between items-center inline-flex">
        <div className="justify-start items-center flex">
          <div className="text-neutral-500 text-sm font-medium">
            {date.toLocaleDateString("en-GB", {
              weekday: "short",
              day: "numeric",
              month: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            })}
          </div>
        </div>
        <div className="flex-col justify-start items-center inline-flex">
          <div className="justify-start items-center inline-flex">
            <Image
              src={User}
              alt="admin"
              id="admin"
              className="w-12 h-12 rounded-full cursor-pointer"
            />
            {/* missing small menu include Profile and Logout function */}
          </div>
        </div>
      </div>
    </div>
  );
}
