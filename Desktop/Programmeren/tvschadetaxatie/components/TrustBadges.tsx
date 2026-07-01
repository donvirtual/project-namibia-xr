export default function TrustBadges() {
  const badges = [
    "Conform afschrijvingsrichtlijnen Verbond van Verzekeraars",
    "Geaccepteerd bij Centraal Beheer, Interpolis, OHRA en alle andere verzekeraars",
    "Conform Burgerlijk Wetboek art. 7:959",
    "Rapport geleverd binnen 24 uur",
    "Kosten in veel gevallen verhaalbaar op tegenpartij of verzekeraar",
  ]

  return (
    <div className="flex flex-col gap-2 mt-6 border-t border-gray-200 pt-6">
      {badges.map((badge) => (
        <div key={badge} className="flex items-start gap-3 text-sm text-gray-700">
          <span style={{ color: "var(--navy)" }} className="font-bold mt-0.5 shrink-0 text-base leading-none">▪</span>
          <span>{badge}</span>
        </div>
      ))}
    </div>
  )
}
