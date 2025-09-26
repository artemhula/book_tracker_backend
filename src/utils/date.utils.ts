export function getDateRange(startDate: Date, daysCount: number): string[] {
  const dateRange: string[] = [];
  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() - i);
    dateRange.push(d.toISOString().slice(0, 10));
  }
  return dateRange;
}
