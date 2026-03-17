import { groq } from "next-sanity";
import { headers } from "next/headers";
import { cache } from "react";
import { demoCategories } from "@/components/Home/Categories/categoryData";
import { demoHeroSlides } from "@/components/Home/Hero/heroSlides";
import { demoProducts } from "@/components/Shop/shopData";
import { sanityFetch } from "@/sanity/lib/client";
import { Category } from "@/types/category";
import { HeroSlide } from "@/types/heroSlide";
import { Product } from "@/types/product";

type SanityCategory = {
  _id: string;
  title: string;
  slug?: string;
  image?: string;
};

type SanityHeroSlide = {
  _id: string;
  title: string;
  description?: string;
  saleOff?: string;
  saleLabel?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: string;
};

type SanityProduct = {
  _id: string;
  title: string;
  slug?: string;
  description?: string;
  price?: number;
  discountedPrice?: number;
  reviews?: number;
  category?: {
    title: string;
    slug?: string;
  };
  images?: string[];
};

export type SiteSettings = {
  siteTitle: string;
  companyLogo?: string;
  contactEmail?: string;
  contactPhone?: string;
  supportAddress?: string;
};

type SanitySiteSettings = {
  siteTitle?: string;
  companyLogo?: string;
  contactEmail?: string;
  contactPhone?: string;
  supportAddress?: string;
};

type HomePageData = {
  categories: Category[];
  heroSlides: HeroSlide[];
  products: Product[];
};

type Company = {
  _id: string;
  name: string;
  slug?: string;
  primaryDomain: string;
  domains: string[];
  isDefault?: boolean;
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteTitle: "Groza Shop",
  contactEmail: "support@example.com",
  contactPhone: "(+099) 532-786-9843",
  supportAddress: "685 Market Street, Las Vegas, LA 95820, United States.",
};

const companyByHostnameQuery = groq`*[
  _type == "company" &&
  (
    primaryDomain == $hostname ||
    $hostname in domains
  )
][0]{
  _id,
  name,
  "slug": slug.current,
  primaryDomain,
  domains,
  isDefault
}`;

const defaultCompanyQuery = groq`*[_type == "company" && isDefault == true][0]{
  _id,
  name,
  "slug": slug.current,
  primaryDomain,
  domains,
  isDefault
}`;

const categoriesQuery = groq`*[
  _type == "category" &&
  company._ref == $companyId
] | order(coalesce(order, 9999) asc, title asc){
  _id,
  title,
  "slug": slug.current,
  "image": image.asset->url
}`;

const heroSlidesQuery = groq`*[
  _type == "heroSlide" &&
  company._ref == $companyId
] | order(coalesce(order, 9999) asc, _createdAt asc){
  _id,
  title,
  description,
  saleOff,
  saleLabel,
  ctaLabel,
  ctaHref,
  "image": image.asset->url
}`;

const productsQuery = groq`*[
  _type == "product" &&
  company._ref == $companyId
] | order(coalesce(order, 9999) asc, title asc){
  _id,
  title,
  description,
  price,
  discountedPrice,
  reviews,
  "slug": slug.current,
  "category": category->{
    title,
    "slug": slug.current
  },
  "images": images[].asset->url
}`;

const siteSettingsQuery = groq`*[
  _type == "siteSettings" &&
  company._ref == $companyId
][0]{
  siteTitle,
  "companyLogo": companyLogo.asset->url,
  contactEmail,
  contactPhone,
  supportAddress
}`;

function normalizeHostname(hostname: string | null | undefined): string {
  if (!hostname) {
    return "";
  }

  return hostname.toLowerCase().split(":")[0];
}

function isLocalHostname(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1";
}

const getCompanyByHostname = cache(async (hostname: string): Promise<Company | null> => {
  if (!hostname) {
    return null;
  }

  return sanityFetch<Company>({
    query: companyByHostnameQuery,
    params: { hostname },
    revalidate: 0,
  });
});

const getDefaultCompany = cache(async (): Promise<Company | null> => {
  return sanityFetch<Company>({
    query: defaultCompanyQuery,
    revalidate: 0,
  });
});

