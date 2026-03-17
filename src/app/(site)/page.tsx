import Home from "@/components/Home";
import { getHomePageData } from "@/sanity/lib/storefront";
import { buildSiteMetadata } from "./metadata";

export async function generateMetadata() {
  return buildSiteMetadata({});
}

export default async function HomePage() {
  const homePageData = await getHomePageData();

  return (
    <>
      <Home {...homePageData} />
    </>
  );
}
