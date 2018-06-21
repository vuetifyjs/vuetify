import { pascalizeTree } from './transformTree'
import parse from 'posthtml-parser'
import render from 'posthtml-render'

describe('pascalizeTree', () => {
  it('should pascalize node names starting with `v-`', () => {
    const input = `<v-app><router-view><v-icon/></router-view></v-app>`
    const tested = render(pascalizeTree(parse(input)))
    expect(tested).toEqual(
      '<VApp><router-view><VIcon></VIcon></router-view></VApp>'
    )
  })
})
