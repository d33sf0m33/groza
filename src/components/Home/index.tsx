import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";
import BestSeller from "./BestSeller";
import Testimonials from "./Testimonials";
import Newsletter from "../Common/Newsletter";
import { Category } from "@/types/category";
import { HeroPromoCard } from "@/types/heroPromoCard";
import { HeroSlide } from "@/types/heroSlide";
import { Product } from "@/types/product";

type HomeProps = {
  heroSlides: HeroSlide[];
  heroPromoCards: HeroPromoCard[];
  categories: Category[];
  products: Product[];
};

const Home = ({ heroSlides, heroPromoCards, categories, products }: HomeProps) => {
  return (
    <main>
      <Hero heroSlides={heroSlides} heroPromoCards={heroPromoCards} />
      <Categories categories={categories} />
      <NewArrival products={products} />
      <PromoBanner />
      <BestSeller products={products} />
      <Testimonials />
      <Newsletter />
    </main>
  );
};

export default Home;
