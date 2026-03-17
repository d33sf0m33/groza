import { createClient } from "next-sanity";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  throw new Error("Missing Sanity credentials in .env.local");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-03-13",
  useCdn: false,
  token,
  perspective: "published",
});

const companyId = "company-groza-shop";
const companySlug = "groza-shop";
const primaryDomain = process.env.SANITY_PRIMARY_DOMAIN || "localhost";

async function ensureCompany() {
  const existingSiteSettings = await client.fetch(
    `*[_type == "siteSettings"] | order(_updatedAt desc)[0]{
      siteTitle
    }`
  );

  const companyName = existingSiteSettings?.siteTitle || "Groza Shop";

  await client.createOrReplace({
    _id: companyId,
    _type: "company",
    name: companyName,
    slug: {
      _type: "slug",
      current: companySlug,
    },
    primaryDomain,
    domains: Array.from(new Set([primaryDomain, "localhost", "127.0.0.1"])),
    isDefault: true,
  });
}

async function attachCompanyReference(documentType) {
  const ids = await client.fetch(
    `*[_type == $documentType && !defined(company)][]._id`,
    { documentType }
  );

  if (!ids.length) {
    return 0;
  }

  const transaction = client.transaction();

  for (const id of ids) {
    transaction.patch(id, {
      set: {
        company: {
          _type: "reference",
          _ref: companyId,
        },
      },
    });
  }

  await transaction.commit();

  return ids.length;
}

async function main() {
  console.log(`Migrating Sanity project ${projectId}/${dataset} to multi-company mode`);

  await ensureCompany();

  const [siteSettingsCount, heroSlidesCount, categoriesCount, productsCount] =
    await Promise.all([
      attachCompanyReference("siteSettings"),
      attachCompanyReference("heroSlide"),
      attachCompanyReference("category"),
      attachCompanyReference("product"),
    ]);

  console.log(
    JSON.stringify(
      {
        companyId,
        primaryDomain,
        updated: {
          siteSettings: siteSettingsCount,
          heroSlides: heroSlidesCount,
          categories: categoriesCount,
          products: productsCount,
        },
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
