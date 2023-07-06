"use client";

import useSWR from "swr";

export default function FollowingBar() {
  // 1. 클라이언트 컴포넌트에서 백엔드에게 api/me 요청 -> 사용자의 정보를 얻어온다
  // 2. 백엔드에서는 현재 로그인된 사용자의 세션 정보를 이용해서 사용자의 상세 정보를 Sanity에서 가져옴(followings)
  // 3. 클라이언트 컴포넌트(FollowingBar)에서 followings의 정보를 UI에 보여줌

  const { data, isLoading, error } = useSWR("/api/hello");

  console.log("data", data);

  return <p>following bar</p>;
}
