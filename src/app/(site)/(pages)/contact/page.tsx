import Contact from "@/components/Contact";
import { buildSiteMetadata } from "../../metadata";

export async function generateMetadata() {
  return buildSiteMetadata({
    pageTitle: "Contact Page",
    description: "Contact page",
  });
}

const ContactPage = () => {
  return (
    <main>
      <Contact />
    </main>
  );
};

export default ContactPage;
