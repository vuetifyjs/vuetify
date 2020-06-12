<template>
  <div class="mb-4 text-center member">
    <v-avatar
      size="164"
      class="elevation-4"
      color="#DDF0FE"
    >
      <v-hover>
        <v-img
          slot-scope="{ hover }"
          :src="`https://avataaars.io/?${value.avatar}`"
        >
          <v-sheet
            :color="hover ? 'rgba(0, 0, 0, .72)' : 'transparent'"
            class="transition-fast-in-fast-out"
            dark
            height="100%"
            style="position: absolute; top: 0; left: 0;"
            width="100%"
          >
            <v-layout
              v-show="hover"
              fill-height
              align-center
              justify-center
              ma-0
              wrap
            >
              <v-flex
                xs12
                pb-0
              >
                <base-markdown>{{ value.title }}</base-markdown>
              </v-flex>
              <v-flex>
                <a
                  v-if="value.email"
                  :aria-label="`${value.name}'s Email`"
                  :href="`mailto:${value.email}`"
                  :title="`${value.name}'s Email`"
                  class="text-decoration-none mx-2"
                  target="_blank"
                  rel="noopener"
                >
                  <v-icon>mdi-email</v-icon>
                </a>
                <a
                  v-if="value.twitter"
                  :aria-label="`${value.name}'s Twitter Profile`"
                  :href="`https://twitter.com/${value.twitter}`"
                  :title="`${value.name}'s Twitter Profile`"
                  class="text-decoration-none mx-2"
                  target="_blank"
                  rel="noopener"
                >
                  <v-icon>mdi-twitter</v-icon>
                </a>
                <a
                  v-if="value.github"
                  :aria-label="`${value.name}'s Github Profile`"
                  :href="`https://github.com/${value.github}`"
                  :title="`${value.name}'s Github Profile`"
                  class="text-decoration-none mx-2"
                  target="_blank"
                  rel="noopener"
                >
                  <v-icon>mdi-github</v-icon>
                </a>
                <a
                  v-if="value.linkedin"
                  :aria-label="`${value.name}'s LinkedIn Profile`"
                  :href="`https://linkedin.com/in/${value.linkedin}`"
                  :title="`${value.name}'s LinkedIn Profile`"
                  class="text-decoration-none mx-2"
                  target="_blank"
                  rel="noopener"
                >
                  <v-icon>mdi-linkedin</v-icon>
                </a>
                <a
                  v-if="value.patreon"
                  :aria-label="`${value.name}'s Patreon`"
                  :href="`https://patreon.com/${value.github}`"
                  :title="`${value.name}'s Patreon`"
                  class="text-decoration-none mx-2"
                  target="_blank"
                  rel="noopener"
                >
                  <v-icon>mdi-patreon</v-icon>
                </a>
              </v-flex>
            </v-layout>
          </v-sheet>
        </v-img>
      </v-hover>
    </v-avatar>
    <div
      class="font-weight-light headline"
      v-text="value.name"
    />
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Object,
        default: () => ({}),
      },
    },
  }
</script>

<style>
.member h3 {
  font-size: 24px;
  font-weight: 500;
}
</style>
