export const AB_COOKIE = "ab_prijs"

export const AB_VARIANTS = {
  A: { price: "30", mollieAmount: "30.00", label: "€30" },
  B: { price: "49", mollieAmount: "49.00", label: "€49" },
  C: { price: "59", mollieAmount: "59.00", label: "€59" },
} as const

export type Variant = keyof typeof AB_VARIANTS

export const VALID_VARIANTS = Object.keys(AB_VARIANTS) as Variant[]

export function getVariant(cookieValue: string | undefined): Variant {
  if (cookieValue && VALID_VARIANTS.includes(cookieValue as Variant)) {
    return cookieValue as Variant
  }
  return "B"
}

export function assignVariant(): Variant {
  // Variant A (€30) staat uit — B en C converteren beter
  return Math.random() < 0.5 ? "B" : "C"
}
