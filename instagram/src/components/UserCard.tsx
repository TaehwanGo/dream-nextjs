import { ProfileUser } from "@/model/user";
import Link from "next/link";
import Avatar from "./Avatar";

type Props = {
  user: ProfileUser;
};
export default function UserCard({
  user: { name, username, image, followers, following },
}: Props) {
  /**
   * 구현 방법 두 가지
   * - 1. 클릭 시 특정 라우터로 push
   * - 2. Link 태그를 사용
   * - 차이점 : Link태그를 사용하면 prefetching을 함
   *   - 퍼포먼스 낭비라고 생각하면 라우터 push로 구현
   *   - 더 나은 사용자 경험 : Link 태그
   */
  return (
    <Link
      className="flex items-center w-full p-4 mb-2 bg-white border rounded-sm border-neutral-300 hover:bg-neutral-50"
      href={`/user/${username}`}
    >
      <Avatar image={image} />
      <div className="text-neutral-500">
        <p className="font-bold leading-4 text-black">{username}</p>
        <p>{name}</p>
        <p className="text-sm leading-4">{`${followers} followers ${following} following`}</p>
      </div>
    </Link>
  );
}
