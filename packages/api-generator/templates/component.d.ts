import type {
  AllowedComponentProps,
  AnchorHTMLAttributes,
  AreaHTMLAttributes,
  AudioHTMLAttributes,
  BaseHTMLAttributes,
  BlockquoteHTMLAttributes,
  ButtonHTMLAttributes,
  CanvasHTMLAttributes,
  ColgroupHTMLAttributes,
  ColHTMLAttributes,
  DataHTMLAttributes,
  DelHTMLAttributes,
  DetailsHTMLAttributes,
  DialogHTMLAttributes,
  EmbedHTMLAttributes,
  FieldsetHTMLAttributes,
  FormHTMLAttributes,
  HTMLAttributes,
  HtmlHTMLAttributes,
  IframeHTMLAttributes,
  ImgHTMLAttributes,
  InputHTMLAttributes,
  InsHTMLAttributes,
  KeygenHTMLAttributes,
  LabelHTMLAttributes,
  LiHTMLAttributes,
  LinkHTMLAttributes,
  MapHTMLAttributes,
  MediaHTMLAttributes,
  MenuHTMLAttributes,
  MetaHTMLAttributes,
  MeterHTMLAttributes,
  ObjectHTMLAttributes,
  OlHTMLAttributes,
  OptgroupHTMLAttributes,
  OptionHTMLAttributes,
  OutputHTMLAttributes,
  ParamHTMLAttributes,
  ProgressHTMLAttributes,
  QuoteHTMLAttributes,
  RenderFunction,
  ScriptHTMLAttributes,
  SelectHTMLAttributes,
  SourceHTMLAttributes,
  StyleHTMLAttributes,
  SVGAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  TextareaHTMLAttributes,
  ThHTMLAttributes,
  TimeHTMLAttributes,
  TrackHTMLAttributes,
  VideoHTMLAttributes,
  VNodeChild,
  VNodeProps,
  WebViewHTMLAttributes,
} from 'vue'
import type { __component__ } from '@/__name__'

type AllHTMLAttributes =
  | keyof HTMLAttributes
  | keyof AnchorHTMLAttributes
  | keyof AreaHTMLAttributes
  | keyof AudioHTMLAttributes
  | keyof BaseHTMLAttributes
  | keyof BlockquoteHTMLAttributes
  | keyof ButtonHTMLAttributes
  | keyof CanvasHTMLAttributes
  | keyof ColHTMLAttributes
  | keyof ColgroupHTMLAttributes
  | keyof DataHTMLAttributes
  | keyof DetailsHTMLAttributes
  | keyof DelHTMLAttributes
  | keyof DialogHTMLAttributes
  | keyof EmbedHTMLAttributes
  | keyof FieldsetHTMLAttributes
  | keyof FormHTMLAttributes
  | keyof HtmlHTMLAttributes
  | keyof IframeHTMLAttributes
  | keyof ImgHTMLAttributes
  | keyof InsHTMLAttributes
  | keyof InputHTMLAttributes
  | keyof KeygenHTMLAttributes
  | keyof LabelHTMLAttributes
  | keyof LiHTMLAttributes
  | keyof LinkHTMLAttributes
  | keyof MapHTMLAttributes
  | keyof MenuHTMLAttributes
  | keyof MediaHTMLAttributes
  | keyof MetaHTMLAttributes
  | keyof MeterHTMLAttributes
  | keyof QuoteHTMLAttributes
  | keyof ObjectHTMLAttributes
  | keyof OlHTMLAttributes
  | keyof OptgroupHTMLAttributes
  | keyof OptionHTMLAttributes
  | keyof OutputHTMLAttributes
  | keyof ParamHTMLAttributes
  | keyof ProgressHTMLAttributes
  | keyof ScriptHTMLAttributes
  | keyof SelectHTMLAttributes
  | keyof SourceHTMLAttributes
  | keyof StyleHTMLAttributes
  | keyof TableHTMLAttributes
  | keyof TextareaHTMLAttributes
  | keyof TdHTMLAttributes
  | keyof ThHTMLAttributes
  | keyof TimeHTMLAttributes
  | keyof TrackHTMLAttributes
  | keyof VideoHTMLAttributes
  | keyof WebViewHTMLAttributes
  | keyof SVGAttributes

type StripHTMLAttributes = Exclude<AllHTMLAttributes, typeof __component__['$propsNames']>

type StripProps =
  | StripHTMLAttributes
  | keyof VNodeProps
  | keyof AllowedComponentProps
  | 'v-slots'
  | '$children'
  | '$slots'
  | `v-slot:${string}`
type Event = `on${string}`

type Props<T> = T extends { $props: infer P extends object }
  ? { [K in Exclude<keyof P, StripProps | Event>]: P[K] }
  : never

type Events<T> = T extends { $props: infer P extends object }
  ? {
    [K in Exclude<keyof P, StripProps> as K extends `on${infer N}`
      ? Uncapitalize<N>
      : never
    ]: P[K] extends ((...args: any[]) => any)
      ? Parameters<P[K]>
      : never
  }
  : never

export type ComponentProps = Props<__component__>
export type ComponentEvents = Events<__component__>

type RemoveIndex<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
      ? never
      : symbol extends K
        ? never
        : K
  ]: T[K]
}

type Slot<T extends any[] = any[]> = (...args: T) => VNodeChild
type Slots<
  T extends { $props: any },
  S = '$children' extends keyof T['$props'] ? Exclude<T['$props']['$children'], VNodeChild> : never
> = '$children' extends keyof T['$props']
  ? ExcludeEmpty<{ [K in keyof S]: S[K] extends Slot<infer A> ? A[0] : never }>
  : never

type AtLeastOne<T, U = {[K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]
type ExcludeEmpty<T> = T extends AtLeastOne<T> ? T : never

export type ComponentSlots = Slots<__component__>

type ExtractExposed<T> = T extends (...args: any[]) => infer R
  ? R extends Promise<any>
    ? never
    : R extends RenderFunction
      ? never
      : R extends void
        ? never
        : R extends object
          ? RemoveIndex<R>
          : never
  : never

export type ComponentExposed = ExtractExposed<__component__['$options']['setup']>
