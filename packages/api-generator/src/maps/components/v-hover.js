module.exports = {
  'v-hover': {
    slots: [
      {
        name: 'default',
        props: {
          hover: 'boolean',
          props: {
            onMouseenter: 'function',
            onMouseleave: 'function',
          },
        },
      },
    ],
  },
}
