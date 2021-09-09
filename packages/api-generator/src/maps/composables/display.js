module.exports = {
  display: {
    props: [
      {
        name: 'height',
        type: 'number',
        default: 0,
      },
      {
        name: 'lg',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'lgAndDown',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'lgAndUp',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'md',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'mdAndDown',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'mdAndUp',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'mobile',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'mobileBreakpoint',
        type: 'number | string',
        default: 'md',
      },
      {
        name: 'name',
        type: 'string',
        default: '',
      },
      {
        name: 'platform',
        type: 'object',
        default: {
          android: false,
          ios: false,
          cordova: false,
          electron: false,
          edge: false,
          firefox: false,
          opera: false,
          win: false,
          mac: false,
          linux: false,
          touch: false,
          ssr: false,
        },
      },
      {
        name: 'sm',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'smAndDown',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'smAndUp',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'thresholds',
        type: 'object',
        default: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1280,
          xl: 1920,
          xxl: 2560,
        },
        snippet: `
import { useDisplay } from 'vuetify'

export default {
  mounted () {
    const display = useDisplay()

    // display thresholds are not reactive
    // and do not need to use .value
    console.log(display.thresholds.md) // 1280
  }
}
        `,
      },
      {
        name: 'width',
        type: 'number',
        default: 0,
      },
      {
        name: 'xl',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'xlAndDown',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'xlAndUp',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'xs',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'xxl',
        type: 'boolean',
        default: 'false',
      },
    ],
  },
}
