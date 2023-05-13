import Image from "next/image";
import { notFound } from "next/navigation";

export default function Home() {
  notFound();
  return <h1>홈 페이지</h1>;
}
