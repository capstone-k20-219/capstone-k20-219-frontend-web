// import Image from "next/image";
"use client";

import { useState, useEffect } from "react";
import Login from "./login/page";
import Manager from "./(manager)/m-home/page";
import Employee from "./(employee)/e-map/page";

export default function Home() {
  const [inital, setInitial] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  // check session & cookies
  //...

  useEffect(() => {
    setInitial(true);
    // setIsManager(true);
  }, []);

  if (!inital) return null;
  else
    return (
      <div>
        {isManager ? <Manager /> : isEmployee ? <Employee /> : <Login />}
      </div>
      // <Login />
    );
}
