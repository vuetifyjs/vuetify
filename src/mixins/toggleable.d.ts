import Vue, { ExtendedVue } from 'vue'

declare type Toggleable<T extends string> = VueClass<Vue & Record<T, any> & { isActive: boolean }>

export declare function factory<T extends string> (prop?: T, event?: string): Toggleable<T>

declare const t: Toggleable<'value'>
export default t
