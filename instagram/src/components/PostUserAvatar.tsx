import Avatar from "./Avatar";

interface Props {
  username: string;
  image: string;
}

export default function PostUserAvatar({ image, username }: Props) {
  return (
    <div className="flex items-center p-2">
      <Avatar image={image} highlight size="medium" />
      <span className="ml-2 font-bold text-gray-900">{username}</span>
    </div>
  );
}
