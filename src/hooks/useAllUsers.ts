// 全ユーザー一覧を取得するカスタムフック
import { useState } from "react";
import { UserProfile } from "../types/UserProfile";
import { User } from "../types/api/user";
import axios from "axios";

export const useAllUsers = () => {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const getUsers = () => {
    setLoading(true);
    setError(false);

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        // 変換をかけて必要なものだけ渡す
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        setUserProfiles(data);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { getUsers, userProfiles, isLoading, isError };
};
