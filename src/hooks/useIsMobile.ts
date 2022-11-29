import { useState, useEffect } from 'react'

// source: https://stackoverflow.com/questions/59104425/typescript-debounce-function-not-calling-function-passed-as-parameter
function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number
): (...args: Params) => void {
  let timer: number
  return (...args: Params) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, timeout)
  }
}

const getIsMobile = () => window.innerWidth <= 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(getIsMobile())

  useEffect(() => {
    const onResize = () => {
      setIsMobile(getIsMobile())
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return isMobile
}
