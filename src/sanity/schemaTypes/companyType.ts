import { defineArrayMember, defineField, defineType } from "sanity";

export const companyType = defineType({
  name: "company",
  title: "Company",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "primaryDomain",
      title: "Primary domain",
      type: "string",
      description: "Used to resolve the live site for this company.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "domains",
      title: "Domains",
      type: "array" as const,
      of: [
        defineArrayMember({
          type: "string",
        }),
      ],
      description: "Add every hostname that should render this company.",
      validation: (rule) => rule.min(1).required(),
    }),
    defineField({
      name: "isDefault",
      title: "Default for localhost",
      type: "boolean",
      initialValue: false,
      description: "Used in local development when the hostname is localhost.",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "primaryDomain",
    },
  },
});
