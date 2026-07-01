"use client"
import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
}

export default function FAQ({ items }: FAQProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="border border-gray-200">
      {items.map((item, i) => (
        <div key={i} className={`border-b border-gray-200 last:border-0 ${open === i ? "" : ""}`}>
          <button
            className="w-full text-left flex justify-between items-start gap-4 px-5 py-4 font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="text-sm">{item.question}</span>
            <span className="shrink-0 font-black text-lg leading-none" style={{ color: "var(--navy)" }}>
              {open === i ? "−" : "+"}
            </span>
          </button>
          {open === i && (
            <div className="px-5 pb-5 border-t border-gray-100" style={{ backgroundColor: "var(--navy-light)" }}>
              <p className="text-gray-700 leading-relaxed text-sm pt-4">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
