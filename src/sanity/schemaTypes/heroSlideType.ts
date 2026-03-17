import { defineField, defineType } from "sanity";

export const heroSlideType = defineType({
  name: "heroSlide",
  title: "Hero slide",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "reference" as const,
      to: [{ type: "company" as const }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "saleOff",
      title: "Sale off",
      type: "string",
      initialValue: "30%",
    }),
    defineField({
      name: "saleLabel",
      title: "Sale label",
      type: "string",
      initialValue: "Sale Off",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA label",
      type: "string",
      initialValue: "Shop Now",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA href",
      type: "string",
      initialValue: "/shop-with-sidebar",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      subtitle: "company.name",
    },
  },
});
