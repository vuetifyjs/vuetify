// Utilites
import { propsFactory } from '@/util'

// Types
export interface MaskProps {
  fillBlanks?: boolean
  mask?: string
}

export const makeMaskProps = propsFactory({
  fillBlanks: Boolean,
  mask: String,
}, 'mask')

function isAlphaNumeric (val: string | number) {
  return /^[a-z0-9]/gi.test(String(val))
}

function getDelimiter (val: any, comp: any) {
  if (comp === '#') {
    return !isNaN(parseInt(val)) ? comp : undefined
  }

  if (['A', 'a'].includes(comp)) {
    return /[a-z]/i.test(val) ? comp : undefined
  }

  if (['N', 'n'].includes(comp)) {
    return /[0-9]/.test(val) ? comp : undefined
  }

  return undefined
}

export function useMask (props: MaskProps) {
  function mask (val: string, maskVal = props.mask) {
    // maskVal = '##- #'

    // ['#', '#', '-', ' ', '#', '#']
    const splitMaskVal = maskVal?.split('') ?? []
    // ['#', '#', '#', '#']
    const plainMaskValMask = splitMaskVal.reduce((acc, cur) => {
      if (['#', 'A', 'a', 'N', 'n'].includes(cur)) {
        acc.push(cur)
      }

      return acc
    }, [])

    // val = '589-4'

    // ['5', '8', '9', '-', '4']
    const splitVal = val.split('')
    // ['5', '8', '9', '4']
    const plainVal = splitVal.reduce((acc, cur) => {
      if (isAlphaNumeric(cur)) {
        acc.push(cur)
      }

      return acc
    }, [])

    // '['#', '#', '#', '#']
    let pvmk = 0
    const plainValMask = splitVal.reduce((acc, cur) => {
      if (isAlphaNumeric(cur)) {
        acc.push(plainMaskValMask[pvmk])

        pvmk++
      }

      return acc
    }, [])

    const remask = []

    for (const index in plainMaskValMask) {
      if (plainMaskValMask[index] === plainValMask[index]) {
        remask.push(plainVal[index])
      } else {
        break
      }
    }

    const remaskt = []

    for (const index in splitMaskVal) {
      //
    }
    // let i = 0
    // const plainMask = splitVal.reduce((acc, cur) => {
    //   if (isAlphaNumeric(cur)) {
    //     acc.push(plainMaskVal[i])

    //     i++
    //   }

    //   return acc
    // }, []).join('')

    // const splitVal = val.split('')
    // const plainVal = splitVal.reduce((acc, cur) => {
    //   if (isAlphaNumeric(cur)) {
    //     acc.push(cur)
    //   }

    //   return acc
    // }, [])

    // console.log(val, plainVal, plainMaskValMask)
    // console.log(maskVal, plainMask)

    // for (let k = 0; k < splitMask.length; i++) {

    // }

    // const remasked = []
    // const k = 0
    // const j = 0
    // let t = 0
    // while (k <= splitMask.length - 1) {
    //   const currentMask = plainMask[k]
    //   const currentVal = plainVal[k]
    //   const currentPlainMask = splitMask[j]
    //   const current

    //   console.log(currentMask)
    //   console.log(currentPlainMask)
    //   // const currentPlainVal = splitVal[i]

    //   // if () {
    //   //   remasked.push(splitMask[j])

    //   //   k++
    //   // } else if (maskedVal[k] === plainMask[k]) {
    //   //   remasked.push(plainVal[j])

    //   //   k++
    //   //   j++
    //   // }

    //   t++

    //   if (t > 10) break
    // }

    // console.log(splitVal, plainVal, maskedVal)
    // console.log(splitMaskVal, plainMask)

    // console.log(remasked)
    // const mapping = []

    // const valMasked = val.split('').reduce((acc, cur, i) => {
    //   console.log(cur, plainMask[i], isAlphaNumeric(cur))
    //   if (isAlphaNumeric(cur)) {
    //     // acc.push(plainMask[i])
    //     // mapping.push(cur)
    //   }

    //   return acc
    // }, []).join('')

    // // console.log(plainMask)
    // // console.log(valMasked)

    // const final = []
    // const plainMaskValues = plainMask?.split('')

    // for (let i = 0; i < plainMaskValues?.length; i++) {
    //   if (plainMask[i] === valMasked[i]) {
    //     final.push(mapping[i])
    //   } else {
    //     // break
    //   }
    // }

    // console.log(final)

    // for (let i = 0; i < splitMaskVal?.length; i++) {
    //   const f = final[i] // 5
    //   const s = splitMaskVal[i] // #

    //   if () {

    //   }
    // }

    // for (let i = 0; i < val.length; i++) {
    //   const code = val.charCodeAt(i)

    //   if ()
    // }
    // const second = performance.now() - s

    // console.log(first > second, first, second)
    // console.log(Math.floor(first * 1000), Math.floor(second * 1000))

    return ''
  }

  function unmask (val: string, mask = props.mask) {

  }

  return {
    mask,
    unmask,
  }
}
