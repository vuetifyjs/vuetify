<template>
  <div class="mb-3 text-xs-center member">
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
              <v-flex xs12>
                <doc-markdown>{{ value.title }}</doc-markdown>
              </v-flex>
              <a
                v-if="value.email"
                :href="`mailto:${value.email}`"
                :title="`${value.name}'s' Email`"
                class="text-decoration-none mx-2"
              >
                <v-icon>mdi-email</v-icon>
              </a>
              <a
                v-if="value.github"
                :href="`https://github.com/${value.github}`"
                :title="`${value.name}'s' Github Profile`"
                class="text-decoration-none mx-2"
              >
                <v-icon>mdi-github-face</v-icon>
              </a>
            </v-layout>
          </v-sheet>
        </v-img>
      </v-hover>
    </v-avatar>
    <h3
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
        default: () => ({})
      }
    }
  }
</script>

<style>
.member h3 {
  font-size: 24px;
  font-weight: 500;
}
</style>
