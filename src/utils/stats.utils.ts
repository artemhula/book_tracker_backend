export default function groupRecordsByDate(
  records: any[],
  dateRange: string[]
): Record<string, number> {
  const pagesByDate: Record<string, number> = {};
  dateRange.forEach((date) => (pagesByDate[date] = 0));

  records.forEach((record) => {
    if (record.readAt) {
      const date = record.readAt.toISOString().slice(0, 10);
      pagesByDate[date] += record.pagesRead;
    }
  });

  return pagesByDate;
}
