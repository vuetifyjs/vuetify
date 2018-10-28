const express = require('express')
const simpleGit = require('simple-git/promise')
const diffJson = require('diff-json')
const helpers = require('vuetify/es5/util/helpers')
const fs = require('fs-extra')
const path = require('path')

var router = express.Router()

var git = simpleGit()

function kebab (str) {
  return (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

function camel (str) {
  const camel = (str || '').replace(/-([^-])/g, g => g[1].toUpperCase())

  return capitalize(camel)
}

function capitalize (str) {
  str = str || ''

  return `${str.substr(0, 1).toUpperCase()}${str.slice(1)}`
}

function getPaths (locale, key) {
  const parts = key.split('.')
  const fileParts = parts.filter(p => p[0] === p[0].toUpperCase())
  const folderParts = fileParts.slice(0, -1).map(kebab).join('/')
  const fileName = fileParts.slice(-1)
  const keyParts = parts.filter(p => p[0] === p[0].toLowerCase())

  return {
    sourcePath: `./lang/en/${folderParts}/${fileName}.json`,
    localePath: `./lang/${locale}/${folderParts}/${fileName}.json`,
    fileKey: keyParts.join('.')
  }
}

function update (obj, path, value) {
  let pointer = obj
  for (let i = 0; i < path.length; i++) {
    const p = path[i]
    const matches = p.match(/(.*)\[(\d+)\](\.)?/)
    const isArray = matches && matches.length > 1

    const key = isArray ? matches[1] : p

    if (pointer[key] === undefined) pointer[key] = isArray ? [] : {}

    if (i === path.length - 1) {
      if (isArray) pointer[key][matches[2]] = value
      else pointer[key] = value
    } else {
      if (isArray) {
        pointer[key][matches[2]] = {}
        pointer = pointer[key][matches[2]]
      } else pointer = pointer[key]
    }
  }

  return obj
}

const cache = {}

function setupCache (path) {
  // setup cache
  if (!cache[path]) {
    cache[path] = {
      logs: null,
      json: {}
    }
  }
}

async function getLog (path, opts = {}) {
  if (cache[path].logs) return cache[path].logs

  const logs = await git.log({ file: path, ...opts })

  cache[path].logs = logs

  return logs
}

async function getJsonContent (path, hash) {
  if (cache[path].json[hash]) return cache[path].json[hash]

  const raw = await git.raw([
    'show',
    `${hash}:./${path}`
  ])

  try {
    const json = JSON.parse(raw)
    cache[path].json[hash] = json
    return json
  } catch (err) {
    return {}
  }
}

function getPreviousCommit (log, commit) {
  const targetDate = new Date(commit.date)
  for (let i = 0; i < log.all.length; i++) {
    const currentDate = new Date(log.all[i].date)

    if (currentDate <= targetDate) return log.all[i]
  }

  return null
}

/* eslint-disable max-statements */
async function checkStatus (locale, key) {
  const { sourcePath, localePath, fileKey } = getPaths(locale, key)

  setupCache(sourcePath)
  setupCache(localePath)

  // If no file exists yet
  // translation is missing
  if (!fs.existsSync(localePath)) return 'missing'

  // If file exists but no key found
  // then we are missing translation
  const localeJson = await fs.readJson(localePath)
  if (!helpers.getObjectValueByPath(localeJson, fileKey)) return 'missing'

  // Get git logs for both source and locale
  const localeLog = await getLog(localePath)
  const sourceLog = await getLog(sourcePath)

  // If file is not commited, there's not much we can do
  if (localeLog.total === 0) return 'unchanged'

  // If file is newer than latest commit
  // and value is changed then it's new
  const { mtime } = await fs.stat(localePath)
  const modifiedDate = new Date(mtime)
  const commitDate = new Date(localeLog.latest.date)
  if (modifiedDate > commitDate) {
    const commitJson = await getJsonContent(localePath, localeLog.latest.hash)
    if (helpers.getObjectValueByPath(commitJson, fileKey) !== helpers.getObjectValueByPath(localeJson, fileKey)) return 'new'
  }

  const latestSourceCommitDate = new Date(sourceLog.latest.date)
  const latestLocaleCommitDate = new Date(localeLog.latest.date)

  // If source has been updated after latest locale
  // then we might have a mismatch
  if (latestSourceCommitDate > latestLocaleCommitDate) {
    const previousCommit = getPreviousCommit(sourceLog, localeLog.latest)

    if (!previousCommit) throw new Error('asdasdas')

    const oldJson = await getJsonContent(sourcePath, previousCommit.hash)
    const newJson = await getJsonContent(sourcePath, sourceLog.latest.hash)

    const changes = diffJson.diff(oldJson, newJson)
    const change = changes.find(c => c.key === fileKey)

    if (!change) return 'unchanged'

    if (change.type === 'update') return 'updated'
    else if (change.type === 'add') return 'added'
    else if (change.type === 'remove') return 'removed'
    return 'unknown'
  }

  return 'unchanged'
}

async function updateIndexFiles (filePath, root = false) {
  let dir = path.dirname(filePath)

  do {
    const files = (await getAllFiles(dir, true, false)).filter(f => !f.includes('index.js'))

    const exports = files.map(f => path.basename(f).replace(/\.json|\.js/, ''))
    const imports = exports.map(f => `import ${!root ? camel(f) : f} from './${f}'`).join('\n')
    const index = `${imports}\n\nexport ${!root ? 'default ' : ''}{\n${exports.map(e => '  ' + (!root ? camel(e) : e)).join(',\n')}\n}\n`

    await fs.writeFile(`${dir}/index.js`, index)

    if (root) return

    dir = dir.split(path.sep).slice(0, -1).join(path.sep)
  } while (dir.length > 0 && !dir.endsWith('lang'))
}

async function updateTranslation (locale, key, value) {
  const { localePath, fileKey } = getPaths(locale, key)

  if (!fs.existsSync(localePath)) {
    await fs.ensureFile(localePath)
    await fs.writeJson(localePath, {})
  }

  const data = await fs.readJson(localePath)

  update(data, fileKey.split('.'), value)

  await fs.writeJson(localePath, data, { spaces: 2 })

  await updateIndexFiles(localePath)
}

async function getAllFiles (dir, includeDirs = false, recurse = true) {
  return (await fs.readdir(dir)).reduce(async (files, file) => {
    const name = path.join(dir, file)
    const isDirectory = (await fs.stat(name)).isDirectory()

    const f = await files

    // if (isDirectory && includeDirs) f.push(name)

    return isDirectory && recurse ? [...f, ...(await getAllFiles(name))] : [...f, name]
  }, [])
}

async function newTranslation (name, locale, country) {
  const localePath = `./lang/${locale}`

  if (fs.existsSync(localePath)) {
    throw new Error('locale already exists!')
  }

  await fs.ensureDir(localePath)

  const index = `export default {}`

  await fs.writeFile(path.join(localePath, 'index.js'), index)

  const languages = await fs.readJson('./data/i18n/languages.json')

  languages.push({
    name,
    locale,
    country
  })

  await fs.writeJson('./data/i18n/languages.json', languages, { spaces: 2 })

  await updateIndexFiles(localePath, true)
}

router.use(function (req, res, next) {
  if (req.body && req.body.locale) {
    req.body.locale = req.body.locale.replace('-', '')
  }
  if (req.query && req.query.locale) {
    req.query.locale = req.query.locale.replace('-', '')
  }

  next()
})

router.post('/new', async function (req, res) {
  try {
    const { name, locale, country } = req.body

    if (!name || !locale || !country) {
      res.send({ error: 'missing data' })
    }

    await newTranslation(name, locale, country)

    res.send({ status: 'ok' })
  } catch (err) {
    console.log('new', err)
    res.status(500).send({ error: JSON.stringify(err) })
  }
})

router.put('/', async function (req, res) {
  try {
    const { locale, key, value } = req.body

    if (!locale || !key || !value) {
      res.send({ error: 'missing data' })
    }

    await updateTranslation(locale, key, value)

    res.send(update({}, key.split('.'), value))
  } catch (err) {
    console.log('save', err)
    res.status(500).send({ error: JSON.stringify(err) })
  }
})

router.get('/status', async function (req, res) {
  try {
    const { locale, key } = req.query

    const status = await checkStatus(locale, key)

    res.send({ status })
  } catch (err) {
    console.log('status', err)
    res.status(500).send({ error: JSON.stringify(err) })
  }
})

async function run () {
  // console.log(await checkIfOutdated('ko', 'Components.Alerts.examples.closable.desc'))
  // console.log(await checkStatus('ko', 'GettingStarted.QuickStart.header'))
  // console.log(await updateTranslation('ko', 'GettingStarted.SponsorsAndBackers.header', 'new header'))
  // console.log(await newTranslation('Svenska', 'sv', 'se'))
  // let data = update({ GettingStarted: {} }, ['GettingStarted', 'arr[1]'], 'hello')
  // console.log(update(data, ['GettingStarted', 'arr[0]'], 'world'))
  // let data = update({ GettingStarted: {} }, ['GettingStarted', 'arr[1]', 'test'], 'hello')
  // console.log(JSON.stringify(data))
}

run()

module.exports = router
