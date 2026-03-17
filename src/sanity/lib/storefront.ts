import { groq } from "next-sanity";
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

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteTitle: "Groza Shop",
  contactEmail: "support@example.com",
  contactPhone: "(+099) 532-786-9843",
  supportAddress: "685 Market Street, Las Vegas, LA 95820, United States.",
};

const categoriesQuery = groq`*[_type == "category"] | order(coalesce(order, 9999) asc, title asc){
  _id,
  title,
  "slug": slug.current,
  "image": image.asset->url
}`;

const heroSlidesQuery = groq`*[_type == "heroSlide"] | order(coalesce(order, 9999) asc, _createdAt asc){
  _id,
  title,
  description,
  saleOff,
  saleLabel,
  ctaLabel,
  ctaHref,
  "image": image.asset->url
}`;

const productsQuery = groq`*[_type == "product"] | order(coalesce(order, 9999) asc, title asc){
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

const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  siteTitle,
  "companyLogo": companyLogo.asset->url,
  contactEmail,
  contactPhone,
  supportAddress
}`;

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
  const categories = await sanityFetch<SanityCategory[]>({ query: categoriesQuery });

  if (!categories?.length) {
    return demoCategories;
  }

  return categories.map(toCategory);
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const heroSlides = await sanityFetch<SanityHeroSlide[]>({ query: heroSlidesQuery });

  if (!heroSlides?.length) {
    return demoHeroSlides;
  }

  return heroSlides.map(toHeroSlide);
}

export async function getProducts(): Promise<Product[]> {
  const products = await sanityFetch<SanityProduct[]>({ query: productsQuery });

  if (!products?.length) {
    return demoProducts;
  }

  return products.map(toProduct);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const siteSettings = await sanityFetch<SanitySiteSettings>({
    query: siteSettingsQuery,
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
