import { getSiteSettings } from "@/sanity/lib/storefront";
import { NextResponse } from "next/server";

export async function GET() {
  const siteSettings = await getSiteSettings();

  return NextResponse.json(siteSettings);
}
