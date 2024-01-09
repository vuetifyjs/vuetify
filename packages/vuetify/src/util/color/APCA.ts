/**
 * WCAG 3.0 APCA perceptual contrast algorithm from https://github.com/Myndex/SAPC-APCA
 * @licence https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @see https://www.w3.org/WAI/GL/task-forces/silver/wiki/Visual_Contrast_of_Text_Subgroup
 */
// Types
import type { RGB } from '@/util'

// MAGICAL NUMBERS

// sRGB Conversion to Relative Luminance (Y)

// Transfer Curve (aka "Gamma") for sRGB linearization
// Simple power curve vs piecewise described in docs
// Essentially, 2.4 best models actual display
// characteristics in combination with the total method
const mainTRC = 2.4

const Rco = 0.2126729 // sRGB Red Coefficient (from matrix)
const Gco = 0.7151522 // sRGB Green Coefficient (from matrix)
const Bco = 0.0721750 // sRGB Blue Coefficient (from matrix)

// For Finding Raw SAPC Contrast from Relative Luminance (Y)

// Constants for SAPC Power Curve Exponents
// One pair for normal text, and one for reverse
// These are the "beating heart" of SAPC
const normBG = 0.55
const normTXT = 0.58
const revTXT = 0.57
const revBG = 0.62

// For Clamping and Scaling Values

const blkThrs = 0.03 // Level that triggers the soft black clamp
const blkClmp = 1.45 // Exponent for the soft black clamp curve
const deltaYmin = 0.0005 // Lint trap
const scaleBoW = 1.25 // Scaling for dark text on light
const scaleWoB = 1.25 // Scaling for light text on dark
const loConThresh = 0.078 // Threshold for new simple offset scale
const loConFactor = 12.82051282051282 // = 1/0.078,
const loConOffset = 0.06 // The simple offset
const loClip = 0.001 // Output clip (lint trap #2)

export function APCAcontrast (text: RGB, background: RGB) {
  // Linearize sRGB
  const Rtxt = (text.r / 255) ** mainTRC
  const Gtxt = (text.g / 255) ** mainTRC
  const Btxt = (text.b / 255) ** mainTRC

  const Rbg = (background.r / 255) ** mainTRC
  const Gbg = (background.g / 255) ** mainTRC
  const Bbg = (background.b / 255) ** mainTRC

  // Apply the standard coefficients and sum to Y
  let Ytxt = (Rtxt * Rco) + (Gtxt * Gco) + (Btxt * Bco)
  let Ybg = (Rbg * Rco) + (Gbg * Gco) + (Bbg * Bco)

  // Soft clamp Y when near black.
  // Now clamping all colors to prevent crossover errors
  if (Ytxt <= blkThrs) Ytxt += (blkThrs - Ytxt) ** blkClmp
  if (Ybg <= blkThrs) Ybg += (blkThrs - Ybg) ** blkClmp

  // Return 0 Early for extremely low ∆Y (lint trap #1)
  if (Math.abs(Ybg - Ytxt) < deltaYmin) return 0.0

  // SAPC CONTRAST

  let outputContrast: number // For weighted final values
  if (Ybg > Ytxt) {
    // For normal polarity, black text on white
    // Calculate the SAPC contrast value and scale

    const SAPC = ((Ybg ** normBG) - (Ytxt ** normTXT)) * scaleBoW

    // NEW! SAPC SmoothScale™
    // Low Contrast Smooth Scale Rollout to prevent polarity reversal
    // and also a low clip for very low contrasts (lint trap #2)
    // much of this is for very low contrasts, less than 10
    // therefore for most reversing needs, only loConOffset is important
    outputContrast =
      (SAPC < loClip) ? 0.0
      : (SAPC < loConThresh) ? SAPC - SAPC * loConFactor * loConOffset
      : SAPC - loConOffset
  } else {
    // For reverse polarity, light text on dark
    // WoB should always return negative value.

    const SAPC = ((Ybg ** revBG) - (Ytxt ** revTXT)) * scaleWoB

    outputContrast =
      (SAPC > -loClip) ? 0.0
      : (SAPC > -loConThresh) ? SAPC - SAPC * loConFactor * loConOffset
      : SAPC + loConOffset
  }

  return outputContrast * 100
}
