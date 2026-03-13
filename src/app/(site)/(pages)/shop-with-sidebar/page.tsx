import React from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";
import { getCategories, getProducts } from "@/sanity/lib/storefront";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Shop Page | Groza Shop",
  description: "This is Shop Page for NextCommerce Template",
  // other metadata
};

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
