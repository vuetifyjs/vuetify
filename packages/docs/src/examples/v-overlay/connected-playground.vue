<template>
  <div>
    <v-row>
      <v-col cols="12" class="d-flex flex-column align-center">
        <code>{{ code }}</code>

        <v-tooltip
          :model-value="true"
          :location="location"
          :origin="origin"
          no-click-animation
        >
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" class="my-12"></v-btn>
          </template>

          <div>Overlay content</div>
        </v-tooltip>
      </v-col>

      <v-col>
        <v-radio-group v-model="locationSide" label="Location side">
          <v-radio value="top" label="top"></v-radio>
          <v-radio value="end" label="end"></v-radio>
          <v-radio value="bottom" label="bottom"></v-radio>
          <v-radio value="start" label="start"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col>
        <v-radio-group v-model="locationAlign" label="Location alignment">
          <v-radio value="top" label="top" :disabled="locationSide === 'top' || locationSide === 'bottom'"></v-radio>
          <v-radio value="start" label="start" :disabled="!(locationSide === 'top' || locationSide === 'bottom')"></v-radio>
          <v-radio value="center" label="center"></v-radio>
          <v-radio value="end" label="end" :disabled="!(locationSide === 'top' || locationSide === 'bottom')"></v-radio>
          <v-radio value="bottom" label="bottom" :disabled="locationSide === 'top' || locationSide === 'bottom'"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col>
        <v-radio-group v-model="originSide" label="Origin side">
          <v-radio value="auto" label="auto"></v-radio>
          <v-radio value="overlap" label="overlap"></v-radio>
          <v-radio value="top" label="top"></v-radio>
          <v-radio value="end" label="end"></v-radio>
          <v-radio value="bottom" label="bottom"></v-radio>
          <v-radio value="start" label="start"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col>
        <v-radio-group v-model="originAlign" label="Origin alignment">
          <v-radio value="top" label="top" :disabled="originDisabled || originSide === 'top' || originSide === 'bottom'"></v-radio>
          <v-radio value="start" label="start" :disabled="originDisabled || !(originSide === 'top' || originSide === 'bottom')"></v-radio>
          <v-radio value="center" label="center" :disabled="originDisabled"></v-radio>
          <v-radio value="end" label="end" :disabled="originDisabled || !(originSide === 'top' || originSide === 'bottom')"></v-radio>
          <v-radio value="bottom" label="bottom" :disabled="originDisabled || originSide === 'top' || originSide === 'bottom'"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
  import { computed, ref, watch } from 'vue'

  const locationSide = ref('top')
  const locationAlign = ref('center')
  const originSide = ref('auto')
  const originAlign = ref('')

  const location = computed(() => {
    return `${locationSide.value} ${locationAlign.value}`
  })
  const origin = computed(() => {
    return originDisabled.value ? originSide.value : `${originSide.value} ${originAlign.value}`
  })
  const code = computed(() => {
    return `<v-tooltip location="${location.value}" origin="${origin.value}" />`
  })
  const originDisabled = computed(() => {
    return ['auto', 'overlap'].includes(originSide.value)
  })

  watch(locationSide, val => {
    if (['top', 'bottom'].includes(val)) {
      locationAlign.value = {
        top: 'start',
        bottom: 'end',
      }[locationAlign.value] || locationAlign.value
    } else {
      locationAlign.value = {
        start: 'top',
        end: 'bottom',
      }[locationAlign.value] || locationAlign.value
    }
  })
  watch(originDisabled, val => {
    if (!val && !originAlign.value) {
      originAlign.value = 'center'
    }
  })
</script>
