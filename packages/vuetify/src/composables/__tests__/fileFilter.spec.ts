// Composables
import { useFileFilter } from '../fileFilter'

describe('fileFilter', () => {
  it('by extension', () => {
    const { filterAccepted } = useFileFilter({ filterByType: '.pdf' })
    const { accepted, rejected } = filterAccepted([
      new File([], 'file_1.pdf', { type: 'application/pdf' }),
      new File([], 'file_2.txt', { type: 'text/plain' }),
      new File([], 'file_3.pdf', { type: 'application/pdf' }),
      new File([], 'file_4.png', { type: 'image/png' }),
    ])
    expect(accepted.map(x => x.name)).toEqual(['file_1.pdf', 'file_3.pdf'])
    expect(rejected.map(x => x.name)).toEqual(['file_2.txt', 'file_4.png'])
  })

  it('by type', () => {
    const { filterAccepted } = useFileFilter({ filterByType: 'image/png, image/jpeg' })
    const { accepted, rejected } = filterAccepted([
      new File([], 'file_1.pdf', { type: 'application/pdf' }),
      new File([], 'file_2.png', { type: 'image/png' }),
      new File([], 'file_3.jpeg', { type: 'image/jpeg' }),
      new File([], 'file_4.jpg', { type: 'image/jpeg' }),
      new File([], 'file_5.htm', { type: 'text/html' }),
    ])
    expect(accepted.map(x => x.name)).toEqual(['file_2.png', 'file_3.jpeg', 'file_4.jpg'])
    expect(rejected.map(x => x.name)).toEqual(['file_1.pdf', 'file_5.htm'])
  })

  it('by type with wildcard', () => {
    const { filterAccepted } = useFileFilter({ filterByType: 'video/*' })
    const { accepted, rejected } = filterAccepted([
      new File([], 'file_1.mp4', { type: 'video/mp4' }),
      new File([], 'file_2.mpeg', { type: 'video/mpeg' }),
      new File([], 'file_3.gif', { type: 'image/gif' }),
      new File([], 'file_4.wav', { type: 'audio/wav' }),
    ])
    expect(accepted.map(x => x.name)).toEqual(['file_1.mp4', 'file_2.mpeg'])
    expect(rejected.map(x => x.name)).toEqual(['file_3.gif', 'file_4.wav'])
  })

  it('by mixed rules', () => {
    const { filterAccepted } = useFileFilter({ filterByType: 'font/*,application/manifest+json,.zip' })
    const { accepted, rejected } = filterAccepted([
      new File([], 'file_1.css', { type: 'text/css' }),
      new File([], 'file_2.jpg', { type: 'image/jpeg' }),
      new File([], 'file_3.rar', { type: 'application/vnd.rar' }),
      new File([], 'file_4.zip', { type: 'application/x-zip-compressed' }),
      new File([], 'file_5.js', { type: 'text/javascript' }),
      new File([], 'file_6.woff2', { type: 'font/woff2' }),
      new File([], 'file_7.woff', { type: 'font/woff' }),
      new File([], 'file_8.ico', { type: 'image/vnd.microsoft.icon' }),
      new File([], 'file_9.webmanifest', { type: 'application/manifest+json' }),
    ])
    expect(accepted.map(x => x.name)).toEqual(['file_4.zip', 'file_6.woff2', 'file_7.woff', 'file_9.webmanifest'])
    expect(rejected.map(x => x.name)).toEqual(['file_1.css', 'file_2.jpg', 'file_3.rar', 'file_5.js', 'file_8.ico'])
  })
})
