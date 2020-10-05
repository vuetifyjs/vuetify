---
meta:
  title: Contributing
  description: Contributing to open source helps developers access amazing tools for free. Learn how you can help develop the Vuetify framework.
  keywords: contribute, contributing, feature request
related:
  - /getting-started/unit-testing/
  - /about/code-of-conduct/
  - /getting-started/frequently-asked-questions/
---

# Contributing

Vuetify is made possible by an amazing community that submits issues, creates pull requests, and provides invaluable feedback. It is our job to enable you to create amazing applications. A lot of the time, you come across something that can be made better. Maybe you find a bug, or you have an idea for additional functionality. That's great! It's as easy as cloning the Vuetify repository to get started working in a development environment.

<promoted-ad slug="vuetify-discord" />

## Reporting Issues

The issue list of this repo is exclusively for bug reports and feature requests. Non-conforming issues will be closed immediately. Before reporting an issue:

- Search for similar [issues](https://github.com/vuetifyjs/vuetify/issues), it may have been answered already.
- Try to reproduce with the [latest](https://github.com/vuetifyjs/vuetify/releases/latest) or [lts](https://github.com/vuetifyjs/vuetify/tree/stable) (long-term-support) version in a [codepen](https://template.vuetifyjs.com/) or repository that can be cloned to produce the expected behavior.
- The reproduction is **MINIMAL** and concise

These steps ensure that we have all the information necessary to quickly triage and resolve your issue. Once your reproduction is complete, submit a new issue using the [Vuetify Issue Creator](https://issues.vuetifyjs.com/).

When writing an issue please provide as much detail as possible. Note that "reproduction steps" should be a series of actions another developer should take after clicking your reproduction link, not a recollection of how you discovered the bug.

## Setting up your environment

Required software:

- [Git](https://git-scm.com/) >v2.20
- [Node.js](https://nodejs.org/) LTS
- [Yarn](https://classic.yarnpkg.com/)

Some of our dependencies use [node-gyp](https://github.com/nodejs/node-gyp#installation) to build themselves. You don't need to install node-gyp itself but may require additional tools, especially on windows. See the node-gyp documentation for more details.

One you have everything installed, clone the repository:

```bash
# Using HTTPS
git clone https://github.com/vuetifyjs/vuetify.git

# Using SSH
git clone git@github.com:vuetifyjs/vuetify.git
```

<alert type="info">

[Which remote URL should I use?](https://docs.github.com/en/free-pro-team@latest/github/using-git/which-remote-url-should-i-use)

</alert>

Then install dependencies and perform an initial build to link all the packages together:

```bash
# Navigate to the vuetify folder
cd vuetify

# Install all project dependencies
yarn

# Build the packages
yarn build
```

The build process compiles all the Vuetify packages for development and may take a while (grab some ☕). Once the packages are built, you can start developing.

## Starting your environment

There are a few ways to start the development environments in the Vuetify monorepo.

### Vuetify

The Vuetify library is located in `packages/vuetify`. In `packages/vuetify/dev` you will find a `Playground.vue` file; running `yarn dev` from the project root will start a dev server on [localhost:8080](http://localhost:8080/) with this file loaded. You can test your changes in the playground then copy its contents into your pull request when you're ready.

You can also test vuetify in your own project using [`yarn link`](https://classic.yarnpkg.com/en/docs/cli/link/):

- Navigate to `packages/vuetify`
- Run `yarn link`
- Navigate to your project's directory
- Run `yarn link vuetify`

If your project is using vuetify-loader you will have to run `yarn build:lib` in the vuetify package to see changes, otherwise you can use `yarn watch` for incremental builds.

### Documentation

The documentation is located in `packages/docs` but also uses some files from `packages/api-generator`. A dev server for the documentation can be started by running `yarn dev:docs` from the project root and will be available on [localhost:8095](http://localhost:8095/) by default.

If you want to see changes from vuetify in the documentation you need to run `yarn build:lib` in the vuetify package before starting the documentation server.

## Submitting Changes / Pull Requests

First you should create a fork of the vuetify repository to push your changes to. Information on forking repositories can be found in the [GitHub documentation](https://help.github.com/en/github/getting-started-with-github/fork-a-repo).

Then add your fork as a remote in git:

```bash
# Using HTTPS
git remote add upstream https://github.com/YOUR_USERNAME/vuetify.git

# Using SSH
git remote add upstream git@github.com:YOUR_USERNAME/vuetify.git
```

### Choosing a base branch

Before starting development you should know which branch to base your changes on. If in doubt use master as changes to master can usually be merged into a different branch without rebasing.

| Type of change | Branch |
| --- | --- |
| Documentation | `master` |
| Bug fixes | `master` |
| New features | `dev` |
| Features with breaking changes | `next` |
| Bugs and critical fixes for v1.5/LTS | `stable` |

### Pull Requests For Docs - Language

We do not accept PRs for any doc changes pertaining to languages other than `en`. All changes for languages other than `en` are to be submitted through our Crowdin project. To get started simply select `Help Translate` in the language dropdown of the docs. Languages will not be added until they have at least 15% of their translations completed.

<backmatter />
