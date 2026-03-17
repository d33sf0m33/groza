import { getSiteSettings } from "@/sanity/lib/storefront";
import { Metadata } from "next";

type BuildSiteMetadataOptions = {
  pageTitle?: string;
  description?: string;
};

export async function buildSiteMetadata({
  pageTitle,
  description,
}: BuildSiteMetadataOptions): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  const siteTitle = siteSettings.siteTitle || "Groza Shop";
  const siteDescription = description || siteSettings.siteDescription || "Company website";

  return {
    title: pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle,
    description: siteDescription,
  };
}
