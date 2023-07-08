"use client";

import { DetailUser } from "@/model/user";
import Link from "next/link";
import { PropagateLoader } from "react-spinners";
import useSWR from "swr";
import Avatar from "./Avatar";

export default function FollowingBar() {
  // 1. 클라이언트 컴포넌트에서 백엔드에게 api/me 요청 -> 사용자의 정보를 얻어온다
  // 2. 백엔드에서는 현재 로그인된 사용자의 세션 정보를 이용해서 사용자의 상세 정보를 Sanity에서 가져옴(followings)
  // 3. 클라이언트 컴포넌트(FollowingBar)에서 followings의 정보를 UI에 보여줌

  const { data, isLoading, error } = useSWR<DetailUser>("/api/me");

  const users = data?.following;

  return (
    <section>
      {isLoading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have followings`}</p>
      )}
      {users && users?.length > 0 && (
        <ul>
          {users.map(({ image, username }) => (
            <li key={username}>
              <Link href={`/user/${username}`}>
                <Avatar image={image} highlight />
                <p>{username}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}