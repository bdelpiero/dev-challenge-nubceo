import { ChangeEvent } from 'react'

// Basic hash function that returns a 32bit integer
// source: https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
export function hash(str: string) {
  let hash = 0
  for (let i = 0, len = str.length; i < len; i++) {
    let chr = str.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}

export const inputHandler =
  (callback: (value: string) => void) => (event: ChangeEvent<HTMLInputElement>) => {
    callback(event.target.value)
  }

export const delay = (t: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, t))
