import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "next-sanity";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

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

const categories = [
  {
    id: "category-televisions",
    title: "Televisions",
    slug: "televisions",
    image: "public/images/categories/categories-01.png",
    description: "TVs and home viewing systems.",
    order: 1,
  },
  {
    id: "category-laptops-pc",
    title: "Laptop & PC",
    slug: "laptop-pc",
    image: "public/images/categories/categories-02.png",
    description: "Computers and productivity devices.",
    order: 2,
  },
  {
    id: "category-mobile-tablets",
    title: "Mobile & Tablets",
    slug: "mobile-tablets",
    image: "public/images/categories/categories-03.png",
    description: "Phones, tablets and accessories.",
    order: 3,
  },
  {
    id: "category-games-videos",
    title: "Games & Videos",
    slug: "games-videos",
    image: "public/images/categories/categories-04.png",
    description: "Gaming and media products.",
    order: 4,
  },
  {
    id: "category-home-appliances",
    title: "Home Appliances",
    slug: "home-appliances",
    image: "public/images/categories/categories-05.png",
    description: "Home electronics and appliances.",
    order: 5,
  },
  {
    id: "category-health-sports",
    title: "Health & Sports",
    slug: "health-sports",
    image: "public/images/categories/categories-06.png",
    description: "Fitness and wellness products.",
    order: 6,
  },
  {
    id: "category-watches",
    title: "Watches",
    slug: "watches",
    image: "public/images/categories/categories-07.png",
    description: "Watches and wearable devices.",
    order: 7,
  },
];

const heroSlides = [
  {
    id: "hero-headphones",
    title: "True Wireless Noise Cancelling Headphone",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ipsum at risus euismod lobortis in.",
    saleOff: "30%",
    saleLabel: "Sale Off",
    ctaLabel: "Shop Now",
    ctaHref: "/shop-with-sidebar",
    image: "public/images/hero/hero-01.png",
    order: 1,
  },
  {
    id: "hero-featured-audio",
    title: "Premium Audio for Everyday Listening",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc suscipit non ipsum nec suscipit.",
    saleOff: "30%",
    saleLabel: "Sale Off",
    ctaLabel: "Explore Collection",
    ctaHref: "/shop-without-sidebar",
    image: "public/images/hero/hero-03.png",
    order: 2,
  },
];

const products = [
  {
    id: "product-havit-hv-g69-usb-gamepad",
    title: "Havit HV-G69 USB Gamepad",
    slug: "havit-hv-g69-usb-gamepad",
    description: "Demo product imported from the template storefront.",
    price: 59,
    discountedPrice: 29,
    reviews: 15,
    categoryId: "category-games-videos",
    images: [
      "public/images/products/product-1-bg-1.png",
      "public/images/products/product-1-bg-2.png",
    ],
    order: 1,
  },
  {
    id: "product-iphone-14-plus-6-128gb",
    title: "iPhone 14 Plus, 6/128GB",
    slug: "iphone-14-plus-6-128gb",
    description: "Demo product imported from the template storefront.",
    price: 899,
    discountedPrice: 99,
    reviews: 5,
    categoryId: "category-mobile-tablets",
    images: [
      "public/images/products/product-2-bg-1.png",
      "public/images/products/product-2-bg-2.png",
    ],
    order: 2,
  },
  {
    id: "product-apple-imac-m1-24-inch-2021",
    title: "Apple iMac M1 24-inch 2021",
    slug: "apple-imac-m1-24-inch-2021",
    description: "Demo product imported from the template storefront.",
    price: 59,
    discountedPrice: 29,
    reviews: 5,
    categoryId: "category-laptops-pc",
    images: [
      "public/images/products/product-3-bg-1.png",
      "public/images/products/product-3-bg-2.png",
    ],
    order: 3,
  },
  {
    id: "product-macbook-air-m1-chip-8-256gb",
    title: "MacBook Air M1 chip, 8/256GB",
    slug: "macbook-air-m1-chip-8-256gb",
    description: "Demo product imported from the template storefront.",
    price: 59,
    discountedPrice: 29,
    reviews: 6,
    categoryId: "category-laptops-pc",
    images: [
      "public/images/products/product-4-bg-1.png",
      "public/images/products/product-4-bg-2.png",
    ],
    order: 4,
  },
  {
    id: "product-apple-watch-ultra",
    title: "Apple Watch Ultra",
    slug: "apple-watch-ultra",
    description: "Demo product imported from the template storefront.",
    price: 99,
    discountedPrice: 29,
    reviews: 3,
    categoryId: "category-watches",
    images: [
      "public/images/products/product-5-bg-1.png",
      "public/images/products/product-5-bg-2.png",
    ],
    order: 5,
  },
  {
    id: "product-logitech-mx-master-3-mouse",
    title: "Logitech MX Master 3 Mouse",
    slug: "logitech-mx-master-3-mouse",
    description: "Demo product imported from the template storefront.",
    price: 59,
    discountedPrice: 29,
    reviews: 15,
    categoryId: "category-laptops-pc",
    images: [
      "public/images/products/product-6-bg-1.png",
      "public/images/products/product-6-bg-2.png",
    ],
    order: 6,
  },
  {
    id: "product-apple-ipad-air-5th-gen-64gb",
    title: "Apple iPad Air 5th Gen - 64GB",
    slug: "apple-ipad-air-5th-gen-64gb",
    description: "Demo product imported from the template storefront.",
    price: 59,
    discountedPrice: 29,
    reviews: 15,
    categoryId: "category-mobile-tablets",
    images: [
      "public/images/products/product-7-bg-1.png",
      "public/images/products/product-7-bg-2.png",
    ],
    order: 7,
  },
  {
    id: "product-asus-rt-dual-band-router",
    title: "Asus RT Dual Band Router",
    slug: "asus-rt-dual-band-router",
    description: "Demo product imported from the template storefront.",
    price: 59,
    discountedPrice: 29,
    reviews: 15,
    categoryId: "category-home-appliances",
    images: [
      "public/images/products/product-8-bg-1.png",
      "public/images/products/product-8-sm-1.png",
    ],
    order: 8,
  },
];

