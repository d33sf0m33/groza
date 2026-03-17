import Signin from "@/components/Auth/Signin";
import React from "react";
import { buildSiteMetadata } from "../../metadata";

export async function generateMetadata() {
  return buildSiteMetadata({
    pageTitle: "Signin Page",
    description: "Signin page",
  });
}

const SigninPage = () => {
  return (
    <main>
      <Signin />
    </main>
  );
};

export default SigninPage;
