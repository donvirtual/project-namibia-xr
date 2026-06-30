import type { Metadata } from "next"
import CTASection from "@/components/CTASection"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import TrustBadges from "@/components/TrustBadges"
import { seoPages } from "@/config/seoPages"
import HoeHetWerktContent from "./HoeHetWerktContent"

export const metadata: Metadata = seoPages["/hoe-het-werkt"]

export default function HoeHetWerktPage() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <BreadcrumbNav crumbs={[{ name: "Home", href: "/" }, { name: "Hoe het werkt" }]} />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Hoe werkt TV schadetaxatie aanvragen?
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-12">
          In 5 eenvoudige stappen uw officieel schaderapport aanvragen. Volledig online, binnen 5 minuten
          ingediend, rapport binnen 24 uur per e-mail.
        </p>

        <HoeHetWerktContent />

        <div className="mt-10">
          <TrustBadges />
        </div>
      </div>

      <CTASection />
    </>
  )
}
