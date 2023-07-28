import UserSearch from "@/components/UserSearch";
import { Metadata } from "next";

export const dynamic = "force-dynamic"; // ssr을 위해 필요한 코드

export const metadata: Metadata = {
  title: "User search",
  description: "Search users to follow",
};

export default function SearchPage() {
  return <UserSearch />;
}
