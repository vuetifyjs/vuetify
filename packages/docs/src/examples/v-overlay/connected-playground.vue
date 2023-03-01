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

<script>
  export default {
    data: () => ({
      locationSide: 'top',
      locationAlign: 'center',
      originSide: 'auto',
      originAlign: '',
    }),

    computed: {
      location () {
        return `${this.locationSide} ${this.locationAlign}`
      },
      origin () {
        return this.originDisabled ? this.originSide : `${this.originSide} ${this.originAlign}`
      },
      code () {
        return `<v-tooltip location="${this.location}" origin="${this.origin}" />`
      },
      originDisabled () {
        return ['auto', 'overlap'].includes(this.originSide)
      },
    },

    watch: {
      locationSide (val) {
        if (['top', 'bottom'].includes(val)) {
          this.locationAlign = {
            top: 'start',
            bottom: 'end',
          }[this.locationAlign] || this.locationAlign
        } else {
          this.locationAlign = {
            start: 'top',
            end: 'bottom',
          }[this.locationAlign] || this.locationAlign
        }
      },
      originDisabled (val) {
        if (!val && !this.originAlign) {
          this.originAlign = 'center'
        }
      },
    },
  }
</script>
