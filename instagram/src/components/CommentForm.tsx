import SmileIcon from "./ui/icons/SmileIcon";

export default function CommentForm() {
  return (
    <form className="flex items-center px-3 border-t border-neutral-300">
      <SmileIcon />
      <input
        className="w-full p-3 ml-2 border-none outline-none"
        type="text"
        placeholder="Add a comment..."
      />
      <button className="ml-2 font-bold text-sky-500">Post</button>
    </form>
  );
}
