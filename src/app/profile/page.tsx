"use client";

import ArrowLeft from "@/img/arrow-left.png";

import Card from "@/components/Card";
import UserAvatar from "@/components/UserAvatar";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { InputComponentType } from "@/lib/type";
import Image from "next/image";
import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import InputComponent from "@/components/InputComponent";
import { mockDataProfile as profile } from "@/lib/data";
import FormControl from "@mui/material/FormControl";

export default function Profile() {
  const [userID, setUserID] = useState("MPL2354");
  const [userRole, setUserRole] = useState("Manager");
  const [userName, setUserName] = useState("Nguyen Huu Duc");
  const [fullName, setFullName] = useState("Nguyen Huu Duc");
  const [dateOfBirth, setDateOfBirth] = useState("2002-07-29");

  const handleChangeUserName = (value: string) => {
    setUserName(value);
  };
  const handleChangeFullName = (value: string) => {
    setFullName(value);
  };
  const handleChangeDateOfBirth = (value: string) => {
    setDateOfBirth(value);
  };

  useEffect(() => {
    setUserID(profile.id);
    setUserRole(profile.role);
    setUserName(profile.username);
    setFullName(profile.fullname);
    setDateOfBirth(profile.dob);
  }, []);

  return (
    <div className="Content w-full h-full px-16 pt-6 pb-12 overflow-hidden">
      <BreadcrumbsComponent dir={["Profile"]} />
      <div className="Content w-full relative my-6 pt-6 pb-12 flex flex-col gap-6 h-full overflow-auto">
        <Card className="w-full h-fit p-10 pb-12">
          <div className="flex-col justify-start items-start gap-6 flex">
            <div className="Frame120 justify-start items-center gap-4 inline-flex">
              <Image src={ArrowLeft} alt="back-icon" className="w-6 h-6" />
              <div className="text-black text-base font-medium">Back</div>
            </div>
            <div className="w-full justify-between items-start flex gap-16">
              {/* Image of profile */}
              <div className="w-2/5 flex-col justify-center items-center gap-6 inline-flex">
                <UserAvatar />
                <div className="w-full text-center text-black text-2xl font-bold line-clamp-1">
                  {fullName}
                </div>
              </div>
              {/* Information */}
              <form className="w-3/5 justify-end items-start gap-6 flex flex-col">
                {/* <FormControl> */}
                <InputComponent
                  name="userID"
                  type="text"
                  value={userID}
                  label="User ID"
                  disable={true}
                />
                <InputComponent
                  name="userRole"
                  type="text"
                  value={userRole}
                  label="Role"
                  disable={true}
                />
                <InputComponent
                  name="userName"
                  type="text"
                  value={userName}
                  label="Username"
                  onChangeFunction={(e) => handleChangeUserName(e.target.value)}
                />
                <InputComponent
                  name="fullName"
                  type="text"
                  value={fullName}
                  label="Full name"
                  onChangeFunction={(e) => handleChangeFullName(e.target.value)}
                />
                <InputComponent
                  name="dateOfBirth"
                  type="date"
                  value={dateOfBirth}
                  onChangeFunction={(e) =>
                    handleChangeDateOfBirth(e.target.value)
                  }
                  label="Date of birth"
                />
                {/* </FormControl> */}
                <Button
                  type="submit"
                  name="Update"
                  className="px-16 py-2.5 font-bold self-end"
                />
              </form>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
