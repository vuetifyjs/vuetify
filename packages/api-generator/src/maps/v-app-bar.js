module.exports = {
  'v-app-bar': {
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
