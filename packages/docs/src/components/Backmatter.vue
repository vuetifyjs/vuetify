<template>
  <section
    id="ready-for-more"
    class="mt-12"
  >
    <app-heading
      :content="t('ready')"
      level="2"
    />

    <!-- https://vue-i18n.intlify.dev/guide/advanced/component.html#scope-resolving -->
    <i18n-t
      class="mb-3"
      keypath="ready-text"
      scope="global"
      tag="div"
    >
      <template #team>
        <app-link :href="rpath('/about/meet-the-team')">
          {{ t('team') }}
        </app-link>
      </template>
    </i18n-t>

    <v-row dense>
      <v-col
        v-for="(item, i) in related"
        :key="i"
        cols="12"
        sm="6"
        md="4"
      >
        <app-sheet>
          <v-list-item
            :to="item.href"
            :title="item.title"
            :subtitle="item.subtitle"
          >
            <template #prepend>
              <v-icon
                :icon="item.icon"
                :color="item.color"
                class="mr-5 ml-2"
              />
            </template>
          </v-list-item>
        </app-sheet>
      </v-col>
    </v-row>

    <app-divider class="mt-7 mb-5" />

    <!-- <up-next class="mb-4" /> -->

    <!-- <exit-ad class="mb-8" /> -->

    <!-- <contribute /> -->
  </section>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'
  import { generatedRoutes, rpath } from '@/util/routes'

  const categoryIcons: Record<string, { icon: string, color: string }> = {
    api: {
      icon: 'mdi-flask-outline',
      color: 'orange',
    },
    components: {
      icon: 'mdi-view-dashboard-outline',
      color: 'indigo-darken-1',
    },
    features: {
      icon: 'mdi-image-edit-outline',
      color: 'red',
    },
    directives: {
      icon: 'mdi-function',
      color: 'blue-grey',
    },
    'getting-started': {
      icon: 'mdi-speedometer',
      color: 'teal',
    },
    introduction: {
      icon: 'mdi-script-text-outline',
      color: 'green',
    },
    about: {
      icon: 'mdi-vuetify',
      color: 'primary',
    },
    resources: {
      icon: 'mdi-human-male-board-poll',
      color: 'pink',
    },
    styles: {
      icon: 'mdi-palette-outline',
      color: 'deep-purple-accent-4',
    },
    themes: {
      icon: 'mdi-script-text-outline',
      color: 'pink',
    },
  }

  // Utilities
  export default defineComponent({
    name: 'Backmatter',

    setup () {
      const route = useRoute()
      const { t, locale } = useI18n()

      const related = computed(() => ((route.meta.related as string[]) || []).flatMap(href => {
        href = href.replace(/\/$/, '')
        const path = `/${locale.value}${href}`
        const route = generatedRoutes.find((route: any) => route.path === path)

        if (!route) return []

        const category = href.split('/')[1]

        return {
          title: (route.meta?.nav ?? route.meta?.title ?? href) as string | undefined,
          subtitle: category,
          ...categoryIcons[category],
          href: path,
        }
      }))

      return {
        related,
        t,
        rpath,
      }
    },
  })
</script>
