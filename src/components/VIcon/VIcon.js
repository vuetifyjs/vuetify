<script>
  import Themeable from '../../mixins/themeable'
  import Contextualable from '../../mixins/contextualable'

  export default {
    name: 'v-icon',

    functional: true,

    mixins: [Themeable, Contextualable],

    props: {
      disabled: Boolean,
      fa: Boolean,
      mdi: Boolean,
      large: Boolean,
      left: Boolean,
      medium: Boolean,
      right: Boolean,
      xLarge: Boolean
    },

    render (h, { props, data, children = [] }) {
      if (props.fa || props.mdi) console.warn(`The v-icon prop 'fa' and 'mdi' will be deprecated in the next release. Use 'fa' or 'mdi' prefix in icon name instead.`)
      let iconName = ''
      let iconType = 'material-icons'

      if (children.length) {
        iconName = children.pop().text
      } else if (data.domProps && data.domProps.textContent) {
        iconName = data.domProps.textContent
        delete data.domProps.textContent
      } else if (data.domProps && data.domProps.innerHTML) {
        iconName = data.domProps.innerHTML
        delete data.domProps.innerHTML
      }

      const thirdPartyIcon = iconName.indexOf('-') > -1
      if (thirdPartyIcon) iconType = iconName.slice(0, iconName.indexOf('-'))

      // To keep things backwards compatible for now
      iconType = props.fa ? 'fa' : props.mdi ? 'mdi' : iconType

      data.staticClass = (`${iconType} icon ${data.staticClass || ''}`).trim()
      data.attrs = data.attrs || {}

      const classes = {
        'icon--disabled': props.disabled,
        'icon--large': props.large,
        'icon--left': props.left,
        'icon--medium': props.medium,
        'icon--right': props.right,
        'icon--x-large': props.xLarge,
        'primary--text': props.primary,
        'secondary--text': props.secondary,
        'success--text': props.success,
        'info--text': props.info,
        'warning--text': props.warning,
        'error--text': props.error,
        'theme--dark': props.dark,
        'theme--light': props.light
      }

      const iconClasses = Object.keys(classes).filter(k => classes[k]).join(' ')
      iconClasses && (data.staticClass += ` ${iconClasses}`)

      // To keep things backwards compatible for now
      if (props.fa || props.mdi) {
        const comparison = props.fa ? 'fa' : 'mdi'

        if (iconName.indexOf(' ') > -1) data.staticClass += ` ${comparison}-${iconName}`
        else data.staticClass += ` ${comparison}-${iconName.split(' ').join('-')}`
      }

      if (thirdPartyIcon) data.staticClass += ` ${iconName}`
      !(thirdPartyIcon || props.fa || props.mdi) && children.push(iconName)

      return h('i', data, children)
    }
  }
</script>

<style lang="stylus" src="../../stylus/components/_icons.styl"></style>
