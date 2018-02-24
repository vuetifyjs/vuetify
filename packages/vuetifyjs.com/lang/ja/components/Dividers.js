export default {
  header: 'Divider',
  headerText: 'The `v-divider` component is used to separate sections of lists.',
  components: ['v-divider'],
  examples: [{
    fullBleed: {
      header: 'Full bleed',
      desc: 'Full bleed dividers extend the entire content width.'
    },
    lightAndDark: {
      header: 'Light and dark',
      desc: 'Dividers have light and dark variants.',
      uninverted: true
    },
    inset: {
      header: 'Inset dividers',
      desc: 'Inset dividers are moved 72px to the right. This will cause them to line up with list items.'
    },
    subheaders: {
      header: 'Subheaders and dividers',
      desc: 'Subheaders can be lined up with inset dividers by using the same prop.'
    }
  }],
  props: {
    inset: 'Adds indentation (72px)'
  }
}
