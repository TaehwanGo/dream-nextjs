import Image from "next/image";
import profileImage from "../../public/images/profile.png";
import Link from "next/link";

/**
 * Hero : 웹 페이지를 상징하는 페이지
 */
export default function Hero() {
  return (
    <section className="text-center ">
      <Image
        className="mx-auto rounded-full  w-[250px] h-[250px] object-cover"
        src={profileImage}
        alt="picture of the author"
        priority
      />
      <h2 className="mt-2 text-3xl font-bold ">{"Hi, I'm Tony"}</h2>
      <h3 className="text-xl font-semibold ">Front-end developer</h3>
      <p>꿈을 코딩하는 사람, 토니</p>
      <Link href="/contact">
        <button className="px-4 py-1 mt-2 font-bold bg-yellow-500 rounded-xl">
          Contact
        </button>
      </Link>
    </section>
  );
}
