<template>
  <div>
    <v-row>
      <v-col class="d-flex flex-column align-center" cols="12">
        <code>{{ code }}</code>

        <v-tooltip
          :location="location"
          :origin="origin"
          no-click-animation
        >
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" class="my-12" text="Hover Me"></v-btn>
          </template>

          <div>Overlay content</div>
        </v-tooltip>
      </v-col>

      <v-col>
        <v-radio-group v-model="locationSide" label="Location side">
          <v-radio label="top" value="top"></v-radio>
          <v-radio label="end" value="end"></v-radio>
          <v-radio label="bottom" value="bottom"></v-radio>
          <v-radio label="start" value="start"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col>
        <v-radio-group v-model="locationAlign" label="Location alignment">
          <v-radio :disabled="locationSide === 'top' || locationSide === 'bottom'" label="top" value="top"></v-radio>
          <v-radio :disabled="!(locationSide === 'top' || locationSide === 'bottom')" label="start" value="start"></v-radio>
          <v-radio label="center" value="center"></v-radio>
          <v-radio :disabled="!(locationSide === 'top' || locationSide === 'bottom')" label="end" value="end"></v-radio>
          <v-radio :disabled="locationSide === 'top' || locationSide === 'bottom'" label="bottom" value="bottom"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col>
        <v-radio-group v-model="originSide" label="Origin side">
          <v-radio label="auto" value="auto"></v-radio>
          <v-radio label="overlap" value="overlap"></v-radio>
          <v-radio label="top" value="top"></v-radio>
          <v-radio label="end" value="end"></v-radio>
          <v-radio label="bottom" value="bottom"></v-radio>
          <v-radio label="start" value="start"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col>
        <v-radio-group v-model="originAlign" label="Origin alignment">
          <v-radio :disabled="originDisabled || originSide === 'top' || originSide === 'bottom'" label="top" value="top"></v-radio>
          <v-radio :disabled="originDisabled || !(originSide === 'top' || originSide === 'bottom')" label="start" value="start"></v-radio>
          <v-radio :disabled="originDisabled" label="center" value="center"></v-radio>
          <v-radio :disabled="originDisabled || !(originSide === 'top' || originSide === 'bottom')" label="end" value="end"></v-radio>
          <v-radio :disabled="originDisabled || originSide === 'top' || originSide === 'bottom'" label="bottom" value="bottom"></v-radio>
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
