import type ts from 'typescript'
import type { TransformerExtras, PluginConfig } from 'ts-patch'

export default function (program: ts.Program, pluginConfig: PluginConfig, { ts: tsc }: TransformerExtras) {
  return (ctx: ts.TransformationContext) => {
    return (sourceFile: ts.SourceFile) => {
      function visit(node: ts.Node) {
        if (
          tsc.isImportDeclaration(node) &&
          tsc.isStringLiteral(node.moduleSpecifier) &&
          /\.s[ac]ss$/.test(node.moduleSpecifier.text)
        ) return

        return tsc.visitEachChild(node, visit, ctx)
      }
      return tsc.visitNode(sourceFile, visit)
    }
  }
}
