---
layout: blog
meta:
  title: July 2025 Update
  description: July delivered substantial progress on collaborative development, component enhancements, developer experience improvements, and ecosystem tools across the Vuetify ecosystem.
  keywords: Vuetify July 2025, Vuetify Migrations Webinar, Vuetify0, VCommandPalette, VEditor, Framework Czar, Vuetify Bin
---

<script setup>
  import { useTheme } from 'vuetify'
  import AboutTeamMember from '@/components/about/TeamMember.vue'

  const theme = useTheme()
  const teams = useTeamMembersStore()

  const jacek = computed(() => teams.members.find(member => member.github === 'J-Sek'))
  const zerologo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/logos/v0-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
</script>

# July 2025 Update

This month showcases the power of collaborative development as our team and community work together to enhance Vuetify's ecosystem.

---

🖊️ John Leider • 📅 August 6th, 2025

<PromotedEntry />

---

## New Beginnings

July exemplified what makes Vuetify special: a dedicated team working alongside an engaged community to build something greater than the sum of its parts. From bug fixes to revolutionary new components, from documentation improvements to ecosystem tools—every contribution matters. This month brings exciting advancements across the Vuetify ecosystem, with major strides in collaborative features, component refinements, and enhanced developer experience.

::: success

Cool example of the month: [VChatList](https://play.vuetifyjs.com/playgrounds/spDtrg) by [Ishan](https://github.com/ikushum)

:::

---

## Table of Contents

* [Releases](#releases)
* [The future of Vuetify](#the-future-of-vuetify)
* ["Decoding Vuetify Migrations" Webinar Recap](#webinar-recap)
* [Ecosystem Spotlight: Vuetify Bin](#ecosystem-spotlight-vuetify-bin)
* [Framework Updates](#framework-updates)
* [July 2025 Changelog](#july-2025-changelog)
* [What's Next](#whats-next)

---

## Releases

July featured the release of [v3.9.0 (Zealot)](/getting-started/release-notes/?version=v3.9.0) on July 8th, promoting [VTreeview](/components/treeview/) and [VTimePicker](/components/time-pickers/) from labs to the core framework; along with subsequent patches up to v3.9.3 on July 29th, focusing on component stability, bug fixes, and developer experience improvements. View the complete list of changes in the [Full Changelog](#july-2025-changelog).

![Hero image for July release notes](https://vuetifyjs.b-cdn.net/docs/images/blog/july-2025-update/july-hero.png "July release notes hero image"){ height=112 }

**Details:**

* [v3.9.0](https://vuetifyjs.com/getting-started/release-notes/?version=v3.9.0)
* [v3.9.1](https://vuetifyjs.com/getting-started/release-notes/?version=v3.9.1)
* [v3.9.2](https://vuetifyjs.com/getting-started/release-notes/?version=v3.9.2)
* [v3.9.3](https://vuetifyjs.com/getting-started/release-notes/?version=v3.9.3)

## The future of Vuetify

Over the past decade, I've had the unique opportunity to work closely with hundreds of developers and meet thousands more on a project that I love. Through community support and consistent dedication, that opportunity has continued to thrive and support our efforts—I cannot thank everyone enough for your trust over the years. The last time I wrote about the future of Vuetify was back in [2017](https://github.com/vuetifyjs/vuetify/issues/2240), when this whole thing was just getting started. We're **8 years**, **15 thousand commits**, and **45 million downloads** later, and I can confidently say that Vuetify has become a staple in the Vue ecosystem; that's pretty cool!

We went through some [organizational](https://vuetifyjs.com/blog/state-of-the-union-2024-post-mortem/) changes earlier this year after facing funding [challenges](https://vuetifyjs.com/blog/state-of-the-union-2024/) in 2024. We're now in August, and I personally consider the effort an ongoing success. The new members assimilated quickly and immediately started making strides across all parts of the ecosystem. This new structure has been a *game changer*, and has finally allowed me to contemplate the future of Vuetify in a way that I haven't been able to in a very long time.

Last [month](https://vuetifyjs.com/blog/june-2025-update/), I revealed some information regarding a new project I've been working on called [Vuetify0](https://github.com/vuetifyjs/0). It is a **meta framework** for building Vue UI libraries with the express goal of abstracting the Vuetify core into a set of publicly available composables.

![Image of Vuetify composition progress](https://cdn.vuetifyjs.com/docs/images/blog/july-2025-update/evolution.png "Vuetify composition progress"){ height=588 }

* **Vuetify0**: Meta framework for building framework agnostic UI libraries
* **Vuetify Paper**: Styleless components that are prop configured—no CSS required
* **Vuetify**: Marries Vuetify0, Vuetify Paper, and Vuetify's defaults system

I plan to give my first public talk about it at **VueConf Toronto** later this year, and I'm excited to see what everyone thinks.

In order to have the focus necessary to execute on the above propositions *and* continue to push Vuetify forward, I'm introducing a new position to the organization: the **Framework Czar**. Think of it as the *Lead Maintainer* of the core framework. I will still be involved in the day-to-day operations, but will be less focused on tasks involving the actual management of the [vuetifyjs/vuetify](https://github.com/vuetifyjs/vuetify) repository and more focused on the future of Vuetify as a whole. This includes the Vuetify0 project, Vuetify Paper, and the broader Vuetify ecosystem.

Today I'm excited to announce that **Jacek Czarniecki** will be taking the torch as the first Framework Czar of Vuetify. He is a long-time member of the Vuetify community, contributing to the framework and helping others with their projects. He officially joined the team last November and has since demonstrated a keen sense of detail and a deep understanding of how to build beautiful UI.

<br>

<AboutTeamMember v-if="jacek" v-bind="{ member: jacek }" />

<br>

Jacek is a seasoned developer with experience honed in corporate environments and battle-tested through independent projects. He stands out as a true "maker," delivering tangible results while others get bogged down in scheduling meetings about future meetings. We're all very excited to have him in this role, and I look forward to seeing how he shapes the next chapter of the framework.

Thank you once again to everyone who has supported Vuetify over the years. I hope you are as excited as I am about the future of this project and the direction we are heading in. Let us know what you think about the changes in the comments below, or on our [Discord](https://community.vuetifyjs.com/).

---

## "Decoding Vuetify Migrations" Webinar Recap{ #webinar-recap}

Last week we hosted our monthly webinar, this time focusing on **Vuetify 2 to 3 migrations**. We had a fantastic turnout and talked with the community about the most common migration issues, how to approach them, and the tools available to help. We answered questions about the migration process, shared tips and tricks, and provided insights into the most common pitfalls developers face when upgrading their projects.

Below are a few key points we noticed most users struggled with during the migration process:

### ESLint Plugin

The [Vuetify ESLint plugin](https://github.com/vuetifyjs/eslint-plugin-vuetify) is a powerful tool that helps developers identify and fix Vuetify-specific issues in their code. It provides rules for common migration issues, such as deprecated components, incorrect prop usage, and more. The plugin is designed to be used during your upgrade process and will *drastically* reduce the time it takes to migrate your project.

```bash
pnpm install eslint-plugin-vuetify --save-dev
```

```js
// eslint.config.js
import vue from 'eslint-plugin-vue'
import vuetify from 'eslint-plugin-vuetify'

export default [
  ...vue.configs['flat/base'],
  ...vuetify.configs['flat/base'],
]
```

For more information on how to set up and use this plugin, check out the [vuetifyjs/eslint-plugin-vuetify](https://github.com/vuetifyjs/eslint-plugin-vuetify) repository.

### Theme Changes

The most common migration issue we see? **Theme configuration**. V3's theme system is more powerful but requires a different approach:

```js
// V2 Approach (Won't work in V3)
theme: {
  themes: {
    light: {
      primary: '#1976D2',
    },
  },
}

// V3 Approach (Correct)
theme: {
  themes: {
    light: {
      colors: {  // Note the 'colors' wrapper!
        primary: '#1976D2',
      },
    },
  },
}
```

---

We are looking forward to our next webinar this month. Make sure to sign up, and if you have suggestions for topics, let us know in the comments or on our [Discord](https://community.vuetifyjs.com).

## Ecosystem Spotlight: Vuetify Bin

Every month, we highlight one tool from the Vuetify ecosystem. This month, we're featuring **Vuetify Bin**—our answer to sharing and debugging Vuetify code snippets.

### What is Vuetify Bin?

[Vuetify Bin](https://bin.vuetifyjs.com/) is our official pastebin/gist alternative for saving and managing snippets of code. Since code is compressed into the URL, you can easily bookmark and share your snippets with others—*free forever*.

![Image of Vuetify Bin](https://vuetifyjs.b-cdn.net/docs/images/blog/july-2025-update/vbin1234.png "Vuetify Bin interface"){ height=300 }

::: info
If you're part of the **Vuetify One** subscription, you can save your snippets with a unique URL. [More Info](https://vuetifyjs.com/?one=subscribe)
:::

## Framework Updates

We've made significant progress on several key components and features this month. The team merged **95 pull requests** in July alone, primarily focusing on component enhancements, bug fixes, and developer experience improvements. Key highlights include:

**VCommandPalette** has moved from concept to reality. This keyboard-first navigation component brings the power of command palettes (think **VS Code** or **Raycast**) to web applications. Early prototypes show seamless integration with Vuetify's existing keyboard navigation, making power-user features accessible to all developers.

<video width="100%" height="auto" loop controls>
  <source src="https://cdn.vuetifyjs.com/docs/images/blog/july-2025-update/vcommand-palette.mp4" type="video/mp4"></source>
</video>

**VEditor** reached a significant milestone with the completion of heading formatting (h1-h6) and substantial progress on alignment controls. This rich text editor is becoming the *go-to solution* for content management within Vuetify applications.

<video width="100%" height="auto" loop controls>
  <source src="https://cdn.vuetifyjs.com/docs/images/blog/july-2025-update/veditor.m4v" type="video/mp4"></source>
</video>

**VVideo** officially entered Labs with the release of [v3.9.3](https://vuetifyjs.com/getting-started/release-notes/?version=v3.9.3). This component provides a flexible and powerful way to embed videos in Vuetify applications, supporting various formats and configurations.

<video width="100%" height="auto" loop controls>
  <source src="https://vuetifyjs.b-cdn.net/docs/images/blog/june-2025-update/vvideo.mp4" type="video/mp4"></source>
</video>

**Details:**

* [VCommandPalette PR#21534](https://github.com/vuetifyjs/vuetify/pull/21534)
* [VEditor PR#21653](https://github.com/vuetifyjs/vuetify/pull/21653)
* [VVideo PR#21460](https://github.com/vuetifyjs/vuetify/pull/21460)

## July 2025 Changelog

The following section provides an overview of the changes made in July 2025, including new features, bug fixes, and enhancements across the Vuetify framework.

**Key Improvements:**

* **VProgressLinear** [#21744](https://github.com/vuetifyjs/vuetify/pull/21744): Added chunk separation capability for creating segmented progress indicators—perfect for multi-step forms and wizards *(Merged July 15)*
* **VDatePicker** [#21760](https://github.com/vuetifyjs/vuetify/pull/21760): Restored the accidentally removed `first-day-of-year` prop after community feedback *(Draft as of July 24)*
* **VMaskInput** [#21719](https://github.com/vuetifyjs/vuetify/pull/21719): Fixed validation value handling, ensuring masks work correctly with form validation
* **VField** [#21706](https://github.com/vuetifyjs/vuetify/pull/21706): Enhanced label accessibility for improved screen reader support
* **VDateInput** [#21684](https://github.com/vuetifyjs/vuetify/pull/21684): Added proper TypeScript definitions to the `displayFormat` function
* **Input components** [#21703](https://github.com/vuetifyjs/vuetify/pull/21703): Fixed `aria-describedby` attributes when using `hide-details`

Expand this section to see the detailed changelog for July 2025.

<details >

### 🏅 Component promotions

The following components have been promoted to the core framework from labs:

* [VTreeview](https://vuetifyjs.com/components/treeview/)
* [VTimePicker](https://vuetifyjs.com/components/time-pickers/)

### :rocket: Features

* **date:** add StringDateAdapter ([#21174](https://github.com/vuetifyjs/vuetify/issues/21174)) ([7fe9152](https://github.com/vuetifyjs/vuetify/commit/7fe91520fb9ab3ae58d4f7eeba6c0a7b431e6198)), closes [#20967](https://github.com/vuetifyjs/vuetify/issues/20967)
* **date:** export VuetifyDateAdapter ([#21252](https://github.com/vuetifyjs/vuetify/issues/21252)) ([1a98d03](https://github.com/vuetifyjs/vuetify/commit/1a98d030a7b9547d519b1491e14e97f3e554ee6e)), closes [#19904](https://github.com/vuetifyjs/vuetify/issues/19904)
* **theme:** add new theme 'system' ([#21244](https://github.com/vuetifyjs/vuetify/issues/21244)) ([8393a41](https://github.com/vuetifyjs/vuetify/commit/8393a41287d34dba56cb2140bcc1aa44de62ffcb))
* **theme:** add new option 'unimportant' to generate classes without `!important` ([3190331](https://github.com/vuetifyjs/vuetify/commit/3190331e70f42b7fdf4d7ee04f662b15eefde026))
* **theme:** add change, toggle, and cycle functions ([#21224](https://github.com/vuetifyjs/vuetify/issues/21224)) ([3570254](https://github.com/vuetifyjs/vuetify/commit/357025485c7e8ac8dbc254a9fb37a3360e8c8d79))
* **transition:** expose create transition functions ([#21352](https://github.com/vuetifyjs/vuetify/issues/21352)) ([79f36aa](https://github.com/vuetifyjs/vuetify/commit/79f36aa042284471c7a7cb248721de884e4ef329)), closes [#16050](https://github.com/vuetifyjs/vuetify/issues/16050)
* **types:** emit GlobalDirectives ([136dfdf](https://github.com/vuetifyjs/vuetify/commit/136dfdf99380063ed20ca8d0672e1e450faf5431)), closes [#21475](https://github.com/vuetifyjs/vuetify/issues/21475)
* **useHotkey:** add new composable for making hotkey bindings ([#21598](https://github.com/vuetifyjs/vuetify/issues/21598)) ([99c721c](https://github.com/vuetifyjs/vuetify/commit/99c721c381e47b403429c7de194306013c0ec679))
* **VAlert:** better aligment with prepend icon ([#20700](https://github.com/vuetifyjs/vuetify/issues/20700)) ([5231b95](https://github.com/vuetifyjs/vuetify/commit/5231b956c39477e913648dcbaef4030c284b1ece)), closes [#20636](https://github.com/vuetifyjs/vuetify/issues/20636)
* **VBadge:** add width and height props ([#21509](https://github.com/vuetifyjs/vuetify/issues/21509)) ([b87f179](https://github.com/vuetifyjs/vuetify/commit/b87f17933b31cf63289ffccdd78eda3682decc07)), closes [#20837](https://github.com/vuetifyjs/vuetify/issues/20837)
* **VBtnGroup:** add `direction="vertical"` ([#17878](https://github.com/vuetifyjs/vuetify/issues/17878)) ([5f39b85](https://github.com/vuetifyjs/vuetify/commit/5f39b8586e99c4529da9ef71576c048e711757e8)), closes [#17492](https://github.com/vuetifyjs/vuetify/issues/17492)
* **VCombobox:** scroll to first item on search result ([#21255](https://github.com/vuetifyjs/vuetify/issues/21255)) ([57bb5ad](https://github.com/vuetifyjs/vuetify/commit/57bb5adb426372ca6af48b961a5b3533efa7d703)), closes [#20572](https://github.com/vuetifyjs/vuetify/issues/#20572)
* **VDataTable:** support `fixed: 'end'` in headers ([#21665](https://github.com/vuetifyjs/vuetify/issues/21665)) ([415c267](https://github.com/vuetifyjs/vuetify/commit/415c267d057ad49334d9801c4fdb0c6aa9dcdcd1)), closes [#20020](https://github.com/vuetifyjs/vuetify/issues/20020) [#21153](https://github.com/vuetifyjs/vuetify/issues/21153)
* **VDatePicker:** expose slots from underlying components ([#21532](https://github.com/vuetifyjs/vuetify/issues/21532)) ([1e351a2](https://github.com/vuetifyjs/vuetify/commit/1e351a2015db61564c3432662e4fc7700dff3a84)), closes [#20236](https://github.com/vuetifyjs/vuetify/issues/20236)
* **VDatePicker:** add `weekday-format` prop ([#21290](https://github.com/vuetifyjs/vuetify/issues/21290)) ([b13b15c](https://github.com/vuetifyjs/vuetify/commit/b13b15c865252f43f09ef590feeaeaac6a49bc1b))
* **VInfiniteScroll:** add reset method ([#20637](https://github.com/vuetifyjs/vuetify/issues/20637)) ([2e5bc43](https://github.com/vuetifyjs/vuetify/commit/2e5bc4330bf7409870516b818dcdd8bb0f36d0d5)), closes [#20308](https://github.com/vuetifyjs/vuetify/issues/20308) [#19935](https://github.com/vuetifyjs/vuetify/issues/19935)
* **VKbd:** update default styling, add configurable options ([8ea20d9](https://github.com/vuetifyjs/vuetify/commit/8ea20d9fccaca572465d31af780f460d03f489db))
* **VNumberInput:** custom decimal separator ([#21489](https://github.com/vuetifyjs/vuetify/issues/21489)) ([534c1e7](https://github.com/vuetifyjs/vuetify/commit/534c1e72363dadfee213f0360272c29d308b28af)), closes [#20254](https://github.com/vuetifyjs/vuetify/issues/20254)
* **VNumberInput:** more flexible precision display ([#21315](https://github.com/vuetifyjs/vuetify/issues/21315)) ([d5779cd](https://github.com/vuetifyjs/vuetify/commit/d5779cd8529c6589d215569453733700b095ffe9)), closes [#21306](https://github.com/vuetifyjs/vuetify/issues/21306)
* **VOtpInput:** allow to keep focus on paste ([#21356](https://github.com/vuetifyjs/vuetify/issues/21356)) ([cb8015d](https://github.com/vuetifyjs/vuetify/commit/cb8015daad38b7d9c6853e1053d78ab148574804)), closes [#21275](https://github.com/vuetifyjs/vuetify/issues/21275)
* **VOverlay:** align scrim color with MD3 ([#21219](https://github.com/vuetifyjs/vuetify/issues/21219)) ([29d22a6](https://github.com/vuetifyjs/vuetify/commit/29d22a6737fa7e68bdd49c522a5b36dca3cabe11)), closes [#20244](https://github.com/vuetifyjs/vuetify/issues/20244)
* **VSelect:** add `no-auto-scroll` prop ([#21254](https://github.com/vuetifyjs/vuetify/issues/21254)) ([1e0f1c1](https://github.com/vuetifyjs/vuetify/commit/1e0f1c1a527deb5256844e4663d6931840736968)), closes [#20237](https://github.com/vuetifyjs/vuetify/issues/20237)
* **VSelect:** support divider and subheader in items ([#21348](https://github.com/vuetifyjs/vuetify/issues/21348)) ([0953ed2](https://github.com/vuetifyjs/vuetify/commit/0953ed22c81c1c8d51505a2e35e222af1880698a)), closes [#5014](https://github.com/vuetifyjs/vuetify/issues/5014) [#15721](https://github.com/vuetifyjs/vuetify/issues/15721)
* **VSelect/VAutoComplete/VCombobox:** add `item-type` prop ([eaa4d15](https://github.com/vuetifyjs/vuetify/commit/eaa4d15caac1b66868a6af42e52b22cf2279821b)), closes [#21666](https://github.com/vuetifyjs/vuetify/issues/21666)
* **VSlideGroup:** add content class to VSlideGroup props ([#21431](https://github.com/vuetifyjs/vuetify/issues/21431)) ([935351c](https://github.com/vuetifyjs/vuetify/commit/935351cc0e80c2327701a071eeeff15f1a128310)), , closes [#20853](https://github.com/vuetifyjs/vuetify/issues/20853)
* **VSlider:** expose focus method ([#21575](https://github.com/vuetifyjs/vuetify/issues/21575)) ([6790e1e](https://github.com/vuetifyjs/vuetify/commit/6790e1ebfa820506f92a68f4c9055a2a36413b4b)), closes [#17602](https://github.com/vuetifyjs/vuetify/issues/17602)
* **VTable:** add striped prop ([#19735](https://github.com/vuetifyjs/vuetify/issues/19735)) ([35b3304](https://github.com/vuetifyjs/vuetify/commit/35b3304a18bdb39df3431b71eef52cdef11130c9)), closes [#17505](https://github.com/vuetifyjs/vuetify/issues/17505)
* **VTextarea:** add update:rows event ([#21226](https://github.com/vuetifyjs/vuetify/issues/21226)) ([e72d4d3](https://github.com/vuetifyjs/vuetify/commit/e72d4d30088ef47d5abf2e4533cc62c8ee91f823)), closes [#21133](https://github.com/vuetifyjs/vuetify/issues/21133)
* **VTimePicker:** promote from labs ([7ce2cd6](https://github.com/vuetifyjs/vuetify/commit/7ce2cd68cb40d8de9c2135bdf33c9be9140d22c3))
* **VTimePicker:** remove ampmInTitle prop ([#21595](https://github.com/vuetifyjs/vuetify/issues/21595)) ([e32796a](https://github.com/vuetifyjs/vuetify/commit/e32796a114711f2b30d3401abea11bfd8b8c2460)), closes [#19637](https://github.com/vuetifyjs/vuetify/issues/19637) [#19957](https://github.com/vuetifyjs/vuetify/issues/19957)
* **VToolbar:** allow for explicit `:extension="false"` ([#21264](https://github.com/vuetifyjs/vuetify/issues/21264)) ([092e64a](https://github.com/vuetifyjs/vuetify/commit/092e64a10aa6e1b476e0e7fddaf01d1bb1df3793)), closes [#7317](https://github.com/vuetifyjs/vuetify/issues/7317)
* **VTreeview:** promote from labs ([b610813](https://github.com/vuetifyjs/vuetify/commit/b6108138fdbfb2cc157a29602817708676a23491))
* **VTreeview:** expose depth, path, index in slots ([#19833](https://github.com/vuetifyjs/vuetify/issues/19833)) ([bd908af](https://github.com/vuetifyjs/vuetify/commit/bd908afc7e335904c2fb35aa73541d8c04a9fcfb)), closes [#13863](https://github.com/vuetifyjs/vuetify/issues/13863)
* **VTreeview:** support `item-type` ([#21709](https://github.com/vuetifyjs/vuetify/issues/21709)) ([877f323](https://github.com/vuetifyjs/vuetify/commit/877f3232698147dee01effc57b2a9770d2ed0e39))
* **VTreeview:** add `indent-lines` prop ([#21675](https://github.com/vuetifyjs/vuetify/issues/21675)) ([501e016](https://github.com/vuetifyjs/vuetify/commit/501e01641f226b54d80176c9e5a20baa4dd7df43)), closes [#11506](https://github.com/vuetifyjs/vuetify/issues/11506)
* **VVirtualScroll:** support fractional scroll index ([#20407](https://github.com/vuetifyjs/vuetify/issues/20407)) ([adad9e2](https://github.com/vuetifyjs/vuetify/commit/adad9e2629fffa52b0abbb7d18297a5c0078074f))
* **VWindow:** add `vertical-arrows` prop ([#21587](https://github.com/vuetifyjs/vuetify/issues/21587)) ([663b9a8](https://github.com/vuetifyjs/vuetify/commit/663b9a83ee602200adae115500594d462ddfff16))
* **ripple:** use key names instead of codes ([7ecec03](https://github.com/vuetifyjs/vuetify/commit/7ecec03fb50267507928c6de6751dee16540ea7f))

### :wrench: Bug Fixes

* **inputs:** expose missing validation methods ([be64296](https://github.com/vuetifyjs/vuetify/commit/be6429615af6e0e9e0aad7ef21bfe7a1403229ec)), closes [#19934](https://github.com/vuetifyjs/vuetify/issues/19934)
* **types:** don't use primitive object wrappers ([32007ed](https://github.com/vuetifyjs/vuetify/commit/32007ed2d34f9a131eb73faeb7629c0ff515f7b2))
* **VAutocomplete, VCombobox:** space key should not select ([#21311](https://github.com/vuetifyjs/vuetify/issues/21311)) ([f9288ad](https://github.com/vuetifyjs/vuetify/commit/f9288ad7dbfb3547d36e036932e653270eb9ff08)), closes [#20728](https://github.com/vuetifyjs/vuetify/issues/20728)
* **VDatePicker:** round font-size from 13.6 to 14px ([#21590](https://github.com/vuetifyjs/vuetify/issues/21590)) ([d81a4a0](https://github.com/vuetifyjs/vuetify/commit/d81a4a0cf81353c96f6c5557d8c9be77df7a5836))
* **VDatePicker:** format month to always have 2 digits ([#21686](https://github.com/vuetifyjs/vuetify/issues/21686)) ([f529212](https://github.com/vuetifyjs/vuetify/commit/f529212faffbde85299023b1eb0f4fa344e87df7)), closes [#21681](https://github.com/vuetifyjs/vuetify/issues/21681)
* **VMenu:** let persistent menus coexist with regular ones ([#21449](https://github.com/vuetifyjs/vuetify/issues/21449)) ([30ac0fc](https://github.com/vuetifyjs/vuetify/commit/30ac0fcdd491d0eba970d383023d183aafcef491)), closes [#20976](https://github.com/vuetifyjs/vuetify/issues/20976)
* **VTimePicker:** auto width ([#21613](https://github.com/vuetifyjs/vuetify/issues/21613)) ([5d1ceab](https://github.com/vuetifyjs/vuetify/commit/5d1ceab3e519974cdde29f7e7610ffb5972ac6a7))
* **VTreeview:** restore reactivity with computed items ([107dd0c](https://github.com/vuetifyjs/vuetify/commit/107dd0c6822a5f029e302627f040a43a82bebb58)), closes [#20900](https://github.com/vuetifyjs/vuetify/issues/20900)
* **VTreeview:** activatable implies openOnClick=false ([c0b7d7b](https://github.com/vuetifyjs/vuetify/commit/c0b7d7b518727f8d43e4463dd3e69edfa4c43d73))
* **VTreeview:** select trunk nodes on click when openOnClick=false ([e6a1710](https://github.com/vuetifyjs/vuetify/commit/e6a1710296ea0cb67d6877a9c587766b5565f90d)), closes [#21599](https://github.com/vuetifyjs/vuetify/issues/21599)
* **VTreeview:** prevent checkbox deselection when mandatory ([431af5f](https://github.com/vuetifyjs/vuetify/commit/431af5fa7df28d98d7bb76f88a1803ec98a62719)), closes [#21614](https://github.com/vuetifyjs/vuetify/issues/21614)
* **VTreeview:** don't select disabled children with parent ([#20962](https://github.com/vuetifyjs/vuetify/issues/20962)) ([0772bc1](https://github.com/vuetifyjs/vuetify/commit/0772bc11c10cd55ca1dd186a64819337b38bc3fd)), closes [#20386](https://github.com/vuetifyjs/vuetify/issues/20386)
* **VTreeview:** set active state from router ([#21644](https://github.com/vuetifyjs/vuetify/issues/21644)) ([01c7a4f](https://github.com/vuetifyjs/vuetify/commit/01c7a4f8a0af4b62eda99bcd7eac56ef452e22d8))
* **VTreeview:** modelValue reactivity ([6daf53d](https://github.com/vuetifyjs/vuetify/commit/6daf53ddbd7f66155f1e1cce870968153fc2b1df))
* **input:** handle aria-describedby with hide-details ([#21703](https://github.com/vuetifyjs/vuetify/issues/21703)) ([543f932](https://github.com/vuetifyjs/vuetify/commit/543f932622f1de44a215c71fbe8d52af3edea1bd)), closes [#17012](https://github.com/vuetifyjs/vuetify/issues/17012) [#19794](https://github.com/vuetifyjs/vuetify/issues/19794)
* **VChipGroup:** don't select items with a value by index ([#21742](https://github.com/vuetifyjs/vuetify/issues/21742)) ([72cd412](https://github.com/vuetifyjs/vuetify/commit/72cd412ac7a794cc7fbb18918928c4e819827449)), closes [#20129](https://github.com/vuetifyjs/vuetify/issues/20129)
* **VDatePicker:** improved date comparison with `min` constraint ([#21398](https://github.com/vuetifyjs/vuetify/issues/21398)) ([421a6f6](https://github.com/vuetifyjs/vuetify/commit/421a6f68557e617e0e24b9e525a4cebd841c4f2c)), closes [#21380](https://github.com/vuetifyjs/vuetify/issues/21380)
* **VField:** fix label accessibility ([#21706](https://github.com/vuetifyjs/vuetify/issues/21706)) ([85abd80](https://github.com/vuetifyjs/vuetify/commit/85abd8078a2cba159b1cc3caa323519b3b29dec6))
* **VFileUploadItem:** apply classes, styles as props ([#21752](https://github.com/vuetifyjs/vuetify/issues/21752)) ([d6050f0](https://github.com/vuetifyjs/vuetify/commit/d6050f051ac36cadef5cb6ae1e8995875d2b4bfe)), closes [#21740](https://github.com/vuetifyjs/vuetify/issues/21740)
* **VList:** ignore invalid itemType values ([4bae0bc](https://github.com/vuetifyjs/vuetify/commit/4bae0bcfba724d90eafda96801ed597558e30885)), closes [#21728](https://github.com/vuetifyjs/vuetify/issues/21728)
* **VListItem:** keyboard navigation when list contains checkboxes ([#21701](https://github.com/vuetifyjs/vuetify/issues/21701)) ([f500c5b](https://github.com/vuetifyjs/vuetify/commit/f500c5bad5d0da31d8ebec0447cd4b68f91bcbbd)), closes [#21516](https://github.com/vuetifyjs/vuetify/issues/21516)
* **VSelect:** don't open menu on its own when items change ([#21247](https://github.com/vuetifyjs/vuetify/issues/21247)) ([339bd45](https://github.com/vuetifyjs/vuetify/commit/339bd45a1fd75b8d51dafcc1d0b270f07c985ee0)), closes [#21205](https://github.com/vuetifyjs/vuetify/issues/21205)
* **VSelectionControl:** correctly pass ripple options to directive ([#21713](https://github.com/vuetifyjs/vuetify/issues/21713)) ([87a8a3e](https://github.com/vuetifyjs/vuetify/commit/87a8a3ef0edb14d43179442c1727cf5b3d86edab)), closes [#21208](https://github.com/vuetifyjs/vuetify/issues/21208)
* **VTreeview:** don't display expanded items as activated ([683dc86](https://github.com/vuetifyjs/vuetify/commit/683dc863d1e8736ac8bda93f58f2b8cc8fa819b4)), closes [#21721](https://github.com/vuetifyjs/vuetify/issues/21721) [#21724](https://github.com/vuetifyjs/vuetify/issues/21724)
* **theme:** ability to restore "system" ([#21821](https://github.com/vuetifyjs/vuetify/issues/21821)) ([45077be](https://github.com/vuetifyjs/vuetify/commit/45077be13c220a4abeac161d16f5f406d7e1fb2e)), closes [#21819](https://github.com/vuetifyjs/vuetify/issues/21819)
* **VColorPicker:** keep sliders visible when inputs are hidden ([#21803](https://github.com/vuetifyjs/vuetify/issues/21803)) ([215bfd8](https://github.com/vuetifyjs/vuetify/commit/215bfd866e8c6f606620d8f88c8b1fd4dfe7ab15)), closes [#21801](https://github.com/vuetifyjs/vuetify/issues/21801)
* **VCombobox:** select all values from pasted text ([#21840](https://github.com/vuetifyjs/vuetify/issues/21840)) ([408a95d](https://github.com/vuetifyjs/vuetify/commit/408a95d7b4c39649546f8098af7a6afd663f777c)), closes [#21838](https://github.com/vuetifyjs/vuetify/issues/21838)
* **VDataTable:** don't pass slots to VSelect in mobile view ([#21572](https://github.com/vuetifyjs/vuetify/issues/21572)) ([6e61468](https://github.com/vuetifyjs/vuetify/commit/6e6146814462ec56a40bd439b6641630f6e057a3)), closes [#19873](https://github.com/vuetifyjs/vuetify/issues/19873)
* **VDatePicker:** add aria-labels for improved accessibility ([#21635](https://github.com/vuetifyjs/vuetify/issues/21635)) ([5e3fc2b](https://github.com/vuetifyjs/vuetify/commit/5e3fc2b4baf9df2939bdaca84cec28f3bf41633b)), closes [#20696](https://github.com/vuetifyjs/vuetify/issues/20696)
* **VDatePicker:** avoid infinite loop when first day is out of range ([#21649](https://github.com/vuetifyjs/vuetify/issues/21649)) ([a330d75](https://github.com/vuetifyjs/vuetify/commit/a330d75ef091046c96aae3451bed5f29a66b5d3b))
* **VFileInput:** avoid text overflow with long file names ([#21748](https://github.com/vuetifyjs/vuetify/issues/21748)) ([389a260](https://github.com/vuetifyjs/vuetify/commit/389a260a334d2b9fa1cd717d04904c0b60abe755)), closes [#21707](https://github.com/vuetifyjs/vuetify/issues/21707)
* **VFileUploadItem:** accept `title` slot ([#21769](https://github.com/vuetifyjs/vuetify/issues/21769)) ([fe85aa0](https://github.com/vuetifyjs/vuetify/commit/fe85aa0ecb4efa17f499beccea27710ad3bea164))
* **VList:** merge classes from itemProps ([5423fbf](https://github.com/vuetifyjs/vuetify/commit/5423fbf18ca6d27ac560529cdd20310aee6d2d32))
* **VNumberInput:** only trim zeros from the end ([ab2d941](https://github.com/vuetifyjs/vuetify/commit/ab2d941c02a2b5f0c976269c277471a808f251ca)), closes [#21828](https://github.com/vuetifyjs/vuetify/issues/21828)
* **VNumberInput:** keep cursor position when typing decimal values ([acc30fb](https://github.com/vuetifyjs/vuetify/commit/acc30fbfa5cd8295f341c545bd4adc5629b14bd6))
* **VOverlay:** trigger scrollStrategy when target is a point ([1146171](https://github.com/vuetifyjs/vuetify/commit/114617141a73271f07c108b91829186f3ec36291))
* **VProgressLinear:** accept pointer events unless `clickable` is used ([#21691](https://github.com/vuetifyjs/vuetify/issues/21691)) ([a6b1136](https://github.com/vuetifyjs/vuetify/commit/a6b1136243f70bf868c438f8d9e6be9b18a492e3)), closes [#21690](https://github.com/vuetifyjs/vuetify/issues/21690)
* **VRipple:** support touch simulators ([#20776](https://github.com/vuetifyjs/vuetify/issues/20776)) ([9fa2870](https://github.com/vuetifyjs/vuetify/commit/9fa2870eeaf073489f3de790defe3e94a3746788))
* **VSlider:** correctly apply `thumb-color` ([#21833](https://github.com/vuetifyjs/vuetify/issues/21833)) ([b207522](https://github.com/vuetifyjs/vuetify/commit/b207522f5767f11edf56d4c4f0fad0b8dd8fcbb7)), closes [#21832](https://github.com/vuetifyjs/vuetify/issues/21832)
* **VTextField:** don't try to re-focus input on focus ([#21722](https://github.com/vuetifyjs/vuetify/issues/21722)) ([14c88df](https://github.com/vuetifyjs/vuetify/commit/14c88df44eff939e176f8c01cc4350d2be0d81c5)), closes [#21716](https://github.com/vuetifyjs/vuetify/issues/21716) [#21626](https://github.com/vuetifyjs/vuetify/issues/21626) [#21717](https://github.com/vuetifyjs/vuetify/issues/21717)
* **VTreeview:** hide extended lines when fluid ([#21798](https://github.com/vuetifyjs/vuetify/issues/21798)) ([5728b2b](https://github.com/vuetifyjs/vuetify/commit/5728b2b2fc9a1e608bb395cc077f5640261a57ea)), closes [#21794](https://github.com/vuetifyjs/vuetify/issues/21794)
* **date:** align `fullDate` format with documentation and other adapters ([#21668](https://github.com/vuetifyjs/vuetify/issues/21668)) ([c856da3](https://github.com/vuetifyjs/vuetify/commit/c856da3c4d5b0ac6a8c2ac5f8312debc3009fae4)), closes [#21667](https://github.com/vuetifyjs/vuetify/issues/21667)
* **virtual:** skip items update if height has not been checked ([#21442](https://github.com/vuetifyjs/vuetify/issues/21442)) ([2e55ed3](https://github.com/vuetifyjs/vuetify/commit/2e55ed3d30daf6ea19660fb8168ea45fca0e9b1d)), closes [#18806](https://github.com/vuetifyjs/vuetify/issues/18806)
* **VDataTable:** continue sorting if dates are identical ([a9d0c56](https://github.com/vuetifyjs/vuetify/commit/a9d0c560d77392c803fd0c27b4748b82591dd0e0)), closes [#21650](https://github.com/vuetifyjs/vuetify/issues/21650)
* **VDataTable:** only tab focus sortable columns ([27aaaf4](https://github.com/vuetifyjs/vuetify/commit/27aaaf41246aaaf3bed977c74d0b962daf0a5662)), closes [#20899](https://github.com/vuetifyjs/vuetify/issues/20899)
* **VDatePicker:** correct week labels ([#21648](https://github.com/vuetifyjs/vuetify/issues/21648)) ([b46e60c](https://github.com/vuetifyjs/vuetify/commit/b46e60c5eba21438c4ecd412ec99f67ebbb24dac)), closes [#21645](https://github.com/vuetifyjs/vuetify/issues/21645) [#21332](https://github.com/vuetifyjs/vuetify/issues/21332)
* **VOtpInput:** only autofocus if autofocus prop is set ([79bcb27](https://github.com/vuetifyjs/vuetify/commit/79bcb27d8b6006ac9e50787b8e771f46b402e315))
* **VOverlay:** properly detect location flipping loop ([07db6b2](https://github.com/vuetifyjs/vuetify/commit/07db6b2fdda106325fff514f603b861ae788fee4)), closes [#21564](https://github.com/vuetifyjs/vuetify/issues/21564) [#21551](https://github.com/vuetifyjs/vuetify/issues/21551)
* **VTextField:** avoid infinite focus loop ([#21628](https://github.com/vuetifyjs/vuetify/issues/21628)) ([efaaa5d](https://github.com/vuetifyjs/vuetify/commit/efaaa5d4f02e886b3e0c46e1f9dd9eed1cdf2e88)), closes [#21626](https://github.com/vuetifyjs/vuetify/issues/21626)
* **VSelects:** avoid error with `null` items ([#21660](https://github.com/vuetifyjs/vuetify/issues/21660)) ([dd98067](https://github.com/vuetifyjs/vuetify/commit/dd98067d8fb2ac46c5cd7f23d630777b61129797))

### :microscope: Code Refactoring

* **theme:** add internal methods for testing tailwind integration ([abfdb77](https://github.com/vuetifyjs/vuetify/commit/abfdb777e0e00d4a1798f52d7e4c118e7409fcb9))
* **layout:** consoleWarn instead of error for missing layout items ([34b53f1](https://github.com/vuetifyjs/vuetify/commit/34b53f10b5ae1b218721b32d51c757adecf343f7))

### :test_tube: Labs

* **VCalendar:** use adapter for day element key ([#21689](https://github.com/vuetifyjs/vuetify/issues/21689)) ([428f460](https://github.com/vuetifyjs/vuetify/commit/428f4602b54b6ecbfcc37cd2edf61703ae49712e)), closes [#21688](https://github.com/vuetifyjs/vuetify/issues/21688)
* **VHotkey:** add new component ([#21598](https://github.com/vuetifyjs/vuetify/issues/21598)) ([99c721c](https://github.com/vuetifyjs/vuetify/commit/99c721c381e47b403429c7de194306013c0ec679))
* **VMaskInput:** create new component ([#21519](https://github.com/vuetifyjs/vuetify/issues/21519)) ([117443a](https://github.com/vuetifyjs/vuetify/commit/117443afbe676d5d31ab20b4a549cb7405994493))
* **VColorInput:** ensure cancel action closes menu ([#21664](https://github.com/vuetifyjs/vuetify/issues/21664)) ([7822179](https://github.com/vuetifyjs/vuetify/commit/7822179df9d61dec98179ddcb70346d949305412)), closes [#21655](https://github.com/vuetifyjs/vuetify/issues/21655)
* **VDateInput:** align generic model type with VDatePicker ([#21764](https://github.com/vuetifyjs/vuetify/issues/21764)) ([0cfca46](https://github.com/vuetifyjs/vuetify/commit/0cfca46b2da04c9b98e7a56788f9e648f31b6c3e)), closes [#21751](https://github.com/vuetifyjs/vuetify/issues/21751) [#21753](https://github.com/vuetifyjs/vuetify/issues/21753)
* **VDateInput:** assign type to displayFormat function ([#21684](https://github.com/vuetifyjs/vuetify/issues/21684)) ([4446ebf](https://github.com/vuetifyjs/vuetify/commit/4446ebff30e96f1d7629bafa0c8b8bad8f473307)), closes [#21683](https://github.com/vuetifyjs/vuetify/issues/21683)
* **VDateInput:** avoid time values in the field ([#21694](https://github.com/vuetifyjs/vuetify/issues/21694)) ([d4efd48](https://github.com/vuetifyjs/vuetify/commit/d4efd487d384f94a263d2af9b8abc5dbb8381134))
* **VMaskInput:** send unmasked value to rules ([#21719](https://github.com/vuetifyjs/vuetify/issues/21719)) ([64943b3](https://github.com/vuetifyjs/vuetify/commit/64943b30c4a84ddfaa565f9b2d62285450aa128b))
* **VStepperVertical:** fix next/prev-text props ([#21360](https://github.com/vuetifyjs/vuetify/issues/21360)) ([11986c6](https://github.com/vuetifyjs/vuetify/commit/11986c6e2ac351c38194cd3a8c74f6e03f58e3cf)), closes [#21358](https://github.com/vuetifyjs/vuetify/issues/21358)
* **VPie:** create new component ([#21176](https://github.com/vuetifyjs/vuetify/issues/21176)) ([5f0ebca](https://github.com/vuetifyjs/vuetify/commit/5f0ebca99b830f2cdce234b5f45529a1553c66ef))
* **VStepperVertical:** correct avatar alignment ([#21797](https://github.com/vuetifyjs/vuetify/issues/21797)) ([6292149](https://github.com/vuetifyjs/vuetify/commit/6292149811091210af7005bbaf7de37aea66b69a)), closes [#21792](https://github.com/vuetifyjs/vuetify/issues/21792)
* **VVideo:** create new component ([#21460](https://github.com/vuetifyjs/vuetify/issues/21460)) ([936eba2](https://github.com/vuetifyjs/vuetify/commit/936eba2ef278137d650b00acf0425116ec8237eb)), closes [#5592](https://github.com/vuetifyjs/vuetify/issues/5592)
* **VCalendar:** slot day-event not available ([#21558](https://github.com/vuetifyjs/vuetify/issues/21558)) ([d743051](https://github.com/vuetifyjs/vuetify/commit/d743051c3fc2ba99c77b49e2fa99f9925af50eb6)), closes [#21341](https://github.com/vuetifyjs/vuetify/issues/21341)
* **VIconBtn:** add button type ([#21638](https://github.com/vuetifyjs/vuetify/issues/21638)) ([dd1db74](https://github.com/vuetifyjs/vuetify/commit/dd1db749edd8df351727c01eeca67a1bb7fb8fb6)), closes [#21634](https://github.com/vuetifyjs/vuetify/issues/21634)

</details>

---

## What's Next

Next month promises to be an exciting one as we continue building momentum from July's achievements. Here's what's on the horizon:

### Community Roadmap Voting

Over the next few weeks, we'll be launching our community voting system where you can directly influence Vuetify's development priorities. This democratic approach ensures that the features you need most get the attention they deserve.

### Vuetify0 Alpha Release

We're targeting **late August** for the first alpha release of Vuetify0. This milestone will include:

* Core composable abstractions
* Initial documentation and examples

### Labs Component Stabilization

August is dedicated to refining our Labs components based on community feedback:

* **VCommandPalette**: Finalizing keyboard navigation patterns
* **VEditor**: Completing table and list formatting features
* **VCalendar**: Addressing performance optimizations and accessibility improvements
* **VMaskInput**: Expanding validation integration

Thank you for your continued support, feedback, and contributions that make all of this possible! See you next month.

---

*Stay connected with Vuetify updates through our [GitHub repository](https://github.com/vuetifyjs/vuetify), [Discord community](https://discord.gg/eXubxyJ), and upcoming webinar series announcements.*
