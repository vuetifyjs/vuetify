type AnchorBlock = 'top' | 'bottom'

type AnchorInline = 'start' | 'end' | 'left' | 'right'

export type Anchor =
  | AnchorBlock
  | AnchorInline
  | 'center'
  | 'center center'
  | `${AnchorBlock} ${AnchorInline | 'center'}`
  | `${AnchorInline} ${AnchorBlock | 'center'}`

export {}
