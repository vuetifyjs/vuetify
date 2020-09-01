<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h3
          ref="radio"
          class="headline"
        >
          Target
        </h3>

        <v-radio-group
          v-model="type"
          row
        >
          <v-radio
            label="Number"
            value="number"
          ></v-radio>

          <v-radio
            label="Selector"
            value="selector"
          ></v-radio>

          <v-radio
            label="DOMElement"
            value="element"
          ></v-radio>
        </v-radio-group>

        <v-text-field
          v-if="type === 'number'"
          v-model="number"
          type="number"
          label="Number"
        ></v-text-field>

        <v-text-field
          v-if="type === 'selector'"
          v-model="selector"
          label="Selector"
        ></v-text-field>

        <v-select
          v-if="type === 'element'"
          v-model="selected"
          :items="elements"
          label="DOMElement"
        ></v-select>
      </v-col>

      <v-col cols="12">
        <h3 class="headline">
          Options
        </h3>

        <v-select
          v-model="easing"
          :items="easings"
          label="Easing"
        ></v-select>

        <v-slider
          v-model="duration"
          min="0"
          max="1000"
          label="Duration"
          thumb-label
        ></v-slider>

        <v-slider
          v-model="offset"
          min="-500"
          max="500"
          label="Offset"
          thumb-label
        ></v-slider>
      </v-col>

      <v-col>
        <v-btn
          ref="button"
          block
          color="primary"
          @click="$vuetify.goTo(target, options)"
        >
          scroll
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import * as easings from 'vuetify/es5/services/goto/easing-patterns'

  export default {
    data () {
      return {
        type: 'number',
        number: 9999,
        selector: '#scroll-with-options',
        selected: 'Button',
        elements: ['Button', 'Radio group'],
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic',
        easings: Object.keys(easings),
      }
    },
    computed: {
      target () {
        const value = this[this.type]
        if (!isNaN(value)) return Number(value)
        else return value
      },
      options () {
        return {
          duration: this.duration,
          offset: this.offset,
          easing: this.easing,
        }
      },
      element () {
        if (this.selected === 'Button') return this.$refs.button
        else if (this.selected === 'Radio group') return this.$refs.radio
        else return null
      },
    },
  }
</script>

<codepen-additional>
  const easings = {
    linear: '',
    easeInQuad: '',
    easeOutQuad: '',
    easeInOutQuad: '',
    easeInCubic: '',
    easeOutCubic: '',
    easeInOutCubic: '',
    easeInQuart: '',
    easeOutQuart: '',
    easeInOutQuart: '',
    easeInQuint: '',
    easeOutQuint: '',
    easeInOutQuint: ''
  }
</codepen-additional>
