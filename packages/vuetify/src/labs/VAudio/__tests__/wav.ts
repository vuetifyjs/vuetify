// A one-sample fixture reports duration ~0 and every seek clamps to 0.
export function makeSilentWav (seconds: number) {
  const rate = 8000
  const frames = rate * seconds
  const buffer = new ArrayBuffer(44 + frames)
  const view = new DataView(buffer)
  const ascii = (offset: number, text: string) => {
    for (let i = 0; i < text.length; i++) {
      view.setUint8(offset + i, text.codePointAt(i)!)
    }
  }

  ascii(0, 'RIFF')
  view.setUint32(4, 36 + frames, true)
  ascii(8, 'WAVEfmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, rate, true)
  view.setUint32(28, rate, true)
  view.setUint16(32, 1, true)
  view.setUint16(34, 8, true)
  ascii(36, 'data')
  view.setUint32(40, frames, true)
  for (let i = 0; i < frames; i++) {
    view.setUint8(44 + i, 128)
  }

  return URL.createObjectURL(new Blob([buffer], { type: 'audio/wav' }))
}
