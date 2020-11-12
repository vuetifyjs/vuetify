const NextPrevSlots = [{
  name: 'next',
  props: {
    attrs: '{ aria-label: string }',
    on: '{ click: eventHandler }',
  },
  source: 'v-window',
},
{
  name: 'prev',
  props: {
    attrs: '{ aria-label: string }',
    on: '{ click: eventHandler }',
  },
  source: 'v-window',
}]

module.exports = {
  'v-window': {
    slots: [
      {
        name: 'default',
        props: undefined,
      },
      ...NextPrevSlots,
    ],
    props: [
      {
        name: 'touch',
        example: {
          left: 'Function',
          right: 'Function',
        },
      },
    ],
    events: [
      {
        name: 'change',
        value: 'number',
      },
    ],
  },
  NextPrevSlots,
}
