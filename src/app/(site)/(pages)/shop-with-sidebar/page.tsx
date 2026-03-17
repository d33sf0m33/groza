import React from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";
import { getCategories, getProducts } from "@/sanity/lib/storefront";
import { buildSiteMetadata } from "../../metadata";

export async function generateMetadata() {
  return buildSiteMetadata({
    pageTitle: "Shop Page",
    description: "Shop page",
  });
}

const ShopWithSidebarPage = async () => {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <main>
      <ShopWithSidebar products={products} categories={categories} />
    </main>
  );
};

export default ShopWithSidebarPage;
