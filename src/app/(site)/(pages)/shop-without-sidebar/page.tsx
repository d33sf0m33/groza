import React from "react";
import ShopWithoutSidebar from "@/components/ShopWithoutSidebar";
import { getProducts } from "@/sanity/lib/storefront";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Shop Page | Groza Shop",
  description: "This is Shop Page for NextCommerce Template",
  // other metadata
};

const ShopWithoutSidebarPage = async () => {
  const products = await getProducts();

  return (
    <main>
      <ShopWithoutSidebar products={products} />
    </main>
  );
};

export default ShopWithoutSidebarPage;
