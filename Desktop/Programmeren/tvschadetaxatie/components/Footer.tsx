import Link from "next/link"
import { siteConfig } from "@/config/site"

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--navy-dark)" }} className="text-blue-200 mt-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-blue-900">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-white flex items-center justify-center">
                <span style={{ color: "var(--navy)" }} className="font-black text-sm leading-none">TV</span>
              </div>
              <p className="text-white font-bold text-base">{siteConfig.name}</p>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-4">
              Officieel schaderapport voor uw televisie. Geaccepteerd door alle Nederlandse verzekeraars.
              Binnen 24 uur geleverd per e-mail.
            </p>
            <div className="text-sm space-y-1">
              <p><a href="tel:+31630192552" className="hover:text-white transition-colors">+31 6 30 19 25 52</a></p>
              <p><a href="mailto:info@tvschaderapport.nl" className="hover:text-white transition-colors">info@tvschaderapport.nl</a></p>
              <p className="text-blue-300">24/7 bereikbaar</p>
              <p className="text-blue-300 text-xs mt-2">Amsterdam, Nederland</p>
              {siteConfig.kvkNummer && <p className="text-xs">KVK: {siteConfig.kvkNummer}</p>}
            </div>
          </div>

          <div>
            <p className="text-white font-semibold mb-4 text-xs uppercase tracking-widest">Diensten</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tv-total-loss-verklaring" className="hover:text-white transition-colors">Total loss verklaring</Link></li>
              <li><Link href="/tv-bliksemschade" className="hover:text-white transition-colors">Bliksemschade rapport</Link></li>
              <li><Link href="/dagwaarde-televisie-berekenen" className="hover:text-white transition-colors">Dagwaarde berekenen</Link></li>
              <li><Link href="/tv-scherm-gebroken-verzekering" className="hover:text-white transition-colors">Scherm gebroken</Link></li>
              <li><Link href="/tv-schaderapport-verzekeraar" className="hover:text-white transition-colors">Rapport voor verzekeraar</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold mb-4 text-xs uppercase tracking-widest">Informatie</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/hoe-het-werkt" className="hover:text-white transition-colors">Hoe het werkt</Link></li>
              <li><Link href="/veelgestelde-vragen" className="hover:text-white transition-colors">Veelgestelde vragen</Link></li>
              <li><Link href="/over-ons" className="hover:text-white transition-colors">Over ons</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy policy</Link></li>
              <li><Link href="/algemene-voorwaarden" className="hover:text-white transition-colors">Algemene voorwaarden</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-blue-400">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Alle rechten voorbehouden.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/algemene-voorwaarden" className="hover:text-white transition-colors">Voorwaarden</Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
