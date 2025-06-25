---
layout: blog
meta:
  title: Vuetify — State of the Union 2024
  description: Reflecting on the journey and looking ahead for 2025
  keywords: vuetify, blog, news, updates, stories, ecosystem, state of the union
---

<script setup>
  import AboutTeamMember from '@/components/about/TeamMember.vue'
  import { VSparkline } from 'vuetify'

  const teams = useTeamStore()
  const kael = computed(() => teams.members.find(member => member.github === 'KaelWD'))
</script>

# State of the Union 2024

---

🖊️ John Leider • 📅 September 8th, 2024

<PromotedEntry />

---

## Introduction

It's been a long road to get where we are today, and looking back, I can’t help but feel proud of how far Vuetify has come. From humble beginnings to now surpassing Vuetify 2’s usage, the journey has been anything but easy, but we’ve always had our community to lean on. Today, I want to take some time to reflect on our past, acknowledge our wins and challenges, and share where we're headed.

## Looking Back – The Journey So Far

First, I'd like to reflect on what we've been up to for the past year. Since November 2023, we’ve hit some incredible milestones. This includes the release of `v-data-table`, and over 10 other new and old components. Each of these components was designed with developer feedback in mind, making the framework more flexible and feature-complete. We’ve also made significant progress on our ecosystem tools, with Vuetify One, Vuetify Bin, Vuetify Playground, and Vuetify Snips all seeing major updates.

