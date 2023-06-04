import Counter from "@/components/Counter";
import Image from "next/image";
import os from "os";

export default function Home() {
  console.log("안녕 ! - 서버");
  console.log(os.hostname());
  return (
    <>
      <h1>홈 페이지 v2</h1>
      <Counter />
      <Image
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
        alt="clothes"
        width={400}
        height={400}
      />
    </>
  );
}
