const semver = require('semver')

const version = process.argv[2]

if (!semver.valid(version)) {
  console.error(`Error: '${version}' is not a valid NPM version string`)
  process.exit(9)
}

const prerelease = semver.prerelease(version)
const major = semver.major(version)

if (prerelease == null) {
  if (major > 3) {
    console.log('next')
  } else {
    console.log('latest')
  }
} else {
  console.log('next')
}
