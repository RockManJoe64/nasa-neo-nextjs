import { DateTime } from 'luxon'

/**
 * Transforms a time in the form 'yyyy-MMM-dd HH:mm' to ISO datetime using ISO 8601 standard.
 * This assumes the time is in UTC.
 * @param {string} dateString
 */
export function toIsoDate(dateString) {
  const options = { zone: 'utc' }
  const dt = DateTime.fromFormat(dateString, 'yyyy-MMM-dd HH:mm', options)
  const formatted = dt.toLocal().setLocale('us').toLocaleString(DateTime.DATETIME_FULL)

  return formatted
}
