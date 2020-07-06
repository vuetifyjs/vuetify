---
meta:
  title: Contributing
  description: Contributing to open source helps developers access amazing tools for free. Learn how you can help develop in the Vuetify framework.
  keywords: contribute, contributing, feature request
related:
  - /getting-started/unit-testing/
  - /introduction/frequently-asked-questions/
---

# Contributing

Vuetify is made possible by an amazing community that submits issues, creates pull requests, and provides invaluable feedback. It is our job to enable you to create amazing applications. A lot of the time, you come across something that can be made better. Maybe you find a bug, or you have an idea for additional functionality. That's great! It's as easy as cloning the Vuetify repository to get started working in a development environment.

<promoted-ad slug="vuemastery-getting-started" />

## Reporting Issues

The issue list of this repo is exclusively for bug reports and feature requests. Non-conforming issues will be closed immediately. Before reporting an issue, ensure that:

- Search for a similar [issues](https://github.com/vuetifyjs/vuetify/issues), it may have been answered.
- Try to reproduce with the [latest](https://github.com/vuetifyjs/vuetify/releases/latest) or [lts](https://github.com/vuetifyjs/vuetify/tree/stable) (long-term-support) version in a [codepen](https://template.vuetifyjs.com/) or repository that can be be cloned to produced the expected behavior.
- The reproduction is **MINIMAL** and concise

These steps ensure that we have all of the information *necessary* to quickly triage and resolve your issue. Once your reproduction is complete, submit a new issue using the [Vuetify Issue Creator](https://issues.vuetifyjs.com/).

## Setting up your environment

If you are making a [Pull Request](https://github.com/vuetifyjs/vuetify/pulls), please [fork the Vuetify repository](https://github.com/vuetifyjs/vuetify) before continuing; More information on forking repositories is located in the [Fork a Repo](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) documentation. Otherwise you can simply click the <kbd>Clone or download</kbd> option on the Vuetify repository page.

If you are new to the process of contributing to Open Source, it's recommended that you clone using **https**. More information on [Which remote URL](https://help.github.com/en/github/using-git/which-remote-url-should-i-use) to use can be found on the GitHub documentation page.

```bash
# Example of cloning the Vuetify repository (non fork)

# Using HTTPS
git clone https://github.com/vuetifyjs/vuetify.git

# Using SSH
git clone git@github.com:vuetifyjs/vuetify.git
```

Once cloned, navigate to the folder by typing <kbd>cd vuetify</kbd> and then running the following commands:

```bash
# Navigate to the vuetify folder
cd vuetify

# Install all project dependencies
yarn

# Build the packages
yarn build
```

The build process compiles all of the Vuetify packages for development and may take awhile (grab some ☕). Once the packages are built, start your local development server by running <kbd>yarn dev</kbd> in the terminal.

## Starting your environment

There are a few ways to startup the dev environments in Vuetify mono-repo. If you are using our [PM2 guide](#process-manager-2-pm-2), you can skip this section.

```bash
# All run from root directory
# To start vuetify dev
yarn dev

# To access your local vuetify playground: http://localhost:8080

# To start docs
yarn dev docs

# To access your local docs environment: http://localhost:8095

# To start a specific package
yarn dev <package name>

# To build all packages
yarn build

# To build a specific package
yarn build <package name>

# Package alias
api-generator: api
```

## Recommended packages

The following are recommended packages to use when developing in Vuetify:

### Commitizen

The [Vuetify team](https://vuetifyjs.com/introduction/meet-the-team/) uses [Commitizen](https://github.com/commitizen/cz-cli) for all repository commits. This allows for easy to read and organized commits with minimal change to normal commit functions. To get started, [globally install the commitizen package](https://github.com/commitizen/cz-cli#conventional-commit-messages-as-a-global-utility) using [yarn](https://yarnpkg.com/) by running the following commands in your terminal:

```bash
# Install commitizen and the conventional changelog adapter
yarn global add commitizen cz-conventional-changelog

# Then create a .czrc file that tells commitizen
# which adapter to use globally.
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

<alert type="warning">
  Sometimes creating a `.czrc` file does not work using the **command prompt**. If you get unexpected results, create the file in your user folder located in the home directory. This is typically located on your primary harddrive in the `Users` folder.
</alert>

Congrats! Commitizen is installed! When you do commits, add your files like normal and replace `git commit -m "your message"` with `git cz` and follow the prompts.

More information on [Commit Guidelines w/Commitizen](#commit-guidelines-w-commitizen) can be found below.

## Commit Guidelines w/Commitizen

Commitizen provides a fluid interface for handling semantic versioning. This provides a great boilerplate making it easier to write patch notes.

All commits should use [commitizen](https://github.com/commitizen/cz-cli) with the [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) as noted above. Commits should follow the format `<type>: <subject>` or `<type>(scope): <subject>`

### Commit types

- **feat:** Commits that result in a new features or functionalities. Backwards compatible features will release with the next **MINOR** whereas breaking changes will be in the next **MAJOR**. The body of a commit with breaking changes must begin with `BREAKING CHANGE`, followed by a description of how the API has changed.
- **fix:** Commits that provide fixes for bugs within vuetify's codebase.
- **docs:** Commits that provide updates to the docs.
- **style:** Commits that do not affect how the code runs, these are simply changes to formatting.
- **refactor:** Commits that neither fixes a bug nor adds a feature.
- **perf:** Commits that improve performance.
- **test:** Commits that add missing or correct existing tests.
- **chore:** Other commits that don't modify src or test files.
- **revert:** Commits that revert previous commits.

## Submitting Changes / Pull Requests

Before doing any commits, you will want to pull down the latest and greatest from dev. From here, merge, and resolve any conflicts between your branch and dev. Its a good rule of thumb to pull frequently as development is constantly happening.

In git, add all relevant files.

Commit with commitizen using the command `git cz`. From here you will follow through a series of props. Make sure to select the appropriate type (see **Commit Guidelines w/Commitizen** above)

Lastly, `git push` and open a pull request.

### Pull Requests For Vuetify

<alert type="info">
  Pull requests related to Vuetify:
  - For **bug fixes** and **documentation updates** submit pull requests to `master`.
  - For **new features** and **enhancements** submit pull requests to `dev`
  - For **bugs** and **critical fixes** related to **v1.5/LTS** submit pull requests to `stable`
  - For any **features** that contain **breaking changes** submit pull requests to `next`
</alert>

### Pull Requests For Docs

<alert type="info">
  For any pull requests related to Vuetify docs, submit your pull request to the `master` branch.
</alert>

### Pull Requests For Docs - Language

<alert type="info">
  We do not accept PR's for any doc changes pertaining to language other than `en`. All changes for languages other than `en` are to be submitting through our Crowdin project. To get started simply select `Help Translate` in the language drop down of the docs. Languages will not be added until having more than 15% of their translations completed.
</alert>
<backmatter />
