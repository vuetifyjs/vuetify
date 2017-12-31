export default {
  name: 'soloable',

  props: {
    flat: Boolean,
    soloInverted: Boolean,
    solo: Boolean
  },

  computed: {
    isSolo () {
      return this.solo || this.soloInverted
    }
  },

  methods: {
    genSoloClasses () {
      return {
        'input-group--solo': this.isSolo,
        'input-group--solo-inverted': this.soloInverted,
        'elevation-0': this.flat
      }
    }
  }
}
