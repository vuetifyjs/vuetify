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

  export interface Colors {
    red: Color
    pink: Color
    purple: Color
    deepPurple: Color
    indigo: Color
    blue: Color
    lightBlue: Color
    cyan: Color
    teal: Color
    green: Color
    lightGreen: Color
    lime: Color
    yellow: Color
    amber: Color
    orange: Color
    deepOrange: Color
    brown: BaseColor
    blueGrey: BaseColor
    grey: BaseColor
    shades: Shade
  }

  const colors: Colors
  export default colors
}

declare module 'vuetify/lib/util/colors' {
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

  export interface Colors {
    red: Color
    pink: Color
    purple: Color
    deepPurple: Color
    indigo: Color
    blue: Color
    lightBlue: Color
    cyan: Color
    teal: Color
    green: Color
    lightGreen: Color
    lime: Color
    yellow: Color
    amber: Color
    orange: Color
    deepOrange: Color
    brown: BaseColor
    blueGrey: BaseColor
    grey: BaseColor
    shades: Shade
  }

  const colors: Colors
  export default colors
}
