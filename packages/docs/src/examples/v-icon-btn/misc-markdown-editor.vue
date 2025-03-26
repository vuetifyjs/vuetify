<template>
  <v-container class="pa-md-12">
    <v-card
      class="mx-auto"
      color="blue-grey-darken-2"
      max-width="640"
      rounded="lg"
      variant="tonal"
    >
      <v-toolbar
        density="compact"
        rounded="t-lg"
        title="Editor"
        border
      >
        <template v-slot:append>
          <div class="d-flex align-center pa-1">
            <div ref="desktopTarget"></div>

            <v-icon-btn
              v-if="display.mobile.value"
              icon="mdi-dots-vertical"
              rounded="lg"
              size="32"
            >

              <v-icon></v-icon>

              <v-menu activator="parent" width="200">
                <v-card rounded="lg">
                  <div ref="mobileTarget"></div>
                </v-card>
              </v-menu>
            </v-icon-btn>
          </div>
        </template>
      </v-toolbar>

      <div class="px-4 pb-4">
        <v-textarea
          ref="textarea"
          v-model="model"
          variant="plain"
          auto-grow
          hide-details
        ></v-textarea>

        <input
          ref="images"
          class="d-none"
          type="file"
          multiple
        >
      </div>
    </v-card>

    <Teleport v-if="teleportTarget" :to="teleportTarget">
      <div class="d-flex ga-2 pa-2 flex-wrap justify-space-between">
        <template v-for="(item, i) in actions" :key="i">
          <v-icon-btn
            v-if="!item.divider"
            v-bind="item"
            rounded="lg"
            size="32"
          ></v-icon-btn>

          <v-divider v-else-if="!display.mobile.value" class="mx-1" vertical></v-divider>
        </template>
      </div>
    </Teleport>
  </v-container>
</template>

<script setup>
  import { computed, nextTick, ref, shallowRef } from 'vue'
  import { useDisplay } from 'vuetify'

  const display = useDisplay()

  const images = ref()
  const textarea = ref()
  const mobileTarget = ref()
  const desktopTarget = ref()
  const model = shallowRef('')
  const teleportTarget = computed(() => display.mobile.value ? mobileTarget.value : desktopTarget.value)

  function onClickHeading () {
    if (!model.value) {
      model.value = '# '
    } else if (model.value === '# ') {
      model.value = ''
    } else {
      model.value += ' # '
    }

    textarea.value.focus()
  }

  async function onClickBold () {
    textarea.value.focus()

    if (!model.value) {
      model.value = '**'
      await nextTick()
      textarea.value.setSelectionRange(1, 1)
    } else if (model.value === '**') {
      model.value = ''
    } else {
      const start = model.value.length
      model.value += ' **'
      await nextTick()
      textarea.value.setSelectionRange(start + 2, start + 2)
    }
  }

  async function onClickItalic () {
    textarea.value.focus()

    if (!model.value) {
      model.value = '__'
      await nextTick()
      textarea.value.setSelectionRange(1, 1)
    } else if (model.value === '__') {
      model.value = ''
    } else {
      const start = model.value.length
      model.value += ' __'
      await nextTick()
      textarea.value.setSelectionRange(start + 2, start + 2)
    }
  }

  function onClickListNumbered () {
    if (!model.value) {
      model.value = '1. '
    } else if (model.value === '1. ') {
      model.value = ''
    } else {
      model.value += ' 1. '
    }

    textarea.value.focus()
  }

  function onClickListUnordered () {
    if (!model.value) {
      model.value = '- '
    } else if (model.value === '- ') {
      model.value = ''
    } else {
      model.value += ' - '
    }

    textarea.value.focus()
  }

  function onClickListTask () {
    if (!model.value) {
      model.value = '- [] '
    } else {
      model.value += '\n\n- [] '
    }

    textarea.value.focus()
  }

  function onClickAttachFiles () {
    images.value.click()
  }

  async function onClickDetails () {
    textarea.value.focus()

    if (!model.value.startsWith('<details>')) {
      model.value = `<details>\n<summary>Details</summary>\n\n\n\n</details>`
      await nextTick()
      textarea.value.setSelectionRange(38, 38)
    } else {
      model.value = ''
    }
  }

  const actions = [
    { icon: 'mdi-format-header-1', onClick: onClickHeading },
    { icon: 'mdi-format-bold', onClick: onClickBold },
    { icon: 'mdi-format-italic', onClick: onClickItalic },
    { divider: true },
    { icon: 'mdi-format-list-numbered', onClick: onClickListNumbered },
    { icon: 'mdi-format-list-bulleted', onClick: onClickListUnordered },
    { icon: 'mdi-format-list-checks', onClick: onClickListTask },
    { divider: true },
    { icon: 'mdi-paperclip', onClick: onClickAttachFiles },
    { divider: true },
    { icon: 'mdi-format-vertical-align-bottom', onClick: onClickDetails },
  ]
</script>
