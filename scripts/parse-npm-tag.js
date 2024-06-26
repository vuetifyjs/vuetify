const semver = require('semver')

function parseTag (version) {
  const prerelease = semver.prerelease(version)

  if (prerelease == null) {
    return 'v2-stable'
  } else {
    return 'v2-dev'
  }
}

module.exports = { parseTag }

if (require.main === module) {
  const version = process.argv[2]

  if (!semver.valid(version)) {
    console.error(`Error: '${version}' is not a valid NPM version string`)
    process.exit(9)
  }

  console.log(parseTag(version))
}
