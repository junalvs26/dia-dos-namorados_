import { useState, useEffect } from 'react'
import { getTimeTogether } from '../lib/time'

export function useTimer(startDate: string) {
  const [display, setDisplay] = useState(() => getTimeTogether(startDate))
  useEffect(() => {
    const id = setInterval(() => setDisplay(getTimeTogether(startDate)), 1000)
    return () => clearInterval(id)
  }, [startDate])
  return display
}
