import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import { getSiteSettings } from "@/sanity/lib/storefront";
import SiteLayoutShell from "./SiteLayoutShell";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <SiteLayoutShell siteSettings={siteSettings}>{children}</SiteLayoutShell>
      </body>
    </html>
  );
}
