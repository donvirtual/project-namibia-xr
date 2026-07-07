import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TV Schaderapport | Officiële Schadetaxatie Televisie | tvschaderapport.nl",
  description:
    "TV kapotgemaakt door iemand anders? Vraag binnen 5 minuten uw officieel schaderapport aan. Dagwaardeberekening + total-loss oordeel. Vanaf €49, binnen 24 uur. Geaccepteerd door alle verzekeraars.",
  metadataBase: new URL("https://tvschaderapport.nl"),
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "tvschaderapport.nl",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={inter.className}>
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        {process.env.NEXT_PUBLIC_AW_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_AW_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-ads-tag" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_AW_ID}');
                ${process.env.NEXT_PUBLIC_GA_ID ? `gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');` : ""}
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
