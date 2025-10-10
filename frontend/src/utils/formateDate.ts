// src/utils/formatDate.ts
import { format } from "date-fns";

export function fmt(dateStr?: string | Date) {
  if (!dateStr) return "";
  const d = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
  return format(d, "yyyy-MM-dd");
}