![Image of 4 releases banner](https://vuetifyjs.b-cdn.net/docs/images/blog/state-of-the-union-2024/releases.png "Release banners")

- [**v3.4 (Blackguard)**](/getting-started/release-notes/?version=v3.4.0) in November 2023 brought 8 new components:
  - [`v-bottom-sheet`](/components/bottom-sheets/)
  - [`v-data-iterator`](/components/data-iterators/)
  - [`v-data-table`](/components/data-tables/introduction/)
  - [`v-date-picker`](/components/date-pickers/)
  - [`v-infinite-scroll`](/components/infinite-scroller/)
  - [`v-otp-input`](/components/otp-input/)
  - [`v-skeleton-loader`](/components/skeleton-loaders/)
  - [`v-stepper`](/components/steppers/)
- [**v3.5 (Polaris)**](/getting-started/release-notes/?version=v3.5.0) in January 2024 was a maintenance cycle for bug fixes and performance improvements. This release focused heavily on refining existing components, ensuring performance remained high across all devices.
- [**v3.6 (Nebula)**](/getting-started/release-notes/?version=v3.6.0) in April 2024 brought 5 new components:
  - [`v-fab`](/components/floating-action-buttons/)
  - [`v-empty-state`](/components/empty-states/)
  - [`v-sparkline`](/components/sparklines/)
  - [`v-speed-dial`](/components/speed-dials/)
  - [`v-confirm-edit`](/components/confirm-edit/)

- [**v3.7 (Odyssey)**](/getting-started/release-notes/?version=v3.7.0) in August 2024 improved sub `v-menu` support and added new input validation options, making form handling more intuitive and robust.

---

In addition, we've made significant progress on our ecosystem tools:

![Image of all ecosystem logos](https://vuetifyjs.b-cdn.net/docs/images/blog/state-of-the-union-2024/ecosystem.png "Ecosystem logos")

- [**Vuetify One**](/blog/state-of-the-union-2024/?one=subscribe) (January 2024) unified our tools for authentication and state management across the entire Vuetify ecosystem.
- [**Vuetify Bin**](https://bin.vuetifyjs.com/) (March 2024) was launched as a simple and easy pastebin alternative.
- [**Vuetify Playground**](https://play.vuetifyjs.com/) (March 2024) was updated to support saving remote playgrounds for easy sharing with the Vuetify One subscription.
- [**Vuetify Snips**](https://snips.vuetifyjs.com/) (April 2024) became our first stand-alone product, showcasing advanced Vuetify examples to help fund ongoing development.
- **Vuetify Issues** (On Deck) is a rebuild of our existing [issues website](https://issues.vuetifyjs.com/), with a focus on improving the user experience and making it easier to find solutions to common problems.

I'm _extremely_ proud of the team and all that we've been able to accomplish during this time. One of our toughest challenges has been developer churn, where several components were started by one developer and finished by another. But through these transitions, we've continued pushing forward with the support of our amazing community.

A huge win has been the financial support through Open Collective and GitHub Sponsors, with over **$8,000** per month on both platforms. This funding ensures that Vuetify development will continue at full speed.

Please give a shoutout to our [sponsors and backers](/introduction/sponsors-and-backers/) for their ongoing support. 🎉

## Current State – Where We Are Now

Today, Vuetify is in an exciting place. While we are still recovering from a tough financial **drought**, things are looking up. Thanks to generous contributions from companies like [Abacus](https://www.abacus.ch/), [Route4Me](https://route4me.com/), and [Teamwork](https://teamwork.com), the framework is now back at full speed.

With that being said, those who followed my post earlier back in [June](https://x.com/zeroskillz/status/1803081840669937724) will know that I've been seeking employment in lieu of the financial situation. During this time, I connected with a company named Optikka. Their entire platform is built on Vue / Vuetify and they were gracious enough to offer me a Senior Developer position. I've been with them for a little over a month now and it's been an amazing experience. I've been able to bring my knowledge of Vuetify to the team and help them build out their platform.

With that in mind, I have taken a step back to analyze my role in Vuetify and decided to pass creative and engineering control of the framework over to [Kael](https://github.com/kaelwd). The recent events forced my focus to shift to higher-level tasks, ensuring we never encounter a funding crisis like we did, while still fostering creativity within the team. I'll remain an active contributor, but my role will be different moving forward.

<AboutTeamMember v-if="kael" v-bind="{ member: kael }" class="mb-4" />

Kael is a Senior Developer who has been with Vuetify since the beginning. He has a deep understanding of the framework and has been instrumental in shaping its direction. He is responsible for a lot of the cool technology in Vuetify and he still has a lot more in the tank. I have full confidence in his ability to lead the team and continue pushing Vuetify forward.

### Growth 🚀

Our user base continues to grow, with Vuetify 3 usage officially surpassing Vuetify 2. The demand for the new features and improved performance has been immense, and it’s been amazing to watch our community evolve. The team remains as dedicated as ever to bringing you the best possible UI framework.

![Graph showing weekly download statistics for Vuetify 0, 1, 2 and 3](https://vuetifyjs.b-cdn.net/docs/images/blog/state-of-the-union-2024/downloads.png "Vuetify download statistics")

### Ongoing Success 📈

A key recent success story is [**Vuetify Snips**](https://snips.vuetifyjs.com/). It’s quickly become a popular resource for developers looking for premade snippets, supercharging their workflow and easing adoption of Vuetify 3. It's also a beneficial way to support the framework. All sales from Snips go directly back into Vuetify development.

### Roadmap Updates 🛣️

We have an updated roadmap for the remainder of the year, and I encourage everyone to check it out on the [Vuetify Roadmap](https://vuetifyjs.com/introduction/roadmap). There's a lot in store, and we’re excited to keep pushing the framework forward. 🎯

## Looking Ahead – The Future

Looking ahead, we're focused on making Vuetify even easier to customize. One exciting change will be the splitting out of our CSS utilities from the core framework, which will pave the way for 3rd party integration with other tools such as Tailwind. We want Vuetify to be as flexible as possible, giving developers the ability to choose the tools that work best for their needs, which is why we plan to expand the functionality of blueprints by moving core styling from SASS variables to CSS variables, making them easily configurable through the Vuetify config.

As always, the community will be at the heart of Vuetify’s future. [Contributions](/getting-started/contributing/) and [funding](/introduction/sponsors-and-backers/) will be instrumental as we continue to expand the ecosystem. We’re always looking for code contributions, so if you're interested in learning how to help with the framework, feel free to reach out to me!

And of course, our [Discord community](https://community.vuetifyjs.com) is always buzzing with activity. If you're looking to engage with fellow developers, troubleshoot issues, or just hang out, we'd love to see you there! 💬

## Personal Reflections

Building Vuetify full-time has been nothing short of a blessing. I’ve always loved the challenge of creating UI components, and it’s something I look forward to continuing. Working in Open Source comes with its ups and downs, and one major lesson I’ve learned is this: if you want to do Open Source full-time, you need to build something that can generate revenue.

It’s the key to sustaining yourself during those inevitable moments when excitement fades and donations slow. For me, it's always been about providing the absolute most value for free without gating functionality behind a paywall. I feel that Snips strikes a perfect balance between the two, and I'm excited to see where it goes.

Looking back, I’ve learned some critical lessons that I’d pass on to anyone considering building or contributing to an open-source project:

1. **Sustainability is key**: Passion alone isn’t enough. You need to think about how to generate income to keep the project going long-term, whether through sponsorships, paid products, or other creative avenues.
2. **Community is your foundation**: Open Source lives and dies by its community. Engage with your users, listen to their feedback, and be open to contributions. Vuetify wouldn’t be where it is today without the incredible people supporting it.
3. **Set clear goals**: It’s easy to get caught up in features or get sidetracked by shiny new things. Having a clear roadmap, with both short and long-term goals, helps keep development focused and moving forward, even during challenging times.
4. **Developer retention is a challenge**: Open-source projects often suffer from turnover, especially when contributors are volunteers. Ensuring smooth transitions, proper documentation, and a welcoming environment can help mitigate some of this churn.

Vuetify has changed me in more ways than one. It’s helped me grow not just as a developer but as a leader. I’ve learned the importance of perseverance, the value of community, and how crucial it is to always plan for the long term. I’m excited to see where Vuetify goes from here, and I’m grateful to have been part of this journey.

## Conclusion

As we look to the future, I want to thank every single one of you who has been part of this experiment, whether as a user, contributor, or supporter. The road ahead is bright, and with your help, we’re going to continue bringing high quality features to enhance your Vuetify development experience.

This is just the first of many blog posts to come. Stay tuned for future updates, tutorials, community highlights, and much more. We’re just getting started. 🔥
