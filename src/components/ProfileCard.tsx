"use client";

import { useEffect, useRef, useState } from "react";
import InputComponent from "./InputComponent";
import Button from "./Button";
import { SelfUserDBGetType, UserDBPostType } from "@/lib/type";
import toast from "react-hot-toast";
import { getSelfUser, updateSelfUser } from "@/lib/services/users";
import Card from "./Card";
import ReturnBackIcon from "./ReturnBackIcon";
import UserAvatar from "./UserAvatar";
import {
  statusAction,
  validateDob,
  validateEmail,
  validatePhone,
} from "@/lib/helpers";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDB } from "@/lib/config/firebase.config";
import { v4 } from "uuid";
import { ProfileSkeleton } from "./Skeleton";
import useToken from "@/lib/hooks/refresh-token";
import { AiOutlineLoading } from "react-icons/ai";

interface ProfileUpdateInfoFormProps {
  profile: SelfUserDBGetType;
}

interface SubInfoProps {
  email: string;
  phone: string;
  dob: string;
}

function ProfileUpdateInfoForm({ profile }: ProfileUpdateInfoFormProps) {
  const { refreshToken, token } = useToken();
  const [userProfile, setUserProfile] = useState<SelfUserDBGetType>(profile);
  const [errorMessage, setErrorMessage] = useState("");
  const [imageSrc, setImageSrc] = useState<string>(profile.image);
  const [imageFile, setImageFile] = useState<
    Blob | ArrayBuffer | Uint8Array | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const refForm = useRef<HTMLFormElement>(null);

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
      const email = formData.get("email") as string;
      const phone = formData.get("phone") as string;
      const dob = formData.get("dob") as string;

      const validData = handleValidateFormData(email, phone, dob);
      if (!validData.valid) {
        setIsLoading(false);
        setErrorMessage(validData.message);
        return;
      }

      let newUrlImg = userProfile.image;
      // upload img to firebase
      if (imageFile) {
        const imgDir = `test_img_files/${userProfile.id}/image`;
        const imgRef = ref(imageDB, imgDir);
        await uploadBytes(imgRef, imageFile);
        const resFb = await getDownloadURL(ref(imageDB, imgDir));
        newUrlImg = resFb;
        setImageFile(null);
      }

      const newData: SubInfoProps = validData.data as SubInfoProps;

      const record: UserDBPostType = {
        email: newData.email,
        phone: newData.phone,
        dob: newData.dob + "T07:00:00Z",
        name: userProfile.name,
        image: newUrlImg,
      };

      let isUnauthorized = false;
      let newToken = token;
      do {
        if (isUnauthorized) {
          const isRefreshed = await refreshToken();
          if (!isRefreshed.valid) return;
          newToken = isRefreshed.access_token;
          isUnauthorized = false;
        }
        const res = await updateSelfUser(newToken, record);
        if (res.status === 200) {
          setIsLoading(false);
          toast.success("Information successfully updated.");
          return;
        } else if (res.status === 401) {
          isUnauthorized = true;
        } else {
          statusAction(res.status);
          setIsLoading(false);
          return;
        }
      } while (true);
    } catch (error) {
      setIsLoading(false);
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
        ref={refForm}
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
        {!isLoading && (
          <Button
            type="submit"
            name={"Save"}
            className="col-span-2 px-6 py-2 font-semibold text-sm h-fit self-end"
            onClickFunction={() => {
              setIsLoading(true);
              setErrorMessage("");
              refForm.current?.requestSubmit();
            }}
          />
        )}
        {isLoading && (
          <Button
            type="submit"
            name={"Save"}
            icon={
              <div className="animate-spin">
                <AiOutlineLoading />
              </div>
            }
            className="col-span-2 px-6 py-2 font-semibold text-sm h-fit self-end"
          />
        )}
      </form>
    </div>
  );
}

export default function ProfileCard() {
  const { refreshToken, token } = useToken();
  const [profile, setProfile] = useState<SelfUserDBGetType | null>(null);

  const handleGetData = async () => {
    try {
      let isUnauthorized = false;
      let newToken = token;
      do {
        if (isUnauthorized) {
          const isRefreshed = await refreshToken();
          if (!isRefreshed.valid) return;
          newToken = isRefreshed.access_token;
          isUnauthorized = false;
        }
        const res = await getSelfUser(newToken);
        if (res.status === 200) {
          if (res.data) {
            setProfile(res.data);
          }
          return;
        } else if (res.status === 401) {
          isUnauthorized = true;
        } else {
          statusAction(res.status);
          return;
        }
      } while (true);
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
