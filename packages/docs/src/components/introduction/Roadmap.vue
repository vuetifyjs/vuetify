<template>
  <v-timeline
    id="roadmap"
    class="mb-12"
    dense
  >
    <template v-for="(item, i) in items">
      <v-timeline-item
        v-if="typeof item === 'number'"
        :key="`divider-${i}`"
      >
        <template v-slot:opposite>
          <span>Completed</span>
        </template>
      </v-timeline-item>

      <v-timeline-item
        v-else-if="index == null || index >= i"
        :key="i"
        :color="item.complete ? 'success darken-1' : item.color"
        :icon="item.complete ? 'mdi-check' : item.icon"
        :small="item.complete || item.small"
        fill-dot
      >
        <template v-slot:opposite>
          <strong
            :class="index === i ? 'primary--text' : undefined"
            v-text="item.caption"
          />
        </template>

        <v-card
          :class="`elevation-${item.value ? 8 : 1}`"
          :hover="!item.value"
          class="py-2"
          @click.native="item.value = true"
        >
          <v-card-title class="py-0 pr-2">
            <base-markdown
              class="body-2"
              :code="item.title"
            />

            <v-spacer />

            <v-btn
              :color="item.value ? 'primary' : ''"
              :input-value="item.value"
              :ripple="false"
              class="font-weight-light ma-0"
              text
              @click.stop="item.value = !item.value"
            >
              <span
                class="mr-2"
                v-text="item.caption"
              />

              <v-icon small>
                mdi-calendar
              </v-icon>
            </v-btn>
          </v-card-title>

          <v-expand-transition>
            <div v-if="(index != null && index >= i) || item.value">
              <v-card-text>
                <base-markdown :code="item.text" />

                <template v-if="item.features">
                  <div class="mt-4" />

                  <template v-for="(features, key, index) in item.features">
                    <base-markdown
                      :key="`title-${index}`"
                      :code="key"
                    />
                    <base-markdown
                      :key="`list-${index}`"
                      :code="features"
                    />
                  </template>
                </template>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-timeline-item>
    </template>
  </v-timeline>
</template>

<script>
  const types = {
    release: {
      icon: 'mdi-package-variant-closed',
      color: 'indigo lighten-1',
    },
    packages: {
      icon: 'mdi-server-network',
      color: 'red lighten-2',
      small: true,
    },
    site: {
      icon: 'mdi-content-cut',
      color: 'blue-grey',
      small: true,
    },
  }

  export default {
    data: () => ({
      index: null,
      interval: null,
      items: [],
    }),

    mounted () {
      this.items = this.$t('Introduction.Roadmap.roadmapItems').map(item => {
        const type = types[item.type]
        return {
          ...type,
          ...item,
        }
      }).reverse()
    },
  }
</script>

<style lang="sass">
#roadmap
  .v-timeline-item__body p
    margin: 0

  .markdown > h3
    margin-bottom: 8px
</style>
