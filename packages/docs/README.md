<p align="center">
  <a href="https://vuetifyjs.com" target="_blank"><img width="100"src="https://cdn.vuetifyjs.com/images/logos/logo.svg"></a>
</p>
<p>This is the package for the <a href="https://vuetifyjs.com" target="_blank">Vuetify</a> documentation.</p>

# Be a Part of Something Bigger!  

Vuetify is made possible by an amazing community that submits issues, creates pull requests, and provides invaluable feedback. It is our job to enable you to create amazing applications. A lot of the time, you come across something that can be made better. Maybe you find a bug, or you have an idea for additional functionality. That's great! It's as easy as cloning the Vuetify repository to get started working in a development environment.


## Reporting Issues

The issue list of this repo is exclusively for bug reports and feature requests. Non-conforming issues will be closed immediately.  

For general questions, please join the [community](https://chat.vuetifyjs.com/).   

Try to search for your issue, it may have been answered.   

See if the error is reproducible with the latest version.   

If reproducible, please provide a simple [codepen](https://template.vuetifyjs.com/) or repository that can be cloned to produce the expected behavior.  

Please use the [issue creator](https://issues.vuetifyjs.com/) to create a new issue.   

## Dev Environment Pre-reqs
Vuetify contains a local dev environment that you can bootup to test new features, functionality, and components. Before you can get started however, there are a few things you will need to install that will assist you in managing the many aspects of vuetify.

### Pre-req: Install Commitizen

The Vuetify team uses [Commitizen](https://github.com/commitizen/cz-cli) for all repository commits. This allows for easy to read and organized commits with minimal change to normal commit functions. To get started install Commitizen globally using npm:

```
// Install commitizen
$ npm install -g commitizen 

// Then install commitizen adapter
$ npm install -g cz-conventional-changelog

// Then create a .czrc file
$ echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```
> Sometimes creating .czrc wont work using cmd, if you get unexpected results, try creating the file in your home directory using VS Code

Congrats! Commitizen is installed! When you do commits, add your files like normal and replace `git commit -m "your message"` with `git cz` and follow the prompts.  

See "Commit Guidelines w/Commitizen" below for commit guidelines

### Install PM2 (optional)
If you choose, you can use PM2 to run and manage multiple portions of the Vuetify mono-repo at the same time (Playground, Docs, Etc...) Included in the root directory are a few PM2 config files which will boot up and manage all that Vuetify has to offer. To get started you need to start PM2:
```
// Use this if you dont want annoying cmd popups
$ npm install -g pm2@3.0.2

// OR
$ npm install -g pm2@latest
```

## Setup Dev Environment

Setting up your dev environment is easy! To start fork [Vuetify](https://github.com/vuetifyjs/vuetify) into your own repo.
```
// Clone your forked repo
$ git clone <forked-vuetify-repo>

// Change to your new vuetify directory
$ cd vuetify

// Checkout the branch you are working on
$ git checkout <branch name>

// Install dependencies 
$ yarn

// Build
$ yarn build
```
Now you are ready to boot up your dev environment!

## Starting up dev environment

There are a few ways to startup the dev environments in Vuetify mono-repo:
## Yarn
```shell script
// All run from root directory
// To start dev
$ yarn dev

// To start docs
$ yarn dev docs

// To start a specific package
$ yarn dev <package name>

// To build all packages
$ yarn build

// To build a specific package
$ yarn build <package name>

// Package alias
api-generator: api
```

## PM2
```shell script
// Import and start all services into PM2
$ pm2 start ecosystem.config.js

// Import and start all services into PM2 (for Windows Only)
// Currently only supports vuetify-docs
$ pm2 start ecosystem-win.config.js

// Import and start single service
$ pm2 start ecosystem.config.js --only <process name>
```
Here are some commands to use with PM2 to start/stop/restart instances
```shell script
// Start all services
$ pm2 start all

// Stop all services
$ pm2 stop all

// Restart all services
$ pm2 restart all

// Start/Stop/Restart single service
$ pm2 <task> <process name>

// Stop and remove all services
$ pm2 kill

// Save config
$ pm2 save

// Load your saved config
$ pm2 resurrect
```
Go to http://localhost:8095 for docs

> Currently there are only 2 major process names: `vuetify` (playground) and `vuetify-docs`

## Commit Guidelines w/Commitizen
Commitizen provides a fluid interface for handling semantic versioning. This provides a great boilerplate making it easier to write patch notes.  
All commits should use [commitizen](https://github.com/commitizen/cz-cli) with the [conventional-changelog](https://www.npmjs.com/package/cz-conventional-changelog) as noted above. Commits should follow the format `<type>: <subject>` or `<type>(scope): <subject>`

### Commit types
* **feat:** Commits that result in a new features or functionalities. Backwards compatible features will release with the next **MINOR** whereas breaking changes will be in the next **MAJOR**. The body of a commit with `breaking changes` must begin with BREAKING CHANGE, followed by a description of how the API has changed.
* **fix:** Commits that provide fixes for bugs within vuetify's codebase.
* **docs:** Commits that provide updates to the docs.
* **style:** Commits that do not affect how the code runs, these are simply changes to formatting.
* **refactor:** Commits that neither fixes a bug nor adds a feature.
* **perf:** Commits that improve performance.
* **test:** Commits that add missing or correct existing tests.
* **chore:** Other commits that dont modify src or test files.
* **revert:** Commits that revert previous commits.

## Submitting Changes / Pull Requests
Before doing any commits, you will want to pull down the latest and greatest from dev. From here, merge, and resolve any conflicts between your branch and dev. Its a good rule of thumb to pull frequently as development is constantly happening.   

In git, add all relevent files.

Commit with commitizen using the command `git cz`. From here you will follow through a series of props. Make sure to select the appropiate type (see **Commit Guidelines w/Commitizen** above)

Lastly, `git push` and open a pull request.

### Pull Requests For Vuetify

> ####Pull requests related to Vuetify:  
>  For **bug fixes** and **documentation updates** submit pull requests to `master`.   
  For **new features** and **enhancements** submit pull requests to `dev`   
  For bugs and critical fixes related to **v1.5/LTS** submit pull requests to `stable`   
  For any **features** that contain **breaking changes** submit pull requests to `next`  

### Pull Requests For Docs

> For any pull requests related to Vuetify docs, submit your pull request to the `master` branch.

## Want to help with the translation?

If you feel ambitious with translating the documentation, you can fork the repo, create a "work-in-progress" issue to inform others that you're doing the translation, and go for it.

If you are looking to get more feedback before beginning, let us know that you want to help translate the documentation in the [community discord](https://community.vuetifyjs.com/) in the #i18n channel and would like feedback.

We greatly appreciate help from the community with this :)
