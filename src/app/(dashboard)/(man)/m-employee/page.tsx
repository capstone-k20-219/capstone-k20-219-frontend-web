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
import { AppDispatch, useAppSelector } from "@/redux/store";
import { employeeRows } from "@/lib/data";
import { useDispatch } from "react-redux";
import { onActive } from "@/redux/features/active-slice";

function AddEmployeeForm({
  onClose,
  open,
}: {
  onClose: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) {
  const [newUsername, setNewUsername] = useState("");
  const [newFullname, setNewFullname] = useState("");
  const [newDateOfBirth, setNewDateOfBirth] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isClose, setIsClose] = useState(true);

  return (
    open && (
      <div className="w-full h-full absolute top-0 left-0 z-100 bg-neutral-700 bg-opacity-50 overflow-hidden flex items-center justify-center">
        <Card
          className={`w-3/4 h-auto p-6 py-5 sm:w-1/2 ${
            isClose ? "animate-fadeTopIn" : "animate-fadeTopOut"
          }`}
        >
          <form className="w-full h-full flex-col justify-center gap-2.5 flex">
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

            <div className="w-full font-bold mt-2.5 flex gap-4">
              <ButtonWhite
                name="Cancel"
                className="w-full text-sm px-2.5 py-2"
                onClickFunction={() => {
                  setIsClose(false);
                  setTimeout(() => {
                    onClose(false);
                    setIsClose(true);
                  }, 300);
                }}
              />
              <Button
                name="Add"
                className="w-full text-sm px-2.5 py-2"
                type="submit"
              />
            </div>
          </form>
        </Card>
      </div>
    )
  );
}

export default function ManagerEmployee() {
  const [isAdd, setIsAdd] = useState(false);
  const [data, setData] = useState<EmployeeData[] | null>(null);

  useEffect(() => {
    const retrieve = employeeRows; // use api later to fetch an format
    setData(retrieve);
  }, []);

  return (
    <Fragment>
      <BreadcrumbsComponent dir={["Employee management"]} />
      <div className="mt-5 h-full w-full pb-12">
        <Card className="w-full h-full p-5 overflow-hidden flex flex-col items-center gap-4">
          <div className="w-full justify-between items-center flex gap-10">
            <SearchBar />
            <Button
              name="Add new account"
              className="p-2.5 px-3 leading-4 text-sm"
              onClickFunction={() => setIsAdd(true)}
            />
          </div>
          <TableResults tableType="employee" data={data} />
        </Card>
        <AddEmployeeForm onClose={setIsAdd} open={isAdd} />
      </div>
    </Fragment>
  );
}
