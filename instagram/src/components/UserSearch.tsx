"use client";

import { useState } from "react";
import useSWR from "swr";

export default function UserSearch() {
  // 사용자가 키워드를 입력, 키워드 전달 : /api/search/${keyword}
  // 검색하는 keyword가 있다면 /api/search/bob
  // 검색하는 keyword가 없다면 /api/search => 모든 사용자를 가져옴

  const [keyword, setKeyword] = useState("");
  const { data, isLoading, error } = useSWR(`/api/search/${keyword}`);

  console.log("data", data);

  return <>UserSearch</>;
}
