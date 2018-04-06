import Vue from 'vue'

declare interface props {
  absolute?: BooleanConstructor,
  bottom?: BooleanConstructor,
  fixed?: BooleanConstructor,
  left?: BooleanConstructor,
  right?: BooleanConstructor,
  top?: BooleanConstructor
}

export declare function factory <S extends props = props> (selected?: Array<keyof S>)

export declare interface factory {
  new (...args: any[]): Vue
}

export default factory

// import Vue, { ComponentOptions } from 'vue'
// import { filterObjectOnKeys } from '../util/helpers'
// import Component from 'vue-class-component'
//
// declare interface props {
//   absolute?: BooleanConstructor,
//   bottom?: BooleanConstructor,
//   fixed?: BooleanConstructor,
//   left?: BooleanConstructor,
//   right?: BooleanConstructor,
//   top?: BooleanConstructor
// }
//
// // export function factory<S extends props = props> (selected: Array<keyof S> = []): ComponentOptions<
// //   Vue,
// //   undefined,
// //   undefined,
// //   undefined,
// //   { [P in keyof S]: boolean }
// // > {
// //   const props = {
// //     absolute: Boolean,
// //     bottom: Boolean,
// //     fixed: Boolean,
// //     left: Boolean,
// //     right: Boolean,
// //     top: Boolean
// //   }
// //
// //   return {
// //     name: 'positionable',
// //     props: selected.length ? filterObjectOnKeys(props, selected) : props
// //   }
// // }
//
// @Component
// export class factory<S extends props = props> extends Vue {
//   props: {
//     [P in keyof S]: BooleanConstructor
//   }
//   name = 'positionable'
//
//   // constructor (selected: Array<keyof S> = []) {
//   //   super()
//   //   const props = {
//   //     absolute: Boolean,
//   //     bottom: Boolean,
//   //     fixed: Boolean,
//   //     left: Boolean,
//   //     right: Boolean,
//   //     top: Boolean
//   //   }
//   //   this.props = selected.length ? filterObjectOnKeys(props, selected) : props
//   // }
// }
//
// // const test = new factory(['top'])
// const test = new factory()
//
// console.log(test.props.absolute)
//
// export default new factory()
