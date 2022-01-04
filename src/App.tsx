import { UserCard } from "./components/UserCard";

// カスタムフックをインポート
import { useAllUsers } from "./hooks/useAllUsers";

import "./styles.css";

export default function App() {
  // カスタムフック
  const { getUsers, userProfiles, isLoading, isError } = useAllUsers();

  // データ取得ボタン押下時の処理
  const onClickFetchData = () => {
    getUsers();
  };

  return (
    <div className="App">
      <button onClick={onClickFetchData}>データ取得</button>
      <br />
      {isError ? (
        <p style={{ color: "red" }}>データ取得失敗</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {userProfiles?.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </>
      )}
    </div>
  );
}
