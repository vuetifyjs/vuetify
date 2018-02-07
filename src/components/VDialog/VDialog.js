import VDialogContent from './VDialogContent'

export default {
  functional: true,

  name: 'v-dialog',

  $_wrapperFor: VDialogContent,

  render (h, context) {
    const slots = context.slots()
    const activator = slots.activator && slots.activator[0]

    const content = h(VDialogContent, context.data, slots.default)

    if (activator) {
      activator.data.on = activator.data.on || {}
      activator.data.on.click = e => {
        e.preventDefault()
        if (!content.componentInstance.disabled) content.componentInstance.isActive = true
      }
    }

    return activator ? [activator, content] : content
  }
}
