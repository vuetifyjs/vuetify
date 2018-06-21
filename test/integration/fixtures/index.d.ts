declare module 'vue-template-compiler' {
  const compileToFunctions: (
    template: string,
    options?: any
  ) => {
    render: Function
  }
}
declare namespace PostHTML{
  type PostHTMLBranch = PostHTMLNode | string
  type PostHTMLTree = PostHTMLBranch[]
  interface PostHTMLNode {
    tag: string
    content?: PostHTMLTree
  }
}
declare module 'posthtml-parser' {
  const parse: (html: string) => PostHTML.PostHTMLTree
  export default parse
}
declare module 'posthtml-render' {
  const render: (html: PostHTML.PostHTMLTree) => string
  export default render
}
