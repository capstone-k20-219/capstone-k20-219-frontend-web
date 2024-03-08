"use client";

import Card from "@/components/Card";
import UserAvatar from "@/components/UserAvatar";
import { useEffect, useState } from "react";
import { mockDataProfile as profile } from "@/lib/data";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import ProfileUpdateInfoForm from "./ProfileUpdateInfoForm";

export default function ProfileCard() {
  const [userID, setUserID] = useState("MPL2354");
  const [userRole, setUserRole] = useState("Manager");
  const [userName, setUserName] = useState("Nguyen Huu Duc");
  const [fullName, setFullName] = useState("Nguyen Huu Duc");
  const [fullNameUnChange, setFullNameUnChange] = useState("Nguyen Huu Duc");
  const [dateOfBirth, setDateOfBirth] = useState("2002-07-29");
  const router = useRouter();

  useEffect(() => {
    setUserID(profile.id);
    setUserRole(profile.role);
    setUserName(profile.username);
    setFullName(profile.fullname);
    setDateOfBirth(profile.dob);
    setFullNameUnChange(profile.fullname);
  }, []);
  return (
    <Card className="w-full h-full p-5 rounded-none shadow-xl">
      <div
        className="flex items-center gap-2 mb-4 mt-2 cursor-pointer"
        onClick={() => router.back()}
      >
        <FaArrowLeft style={{ width: 20, height: 20 }} />
        <div className="text-neutral-900 text-sm font-medium">Back</div>
      </div>
      <div className="w-full h-full items-start flex flex-col gap-10 px-1 md:px-6">
        <div className="justify-center items-end gap-6 flex">
          <UserAvatar />
          <span className="text-neutral-900 text-lg font-semibold sm:text-2xl">
            {fullNameUnChange}
          </span>
        </div>
        <ProfileUpdateInfoForm
          userID={userID}
          userRole={userRole}
          userName={userName}
          fullName={fullName}
          dateOfBirth={dateOfBirth}
          onChangeUserName={setUserName}
          onChangeFullName={setFullName}
          onChangeDateOfBirth={setDateOfBirth}
        />
      </div>
    </Card>
  );
}