export const getCurrentCompany = cache(async (): Promise<Company | null> => {
  const requestHeaders = await headers();
  const hostname = normalizeHostname(requestHeaders.get("x-forwarded-host") || requestHeaders.get("host"));

  if (!hostname || isLocalHostname(hostname)) {
    return getDefaultCompany();
  }

  const matchedCompany = await getCompanyByHostname(hostname);

  return matchedCompany || null;
});

function toCategory(category: SanityCategory, index: number): Category {
  return {
    id: index + 1,
    title: category.title,
    slug: category.slug,
    img: category.image || demoCategories[index % demoCategories.length].img,
  };
}

function toHeroSlide(slide: SanityHeroSlide, index: number): HeroSlide {
  const fallback = demoHeroSlides[index % demoHeroSlides.length];

  return {
    id: slide._id,
    title: slide.title,
    description: slide.description || fallback.description,
    saleOff: slide.saleOff || fallback.saleOff,
    saleLabel: slide.saleLabel || fallback.saleLabel,
    ctaLabel: slide.ctaLabel || fallback.ctaLabel,
    ctaHref: slide.ctaHref || fallback.ctaHref,
    image: slide.image || fallback.image,
  };
}

function toProduct(product: SanityProduct, index: number): Product {
  const fallback = demoProducts[index % demoProducts.length];
  const images = product.images?.filter(Boolean) || [];
  const productImages = images.length
    ? {
        thumbnails: images,
        previews: images,
      }
    : fallback.imgs;

  return {
    id: index + 1,
    title: product.title,
    slug: product.slug,
    description: product.description,
    price: product.price ?? fallback.price,
    discountedPrice: product.discountedPrice ?? fallback.discountedPrice,
    reviews: product.reviews ?? fallback.reviews,
    category: product.category,
    imgs: productImages,
  };
}

export async function getCategories(): Promise<Category[]> {
  const currentCompany = await getCurrentCompany();

  if (!currentCompany) {
    return demoCategories;
  }

  const categories = await sanityFetch<SanityCategory[]>({
    query: categoriesQuery,
    params: { companyId: currentCompany._id },
  });

  if (!categories?.length) {
    return demoCategories;
  }

  return categories.map(toCategory);
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const currentCompany = await getCurrentCompany();

  if (!currentCompany) {
    return demoHeroSlides;
  }

  const heroSlides = await sanityFetch<SanityHeroSlide[]>({
    query: heroSlidesQuery,
    params: { companyId: currentCompany._id },
  });

  if (!heroSlides?.length) {
    return demoHeroSlides;
  }

  return heroSlides.map(toHeroSlide);
}

export async function getProducts(): Promise<Product[]> {
  const currentCompany = await getCurrentCompany();

  if (!currentCompany) {
    return demoProducts;
  }

  const products = await sanityFetch<SanityProduct[]>({
    query: productsQuery,
    params: { companyId: currentCompany._id },
  });

  if (!products?.length) {
    return demoProducts;
  }

  return products.map(toProduct);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const currentCompany = await getCurrentCompany();

  if (!currentCompany) {
    return DEFAULT_SITE_SETTINGS;
  }

  const siteSettings = await sanityFetch<SanitySiteSettings>({
    query: siteSettingsQuery,
    params: { companyId: currentCompany._id },
    revalidate: 0,
  });

  return {
    siteTitle: siteSettings?.siteTitle || DEFAULT_SITE_SETTINGS.siteTitle,
    companyLogo: siteSettings?.companyLogo,
    contactEmail: siteSettings?.contactEmail || DEFAULT_SITE_SETTINGS.contactEmail,
    contactPhone: siteSettings?.contactPhone || DEFAULT_SITE_SETTINGS.contactPhone,
    supportAddress:
      siteSettings?.supportAddress || DEFAULT_SITE_SETTINGS.supportAddress,
  };
}

export async function getHomePageData(): Promise<HomePageData> {
  const [heroSlides, categories, products] = await Promise.all([
    getHeroSlides(),
    getCategories(),
    getProducts(),
  ]);

  return {
    heroSlides,
    categories,
    products,
  };
}
