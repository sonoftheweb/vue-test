import { ref } from 'vue'

export default function (timeoutCount: number) {
  let timeoutRef: null | number = null
  const displayValue = ref("")
  const debouncedValue = ref("")

  const debouncedListener = (e: string) => {
    if (timeoutRef) clearTimeout(timeoutRef)
    displayValue.value = e
    timeoutRef = setTimeout(() => {
      debouncedValue.value = e
    }, timeoutCount)
  }

  return {debouncedValue, displayValue, debouncedListener}
}