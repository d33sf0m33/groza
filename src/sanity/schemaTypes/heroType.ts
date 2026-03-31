import { defineArrayMember, defineField, defineType } from "sanity";

export const heroType = defineType({
  name: "hero",
  title: "Hero",
  type: "document",
  fields: [
    defineField({
      name: "company",
      title: "Company",
      type: "reference" as const,
      to: [{ type: "company" as const }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "promoCards",
      title: "Promo cards",
      type: "array" as const,
      of: [
        defineArrayMember({
          name: "promoCard",
          title: "Promo card",
          type: "object" as const,
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "offerLabel",
              title: "Offer label",
              type: "string",
              initialValue: "limited time offer",
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "originalPrice",
              title: "Original price",
              type: "string",
            }),
            defineField({
              name: "href",
              title: "Link href",
              type: "string",
              initialValue: "#",
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "price",
              media: "image",
            },
          },
        }),
      ],
      validation: (rule) => rule.max(2),
      description: "Two promo cards shown to the right of the main hero slider.",
    }),
  ],
  preview: {
    select: {
      subtitle: "company.name",
    },
    prepare({ subtitle }) {
      return {
        title: "Hero",
        subtitle,
      };
    },
  },
});
