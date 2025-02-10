/**
 * Returns a human-readable string indicating how much time has passed
 * since the given date (e.g., "5 minutes ago", "2 hours ago").
 *
 * @param date - A Date object or a valid timestamp (number) from which to calculate the elapsed time
 * @returns A string describing the elapsed time
 */
export function timeSince(date: Date | string): string {
  // If the input is a timestamp, convert it to a Date object
  const dateObj = typeof date === 'string' ? new Date(date) : date

  // Calculate the difference in seconds
  const seconds = Math.floor((Date.now() - dateObj.getTime()) / 1000)

  // Handle any future dates or extremely small differences
  if (seconds < 1) {
    return 'just now'
  }

  // Define our time intervals in seconds
  const intervals: { [key: string]: number } = {
    year: 31536000, // 365 days
    month: 2592000, // 30 days
    week: 604800, // 7 days
    day: 86400,
    hour: 3600,
    minute: 60,
  }

  // Iterate over intervals from largest to smallest
  for (const [unit, value] of Object.entries(intervals)) {
    const count = Math.floor(seconds / value)
    if (count >= 1) {
      return `${count} ${unit}${count > 1 ? 's' : ''} ago`
    }
  }

  // If we haven't hit any larger interval, fallback to seconds
  return `${seconds} second${seconds > 1 ? 's' : ''} ago`
}
