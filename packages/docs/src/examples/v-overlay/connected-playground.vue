<template>
  <div>
    <v-row>
      <v-col cols="12" class="d-flex flex-column align-center">
        <code>{{ code }}</code>

        <v-tooltip
          :model-value="true"
          :anchor="anchor"
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
        <v-radio-group v-model="anchorSide" label="Anchor side">
          <v-radio value="top" label="top"></v-radio>
          <v-radio value="end" label="end"></v-radio>
          <v-radio value="bottom" label="bottom"></v-radio>
          <v-radio value="start" label="start"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col>
        <v-radio-group v-model="anchorAlign" label="Anchor alignment">
          <v-radio value="top" label="top" :disabled="anchorSide === 'top' || anchorSide === 'bottom'"></v-radio>
          <v-radio value="start" label="start" :disabled="!(anchorSide === 'top' || anchorSide === 'bottom')"></v-radio>
          <v-radio value="center" label="center"></v-radio>
          <v-radio value="end" label="end" :disabled="!(anchorSide === 'top' || anchorSide === 'bottom')"></v-radio>
          <v-radio value="bottom" label="bottom" :disabled="anchorSide === 'top' || anchorSide === 'bottom'"></v-radio>
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
      anchorSide: 'top',
      anchorAlign: 'center',
      originSide: 'auto',
      originAlign: '',
    }),
    computed: {
      anchor () {
        return `${this.anchorSide} ${this.anchorAlign}`
      },
      origin () {
        return this.originDisabled ? this.originSide : `${this.originSide} ${this.originAlign}`
      },
      code () {
        return `<v-tooltip anchor="${this.anchor}" origin="${this.origin}" />`
      },
      originDisabled () {
        return ['auto', 'overlap'].includes(this.originSide)
      },
    },
    watch: {
      anchorSide (val) {
        if (['top', 'bottom'].includes(val)) {
          this.anchorAlign = {
            top: 'start',
            bottom: 'end',
          }[this.anchorAlign] || this.anchorAlign
        } else {
          this.anchorAlign = {
            start: 'top',
            end: 'bottom',
          }[this.anchorAlign] || this.anchorAlign
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
