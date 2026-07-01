interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  labels: string[]
}

export default function ProgressBar({ currentStep, totalSteps, labels }: ProgressBarProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        {labels.map((label, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                i + 1 < currentStep
                  ? "bg-green-500 text-white"
                  : i + 1 === currentStep
                  ? "bg-sky-700 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {i + 1 < currentStep ? "✓" : i + 1}
            </div>
            <span
              className={`text-xs hidden sm:block ${
                i + 1 === currentStep ? "text-sky-700 font-semibold" : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="relative h-2 bg-gray-200 rounded-full">
        <div
          className="absolute h-2 bg-sky-700 rounded-full transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
      <p className="text-sm text-gray-500 mt-2 text-center sm:hidden">
        Stap {currentStep} van {totalSteps}: {labels[currentStep - 1]}
      </p>
    </div>
  )
}
