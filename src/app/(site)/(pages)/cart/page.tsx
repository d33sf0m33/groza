import React from "react";
import Cart from "@/components/Cart";
import { buildSiteMetadata } from "../../metadata";

export async function generateMetadata() {
  return buildSiteMetadata({
    pageTitle: "Cart Page",
    description: "Cart page",
  });
}

const CartPage = () => {
  return (
    <>
      <Cart />
    </>
  );
};

export default CartPage;
