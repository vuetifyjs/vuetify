import { convert } from 'xhtml2pug'

export default {
  name: 'Codepen',

  data: () => ({ pen: undefined }),

  methods: {
    async importTemplate () {
      try {
        const template = await import(
          /* webpackChunkName: "examples-source" */
          /* webpackMode: "lazy-once" */
          `!raw-loader!../examples/${this.file}.vue`
        )

        this.boot(template.default)
      } catch (err) {
        console.log(err)
      }
    },
    boot (res) {
      const template = this.parseTemplate('template', res)
      let templatePug = template
      if (templatePug) {
        templatePug = templatePug.slice('<template>'.length).slice(0, -'</template>'.length)
        templatePug = convert(templatePug, { bodyLess: true, attrComma: true, doubleQuotes: true, encode: false })
        templatePug = `<template lang="pug">\n${templatePug}</template>`
      }
      const style = this.parseTemplate('style', res)
      const script = this.parseTemplate('script', res)
      const codepenResources = this.parseTemplate('codepen-resources', res)
      const codepenAdditional = this.parseTemplate('codepen-additional', res)

      this.pen = {
        template,
        'template-pug': templatePug,
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
    sendToCodepen () {
      if (!this.$refs.codepen) return

      this.$refs.codepen.submit()
    },
  },
}
