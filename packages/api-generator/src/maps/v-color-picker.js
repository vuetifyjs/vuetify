const VColorPickerColor = {
  alpha: 'number',
  hex: 'string',
  hexa: 'string',
  hsla: {
    h: 'number',
    s: 'number',
    l: 'number',
    a: 'number',
  },
  hsva: {
    h: 'number',
    s: 'number',
    v: 'number',
    a: 'number',
  },
  hue: 'number',
  rgba: {
    r: 'number',
    g: 'number',
    b: 'number',
    a: 'number',
  },
}

module.exports = {
  'v-color-picker': {
    events: [
      {
        name: 'input',
        value: 'string | object',
      },
      {
        name: 'update:color',
        value: VColorPickerColor,
      },
      {
        name: 'update:mode',
        value: 'string',
      },
    ],
  },
}
