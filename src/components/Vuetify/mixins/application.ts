export default {
  bar: 0,
  bottom: 0,
  footer: 0,
  left: 0,
  right: 0,
  top: 0,
  components: {
    bar: {},
    bottom: {},
    footer: {},
    left: {},
    right: {},
    top: {}
  },
  bind (uid, target, value) {
    if (!this.components[target]) return

    this.components[target] = { [uid]: value }
    this.update(target)
  },
  unbind (uid, target) {
    if (this.components[target][uid] == null) return

    delete this.components[target][uid]
    this.update(target)
  },
  update (target) {
    this[target] = Object.values(this.components[target])
      .reduce((acc, cur) => (acc + cur), 0)
  }
}
