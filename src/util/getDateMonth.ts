export function getDateMonth(year: number, month: number): { startDateMonth: Date, endDateMonth: Date } {
    const startDateMonth = new Date(year, month - 1, 1);
    const endDateMonth = new Date(year, month, 1);
    return { startDateMonth, endDateMonth };
}
export function getDateMonthByDate(date: Date): { startDateMonth: Date, endDateMonth: Date } {
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth()
  return getDateMonth(year, month)
}