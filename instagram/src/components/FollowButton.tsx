"use client";

import { ProfileUser } from "@/model/user";
import Button from "./ui/Button";
import useMe from "@/hooks/useMe";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { PulseLoader } from "react-spinners";

/**
 * 해당 유저 페이지의 정보를 가져와서
 * 로그인한 내가 해당 유저를 팔로우하고 있는지 아닌지 보여줘야 함
 */
type Props = {
  user: ProfileUser;
};
export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { user: loggedInUser, toggleFollow } = useMe();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;

  const showButton = loggedInUser && loggedInUser.username !== username;
  const following = loggedInUser?.following.find(
    (item) => item.username === username
  );
  const text = following ? "Unfollow" : "Follow";

  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(user.id, !following);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      {showButton && (
        <div className="relative">
          {isUpdating && (
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <PulseLoader size={6} />
            </div>
          )}
          <Button
            disabled={isUpdating}
            text={text}
            onClick={handleFollow}
            red={text === "Unfollow"}
          />
        </div>
      )}
    </>
  );
}
