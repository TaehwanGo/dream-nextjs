"use client";

import { ProfileUser } from "@/model/user";
import Button from "./ui/Button";
import useMe from "@/hooks/useMe";

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
  const showButton = loggedInUser && loggedInUser.username !== username;
  const following = loggedInUser?.following.find(
    (item) => item.username === username
  );
  const text = following ? "Unfollow" : "Follow";

  const handleFollow = () => {
    toggleFollow(user.id, !following);
  };

  return (
    <>
      {showButton && (
        <Button text={text} onClick={handleFollow} red={text === "Unfollow"} />
      )}
    </>
  );
}
