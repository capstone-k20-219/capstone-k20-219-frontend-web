"use client";

import ArrowLeft from "../../../img/arrow-left.png";
import Home from "../../../img/home-outline.png";

import Card from "../_ui/Card";
import Image from "next/image";
import UserAvatar from "../_ui/UserAvatar";
import Button from "../_ui/Button";
import { useEffect, useState } from "react";
import { InputComponentType } from "@/app/interface";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

export function InputComponent({
  label,
  value,
  type,
  name,
  placeholder = "",
  disable = false,
  onChangeFunction,
}: InputComponentType) {
  return (
    <div className="w-full flex-col justify-start items-start gap-1 inline-flex text-base">
      <label htmlFor={name} className="text-black font-bold">
        {label}
      </label>
      <input
        disabled={disable}
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChangeFunction}
        className={`w-full px-4 py-2.5 rounded-md border border-neutral-300 text-neutral-900 font-normal outline-none ${
          disable ? "bg-neutral-200" : "bg-white"
        }`}
      />
    </div>
  );
}

const mockData = {
  id: "MPL2354",
  role: "Manager",
  username: "Nguyen Huu Duc",
  fullname: "Nguyen Huu Duc",
  dob: "2002-07-29",
  password: "Hoa29072002",
};

export default function ManagerProfile() {
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
    setUserID(mockData.id);
    setUserRole(mockData.role);
    setUserName(mockData.username);
    setFullName(mockData.fullname);
    setDateOfBirth(mockData.dob);
  }, []);

  return (
    <div className="Content w-full h-full px-16 pt-6 pb-12 overflow-hidden">
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        className="text-black text-opacity-70 text-base font-medium"
      >
        <Typography key="1" className="flex gap-2">
          <Image src={Home} alt="home-icon" className="w-6 h-6" />
          Home
        </Typography>
        ,<Typography key="2">Profile</Typography>
      </Breadcrumbs>
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
              <div className="w-3/5 justify-end items-start gap-6 flex flex-col">
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
                <Button
                  name="Update"
                  className="px-16 py-2.5 font-bold self-end"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
