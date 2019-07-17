module.exports = {
  'v-toolbar': {
    slots: [
      'default',
      'extension',
      {
        name: 'img',
        props: {
          props: '{ height: string, src: string | srcObject }',
        },
      },
    ],
  },
}
