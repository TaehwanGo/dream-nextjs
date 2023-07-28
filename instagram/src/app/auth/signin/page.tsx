import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Signin, { Providers } from "@/components/Signin";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in or Login to Instagram",
};

interface SigninPageProps {
  searchParams: {
    callbackUrl: string;
  };
}
export default async function SigninPage({
  searchParams: { callbackUrl },
}: SigninPageProps) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }

  const providers = (await getProviders()) ?? ({} as Providers);

  return (
    <section className="flex justify-center mt-24">
      <Signin providers={providers} callbackUrl={callbackUrl ?? "/"} />
    </section>
  );
}
