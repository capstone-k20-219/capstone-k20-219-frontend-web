"use client";

import { useEffect, useState } from "react";
import InputComponent from "./InputComponent";
import Button from "./Button";
import { ProfileType } from "@/lib/type";

const initialProfile: ProfileType = {
  id: "",
  role: "",
  name: "",
  email: "",
  phone: "",
  dob: "",
};

interface ProfileUpdateInfoFormProps {
  profile: ProfileType;
}
export default function ProfileUpdateInfoForm({
  profile,
}: ProfileUpdateInfoFormProps) {
  const [userProfile, setUserProfile] = useState<ProfileType>(initialProfile);

  const handleFormChange = (e: any) => {
    setUserProfile((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    setUserProfile(profile);
  }, [profile]);

  return (
    <form className="w-full gap-2 gap-y-6 grid grid-cols-2 sm:gap-4">
      {/* <FormControl> */}
      <InputComponent
        name="id"
        type="text"
        value={userProfile.id}
        label="User ID"
        disable={true}
      />
      <InputComponent
        name="role"
        type="text"
        value={userProfile.role}
        label="Role"
        disable={true}
      />
      <InputComponent
        name="name"
        type="text"
        value={userProfile.name}
        label="Username"
        onChangeFunction={handleFormChange}
      />
      <InputComponent
        name="email"
        type="email"
        value={userProfile.email}
        label="Email"
        onChangeFunction={handleFormChange}
      />
      <InputComponent
        name="phone"
        type="text"
        value={userProfile.phone}
        label="Phone"
        onChangeFunction={handleFormChange}
      />
      <InputComponent
        name="dob"
        type="date"
        value={userProfile.dob}
        onChangeFunction={handleFormChange}
        label="Date of birth"
      />
      {/* </FormControl> */}
      <Button
        type="button"
        name="Update"
        className="col-span-2 px-6 py-2 font-semibold text-sm h-fit self-end"
      />
    </form>
  );
}
