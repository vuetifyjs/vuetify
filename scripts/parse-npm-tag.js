import semver from 'semver'

const version = process.argv[2]

if (!semver.valid(version)) {
  console.error(`Error: '${version}' is not a valid NPM version string`)
  process.exit(9)
}

const prerelease = semver.prerelease(version)

if (prerelease == null) {
  console.log('v3-stable')
} else {
  console.log('v3-dev')
}
