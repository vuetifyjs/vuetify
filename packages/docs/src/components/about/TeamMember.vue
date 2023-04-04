<template>
  <v-lazy min-height="128">
    <div class="d-flex">
      <v-avatar color="grey-lighten-2" size="72">
        <v-img v-if="member.avatar" :src="member.avatar" />
        <v-icon v-else color="grey" size="35"> mdi-image</v-icon>
      </v-avatar>

      <div class="ps-6 font-weight-medium">
        <div class="text-h5 mb-1 font-weight-bold d-flex align-center">
          <span
            class="me-3"
            v-text="member.name"
          />

          <template v-for="link in links">
            <v-tooltip
              v-if="link.href || link.copyText"
              :key="link.href || link.copyText"
              location="bottom"
            >
              <template #activator="{ props: activatorProps }">
                <a
                  v-if="link.href"
                  :href="link.href"
                  class="d-inline-flex text-decoration-none me-1"
                  rel="noopener"
                  target="_blank"
                  v-bind="activatorProps"
                >
                  <v-icon
                    :color="link.color"
                    :icon="link.icon"
                    size="small"
                  />
                </a>

                <div
                  v-else
                  class="cursor-pointer"
                  v-bind="activatorProps"
                  @click.prevent="copyTextToClipboard(link.copyText)"
                >
                  <v-icon
                    :icon="link.icon"
                    :color="link.color"
                    size="small"
                  />
                </div>
              </template>

              <span>{{ link.tooltip }}</span>
            </v-tooltip>
          </template>
        </div>

        <div
          v-if="member.focus"
          class="d-flex align-center flex-wrap"
        >
          <h3
            class="text-uppercase text-caption font-weight-regular"
          >{{ t('focus') }}</h3>

          <div class="mx-2">
            &nbsp;—&nbsp;
          </div>

          <template v-for="(focus, k) in member.focus" :key="k">
            <app-markdown :content="focus" />

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
          <h3
            class="text-uppercase text-caption font-weight-regular"
          >{{ t('funding') }}</h3>

          <div class="mx-2">
            &nbsp;—&nbsp;
          </div>

          <template v-for="(funding, k) in member.funding" :key="k">
            <app-markdown :content="funding" />

            <span
              v-if="k < member.funding.length - 1"
              :key="`span-${k}`"
              class="mx-2"
            >
              •
            </span>
          </template>
        </div>

        <template v-for="field in fields">
          <div
            v-if="member[field]"
            :key="field"
            class="text-subtitle d-flex align-center my-2"
          >
            <v-icon
              start
              :icon="icons[field]"
            />

            <template v-if="Array.isArray(member[field])">
              <template v-for="(focus, j) in member[field]" :key="j">
                <app-markdown :content="focus" />

                <span
                  v-if="j < member[field]!.length - 1"
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

<script setup lang="ts">
  // Composables
  import { useI18n } from 'vue-i18n'

  // Utilities
  import { computed } from 'vue'

  // Types
  import type { Member } from '@/store/team'
  import type { PropType } from 'vue'

  const props = defineProps({
    member: {
      type: Object as PropType<Member>,
      default: () => ({}),
    },
  })

  const { t } = useI18n()

  const icons = {
    languages: 'mdi-translate',
    location: 'mdi-map-marker-outline',
    work: 'mdi-briefcase-variant-outline',
  }
  const fields = ['work', 'location', 'languages'] as const

  const links = computed(() => {
    const links = []

    if (props.member.twitter) {
      links.push({
        color: '#40BBF4',
        href: `https://twitter.com/${props.member.twitter}`,
        icon: 'mdi-twitter',
        tooltip: 'Twitter',
      })
    }

    if (props.member.github) {
      links.push({
        color: '#24292E',
        href: `https://github.com/${props.member.github}`,
        icon: 'mdi-github',
        tooltip: 'GitHub',
      })
    }

    if (props.member.linkedin) {
      links.push({
        color: '#0077B5',
        href: `https://linkedin.com/in/${props.member.linkedin}`,
        icon: 'mdi-linkedin',
        tooltip: 'LinkedIn',
      })
    }

    if (props.member.discord) {
      links.push({
        color: '#738ADB',
        copyText: props.member.discord,
        icon: 'mdi-discord',
        tooltip: `Discord: ${props.member.discord} (click to copy)`,
      })
    }

    return links
  })

  function copyTextToClipboard (copyText?: string) {
    if (!copyText) return
    navigator.clipboard.writeText(copyText)
  }
</script>

<style>
  .cursor-pointer {
    cursor: pointer;
  }
</style>
