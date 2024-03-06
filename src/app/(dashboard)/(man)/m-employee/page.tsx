"use client";

import Card from "@/components/Card";
import Button from "@/components/Button";
import SearchBar from "@/components/SearchBar";
import TableResults from "@/components/TableResults";
import InputComponent from "@/components/InputComponent";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import ButtonWhite from "@/components/ButtonWhite";
import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import { EmployeeData } from "@/lib/type";
import { useAppSelector } from "@/redux/store";
import NoAccess from "@/components/NoAccess";
import { employeeRows } from "@/lib/data";

function AddEmployeeForm({
  onClose,
}: {
  onClose: Dispatch<SetStateAction<boolean>>;
}) {
  const [newUsername, setNewUsername] = useState("");
  const [newFullname, setNewFullname] = useState("");
  const [newDateOfBirth, setNewDateOfBirth] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <div className="w-full h-full absolute top-0 left-0 z-100 bg-neutral-200 bg-opacity-40 overflow-hidden flex items-center justify-center">
      <Card className="w-1/2 h-auto text-base p-8 py-10 ">
        <form className="w-full h-full flex-col justify-center items-start gap-2.5 flex">
          <InputComponent
            name="username"
            type="text"
            value={newUsername}
            label="Username"
            onChangeFunction={(e) => setNewUsername(e.target.value)}
          />

          <InputComponent
            name="fullname"
            type="text"
            value={newFullname}
            label="Fullname"
            onChangeFunction={(e) => setNewFullname(e.target.value)}
          />
          <InputComponent
            name="dateOfBirth"
            type="date"
            value={newDateOfBirth}
            onChangeFunction={(e) => setNewDateOfBirth(e.target.value)}
            label="Date of birth"
          />
          <InputComponent
            name="password"
            type="password"
            value={newPassword}
            onChangeFunction={(e) => setNewPassword(e.target.value)}
            label="Password"
          />

          <div className="w-full font-bold mt-4 flex gap-4">
            <ButtonWhite
              name="Cancel"
              className="w-full p-3"
              onClickFunction={() => onClose(false)}
            />
            <Button name="Add" className="w-full p-3" />
          </div>
        </form>
      </Card>
    </div>
  );
}

export default function ManagerEmployee() {
  const [isAdd, setIsAdd] = useState(false);
  const [data, setData] = useState<EmployeeData[] | null>(null);
  const role = useAppSelector((state) => state.authReducer.value.role);

  useEffect(() => {
    const retrieve = employeeRows; // use api later to fetch an format
    setData(retrieve);
  }, []);

  return (
    <Fragment>
      <BreadcrumbsComponent dir={["Employee"]} />
      <div className="w-full my-6 pt-6 pb-12 flex flex-col gap-6 h-full">
        <Card className="w-full h-full p-8 px-5">
          <div className="w-full h-full overflow-hidden flex flex-col items-center gap-9">
            {/* Searching and adding functions */}
            <div className="w-full justify-between items-center flex gap-10">
              {/* Form for searching */}
              <SearchBar />
              {/* Adding button */}
              <Button
                name="Add new account"
                className="p-3 text-sm font-normal leading-4"
                onClickFunction={() => setIsAdd(true)}
              />
            </div>
            {/* Table of results */}
            <TableResults tableType="employee" data={data} />
          </div>
        </Card>
        {isAdd && <AddEmployeeForm onClose={setIsAdd} />}
      </div>
    </Fragment>
  );
}
