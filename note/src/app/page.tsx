import Counter from "@/components/Counter";
import os from "os";

export default function Home() {
  console.log("안녕 ! - 서버");
  console.log(os.hostname());
  return (
    <>
      <h1>홈 페이지</h1>
      <Counter />
    </>
  );
}
