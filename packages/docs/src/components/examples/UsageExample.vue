<template>
  <div>
    <v-toolbar
      border="b"
      class="ps-1"
      height="44"
      flat
    >
      <v-slide-group
        v-model="model"
        class="flex-grow-1"
        mandatory
        show-arrows
      >
        <v-slide-group-item value="default">
          <template #default="{ isSelected, toggle }">
            <v-btn
              :active="isSelected"
              class="ma-1 text-none"
              size="small"
              text="Default"
              variant="text"
              @click="toggle"
            />
          </template>
        </v-slide-group-item>

        <v-slide-group-item
          v-for="(option, i) in options"
          :key="i"
          :value="option"
        >
          <template #default="{ isSelected, toggle }">
            <v-btn
              :active="isSelected"
              :text="upperFirst(option)"
              class="ma-1 text-none"
              size="small"
              variant="text"
              @click="toggle"
            />
          </template>
        </v-slide-group-item>
      </v-slide-group>

      <v-tooltip :disabled="$vuetify.display.xs" location="top" open-delay="500">
        <template #activator="{ props: activatorProps }">
          <v-btn
            :href="playgroundLink"
            class="me-1 text-medium-emphasis"
            density="comfortable"
            icon="$vuetify-play"
            size="small"
            target="_blank"
            v-bind="activatorProps"
          />
        </template>

        <span>{{ t('edit-in-playground') }}</span>
      </v-tooltip>

      <v-tooltip :disabled="$vuetify.display.xs" location="top" open-delay="500">
        <template #activator="{ props: activatorProps }">
          <v-btn
            :icon="copied ? 'mdi-check' : 'mdi-clipboard-multiple-outline'"
            class="me-1 text-medium-emphasis"
            density="comfortable"
            size="small"
            target="_blank"
            v-bind="activatorProps"
            @click="onClickCopy"
          />
        </template>

        <span>{{ t('copy-example-source') }}</span>
      </v-tooltip>

      <v-tooltip :disabled="$vuetify.display.xs" location="top" open-delay="500">
        <template #activator="{ props: activatorProps }">
          <v-btn
            :icon="!show ? 'mdi-code-tags' : 'mdi-chevron-up'"
            class="me-1 text-medium-emphasis"
            density="comfortable"
            size="small"
            v-bind="activatorProps"
            @click="show = !show"
          />
        </template>

        <span>{{ show ? t('hide-source') : t('view-source') }}</span>
      </v-tooltip>
    </v-toolbar>

    <v-layout :class="['border-b', !show && 'border-opacity-0']">
      <v-main>
        <v-sheet
          class="py-14 px-4 d-flex align-center"
          min-height="300"
          rounded="0"
        >
          <div class="flex-fill w-100">
            <slot />
          </div>
        </v-sheet>
      </v-main>

      <v-navigation-drawer
        v-if="display.smAndUp.value && $slots.configuration"
        v-model="tune"
        location="right"
        name="tune"
        width="250"
        permanent
        touchless
      >
        <v-list>
          <v-list-subheader :title="t('configuration')" />

          <div class="px-4 usage-example">
            <v-defaults-provider
              :defaults="{
                global: {
                  density: 'compact',
                  hideDetails: true,
                  step: 1,
                }
              }"
            >
              <slot name="configuration" />
            </v-defaults-provider>
          </div>
        </v-list>
      </v-navigation-drawer>
    </v-layout>

    <v-expand-transition>
      <div v-if="show">
        <div class="pa-2">
          <AppMarkup :code="code" />
        </div>

        <div v-if="script" class="pa-2 pt-0">
          <AppMarkup :code="script" lang="js" />
        </div>
      </div>
    </v-expand-transition>
  </div>
</template>

<script setup>
  const props = defineProps({
    name: String,
    code: String,
    options: {
      type: Array,
      default: () => ([]),
    },
    modelValue: {
      type: [Array, String],
      default: () => ([]),
      required: true,
    },
    script: String,
  })
  const emit = defineEmits(['update:modelValue', 'update:tuneValue'])

  const display = useDisplay()
  const { t } = useI18n()

  const tune = shallowRef(true)
  const show = shallowRef(true)
  const copied = shallowRef(false)

  const model = computed({
    get () {
      return props.modelValue
    },
    set (val) {
      emit('update:modelValue', val)
    },
  })
  const playgroundLink = computed(() => usePlayground([
    {
      name: 'template',
      language: 'html',
      content: `<template>\n  <v-app>\n    <v-container>\n      ${props.code.replaceAll('\n', '\n      ')}\n    </v-container>\n  </v-app>\n</template>\n${props.script || ''}`,
    },
  ]))

  // TODO: Mimic how Example handles actions

  const sections = computed(() => {
    const scriptContent = props.script ? props.script : null

    return [
      {
        name: 'template',
        language: 'html',
        content: props.code,
      },
      {
        name: 'script',
        language: 'javascript',
        content: scriptContent,
      },
    ].filter(v => v.content)
  })

  async function onClickCopy () {
    navigator.clipboard.writeText(
      sections.value.map(section => section.content).join('\n')
    )

    copied.value = true

    await wait(2000)

    copied.value = false
  }
</script>

<style lang="sass">
  .usage-example
    .v-text-field
      margin-bottom: 8px

  // Hack to get around navigation-drawer default bgColor
  // TODO: find a better way
  .v-select__content .v-list
    background: rgb(var(--v-theme-surface)) !important
</style>
