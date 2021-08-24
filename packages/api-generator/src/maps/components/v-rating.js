const slotProps = {
  onMouseenter: '() => void',
  onMouseleave: '() => void',
  onMousemove: '() => void',
  onClick: '() => void',
  icon: 'string',
  color: 'string',
  size: 'string',
  disabled: 'boolean',
  ariaLabel: 'string',
  isFilled: 'boolean',
  isHalfFilled: 'boolean',
  isHovered: 'boolean',
  isHalfHovered: 'boolean',
  index: 'number',
  value: 'number',
  hasLabels: 'boolean',
  label: 'string',
  ripple: 'boolean',
  density: 'string',
  readonly: 'boolean',
  tabindex: 'number | undefined',
}

module.exports = {
  'v-rating': {
    events: [
      {
        name: 'update:modelValue',
        value: 'Number',
      },
    ],
    slots: [
      {
        name: 'item',
        props: slotProps,
      },
      {
        name: 'item-label',
        props: slotProps,
      },
    ],
  },
}
