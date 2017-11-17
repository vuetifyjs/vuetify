const semver = require('semver')

const version = process.argv[2]

if (!semver.valid(version)) {
  console.error(`Error: '${version}' is not a valid NPM version string`)
  process.exit(9)
}

const prerelease = semver.prerelease(version)
const prereleaseTag = (prerelease || [])[0] || ''

console.log(/^[a-zA-Z]+$/.test(prereleaseTag) ? prereleaseTag : 'latest')
