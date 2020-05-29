export default {
  data: () => ({
    pen: null,
  }),

  methods: {
    boot (res) {
      const template = this.parseTemplate('template', res)
      const style = this.parseTemplate('style', res)
      const script = this.parseTemplate('script', res)
      const codepenResources = this.parseTemplate('codepen-resources', res)
      const codepenAdditional = this.parseTemplate('codepen-additional', res)

      this.pen = {
        template,
        style,
        script,
        codepenResources,
        codepenAdditional,
      }
    },
    parseTemplate (target, template) {
      const string = `(<${target}(.*)?>[\\w\\W]*<\\/${target}>)`
      const regex = new RegExp(string, 'g')
      const parsed = regex.exec(template) || []
      return parsed[1] || ''
    },
  },
}
