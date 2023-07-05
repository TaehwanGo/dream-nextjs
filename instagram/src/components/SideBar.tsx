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
      <div className="flex items-center">
        {image && <Avatar image={image} />}
        <div className="ml-4">
          <p className="font-bold">{username}</p>
          <p className="text-lg leading-4 text-neutral-500">{name}</p>
        </div>
      </div>
      <p className="mt-8 text-sm text-neutral-500">
        About . Help . Press . API . Jobs . Privacy . Terms . Locations . Top .
        Language
      </p>
      <p className="mt-8 text-sm font-bold text-neutral-500">
        @Copyright instangram from Tony
      </p>
    </>
  );
}
