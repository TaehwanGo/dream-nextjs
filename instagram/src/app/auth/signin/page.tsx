import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Signin, { Providers } from "@/components/Signin";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";

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
    <section className="flex justify-center mt-[30%]">
      <Signin providers={providers} callbackUrl={callbackUrl ?? "/"} />
    </section>
  );
}
