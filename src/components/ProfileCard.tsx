"use client";

import { useEffect, useState } from "react";
import InputComponent from "./InputComponent";
import Button from "./Button";
import { SelfUserDBGetType, UserDBPostType } from "@/lib/type";
import { useAppSelector } from "@/redux/store";
import toast from "react-hot-toast";
import { getSelfUser, updateSelfUser } from "@/lib/services/users";
import Card from "./Card";
import ReturnBackIcon from "./ReturnBackIcon";
import UserAvatar from "./UserAvatar";
import { validateDob, validateEmail, validatePhone } from "@/lib/helpers";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDB } from "@/lib/config/firebase.config";
import { v4 } from "uuid";
import { DiVim } from "react-icons/di";
import { ProfileSkeleton } from "./Skeleton";

interface ProfileUpdateInfoFormProps {
  profile: SelfUserDBGetType;
}

interface SubInfoProps {
  email: string;
  phone: string;
  dob: string;
}

function ProfileUpdateInfoForm({ profile }: ProfileUpdateInfoFormProps) {
  const { token } = useAppSelector((state) => state.auth.value);
  const [userProfile, setUserProfile] = useState<SelfUserDBGetType>(profile);
  const [errorMessage, setErrorMessage] = useState("");
  const [imageSrc, setImageSrc] = useState<string>(profile.image);
  const [imageFile, setImageFile] = useState<
    Blob | ArrayBuffer | Uint8Array | null
  >(null);

  const handleFormChange = (e: any) => {
    setUserProfile((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeImageSrc = (newImg: string) => {
    setImageSrc(newImg);
  };

  const handleChangeImageFile = (newImg: Blob | ArrayBuffer | Uint8Array) => {
    setImageFile(newImg);
  };

  const handleValidateFormData = (
    email: string,
    phone: string,
    dob: string
  ) => {
    const validEmail = validateEmail(email);
    if (!validEmail.valid) {
      return validEmail;
    }

    const validPhone = validatePhone(phone);
    if (!validPhone.valid) {
      return validPhone;
    }

    const validDob = validateDob(dob);
    if (!validDob.valid) {
      return validDob;
    }

    return {
      valid: true,
      message: "",
      data: {
        email: validEmail.data,
        phone: validPhone.data,
        dob: validDob.data,
      } as SubInfoProps,
    };
  };

  const handleSubmitChange = async (formData: FormData) => {
    try {
      setErrorMessage("");

      const email = formData.get("email") as string;
      const phone = formData.get("phone") as string;
      const dob = formData.get("dob") as string;

      const validData = handleValidateFormData(email, phone, dob);
      if (!validData.valid) {
        setErrorMessage(validData.message);
        return;
      }

      let newUrlImg = userProfile.image;
      // upload img to firebase
      if (imageFile) {
        const imgDir = `test_img_files/${v4()}`;
        const imgRef = ref(imageDB, imgDir);
        await uploadBytes(imgRef, imageFile);
        const resFb = await getDownloadURL(ref(imageDB, imgDir));
        newUrlImg = resFb;
      }
      //--------------

      const newData: SubInfoProps = validData.data as SubInfoProps;

      const record: UserDBPostType = {
        email: newData.email,
        phone: newData.phone,
        dob: newData.dob + "T07:00:00Z",
        name: userProfile.name,
        image: newUrlImg,
      };
      const res = await updateSelfUser(token, record);
      if (res.status === 200) {
        toast.success("Information successfully updated.");
      } else if (res.status === 401) {
        // refresh token
      } else if (res.status === 500) {
        throw new Error("");
      } else {
        toast.error("Unknown error!");
      }
    } catch (error) {
      toast.error("Server error!");
    }
  };

  return (
    <div className="w-full h-full items-start flex flex-col gap-5 px-1 md:px-6 md:gap-10">
      <div className="items-start gap-6 flex flex-col md:flex-row md:items-end">
        <UserAvatar
          imageSrc={imageSrc}
          onChangeImageSrc={handleChangeImageSrc}
          onChangeImageFile={handleChangeImageFile}
        />
        <div className="flex flex-col">
          <span className="text-neutral-900 text-lg font-semibold sm:text-2xl">
            {userProfile.name}
          </span>
          <i className="text-sm font-normal">{userProfile.role[0]}</i>
        </div>
      </div>
      <form
        action={handleSubmitChange}
        className="w-full gap-2 gap-y-6 grid grid-cols-2 sm:gap-4"
      >
        <InputComponent
          name="id"
          type="text"
          value={userProfile.id}
          label="User ID"
          disable={true}
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
          value={userProfile.dob.slice(0, 10)}
          onChangeFunction={handleFormChange}
          label="Date of birth (mm/dd/yyy)"
        />
        {errorMessage && (
          <div className="mt-2.5 gap-4 text-red-500 text-sm col-span-2">
            <i>{errorMessage}</i>
          </div>
        )}
        <Button
          type="submit"
          name="Update"
          className="col-span-2 px-6 py-2 font-semibold text-sm h-fit self-end"
        />
      </form>
    </div>
  );
}

export default function ProfileCard() {
  const { token } = useAppSelector((state) => state.auth.value);
  const [profile, setProfile] = useState<SelfUserDBGetType | null>(null);

  const handleGetData = async () => {
    try {
      const res = await getSelfUser(token);
      if (res.status === 200) {
        if (res.data) {
          setProfile(res.data);
        }
      } else if (res.status === 401) {
        // refresh token
      } else if (res.status === 500) {
        throw new Error("");
      } else {
        toast.error("Unknown error!");
      }
    } catch (error) {
      toast.error("Server error!");
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <Card className="w-full h-full p-5 rounded-none shadow-xl">
      <ReturnBackIcon />
      {profile && <ProfileUpdateInfoForm profile={profile} />}
      {!profile && <ProfileSkeleton />}
    </Card>
  );
}
