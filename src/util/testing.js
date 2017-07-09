export function functionalContext(context = {}) {
  return {
    context: Object.assign({
      data: {},
      props: {}
    }, context)
  }
}
