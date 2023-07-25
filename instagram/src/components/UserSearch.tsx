"use client";

import { ProfileUser } from "@/model/user";
import { ChangeEvent, FormEvent, useState } from "react";
import useSWR from "swr";
import GridSpinner from "./ui/GridSpinner";
import UserCard from "./UserCard";

export default function UserSearch() {
  // 사용자가 키워드를 입력, 키워드 전달 : /api/search/${keyword}
  // 검색하는 keyword가 있다면 /api/search/bob
  // 검색하는 keyword가 없다면 /api/search => 모든 사용자를 가져옴

  const [keyword, setKeyword] = useState("");
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<ProfileUser[]>(`/api/search/${keyword}`);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="flex flex-col items-center w-full max-w-2xl my-4">
      <form className="w-full mb-4" onSubmit={onSubmit}>
        <input
          className="w-full p-3 text-xl border border-gray-400 outline-none"
          type="text"
          autoFocus
          placeholder="Search for a username or name"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      {error && <p>무언가가 잘못 되었음</p>}
      {isLoading && <GridSpinner />}
      {!isLoading && !error && users?.length === 0 && <p>찾는 사용자가 없음</p>}
      <ul className="w-full p-4">
        {users &&
          users.map((user) => (
            <li key={user.name}>
              {/* <p>{user.username}</p> */}
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}
