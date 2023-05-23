"use client";

import { useEffect, useState } from "react";
import styles from "./MeowArticle.module.css";

export default function MeowArticle() {
  const [text, setText] = useState("데이터 준비중...");

  useEffect(() => {
    fetch("https://meowfacts.herokuapp.com", {
      next: {
        revalidate: 0, // 3 -> ISR, 0 -> SSR
      },
      cache: "no-store", // make it always fetch like SSR
    })
      .then((res) => res.json())
      .then((data) => setText(data.data[0]));
  }, []);

  return <article className={styles.article}>{text}</article>;
}
