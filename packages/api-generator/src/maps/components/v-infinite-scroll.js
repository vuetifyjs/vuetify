const slotProps = {
  side: 'string',
  props: {
    onClick: 'function',
    color: 'string',
  },
}

module.exports = {
  'v-infinite-scroll': {
    slots: [
      {
        name: 'default',
        props: undefined,
      },
      {
        name: 'loading',
        props: slotProps,
      },
      {
        name: 'load-more',
        props: slotProps,
      },
      {
        name: 'empty',
        props: slotProps,
      },
    ],
  },
}
