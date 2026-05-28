export function getTimeTogether(startDate: string): string {
  const start = new Date(startDate)
  const now = new Date()
  const diff = now.getTime() - start.getTime()
  if (diff < 0) return '0 dias, 00h 00m 00s'
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return `${days} dias, ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`
}
