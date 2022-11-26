import { ChangeEvent } from "react"

export const inputHandler = (callback: (value: string) => void) => (event: ChangeEvent<HTMLInputElement>) => {
  callback(event.target.value)
}
