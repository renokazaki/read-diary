"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  value: number | null
  onChange?: (value: number | null) => void
  readOnly?: boolean
  size?: "sm" | "md"
}

export function StarRating({ value, onChange, readOnly = false, size = "md" }: StarRatingProps) {
  const starSize = size === "sm" ? "h-4 w-4" : "h-5 w-5"

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => {
            if (readOnly || !onChange) return
            onChange(value === star ? null : star)
          }}
          disabled={readOnly}
          className={cn(
            "focus:outline-none",
            !readOnly && "cursor-pointer hover:scale-110 transition-transform"
          )}
        >
          <Star
            className={cn(
              starSize,
              "transition-colors",
              value !== null && star <= value
                ? "fill-yellow-400 text-yellow-400"
                : "fill-none text-gray-300"
            )}
          />
        </button>
      ))}
    </div>
  )
}
