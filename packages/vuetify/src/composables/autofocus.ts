interface AutofocusProps {
  autofocus: boolean
}

export function useAutofocus (props: AutofocusProps) {
  function onIntersect (
    isIntersecting: boolean,
    entries: IntersectionObserverEntry[]
  ) {
    if (!props.autofocus || !isIntersecting) return

    const el = entries[0].target
    const target = (el.matches('input,textarea') ? el : el.querySelector('input,textarea')) as HTMLElement | null

    // Defer past overlay enter setup (e.g. VDialogTransition visibility:hidden)
    setTimeout(() => target?.focus(), 50)
  }

  return {
    onIntersect,
  }
}
