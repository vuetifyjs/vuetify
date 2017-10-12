const semver = require('semver')

const prerelease = semver.prerelease(process.env.TRAVIS_TAG)
const prereleaseTag = (prerelease || [])[0] || ''

console.log(/^[a-zA-Z]+$/.test(prereleaseTag) ? prereleaseTag : 'latest')
