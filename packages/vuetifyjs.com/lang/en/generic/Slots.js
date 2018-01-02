export default {
  activator: 'When used, will activate the component when clicked (or hover for specific components). This manually stops the event propagation. Without this slot, if you open the component through its model, you will need to manually stop the event propagation',
  badge: 'The slot that will be used for the badge',
  default: 'Default Vue slot',
  label: 'Replaces the default label',
  progress: 'Slot for custom progress linear (displayed when **loading** prop is not equal to Boolean False)',
  noData: 'Displayed when there are no filtered items'
}
