import React from "react";
import ShopDetails from "@/components/ShopDetails";
import { buildSiteMetadata } from "../../metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildSiteMetadata({
    pageTitle: "Shop Details Page",
  });
}

const ShopDetailsPage = () => {
  return (
    <main>
      <ShopDetails />
    </main>
  );
};

export default ShopDetailsPage;
