<template>
  <v-timeline
    id="roadmap"
    class="mb-5"
    dense
  >
    <v-timeline-item
      v-for="(item, i) in items"
      v-if="index == null || index >= i"
      :key="i"
      :icon="item.complete ? 'mdi-check' : item.icon"
      :color="item.complete ? 'success darken-1' : item.color"
      :small="item.complete || item.small"
      fill-dot
    >
      <strong
        slot="opposite"
        :class="index === i ? 'primary--text' : undefined"
        v-text="item.caption"
      />
      <v-card
        :class="`elevation-${item.value ? 8 : 1}`"
        class="py-2"
        hover
        @click.native="item.value = !item.value"
      >
        <v-card-title class="py-0 pr-2">
          <span
            class="body-2"
            v-text="item.title"
          />
          <v-spacer />
          <v-btn
            :color="item.value ? 'primary' : ''"
            :disabled="item.complete"
            :input-value="item.value"
            :ripple="false"
            class="font-weight-light ma-0"
            flat
          >
            <span
              class="mr-2"
              v-text="item.caption"
            />
            <v-icon
              small
            >mdi-calendar</v-icon>
          </v-btn>
        </v-card-title>
        <v-expand-transition>
          <div v-if="(index != null && index >= i) || item.value">
            <v-card-text>
              <doc-markdown :code="item.text" />
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
  const types = {
    release: {
      icon: 'mdi-package-variant-closed',
      color: 'indigo lighten-1'
    },
    packages: {
      icon: 'mdi-server-network',
      color: 'red lighten-2',
      small: true
    },
    site: {
      icon: 'mdi-content-cut',
      color: 'blue-grey',
      small: true
    }
  }

  export default {
    data: () => ({
      index: null,
      interval: null,
      items: []
    }),
    mounted () {
      this.items = this.$t('GettingStarted.Roadmap.roadmapItems').map((item) => {
        const type = types[item.type]
        return {
          ...type,
          ...item
        }
      })
    }
  }
</script>

<style lang="stylus">
  #roadmap .v-timeline-item__body
    p
      margin: 0
</style>
