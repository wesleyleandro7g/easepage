import { useEffect, useRef } from 'react'

export function useAutoResizeTextarea() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      const adjustHeight = () => {
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
      }
      textarea.addEventListener('input', adjustHeight)
      adjustHeight()
      return () => textarea.removeEventListener('input', adjustHeight)
    }
  }, [])

  return textareaRef
}
