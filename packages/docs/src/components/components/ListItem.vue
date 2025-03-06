<template>
  <v-col
    cols="12"
    lg="4"
    md="6"
  >
    <v-card
      :image="image"
      :to="rpath(`/components/${src}/`)"
      class="mb-3"
      elevation="0"
      height="164"
    >
      <template #image>
        <v-img @error="hasError = true">
          <v-chip
            v-if="labs"
            :to="rpath('/labs/introduction/')"
            color="success"
            prepend-icon="mdi-beaker-outline"
            rounded="bs-0 te-0"
            size="small"
            text="Labs Component"
            variant="flat"
            label
            @click.stop
          />
        </v-img>
      </template>
    </v-card>

    <h2 class="text-h6">
      <span class="text-capitalize">{{ name?.replace(/-/g, ' ') }}</span>
    </h2>

    <slot />
  </v-col>
</template>

<script setup lang="ts">
  const props = defineProps({
    name: String,
    labs: Boolean,
    src: String,
  })

  const hasError = shallowRef(false)
  const image = computed(() => {
    if (hasError.value) return 'https://cdn.vuetifyjs.com/docs/images/graphics/img-placeholder.png'

    return `https://cdn.vuetifyjs.com/docs/images/preview/${props.src}.png`
  })
</script>
