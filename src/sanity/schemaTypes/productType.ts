import { defineArrayMember, defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
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
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "discountedPrice",
      title: "Discounted price",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "reviews",
      title: "Reviews count",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference" as const,
      to: [{ type: "category" as const }],
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array" as const,
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
        }),
      ],
      validation: (rule) => rule.min(1),
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
      subtitle: "company.name",
      media: "images.0",
    },
  },
});
