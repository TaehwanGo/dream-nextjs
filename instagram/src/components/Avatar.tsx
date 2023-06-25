import Image from "next/image";

interface AvatarProps {
  image?: string | null;
}

export default function Avatar({ image }: AvatarProps) {
  return (
    <div className="rounded-full p-[0.15rem] bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 w-9 h-9">
      {/* 
        외부 url이 있다면 추가할 수 있지만
        외부 url을 알 수 없으므로 일반 img 태그를 사용한다
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image ?? undefined}
        alt="user profile"
        className="rounded-full"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
