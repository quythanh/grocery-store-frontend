import { useEffect } from "react"

const useDebouce = (callback: () => void, deps: any[], timeout?: number) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback()
    }, timeout || 300)

    return () => {
      clearTimeout(timer)
    }
  }, deps)
}

export default useDebouce
