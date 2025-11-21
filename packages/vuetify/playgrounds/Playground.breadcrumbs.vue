<template>
  <v-app>
    <v-container>
      <v-breadcrumbs :items="items" :total-visible="3" />
      <v-breadcrumbs :items="items" :total-visible="3" collapse-in-menu />
      <v-breadcrumbs :items="items" :total-visible="3" collapse-in-menu>
        <template v-slot:list-item="{ item, index }">
          <v-list-item :key="index" :disabled="item.disabled" :href="item.href">
            <v-list-item-title>
              <span v-if="item.disabled">🔒 </span>{{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-breadcrumbs>
    </v-container>
  </v-app>
</template>

<script>
  export default {
    name: 'Playground',
    data: () => ({
      items: Array.from({ length: 4 }, (k, v) => ({ title: `Link ${v + 1}`, href: `breadcrumbs_link_${v + 1}`, disabled: v === 2 })),
    }),
  }
</script>
