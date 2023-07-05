import { User } from "@/model/user";
import Avatar from "./Avatar";

interface SideBarProps {
  user: User;
}

export default function SideBar({
  user: { name, username, image },
}: SideBarProps) {
  return (
    <>
      <div>
        {image && <Avatar image={image} />}
        <p>{username}</p>
        <p>{name}</p>
      </div>
      <p>
        About . Help . Press . API . Jobs . Privacy . Terms . Locations . Top .
        Language
      </p>
      <p>@Copyright instangram from Tony</p>
    </>
  );
}
