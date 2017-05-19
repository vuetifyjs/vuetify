export default {
  beforeCreate () {
    window.start = new Date()
  },
  mounted () {
    console.log((new Date().getTime() - window.start.getTime()) / 1000)
  }
}
