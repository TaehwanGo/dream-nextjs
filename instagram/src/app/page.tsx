import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/PostList";
import SideBar from "@/components/SideBar";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions); // SSR
  console.log("session", session);
  const user = session?.user;

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <section className="w-full flex flex-col md:flex-row max-w-[850px] p-4">
      <div className="w-full basis-3/4">
        <FollowingBar />
        <PostList />
      </div>
      <SideBar user={user} />
    </section>
  );
}
