const steps = [
  {
    num: "01",
    title: "Vul het formulier in",
    desc: "Apparaatgegevens, foto's van de schade, contactgegevens. Duurt 5 minuten.",
  },
  {
    num: "02",
    title: "Betaal veilig via iDEAL",
    desc: "Snelle betaling via iDEAL of creditcard. Geen verrassingen achteraf.",
  },
  {
    num: "03",
    title: "Rapport binnen 24 uur",
    desc: "Officieel PDF-rapport per e-mail. Dagwaardeberekening en total-loss oordeel voor uw verzekeraar.",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 border-b border-gray-200" style={{ backgroundColor: "var(--navy-light)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Hoe het werkt</h2>
        <p className="text-gray-600 mb-10">In drie stappen naar uw officiële schaderapport.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200">
          {steps.map((step, i) => (
            <div key={step.num} className={`bg-white p-8 ${i < steps.length - 1 ? "border-b md:border-b-0 md:border-r border-gray-200" : ""}`}>
              <div className="text-4xl font-black mb-4" style={{ color: "var(--navy)" }}>{step.num}</div>
              <h3 className="font-bold text-gray-900 text-base mb-2">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
