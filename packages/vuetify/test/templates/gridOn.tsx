import { VNode } from 'vue'

export function gridOn<A, B> (a: Readonly<A[]>, b: Readonly<B[]>, fn: (a: A, b: B) => VNode) {
  return (
    <div class="d-flex flex-column" style="gap: 0.4rem">
      { a.map(a => (
        <>
          <h5>{ a as any }</h5>
          <div class="d-flex" style="gap: 0.8rem">
            { b.map(b => fn(a, b)) }
          </div>
        </>
      ))}
    </div>
  )
}
