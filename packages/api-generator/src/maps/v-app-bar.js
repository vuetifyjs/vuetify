module.exports = {
  'v-app-bar': {
    slots: ['default', 'extension'],
    scopedSlots: [{
      name: 'img',
      props: {
        props: '{ height: string, src: string | srcObject }',
      },
    }],
  },
}
