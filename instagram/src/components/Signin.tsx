"use client";
import { getProviders, signIn } from "next-auth/react";
import ColorButton from "./ui/ColorButton";

export type Providers = Exclude<Awaited<ReturnType<typeof getProviders>>, null>;

interface SigninProps {
  providers: Providers;
  callbackUrl: string;
}
export default function Signin({ providers, callbackUrl }: SigninProps) {
  return (
    <>
      {providers &&
        Object.values(providers).map(({ name, id }) => (
          <ColorButton
            key={id}
            text={`Sign in with ${name}`}
            onClick={() => signIn(id, { callbackUrl })}
            className="p-[0.3rem]"
            btnClassName="p-4 text-2xl"
          />
        ))}
    </>
  );
}
