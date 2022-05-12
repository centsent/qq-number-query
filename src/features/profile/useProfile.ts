import { useState, ChangeEvent, useEffect } from "react";
import { getUserInfo, UserInfo } from "./profileAPI";
import { debounce, isValidQQNumber } from "../../utils/utils";

const INVALID_QQ_NUMBER_ERROR = "please input a valid QQ number.";
const defaultUserInfo: UserInfo = {
  name: "",
  qlogo: "",
  qqnumber: "",
};

export function isEmptyUser(userInfo: UserInfo): boolean {
  const { name, qlogo, qqnumber } = userInfo;

  return qqnumber === "" && qlogo === "" && name === "";
}

/**
 * React Hooks for Profile component.
 */
export const useProfile = () => {
  const [error, setError] = useState("");
  const [qqnumber, setQqnumber] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isValid = isValidQQNumber(qqnumber);
    if (!isValid) {
      return;
    }

    setIsLoading(true);
      getUserInfo(qqnumber)
        .then((userInfo: UserInfo) => {
          setUserInfo(userInfo);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
  }, [qqnumber]);

  // Validate the input and the correct value, otherwise return an error.
  const handleChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isValid = isValidQQNumber(value);

    if (!isValid) {
      setError(INVALID_QQ_NUMBER_ERROR);
      setUserInfo(defaultUserInfo);
      return;
    }

    setError("");
    setUserInfo(defaultUserInfo);
    setQqnumber(value);
  });

  return {
    error,
    handleChange,
    isLoading,
    userInfo,
  };
};
