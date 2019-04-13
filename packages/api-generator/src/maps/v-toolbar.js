module.exports = {
  'v-toolbar': {
    slots: ['default', 'extension'],
    scopedSlots: [{
      name: 'img',
      props: {
        props: '{ height: string, src: string | srcObject }'
      }
    }]
  }
}
