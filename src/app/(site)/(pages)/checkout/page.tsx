import React from "react";
import Checkout from "@/components/Checkout";
import { buildSiteMetadata } from "../../metadata";

export async function generateMetadata() {
  return buildSiteMetadata({
    pageTitle: "Checkout Page",
    description: "Checkout page",
  });
}

const CheckoutPage = () => {
  return (
    <main>
      <Checkout />
    </main>
  );
};

export default CheckoutPage;
