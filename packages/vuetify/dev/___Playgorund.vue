<template>
  <v-container>
    <v-main>
      <v-container
        :style="`max-width: ${maxWidth}px`"
      >
        <v-otp-input
          v-model="testerModel"
          outlined
          :length="6"
          hide-details
        />
        <v-otp-input
          v-model="testerModel"
          outlined
          :length="6"
          hide-details
        />

        <v-row
          dense
          class="position-relative"
        >
          <v-col
            v-for="i in otpFields"
            :key="i"
          >
            <v-text-field
              ref="otp"
              v-model="otp[i]"
              class="centered-input"
              hide-details
              outlined
              maxlength="1"
              :error="error"
              :disabled="loading || disabled"
              @focus="onFocus($event, i)"
              @keyup="onKeyUp($event, i)"
              @input="onInput($event, i)"
              @paste="onPaste($event, i)"
            />
          </v-col>
          <div
            v-if="loading"
            class="fill-width position-absolute fill-height bg-block text-center pt-4"
          >
            <v-progress-circular
              indeterminate
              color="primary"
            />
          </div>
        </v-row>
        <v-row
          dense
          class="position-relative"
        >
          <v-col
            v-for="i in otpFields"
            :key="i"
          >
            <v-text-field
              ref="otp"
              v-model="otp[i]"
              class="centered-input"
              hide-details
              outlined
              maxlength="1"
              :error="error"
              :disabled="loading || disabled"
              @focus="onFocus($event, i)"
              @keyup="onKeyUp($event, i)"
              @input="onInput($event, i)"
              @paste="onPaste($event, i)"
            />
          </v-col>
          <div
            v-if="loading"
            class="fill-width position-absolute fill-height bg-block text-center pt-4"
          >
            <v-progress-circular
              indeterminate
              color="primary"
            />
          </div>
        </v-row>

        <v-row><v-col/></v-row>

      </v-container>

      {{ testerModel }}
      {{ Object.values(otp).join('') }}
      <v-input
        v-model="otp[1]"
        label="123"
        outlined
      />
      <router-view>
      </router-view>
    </v-main>
  </v-container>
</template>

<script>
export default {
  props: {
    otpLength: {
      type: Number,
      default: 6,
    },
    onFinish: {
      type: Function,
      default: data => { console.log(data) },
    },
    maxWidth: {
      type: Number,
      default: 300,
    },
    pattern: {
      type: String,
      default: '[^0-9]+',
    },
    error: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    otp: {},
    activeIndex: null,
    testerModel: 'ran',
  }),
  computed: {
    otpFields () {
      return [...Array(this.otpLength).keys()]
    },
  },
  watch: {
    otp: {
      handler (val, oldVal) { console.log(val) },
      deep: true,
    },
  },
  methods: {
    onFocus (e) {
      e.target.select()
    },
    onKeyUp (event, index) {
      if (event) {
        event.preventDefault()
        const eventKey = event.key
        if (['Tab', 'Shift', 'Meta', 'Control', 'Alt'].includes(eventKey)) {
          return
        }
        if (['Delete'].includes(eventKey)) {
          return
        }
        if (eventKey === 'ArrowLeft' || (eventKey === 'Backspace' && !this.otp[index])) {
          return index > 0 && this.changeFocus(index - 1)
        }
        if (eventKey === 'ArrowRight') {
          return index + 1 < this.otpLength && this.changeFocus(index + 1)
        }
      }
    },
    onPaste (event, index) {
      const maxCursor = this.otpLength - 1
      const clipboardData =
        event.clipboardData ||
        window.clipboardData ||
        event.originalEvent.clipboardData
      const inputVal = clipboardData.getData('Text')
      const inputDataArray = inputVal.split('')
      event.preventDefault()
      const newOtp = { ...this.otp }
      for (let i = 0; i < inputDataArray.length; i++) {
        const appIdx = index + i
        if (appIdx > maxCursor) break
        newOtp[index + i] = inputDataArray[i]
      }
      this.otp = newOtp
      this.changeFocus(Math.min(index + inputDataArray.length, maxCursor))
    },
    onCompleted () {
      const rsp = Object.values(this.otp).join('')
      if (rsp.length === this.otpLength) { this.onFinish(rsp) } else {
        this.changeFocus(0)
      }
    },
    changeFocus (index) {
      this.$refs.otp[index].focus()
    },
    clearFocus (index) {
      this.$refs.otp[index].blur()
    },
    applyValue (index, inputVal, next) {
      this.otp = { ...this.otp, ...{ [index]: inputVal } }
      if (next) { next() }
    },
    onInput (value, index) {
      this.applyValue(index, value)
      const nextIndex = index + 1
      if (value) {
        if (nextIndex < this.otpLength) {
          this.changeFocus(nextIndex)
        } else {
          this.clearFocus(index)
        }
      }
    },
  },
}
</script>

<style scoped>
.centered-input >>> input {
  text-align: center
}
.position-relative {
  position: relative;
}
.position-absolute {
  position: absolute;
}
.fill-width {
  width: 100%;
}
.bg-block {
  background: #eeeeeec2;
}
</style>
