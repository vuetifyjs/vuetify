const { differenceInDays, format, toDate } = require('date-fns')
const GitDateExtractor = require('git-date-extractor')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const fs = require('fs')

async function getModified () {
  const timestamps = await GitDateExtractor.getStamps({
    projectRootPath: resolve('../src/pages/en'),
  })

  const modified = Object.keys(timestamps).reduce((pages, path) => {
    let { created, modified } = timestamps[path]

    path = path
      .replace(/\.md/g, '')
      .replace(/\/[a-z]+\//, '')

    modified = toDate(modified * 1000)
    created = toDate(created * 1000)

    const now = Date.now()

    pages[`/${path}/`] = {
      created: format(created, 'P, pp'),
      fresh: differenceInDays(now, modified) < 15,
      modified: format(modified, 'P, pp'),
      recent: differenceInDays(now, created) < 7,
    }

    return pages
  }, {})

  fs.writeFileSync(
    resolve('../src/data/modified.json'),
    JSON.stringify(modified),
    'utf8',
  )
}

getModified()
