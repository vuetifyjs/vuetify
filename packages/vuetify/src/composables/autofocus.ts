interface AutofocusProps {
  autofocus: boolean
}

export function useAutofocus (props: AutofocusProps) {
  function onIntersect (
    isIntersecting: boolean,
    entries: IntersectionObserverEntry[]
  ) {
    if (!props.autofocus || !isIntersecting) return

    (entries[0].target as HTMLInputElement)?.focus?.()
  }

  return {
    onIntersect,
  }
}
