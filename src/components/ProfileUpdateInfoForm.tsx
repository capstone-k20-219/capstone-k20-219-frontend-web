import React, { Dispatch, SetStateAction } from "react";
import InputComponent from "./InputComponent";
import Button from "./Button";

export default function ProfileUpdateInfoForm({
  userID,
  userRole,
  userName,
  fullName,
  dateOfBirth,
  onChangeUserName,
  onChangeFullName,
  onChangeDateOfBirth,
}: {
  userID: string;
  userRole: string;
  userName: string;
  fullName: string;
  dateOfBirth: string;
  onChangeUserName: Dispatch<SetStateAction<string>>;
  onChangeFullName: Dispatch<SetStateAction<string>>;
  onChangeDateOfBirth: Dispatch<SetStateAction<string>>;
}) {
  return (
    <form className="w-full gap-2 gap-y-6 grid grid-cols-2 sm:gap-4">
      {/* <FormControl> */}
      <InputComponent
        name="user-id"
        type="text"
        value={userID}
        label="User ID"
        disable={true}
      />
      <InputComponent
        name="user-role"
        type="text"
        value={userRole}
        label="Role"
        disable={true}
      />
      <InputComponent
        name="user-name"
        type="text"
        value={userName}
        label="Username"
        onChangeFunction={(e) => onChangeUserName(e.target.value)}
      />
      <InputComponent
        name="full-name"
        type="text"
        value={fullName}
        label="Full name"
        onChangeFunction={(e) => onChangeFullName(e.target.value)}
      />
      <InputComponent
        name="date-of-birth"
        type="date"
        value={dateOfBirth}
        onChangeFunction={(e) => onChangeDateOfBirth(e.target.value)}
        label="Date of birth"
      />
      {/* </FormControl> */}
      <Button
        type="button"
        name="Update"
        className="px-6 py-2 font-semibold text-sm h-fit self-end"
      />
    </form>
  );
}
