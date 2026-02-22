import { createMetadata } from "@repo/seo/metadata";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const title = "Create an account";
const description = "Enter your details to get started.";
const SignUp = dynamic(() =>
  import("@repo/auth/components/sign-up").then((mod) => mod.SignUp)
);

export const metadata: Metadata = createMetadata({ title, description });

const SignUpPage = () => (
  <div className="flex flex-1 items-center justify-center p-4">
    <SignUp />
  </div>
);

export default SignUpPage;
