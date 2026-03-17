"use client";

import { ReactNode } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ReduxProvider } from "@/redux/provider";
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import PreviewSliderModal from "@/components/Common/PreviewSlider";
import ScrollToTop from "@/components/Common/ScrollToTop";
import type { SiteSettings } from "@/sanity/lib/storefront";

type SiteLayoutShellProps = {
  children: ReactNode;
  siteSettings: SiteSettings;
};

export default function SiteLayoutShell({
  children,
  siteSettings,
}: SiteLayoutShellProps) {
  return (
    <>
      <ReduxProvider>
        <CartModalProvider>
          <ModalProvider>
            <PreviewSliderProvider>
              <Header siteSettings={siteSettings} />
              {children}

              <QuickViewModal />
              <CartSidebarModal />
              <PreviewSliderModal />
            </PreviewSliderProvider>
          </ModalProvider>
        </CartModalProvider>
      </ReduxProvider>
      <ScrollToTop />
      <Footer siteSettings={siteSettings} />
    </>
  );
}
