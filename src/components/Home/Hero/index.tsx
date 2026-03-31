import React from "react";
import HeroCarousel from "./HeroCarousel";
import HeroFeature from "./HeroFeature";
import Image from "next/image";
import Link from "next/link";
import { demoHeroPromoCards } from "./heroPromoCards";
import { HeroPromoCard } from "@/types/heroPromoCard";
import { HeroSlide } from "@/types/heroSlide";

const HeroPromoCardItem = ({ card }: { card: HeroPromoCard }) => {
  return (
    <div className="w-full relative rounded-[10px] bg-white p-4 sm:p-7.5 h-full">
      <div className="flex items-center gap-14 h-full">
        <div className="flex flex-col gap-8  ">
          <h2 className="max-w-[153px] font-semibold text-dark text-xl">
            <Link href={card.href}>{card.title}</Link>
          </h2>

          <div>
            <p className="font-medium text-dark-4 text-custom-sm mb-1.5">
              {card.offerLabel}
            </p>
            <span className="flex items-center gap-3">
              <span className="font-medium text-heading-5 text-red">
                {card.price}
              </span>
              <span className="font-medium text-2xl text-dark-4 line-through">
                {card.originalPrice}
              </span>
            </span>
          </div>
        </div>

        <div>
          <img src={card.image} alt={card.title} />
        </div>
      </div>
    </div>
  );
};

const Hero = ({
  heroSlides,
  heroPromoCards = demoHeroPromoCards,
}: {
  heroSlides: HeroSlide[];
  heroPromoCards?: HeroPromoCard[];
}) => {
  const promoCards = heroPromoCards.length
    ? heroPromoCards.slice(0, 2)
    : demoHeroPromoCards;

  return (
    <section className="overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-57.5 sm:pt-45 lg:pt-30 xl:pt-51.5 bg-[#E5EAF4]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap gap-5">
          <div className="xl:max-w-[757px] w-full">
            <div className="relative z-1 rounded-[10px] bg-white overflow-hidden">
              {/* <!-- bg shapes --> */}
              <Image
                src="/images/hero/hero-bg.png"
                alt="hero bg shapes"
                className="absolute right-0 bottom-0 -z-1"
                width={534}
                height={520}
              />

              <HeroCarousel slides={heroSlides} />
            </div>
          </div>

          <div className="xl:max-w-[393px] w-full">
            <div className="flex flex-col sm:flex-row xl:flex-col gap-5 h-full">
              {promoCards.map((card) => (
                <HeroPromoCardItem
                  key={`${card.title}-${card.image}`}
                  card={card}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Hero features --> */}
      <HeroFeature />
    </section>
  );
};

export default Hero;
