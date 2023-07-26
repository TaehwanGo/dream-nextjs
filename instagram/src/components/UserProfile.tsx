import { ProfileUser } from "@/model/user";
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";

type Props = {
  user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
  const { username, name, image, posts, followers, following } = user;
  const info = [
    {
      title: "posts",
      data: posts,
    },
    {
      title: "followers",
      data: followers,
    },
    {
      title: "following",
      data: following,
    },
  ];
  return (
    <section>
      <Avatar image={image} highlight />
      <div>
        <h1>{username}</h1>
      </div>
      <FollowButton user={user} />
      <ul>
        {info.map(({ title, data }, index) => (
          <li key={index}>
            <span>{data}</span>
            {title}
          </li>
        ))}
      </ul>
      <p>{name}</p>
    </section>
  );
}
