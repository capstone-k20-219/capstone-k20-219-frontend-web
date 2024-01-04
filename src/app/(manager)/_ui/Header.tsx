"use client";

import { useEffect, useState } from "react";
//Assets
import User from "../../../img/user.jpg";

//Libraries
import Image from "next/image";
import { stringify } from "querystring";

export default function Header() {
  const [date, SetDate] = useState(new Date());

  return (
    <div className="w-full h-20 px-6 py-4 bg-white justify-center items-center flex">
      <div className="grow shrink basis-0 self-stretch justify-between items-center inline-flex">
        <div className="justify-start items-center flex">
          <div className="text-neutral-500 text-sm font-medium">
            {/* Thu 12/10/2023 12:24:32 */}
            {`${date}`}
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
