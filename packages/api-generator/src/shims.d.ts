import { ts } from '@ts-morph/common'

declare module 'ts-morph' {
  export interface Type {
    _context: {
      compilerFactory: {
        getType<TType extends ts.Type>(type: TType): Type<TType>
      }
    }
  }

  namespace ts {
    interface Type {
      indexInfos: {
        keyType: Type
        type: Type
      }[]
    }
  }
}
