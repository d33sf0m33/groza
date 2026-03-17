import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteDescription",
      title: "Site description",
      type: "text",
    }),
    defineField({
      name: "companyLogo",
      title: "Company logo",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Displayed in the site header. Recommended transparent background.",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
    }),
    defineField({
      name: "supportAddress",
      title: "Support address",
      type: "text",
    }),
    defineField({
      name: "contactPhone",
      title: "Contact phone",
      type: "string",
    }),
  ],
});
