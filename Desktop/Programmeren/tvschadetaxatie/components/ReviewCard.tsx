interface ReviewCardProps {
  name: string
  city: string
  text: string
}

export default function ReviewCard({ name, city, text }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg">★</span>
        ))}
      </div>
      <p className="text-gray-700 leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>
      <p className="text-sm font-semibold text-gray-900">
        {name} <span className="font-normal text-gray-500">— {city}</span>
      </p>
    </div>
  )
}
