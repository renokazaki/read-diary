import { Badge } from "@/components/ui/badge"
import { ReadStatus } from "@prisma/client"

const STATUS_LABELS: Record<ReadStatus, string> = {
  WANT_TO_READ: "読みたい",
  READING: "読んでいる",
  FINISHED: "読み終わった",
}

const STATUS_CLASSES: Record<ReadStatus, string> = {
  WANT_TO_READ: "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-100",
  READING: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100",
  FINISHED: "bg-green-100 text-green-700 border-green-200 hover:bg-green-100",
}

interface StatusBadgeProps {
  status: ReadStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge variant="outline" className={STATUS_CLASSES[status]}>
      {STATUS_LABELS[status]}
    </Badge>
  )
}
