"use client";

import { AppDispatch, useAppSelector } from "@/redux/store";
import { refreshingToken } from "../services/auth";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "@/redux/features/auth-slice";
import { setInitial } from "@/redux/features/active-slice";

const useToken = () => {
  const { uid, refresh_token, role, token } = useAppSelector(
    (state) => state.auth.value
  );
  const dispatch = useDispatch<AppDispatch>();

  const refreshToken = async () => {
    try {
      const resRefreshToken = await refreshingToken(refresh_token);
      if (resRefreshToken.status === 201) {
        dispatch(
          logIn({
            token: resRefreshToken.data.access_token,
            uid: uid,
            refresh_token: refresh_token,
            role: role,
          })
        );
        return {
          valid: true,
          access_token: String(resRefreshToken.data.access_token),
        };
      } else {
        throw new Error("unknown response from server");
      }
    } catch (error) {
      dispatch(logOut());
      dispatch(setInitial());
      return {
        valid: false,
        access_token: "",
      };
    }
  };

  return { refreshToken, token };
};

export default useToken;
