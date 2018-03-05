declare module 'vuetify/es5/util/colors' {
  interface BaseColor {
    readonly base: string
    readonly lighten5: string
    readonly lighten4: string
    readonly lighten3: string
    readonly lighten2: string
    readonly lighten1: string
    readonly darken1: string
    readonly darken2: string
    readonly darken3: string
    readonly darken4: string
  }

  interface Color extends BaseColor {
    readonly accent1: string
    readonly accent2: string
    readonly accent3: string
    readonly accent4: string
  }

  interface Shade {
    readonly black: string
    readonly white: string
    readonly transparent: string
  }

  export const red: Color
  export const pink: Color
  export const purple: Color
  export const deepPurple: Color
  export const indigo: Color
  export const blue: Color
  export const lightBlue: Color
  export const cyan: Color
  export const teal: Color
  export const green: Color
  export const lightGreen: Color
  export const lime: Color
  export const yellow: Color
  export const amber: Color
  export const orange: Color
  export const deepOrange: Color
  export const brown: BaseColor
  export const blueGrey: BaseColor
  export const grey: BaseColor
  export const shades: Shade
}
