module.exports = {
  create (context) {
    return {
      ImportDeclaration (node) {
        if (node.source.value === '@/components') {
          context.report(node.source, 'Do not import from "@/components"')
        }
      },
    }
  },
}