const siteSettings = {
  _id: "site-settings",
  _type: "siteSettings",
  siteTitle: "Groza Shop",
  siteDescription: "Visual storefront powered by Next.js and Sanity.",
  contactEmail: "hello@groza.shop",
  contactPhone: "+7 (000) 000-00-00",
  supportAddress: "685 Market Street, Las Vegas, LA 95820, United States.",
};

async function uploadImage(relativePath) {
  const filePath = path.join(rootDir, relativePath);
  const stream = fs.createReadStream(filePath);
  const filename = path.basename(filePath);

  return client.assets.upload("image", stream, {
    filename,
  });
}

async function seedSiteSettings() {
  const existingSiteSettings = await client.fetch(
    `*[_type == "siteSettings" && _id == $id][0]`,
    { id: siteSettings._id }
  );

  await client.createOrReplace({
    ...siteSettings,
    companyLogo: existingSiteSettings?.companyLogo,
  });
}

async function seedCategories() {
  for (const category of categories) {
    const imageAsset = await uploadImage(category.image);

    await client.createOrReplace({
      _id: category.id,
      _type: "category",
      title: category.title,
      slug: {
        _type: "slug",
        current: category.slug,
      },
      description: category.description,
      order: category.order,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset._id,
        },
      },
    });
  }
}

async function seedHeroSlides() {
  for (const slide of heroSlides) {
    const imageAsset = await uploadImage(slide.image);

    await client.createOrReplace({
      _id: slide.id,
      _type: "heroSlide",
      title: slide.title,
      description: slide.description,
      saleOff: slide.saleOff,
      saleLabel: slide.saleLabel,
      ctaLabel: slide.ctaLabel,
      ctaHref: slide.ctaHref,
      order: slide.order,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset._id,
        },
      },
    });
  }
}

async function seedProducts() {
  for (const product of products) {
    const assets = [];

    for (const image of product.images) {
      const imageAsset = await uploadImage(image);
      assets.push({
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset._id,
        },
      });
    }

    await client.createOrReplace({
      _id: product.id,
      _type: "product",
      title: product.title,
      slug: {
        _type: "slug",
        current: product.slug,
      },
      description: product.description,
      price: product.price,
      discountedPrice: product.discountedPrice,
      reviews: product.reviews,
      order: product.order,
      category: {
        _type: "reference",
        _ref: product.categoryId,
      },
      images: assets,
    });
  }
}

async function main() {
  console.log(`Seeding Sanity project ${projectId}/${dataset}`);
  await seedSiteSettings();
  await seedCategories();
  await seedHeroSlides();
  await seedProducts();
  const counts = await client.fetch(
    `{
      "siteSettings": count(*[_type == "siteSettings"]),
      "heroSlides": count(*[_type == "heroSlide"]),
      "categories": count(*[_type == "category"]),
      "products": count(*[_type == "product"])
    }`
  );
  console.log("Seed complete");
  console.log(JSON.stringify(counts, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
