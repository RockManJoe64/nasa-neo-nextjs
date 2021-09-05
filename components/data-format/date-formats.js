import { DateTime } from 'luxon'

/**
 * Transforms a time in the form 'yyyy-MMM-dd HH:mm' to ISO datetime using ISO 8601 standard
 * @param {string} dateString 
 */
export function toIsoDate(dateString) {
  const options = { zone: 'utc' }
  const dt = DateTime.fromFormat(dateString, 'yyyy-MMM-dd HH:mm', options)
  const formatted = dt.setLocale('us').toLocaleString(DateTime.DATETIME_FULL)

  return formatted
}
