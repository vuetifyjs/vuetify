---
layout: blog
meta:
  title: August 2025 Update
  description: August marks a pivotal moment in Vuetify's evolution as we prepare to release the pre-alpha of Vuetify0 (v0), launch our redesigned issues page, and continue delivering powerful components and improvements.
  keywords: Vuetify August 2025, Vuetify0, v0 pre-alpha, VEditor, issues page redesign, theming webinar, performance optimization
---

# August 2025 Update

Welcome to our August update! This month marks a pivotal moment in Vuetify's evolution as we prepare to release the pre-alpha of Vuetify0, launch our redesigned issues page, and continue delivering powerful components and improvements.

![Hero image for August update](https://cdn.vuetifyjs.com/docs/images/blog/august-2025-update/august-hero.png "August hero image"){ height=112 }

🖊️ John Leider • 📅 September 9th, 2025

<PromotedEntry />

---

## From Zero

Vuetify0 reached pre-alpha status this month, delivering the first public release of our meta-framework for UI library development. The release includes foundational composables for registration and selection, plus core plugins for breakpoints, hydration, locale management, storage, and theming. These framework-agnostic tools represent the extracted intelligence that powers Vuetify, now available as standalone packages for any development environment.

Ecosystem improvements continued throughout August with significant team-community collaboration driving advances in foundational architecture, component refinements, and developer experience enhancements. The 87 pull requests merged this month reflect ongoing contributions that strengthen not just Vuetify0, but the entire ecosystem. This pre-alpha milestone sets the foundation for broader adoption while maintaining our commitment to developer productivity and framework flexibility.

::: success

Cool example of the month: [VVideo Card](https://play.vuetifyjs.com/playgrounds/-10f7g) by [Vuetify](https://github.com/vuetifyjs)

:::

---

## Table of Contents

* [Releases](#releases)
* ["Mastering Vuetify Theming" Webinar Recap](#mastering-vuetify-theming-webinar-recap)
* [Vuetify0 in Pre-Alpha](#vuetify0-in-pre-alpha)
* [Framework Updates](#framework-updates)
* [Ecosystem Spotlight: Vuetify Issues](#ecosystem-spotlight-vuetify-issues)
* [Free Premium Themes](#free-premium-themes)
* [Building the Future](#building-the-future)

---

## Releases

August focused on general component stability and bug fixes. View the complete list of changes in the [Full Changelog](#august-2025-changelog).

**Details:**

* [v3.9.4](https://vuetifyjs.com/getting-started/release-notes/?version=v3.9.4)
* [v3.9.5](https://vuetifyjs.com/getting-started/release-notes/?version=v3.9.5)
* [v3.9.6](https://vuetifyjs.com/getting-started/release-notes/?version=v3.9.6)

## "Mastering Vuetify Theming" Webinar Recap

On August 27th, we hosted our second community webinar: **"Mastering Vuetify's Theming Engine"**. Following the success of July's migration webinar, this session dove deep into one of Vuetify's most powerful features.

### What We Covered

* **Theme Architecture**: Understanding how Vuetify's theming system works under the hood
* **Custom Theme Creation**: Step-by-step guide to building professional themes
* **Dynamic Theming**: Implementing runtime theme switching and user preferences
* **Performance Optimization**: Best practices for theme efficiency
* **Advanced Techniques**: CSS variables, theme inheritance, and component-specific theming

### Community Response

The turnout exceeded our expectations, with developers from around the world joining to level up their theming skills. The Q&A session revealed common challenges that we're already addressing in our documentation and tooling improvements.

### Recording

We have the event recorded and are working on what the process looks like to bring it to you. More than likely will end up on our [YouTube Channel](https://www.youtube.com/@vuetifyjs), make sure to subscribe if you haven't already.

### Upcoming Webinar: "Performance Crisis"

Based on your feedback, our September webinar will tackle one of the most requested topics: **"Performance Crisis: Slash Your Bundle Size"**. This session will show you how to dramatically reduce your Vuetify application's footprint through:

* Advanced tree-shaking techniques
* Component lazy loading strategies
* Build optimization configurations
* Real-world case studies with measurable results

![Webinar highlights](https://cdn.vuetifyjs.com/docs/images/blog/august-2025-update/webinar.png "Performance Crisis Webinar"){ height=135 }

**Details:**

* Tuesday, September 30th at 9:00 AM CST
* [Performance Crisis Sign-up](https://discord.gg/vuetify-340160225338195969?event=1414654608541749308)

## Vuetify0 in Pre-Alpha

If you missed my initial mentions of it, [Vuetify0](https://0.vuetifyjs.com/) is a **meta framework** for building UI libraries. We've distilled the core of Vuetify into a collection of highly optimized, framework-agnostic composables. This means the power that drives Vuetify—its layout system, theming engine, localization setup, and component logic—will be available as a standalone package.

**Modern Development Experience**: Built from the ground up for Vue 3, TypeScript, and modern build tools, v0 embraces the latest web platform features while maintaining broad compatibility.

### What to Expect in the Pre-Alpha

The initial Vuetify0 release will focus on the foundational pillars of the framework. Some pages are still receiving their initial content so please pardon our dust. Here's what you'll be able to explore:

**Composables:**

* **Foundational** composables are the backbone of Vuetify0 and are the basic building blocks for creating a UI library.
* **Registration** composables are the foundational pieces for selection and tokenization.
* **Selection** composables serve as the core logic for managing selectable items, including single and multiple selection modes.
* **Plugins**: [Breakpoints](https://0.vuetifyjs.com/composables/plugin/use-breakpoints), [Hydration](https://0.vuetifyjs.com/composables/plugin/use-hydration), [Locale](https://0.vuetifyjs.com/composables/plugin/use-locale), [Storage](https://0.vuetifyjs.com/composables/plugin/use-storage), and [Theme](https://0.vuetifyjs.com/composables/plugin/use-theme) plugins to manage global application state.

::: info

If you're wondering how Vuetify0 will affect you as a Vuetify user, the short answer is: it won't—at least not immediately.

:::

The long-term plan is to incrementally integrate Vuetify0 composables into Vuetify over time, starting with new components and gradually refactoring existing ones. This approach allows us to enhance the framework's architecture without disrupting your current projects. If you're wondering how Vuetify0 will affect you as a Vuetify user, the short answer is: it won't—at least not immediately. What it *will* do is open the door for new libraries and tools to be built on the same fundamentals that drive Vuetify. Allowing developers to opt into the Vuetify ecosystem without having to commit to "Big Vuetify" as we've started calling it internally.

**Details:**

* [Vuetify0 Composables](https://0.vuetifyjs.com/composables)
* [v0.0.2 Release Notes](https://github.com/vuetifyjs/0/releases/tag/v0.0.2)
* [Discussion on Discord](https://discord.gg/vK6T89eNP7)

## Framework Updates

We've made significant progress on several key components and features this month. The team merged **87 pull requests** in August alone, primarily focusing on component enhancements, bug fixes, and developer experience improvements.

### VEditor: Final Testing, Coming Soon

VEditor is in the final stages of testing and will be available soon. This rich text editor brings professional content editing capabilities to Vuetify applications, including:

![VEditor showcase](https://cdn.vuetifyjs.com/docs/images/blog/august-2025-update/veditor.png "VEditor rich text formatting features"){ height=135 }

* **Rich Text Formatting:** Comprehensive formatting options like bold, italic, underline, strikethrough, code blocks, heading levels (H1-H6), subscript, superscript, and blockquotes
* **Customizable Toolbar:** Choose which formatting options to display, hide the toolbar completely, or configure it dynamically at runtime with Material Design Icons
* **Form Integration:** Full v-model support with Vuetify's validation system, including rules for required content, character limits, and seamless v-form compatibility
* **Flexible Styling:** Configurable height, multiple variants (outlined, solo, underlined), responsive design, and full Vuetify theme integration
* **Advanced Features:** Clearable content functionality, proper focus management, accessibility support with ARIA labels, and cross-browser contentEditable implementation

**Details:**

* [VEditor PR#21653](https://github.com/vuetifyjs/vuetify/pull/21653)

## Ecosystem Spotlight: Vuetify Issues

The redesigned issues experience is now live at [issues.vuetifyjs.com](https://issues.vuetifyjs.com). This release focused on migrating the app from Vuetify v1.5 to v3 for a modern, consistent UI and better developer ergonomics. We also integrated Vuetify One to enable future enhancements—like special labels for subscribers—to streamline triage and improve visibility.

<video width="100%" height="auto" loop controls class="mb-4">
  <source src="https://cdn.vuetifyjs.com/docs/images/blog/august-2025-update/issues.mp4" type="video/mp4"></source>
</video>

::: info

The previous issues page was originally built with Vuetify v1.5 in 2018

:::

**Details:**

* [New Issues Page](https://issues.vuetifyjs.com)
* [Contributing Guide](https://vuetifyjs.com/about/contributing/)
* [Community Discord](https://community.vuetifyjs.com)

## Free Premium Themes

All Vuetify‑made themes—designed, built, and maintained by the Vuetify team—are now free for **personal** use. Enjoy polished, production‑ready starting points to learn best practices, explore ideas, and accelerate side projects without licensing friction.

### Now Available for Free

This move reflects our commitment to lowering barriers to entry and helping developers create beautiful applications faster. Visit the [Vuetify Store](https://store.vuetifyjs.com) to explore the expanded free collection.

![Vuetify Store showcase](https://cdn.vuetifyjs.com/docs/images/blog/august-2025-update/store.png "Free premium themes now available"){ height=600 }

**Details:**

* [Crypto Coin Theme](https://store.vuetifyjs.com/products/crypto-coin-theme)
* [Flairo Theme Pro](https://store.vuetifyjs.com/products/flairo-theme-pro)
* [Vuetify 3 Nebula UI Kit](https://store.vuetifyjs.com/products/vuetify-3-nebula-ui-kit)
* [Zero Theme Pro](https://store.vuetifyjs.com/products/zero-theme-pro)
* [Made by Vuetify Bundle](https://store.vuetifyjs.com/products/made-by-vuetify-bundle)

## August 2025 Changelog

The following section provides an overview of the changes made in August 2025, including new features, bug fixes, and enhancements across the Vuetify framework.

**Key Improvements:**

* Accessibility and high-contrast: forced-colors fixes in VBtn/VCard, ARIA labels in VColorPicker, role added to VTextField input
* Smarter selection UX: VSelect fixes placeholder overlap and shows selected text
* More reliable date picking: VDatePicker prioritizes allowed months/years and fixes year scroll/focus
* Tables/inputs polish: VDataTable row/stripe fixes, VNumberInput focus/icons, VField clear, menu/tooltip reposition
* Labs upgrades: VVideo aspect-ratio and visuals, VPie touch segments, VColorInput pip/focus, VIconBtn icon-color

**Expand** this section to see the detailed changelog for August 2025:

<details >

### :wrench: Bug Fixes

* **validation:** return aliases when called without arguments ([#21868](https://github.com/vuetifyjs/vuetify/issues/21868)) ([64a82d4](https://github.com/vuetifyjs/vuetify/commit/64a82d4776d22628db5d3a55fc070ce2463eb602)), closes [#21477](https://github.com/vuetifyjs/vuetify/issues/21477)
* **VAlert:** restore unit-less support in Sass variable for title line-height ([#21843](https://github.com/vuetifyjs/vuetify/issues/21843)) ([8c1778a](https://github.com/vuetifyjs/vuetify/commit/8c1778a26a08d9d663681d83d6dd9160e3cb5c74)), closes [#21841](https://github.com/vuetifyjs/vuetify/issues/21841)
* **VBtn:** render border in forced-colors mode ([#21848](https://github.com/vuetifyjs/vuetify/issues/21848)) ([25af169](https://github.com/vuetifyjs/vuetify/commit/25af169ae03c28bc6472f00347edaeaefb73aeb3))
* **VCard:** hide progress border in forced-colors mode ([#21836](https://github.com/vuetifyjs/vuetify/issues/21836)) ([4335576](https://github.com/vuetifyjs/vuetify/commit/43355769444e256eed6111d23b75d7dc2838a093)), closes [#21835](https://github.com/vuetifyjs/vuetify/issues/21835)
* **VColorPicker:** aria labels for main controls ([#21839](https://github.com/vuetifyjs/vuetify/issues/21839)) ([e2ab73a](https://github.com/vuetifyjs/vuetify/commit/e2ab73a7aafb1c443ad30b28134e41b4662c27fe)), closes [#21834](https://github.com/vuetifyjs/vuetify/issues/21834)
* **VColorPicker:** keep canvas visible when width is not px ([22b828f](https://github.com/vuetifyjs/vuetify/commit/22b828f5cc625adeeb206e20746154dd79f33e0c))
* **VColorPicker:** prevent sass nested deprecation warning ([8083db9](https://github.com/vuetifyjs/vuetify/commit/8083db971f7fe51151241447f90a4cd14cff32be)), closes [#21909](https://github.com/vuetifyjs/vuetify/issues/21909)
* **VDataTable:** correct row height when with show-select and compact ([#21829](https://github.com/vuetifyjs/vuetify/issues/21829)) ([29b3bb0](https://github.com/vuetifyjs/vuetify/commit/29b3bb0b3363e8c295cf16286ed500e8ae269e98)), closes [#21767](https://github.com/vuetifyjs/vuetify/issues/21767)
* **VDataTable:** missing stripes on fixed columns ([#21715](https://github.com/vuetifyjs/vuetify/issues/21715)) ([739a6c9](https://github.com/vuetifyjs/vuetify/commit/739a6c9aa8ac6064d7484e1e40dbf111d2ab75c5))
* **VDatePicker:** prioritize allowed-months and allowed-years ([#21916](https://github.com/vuetifyjs/vuetify/issues/21916)) ([810645c](https://github.com/vuetifyjs/vuetify/commit/810645c5c37aeeb3aec1a575763c5e836b7bb8b6)), closes [#21911](https://github.com/vuetifyjs/vuetify/issues/21911)
* **VDatePickerYears:** fix scroll/focus of selected year ([#21951](https://github.com/vuetifyjs/vuetify/issues/21951)) ([b531dbf](https://github.com/vuetifyjs/vuetify/commit/b531dbfa1ae6e08dddea41f965912b8cf60a55ce)), closes [#21950](https://github.com/vuetifyjs/vuetify/issues/21950)
* **VField:** avoid duplicated emits on clear ([#21865](https://github.com/vuetifyjs/vuetify/issues/21865)) ([a97f103](https://github.com/vuetifyjs/vuetify/commit/a97f10306bd32e739c4cd52f4939e2b6d3b648d1)), closes [#21417](https://github.com/vuetifyjs/vuetify/issues/21417)
* **VMenu, VTooltip:** apply scroll-strategy reposition for horizontal overflow ([#21309](https://github.com/vuetifyjs/vuetify/issues/21309)) ([bd48658](https://github.com/vuetifyjs/vuetify/commit/bd486588ae665014abe9a2af09bee12868e8574f)), closes [#20625](https://github.com/vuetifyjs/vuetify/issues/20625)
* **VNumberInput:** consistent color of control icons ([#21936](https://github.com/vuetifyjs/vuetify/issues/21936)) ([6a50b44](https://github.com/vuetifyjs/vuetify/commit/6a50b44bf48b11f975c52c78074f99f52e34ab10)), closes [#21931](https://github.com/vuetifyjs/vuetify/issues/21931)
* **VNumberInput:** keep focus when incrementing in the list ([#21824](https://github.com/vuetifyjs/vuetify/issues/21824)) ([d6b3384](https://github.com/vuetifyjs/vuetify/commit/d6b338465a1c55fa72838c668276dcc9855b4f54)), closes [#17083](https://github.com/vuetifyjs/vuetify/issues/17083)
* **VOtpInput:** support composing character with IME ([42e15a3](https://github.com/vuetifyjs/vuetify/commit/42e15a349c1de7721c754d9aee2b437144b1a89b)), closes [#21918](https://github.com/vuetifyjs/vuetify/issues/21918)
* **VOverlay:** don't use content element as scroll parent ([06c4c91](https://github.com/vuetifyjs/vuetify/commit/06c4c91f94d18af53041961f2c9fb0cc7e364cb2))
* **VSelect:** select placeholder overlap ([#21923](https://github.com/vuetifyjs/vuetify/issues/21923)) ([5c06ba7](https://github.com/vuetifyjs/vuetify/commit/5c06ba7bd76bca370320433e7a0f058362d6028f)), closes [#21922](https://github.com/vuetifyjs/vuetify/issues/21922)
* **VSelect:** use selected text instead of value ([#21902](https://github.com/vuetifyjs/vuetify/issues/21902)) ([d0ef001](https://github.com/vuetifyjs/vuetify/commit/d0ef0016adf8517620ce14c5e1e50e800195fb95)), closes [#21097](https://github.com/vuetifyjs/vuetify/issues/21097)
* **VSlider:** avoid thumb label wedge gap ([#21847](https://github.com/vuetifyjs/vuetify/issues/21847)) ([059e578](https://github.com/vuetifyjs/vuetify/commit/059e578e21f376bf1059c59fbf72eb278664ed93))
* **VSparkline:** accept a single number ([#21944](https://github.com/vuetifyjs/vuetify/issues/21944)) ([d7b0e34](https://github.com/vuetifyjs/vuetify/commit/d7b0e34e9d717ce96c898875c4e480ab89d81eea)), closes [#19697](https://github.com/vuetifyjs/vuetify/issues/19697)
* **VStepper:** align title and subtitle to the avatar ([12735e6](https://github.com/vuetifyjs/vuetify/commit/12735e6797e1c482db74fd7615af7b484e282614)), closes [#21884](https://github.com/vuetifyjs/vuetify/issues/21884)
* **VStepper:** correct cursor for readonly item ([aeb6f4d](https://github.com/vuetifyjs/vuetify/commit/aeb6f4d70291ebb5c907ebe86490bb622f2929ea)), closes [#21867](https://github.com/vuetifyjs/vuetify/issues/21867)
* **VStepper:** keep correct alignment with alt-labels ([1a0a9e6](https://github.com/vuetifyjs/vuetify/commit/1a0a9e6f19d776fe104caaae4c659a3f6d3d3e55))
* **VTextField:** assign role to input element ([#21903](https://github.com/vuetifyjs/vuetify/issues/21903)) ([d77285f](https://github.com/vuetifyjs/vuetify/commit/d77285fcae70522dfafbc66c775f72b03684bb38)), closes [#18125](https://github.com/vuetifyjs/vuetify/issues/18125)
* **VTreeview:** allow expanding disabled nodes ([ed4d8cf](https://github.com/vuetifyjs/vuetify/commit/ed4d8cfb06079a231064dbc6ebedb05d3ad6ef06)), closes [#21075](https://github.com/vuetifyjs/vuetify/issues/21075) [#21116](https://github.com/vuetifyjs/vuetify/issues/21116)
* **VWindow:** correctly reveal vertical arrows on hover ([521ba7b](https://github.com/vuetifyjs/vuetify/commit/521ba7b7a5749f495b13face6fabca7b971e56bf))

### :microscope: Code Refactoring

* **VDataTable:** avoid Array.toReversed() ([3894f98](https://github.com/vuetifyjs/vuetify/commit/3894f98c333abaad63fc2a651ae558ffbb75d620))

### :test_tube: Labs

* **VColorInput:** pip customization ([#21820](https://github.com/vuetifyjs/vuetify/issues/21820)) ([db389d5](https://github.com/vuetifyjs/vuetify/commit/db389d5bb0386eccb00302c0b3134f39c201a35a))
* **VColorInput:** allow inner fields focus using mouse ([7657d52](https://github.com/vuetifyjs/vuetify/commit/7657d522ba5604ce53fad877e84033f7bf5ad960)), closes [#21897](https://github.com/vuetifyjs/vuetify/issues/21897)
* **VIconBtn:** correctly apply `icon-color` ([b2ece2c](https://github.com/vuetifyjs/vuetify/commit/b2ece2c033ec8cc097f644cda912bb915d1df84e)), closes [#21930](https://github.com/vuetifyjs/vuetify/issues/21930)
* **VPie:** support touch for segment interaction ([#21871](https://github.com/vuetifyjs/vuetify/issues/21871)) ([93f4218](https://github.com/vuetifyjs/vuetify/commit/93f421848601fe6f24e32395a7810c41790f92cf))
* **VVideo:** prefer `max-width`, default to 100% ([22d5dd5](https://github.com/vuetifyjs/vuetify/commit/22d5dd5e5814c9aea59a5d4778c2d4ea6c3c9ba6))
* **VVideo:** add `aspect-ratio` prop ([83e67d1](https://github.com/vuetifyjs/vuetify/commit/83e67d137b2659535da355ac23d9a24d8345537b))
* **VVideo:** correct default track color with pills ([e98919d](https://github.com/vuetifyjs/vuetify/commit/e98919d0c3ec9ed128bc58fe5678b1821f7f5478))
* **VVideo:** correct color customization ([13da3e1](https://github.com/vuetifyjs/vuetify/commit/13da3e1b33b7dfee1d506c4d47782ab47a3f7f6c))
* **VVideo:** correctly move elevation to pills ([3df9494](https://github.com/vuetifyjs/vuetify/commit/3df9494480b80f091bef6e0f1e65066dbe4b5642))
* **VVideo:** hide overlays for background variant ([466dc6f](https://github.com/vuetifyjs/vuetify/commit/466dc6fb87acf5a0e6e2d67f9196eaf3f6705e9f))

</details>

## Building the Future{ .mt-4 }

August is about laying the foundation to begin integrating Vuetify0 into Vuetify. The pre‑alpha work is shaping the path for incremental adoption of Zero‑powered primitives across the framework.

In parallel, the ecosystem continues to be polished and expanded:

* VEditor is nearing release with robust formatting and form integration.
* VVideo and related media features are progressing.
* Improvements to performance, theming, docs, and the redesigned issues experience are landing steadily.

Thanks for the feedback and contributions—these foundations will turn into practical wins shipping over the next few releases.

---

*Stay connected with Vuetify updates through our [GitHub repository](https://github.com/vuetifyjs/vuetify), [Discord community](https://discord.gg/eXubxyJ), and upcoming webinar series announcements.*
