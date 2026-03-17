import React from "react";
import ShopWithoutSidebar from "@/components/ShopWithoutSidebar";
import { getProducts } from "@/sanity/lib/storefront";
import { buildSiteMetadata } from "../../metadata";

export async function generateMetadata() {
  return buildSiteMetadata({
    pageTitle: "Shop Page",
  });
}

const ShopWithoutSidebarPage = async () => {
  const products = await getProducts();

  return (
    <main>
      <ShopWithoutSidebar products={products} />
    </main>
  );
};

export default ShopWithoutSidebarPage;
