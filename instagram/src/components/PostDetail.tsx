import { SimplePost } from "@/model/post";
import Image from "next/image";
import PostUserAvatar from "./PostUserAvatar";
import ActionBar from "./ActionBar";
import Avatar from "./Avatar";
import usePostDetail from "@/hooks/usePostDetail";

interface Props {
  post: SimplePost;
}
export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image } = post;
  const { post: data, postComment } = usePostDetail(id);
  const comments = data?.comments;

  return (
    <section className="flex w-full h-full">
      <div className="relative basis-3/5">
        <Image
          className="object-cover"
          src={image}
          alt={`photo by ${username}`}
          priority
          fill // 나머진 부모컨테이너를 채움
          sizes="650px" // 너비 650px
        />
      </div>
      <div className="flex flex-col w-full basis-2/5">
        <PostUserAvatar image={userImage} username={username} />
        <ul className="h-full p-4 mb-1 overflow-y-auto border-t border-gray-200">
          {comments?.map(
            ({ image, username: commentUsername, comment }, index) => (
              <li key={index} className="flex items-center mb-1">
                <Avatar
                  image={image}
                  size="small"
                  highlight={commentUsername === username}
                />
                <div className="ml-2">
                  <span className="mr-1 font-bold">{commentUsername}</span>
                  <span>{comment}</span>
                </div>
              </li>
            )
          )}
        </ul>
        <ActionBar post={post} onComment={postComment} />
      </div>
    </section>
  );
}
