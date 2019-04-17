const VTimeProps = [
  { name: 'format', source: 'v-time' },
  { name: 'allowedHours', source: 'v-time' },
  { name: 'allowedMinutes', source: 'v-time' },
  { name: 'allowedSeconds', source: 'v-time' },
  { name: 'min', source: 'v-time' },
  { name: 'max', source: 'v-time' },
  { name: 'useSeconds', source: 'v-time' },
  { name: 'value', source: 'v-time' },
]

module.exports = {
  'v-time': {
    props: VTimeProps,
  },
  VTimeProps,
}
