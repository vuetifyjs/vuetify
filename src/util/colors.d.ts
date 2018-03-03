declare module 'vuetify/es5/util/colors' {
	interface BaseColor {
		base: string
		lighten5: string
		lighten4: string
		lighten3: string
		lighten2: string
		lighten1: string
		darken1: string
		darken2: string
		darken3: string
		darken4: string
	}

	interface Color extends BaseColor {
		accent1?: string
		accent2?: string
		accent3?: string
		accent4?: string
	}

	interface Shade {
		black: string
		white: string
		transparent: string
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

