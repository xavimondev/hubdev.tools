import { RefObject, useEffect } from 'react'

export function useOnClickOutside(dialogRef: RefObject<HTMLDivElement>, handler: VoidFunction) {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!dialogRef.current?.contains(event.target)) {
        handler()
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
