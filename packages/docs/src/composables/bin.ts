// Utilities
import { unzlibSync, zlibSync } from 'fflate'

export function compressAndEncode (str: string) {
  // Convert the string to a Uint8Array
  const u8 = new TextEncoder().encode(str)

  // Compress the Uint8Array using zlib
  const compressed = zlibSync(u8)

  // Convert the compressed data to a binary string
  const binary = String.fromCodePoint(...compressed)

  // Base64 encode the binary string
  const encoded = btoa(binary)

  // Make it URL-safe by replacing '+' with '-', '/' with '_', and removing '='
  return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function decodeAndDecompress (encoded: string) {
  // Make the encoded string URL-safe again by reversing previous replacements
  const urlSafeEncoded = encoded.replace(/-/g, '+').replace(/_/g, '/')

  // Decode the Base64 encoded string to binary
  const binary = atob(urlSafeEncoded)

  // Convert the binary string to a Uint8Array
  const compressed = new Uint8Array([...binary].map(c => c.codePointAt(0)!))

  // Decompress the Uint8Array using zlib
  const decompressed = unzlibSync(compressed)

  // Convert the decompressed data back to a string
  return new TextDecoder().decode(decompressed)
}

export function useBin (code: string, language: string, _title?: string) {
  const hash = compressAndEncode(code)
  const map: { [key: string]: string } = {
    bash: 'markdown',
    js: 'javascript',
    ts: 'typescript',
  }

  const title = _title ? `&title=${_title}` : ''
  return `https://bin.vuetifyjs.com?code=${hash}&lang=${map[language] ?? language}${title}`
}
