import VDialogContent from './VDialogContent'

let counter = 0

/* @vue/component */
export default {
  name: 'v-dialog',

  functional: true,

  $_wrapperFor: VDialogContent,

  render (h, context) {
    const slots = context.slots()
    const activator = slots.activator && slots.activator[0]

    context.data.ref = context.data.ref || '$_v-dialog-' + counter++

    const content = h(VDialogContent, context.data, slots.default)

    if (activator) {
      activator.data.on = activator.data.on || {}
      activator.data.on.click = e => {
        e.preventDefault()
        const dialog = context.parent.$refs[context.data.ref]
        if (!dialog.disabled) dialog.isActive = true
      }
    }

    return activator ? [activator, content] : content
  }
}
