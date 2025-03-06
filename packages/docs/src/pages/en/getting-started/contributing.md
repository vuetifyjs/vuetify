---
meta:
  title: Contributing
  description: Contributing to open source helps developers access amazing tools for free. Learn how you can help develop the Vuetify framework.
  keywords: contribute, contributing, feature request
related:
  - /getting-started/unit-testing/
  - /about/code-of-conduct/
  - /introduction/roadmap/
---

# Contributing

Vuetify is made possible by an amazing community that submits issues, creates pull requests, and provides invaluable feedback.

<PageFeatures />

<PromotedEntry />

It is our job to enable you to create amazing applications. A lot of the time, you come across something that can be made better. Maybe you find a bug, or you have an idea for additional functionality. That's great! It's as easy as cloning the Vuetify repository to get started working in a development environment.

<PromotedPromoted slug="vuetify-discord" />

## Reporting Issues

The issue list of this repo is exclusively for bug reports and feature requests. Non-conforming issues will be closed immediately. Before reporting an issue:

- Search for similar [issues], it may have been answered already.
  > If a similar issue already exists, you do not need to open another issue for this, if you want to help with it in any way, you can help by giving appropriate information in the already existing issue.
- Try to reproduce with the [latest](https://github.com/vuetifyjs/vuetify/releases/latest) version in [Vuetify Play](https://play.vuetifyjs.com/) or a repository that can be cloned to produce the expected behavior.
- Make sure that the reproduction is **MINIMAL** and **CONCISE**

These steps ensure that we have all the information necessary to quickly triage and resolve your issue. Once your reproduction is complete, submit a new issue using the [Vuetify Issue Creator](https://issues.vuetifyjs.com/). Using this issue creator is required, otherwise the issue will be closed automatically.

When writing an issue please provide as much detail as possible. Note that "reproduction steps" should be a series of actions another developer should take after clicking your reproduction link, not a recollection of how you discovered the bug.

Issues that are convoluted and lacking a proper reproduction may be closed by a member of the [Core Team]. For additional questions regarding reporting issues and creating reproductions, join the official Vuetify Discord [community].

::: tip
When you create a reproduction, exclude all **elements, properties, and data variables** that are not needed for the reproduction. This helps drastically reduce the time it takes to triage the issue and ultimately resolve it.
:::

In the next section you will learn step-by-step how to set up your local environment and how to configure Vuetify for development.

## Local development

The Vuetify repository is a [lerna](https://github.com/lerna/lerna) monorepo that connects the vuetify library, docs, api generator, and reduces the friction of working with multiple projects at once. The following guide is designed to get you up and running in no time.

### Setting up your environment

Required software:

- [Git](https://git-scm.com/) >v2.20
- [Node.js](https://nodejs.org/) LTS
- [pnpm](https://pnpm.io/)

Some of our dependencies use [node-gyp](https://github.com/nodejs/node-gyp#installation) to build themselves. You don't need to install node-gyp itself but may require additional tools, especially on windows. See the node-gyp documentation for more details.

Once you have everything installed, clone the repository:

```bash
# Using HTTPS
git clone https://github.com/vuetifyjs/vuetify.git

# Using SSH
git clone git@github.com:vuetifyjs/vuetify.git
```

::: info
[Which remote URL should I use?](https://docs.github.com/en/free-pro-team@latest/github/using-git/which-remote-url-should-i-use)
:::

Then install dependencies and perform an initial build to link all the packages together:

```bash
# Navigate to the vuetify folder
cd vuetify

# Install all project dependencies
pnpm i

# Build the packages
pnpm build vuetify
pnpm build api
```

The build process compiles all the Vuetify packages for development and may take a while (grab some ☕). Once the packages are built, you can start developing.

### Vuetify

The Vuetify library is located in `packages/vuetify`. In `packages/vuetify/dev` you will find a `Playground.vue` file; running `pnpm dev` from the project root will start a dev server on **localhost:8090** with this file loaded. Test your changes in the Playground.vue file you copied, then paste its contents into your pull request when you're ready.

You can also test Vuetify in your own project using [`pnpm link`](https://pnpm.io/cli/link):

- Navigate to `packages/vuetify`
- Run `pnpm link --global`
- Navigate to your project's directory
- Run `pnpm link --global vuetify`
- Clear Vite's cache by deleting  `node_modules/.vite` folder

If your project is using vuetify-loader you will have to run `pnpm build:lib` in the vuetify package to see changes, otherwise you can use `pnpm watch` for incremental builds.

#### Playground.vue

The **Playground** file is a cleanroom used for Vuetify development and is the recommended way to iterate on changes within the framework.

```html
<template>
  <v-app>
    <v-container>
      <!--  -->
    </v-container>
  </v-app>
</template>

<script setup>
  //
</script>
```

### Documentation

The documentation is located in `packages/docs` but also uses some files from `packages/api-generator`. A dev server for the documentation can be started by running `pnpm dev docs` from the project root and will be available on [localhost:8095](http://localhost:8095/) by default.

If you want to see changes from Vuetify in the documentation you need to run `pnpm build:lib` in the vuetify package before starting the documentation server.

### API Generator

All api descriptions are managed via the api-generator package. This package must be built prior to running or building the docs. Descriptions can be updated via the JSON files located in the `src/locale/en` folder. Some general guidelines to follow when handling api descriptions are:

- `en` language only. Translations are handled via [Crowdin](https://crowdin.com/project/vuetify).
- Prop names should be formatted using bold markdown eg: **prop-name**.
- Slot and other code related text should be formatted using code markdown eg: `some-slot`.
- Description keys should be in camelCase, except for `slot` keys which should be kebab-case.
- Put keys in alphabetical order.
- Descriptions utilize a hierarchy of `generic.json` < `Source.json` < `Component.json` to reduce duplication. Source can be viewed using the **Developer Mode** in docs settings.

### Submitting Changes / Pull Requests

First you should create a fork of the vuetify repository to push your changes to. Information on forking repositories can be found in the [GitHub documentation](https://help.github.com/en/github/getting-started-with-github/fork-a-repo).

Then add your fork as a remote in git:

```bash
# Using HTTPS
git remote add fork https://github.com/YOUR_USERNAME/vuetify.git

# Using SSH
git remote add fork git@github.com:YOUR_USERNAME/vuetify.git
```

#### Choosing a base branch

Before starting development you should know which branch to base your changes on. If in doubt use master as changes to master can usually be merged into a different branch without rebasing.

| Version | Type of change | Branch |
| - | - | - |
| Vuetify 3 | Documentation | `master` |
| Vuetify 3 | Bug fixes | `master` |
| Vuetify 3 | New features | `dev` |
| Vuetify 3 | Features with breaking changes| `next` |
| Vuetify 2 | Documentation|  `v2-stable` |
| Vuetify 2 | Bug fixes | `v2-stable` |
| Vuetify 2 | New features | `v2-dev` |

```bash
# Switch to the desired branch
# v3
git switch master
# v2
git switch v2-stable

# Pull down any upstream changes
git pull

# Create a new branch to work on
git switch --create fix/1234-some-issue
```

::: warning
Never commit directly to the base branches, always create a feature branch to work on
:::

Commit your changes following [our guidelines](#commit-guidelines), then push the branch to your fork with `git push -u fork` and open a pull request on the Vuetify repository following the provided template.

::: error
Pull requests that include unrelated commits or your local merges will be **CLOSED** without notice
:::

## Working with GitHub

Vuetify's repository lives on [GitHub](https://github.com/vuetifyjs/vuetify) and is the primary location for all development related information.

Some of the more notable links within these services include:

**GitHub**

- [Issues]
- [Discussions](https://github.com/vuetifyjs/vuetify/discussions)

----

The following sections are designed to familiarize you with our standard operating procedures for Vuetify development.

<PromotedPromoted slug="vue-jobs" />

### Issue triage

With the size and popularity of Vuetify has come a constant influx of new issues, questions, and feature requests. To organize these requests the [Core Team] developed tools to aid not only the triaging of issues, but creating them as well.

The [Issues] board makes heavy use of GitHub's label system with some light automation, such as adding the `triage` label to new issues.

#### For Docs - Language

We **do not** accept PRs for any documentation changes pertaining to languages other than `en`. All changes for languages other than `en` are to be submitted through our [Crowdin project](https://crowdin.com/project/vuetify). You can help translate in one of 2 ways:

- Using in-context translation service directly through the documentation site. To get started simply select `Help Translate` in the language drop down in the docs.
- Directly through the [Crowdin project](https://crowdin.com/project/vuetify).

**Note**: Languages will not be added to the language drop down on the docs site until they have at least 50% of their translations completed.

### Requesting new features

Pending

### Commit guidelines

All commit messages are required to follow the [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) standard using the _angular_ preset. This standard format consists of 2 types of commits:

- With scope: `<type>(scope): <subject>`

  ```bash
  fix(VSelect): don't close when a detachable child is clicked

  fixes #12354
  ```

- Without scope: `<type>: <subject>`

  ```bash
  docs: restructure nav components

  Moved duplicated functionality in drawer to reduce
  scope of responsibility
  ```

#### General Rules

- Commit messages must have a subject line and may have body copy. These must be separated by a blank line.
- The subject line must not exceed 60 characters
- The subject line must be written in imperative mood (fix, not fixed / fixes etc.)
- The body copy must include a reference all issues resolved:

  ```bash
  docs(sass-variables): fix broken link to api

  resolves #3219
  resolves #3254
  ```

- The body copy must be wrapped at 72 characters
- The body copy must only contain explanations as to what and why, never how. The latter belongs in documentation and implementation.

#### Commit types

The following is a list of **commit types** used in the _angular_ preset:

- **feat:** Commits that result in new features or functionalities. Backwards compatible features will release with the next **MINOR** whereas breaking changes will be in the next **MAJOR**. The body of a commit with breaking changes must begin with `BREAKING CHANGE`, followed by a description of how the API has changed.
- **fix:** Commits that provide fixes for bugs within vuetify's codebase.
- **docs:** Commits that provide updates to the docs.
- **style:** Commits that do not affect how the code runs, these are simply changes to formatting.
- **refactor:** Commits that neither fixes a bug nor adds a feature.
- **perf:** Commits that improve performance.
- **test:** Commits that add missing or correct existing tests.
- **chore:** Other commits that don't modify src or test files.
- **revert:** Commits that revert previous commits.

<PromotedPromoted slug="vuetify-reddit" />

[community]: https://community.vuetifyjs.com/
[core team]: /about/meet-the-team/
[issues]: https://github.com/vuetifyjs/vuetify/issues
