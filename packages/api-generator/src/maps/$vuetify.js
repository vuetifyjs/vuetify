module.exports = {
  $vuetify: {
    functions: [
      {
        name: 'goTo',
        signature: `(target: number | string | HTMLElement | Vue, options?: {
    container?: string | HTMLElement | Vue
    duration?: number
    offset?: number
    easing?: VuetifyGoToEasing
    appOffset?: boolean
}): Promise<number>`,
      },
    ],
  },
}
