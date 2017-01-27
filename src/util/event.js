export default function (target, params) {
  target = target.replace(/[^a-z]/ig, '_').toUpperCase()

  this.$store.commit(`vuetify/${target}`, params)
}
