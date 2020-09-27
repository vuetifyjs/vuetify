<template>
  <v-lazy min-height="128">
    <div class="d-flex">
      <v-avatar size="72">
        <v-img :src="member.avatar" />
      </v-avatar>

      <div class="pl-6 font-weight-medium">
        <div class="text-h5 mb-1 font-weight-bold d-flex align-center">
          <span
            class="mr-3"
            v-text="member.name"
          />

          <template v-for="link in links">
            <v-tooltip
              v-if="link.href || link.copyText"
              :key="link.href || link.copyText"
              top
            >
              <template #activator="{ on }">
                <a
                  v-if="link.href"
                  :href="link.href"
                  class="d-inline-flex text-decoration-none mr-1"
                  rel="noopener"
                  target="_blank"
                  v-on="on"
                >
                  <v-icon
                    :color="link.color"
                    v-text="link.icon"
                  />
                </a>
                <v-btn
                  v-else
                  class="text-decoration-none mr-1"
                  icon
                  small
                  v-on="on"
                  @click.prevent="copyTextToClipboard(link.copyText)"
                >
                  <v-icon
                    :color="link.color"
                    v-text="link.icon"
                  />
                </v-btn>
              </template>
              <span>{{ link.tooltip }}</span>
            </v-tooltip>
          </template>
        </div>

        <div
          v-if="member.focus"
          class="d-flex align-center flex-wrap"
        >
          <i18n
            class="text-uppercase caption font-weight-regular"
            path="focus"
            tag="h3"
          />

          <div class="mx-2">
            &nbsp;—&nbsp;
          </div>

          <template v-for="(focus, k) in member.focus">
            <app-md
              :key="k"
              v-text="focus"
            />

            <span
              v-if="k < member.focus.length - 1"
              :key="`span-${k}`"
              class="mx-2"
            >
              •
            </span>
          </template>
        </div>

        <div
          v-if="member.funding"
          class="d-flex align-center flex-wrap mt-1"
        >
          <i18n
            class="text-uppercase caption font-weight-regular"
            path="funding"
            tag="h3"
          />

          <div class="mx-2">
            &nbsp;—&nbsp;
          </div>

          <template v-for="(funding, k) in member.funding">
            <app-md
              :key="k"
              v-text="funding"
            />

            <span
              v-if="k < member.funding.length - 1"
              :key="`span-${k}`"
              class="mx-2"
            >
              •
            </span>
          </template>
        </div>

        <template v-for="field in ['work', 'location', 'languages']">
          <div
            v-if="member[field]"
            :key="field"
            class="text-subtitle d-flex align-center my-2"
          >
            <v-icon
              left
              v-text="icons[field]"
            />

            <template v-if="Array.isArray(member[field])">
              <template v-for="(focus, j) in member[field]">
                <app-md
                  :key="j"
                  v-text="focus"
                />

                <span
                  v-if="j < member[field].length - 1"
                  :key="`span-${j}`"
                  class="mx-2"
                >
                  •
                </span>
              </template>
            </template>

            <template v-else>
              {{ member[field] }}
            </template>
          </div>
        </template>
      </div>
    </div>
  </v-lazy>
</template>

<script>
  export default {
    name: 'TeamMember',

    props: {
      member: {
        type: Object,
        default: () => ({}),
      },
    },

    data: () => ({
      icons: {
        languages: '$mdiTranslate',
        location: '$mdiMapMarkerOutline',
        work: '$mdiBriefcaseVariantOutline',
      },
    }),

    computed: {
      links () {
        const links = []

        if (this.member.twitter) {
          links.push({
            color: '#40BBF4',
            href: `https://twitter.com/${this.member.twitter}`,
            icon: '$mdiTwitter',
            tooltip: 'Twitter',
          })
        }

        if (this.member.github) {
          links.push({
            color: '#24292E',
            href: `https://github.com/${this.member.github}`,
            icon: '$mdiGithub',
            tooltip: 'Github',
          })
        }

        if (this.member.linkedin) {
          links.push({
            color: '#0077B5',
            href: `https://linkedin.com/in/${this.member.linkedin}`,
            icon: '$mdiLinkedin',
            tooltip: 'LinkedIn',
          })
        }

        if (this.member.discord) {
          links.push({
            color: '#738ADB',
            copyText: this.member.discord,
            icon: '$mdiDiscord',
            tooltip: `Discord: ${this.member.discord} (click to copy)`,
          })
        }

        return links
      },
    },

    methods: {
      copyTextToClipboard (copyText) {
        navigator.clipboard.writeText(copyText)
      },
    },
  }
</script>
