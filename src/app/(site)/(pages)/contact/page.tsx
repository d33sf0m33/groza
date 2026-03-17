import Contact from "@/components/Contact";
import { buildSiteMetadata } from "../../metadata";
import { getSiteSettings } from "@/sanity/lib/storefront";

export async function generateMetadata() {
  return buildSiteMetadata({
    pageTitle: "Contact Page",
  });
}

const ContactPage = async () => {
  const siteSettings = await getSiteSettings();

  return (
    <main>
      <Contact siteSettings={siteSettings} />
    </main>
  );
};

export default ContactPage;
