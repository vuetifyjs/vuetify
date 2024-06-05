<template>
  <v-list-item
    v-if="item"
    :subtitle="subtitle"
    :title="item.meta.nav ?? item.meta.title"
    :to="item.path"
    lines="two"
    border
    rounded
  >
    <template #prepend>
      <v-avatar>
        <v-icon
          :color="icon.color"
          :icon="icon.icon"
        />
      </v-avatar>
    </template>
  </v-list-item>
</template>

<script setup>
  const appStore = useAppStore()
  const props = defineProps({ to: String })
  const routes = useRouter().getRoutes()
  const path = rpath(props.to)
  const item = routes.find(r => r.path === path)
  const category = path.split('/')[2]
  const icon = computed(() => appStore.categories[category])
  const subtitle = upperFirst(category.replace('-', ' '))
</script>
