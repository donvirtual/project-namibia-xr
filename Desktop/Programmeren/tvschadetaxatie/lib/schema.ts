import { siteConfig } from "@/config/site"

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    url: `https://${siteConfig.domain}`,
    description: "Online schadetaxatie en schaderapport voor beschadigde televisies",
    priceRange: `€${siteConfig.price}`,
    areaServed: { "@type": "Country", name: "Nederland" },
    serviceType: "TV schadetaxatie",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Schaderapport televisie",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "TV Schaderapport",
            description:
              "Officieel schaderapport voor televisie inclusief dagwaardeberekening en total-loss oordeel",
          },
          price: `${siteConfig.price}.00`,
          priceCurrency: "EUR",
        },
      ],
    },
  }
}

export function generateFAQSchema(
  items: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }
}

export function generateBreadcrumbSchema(
  crumbs: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}
