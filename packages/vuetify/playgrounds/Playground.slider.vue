<template>
  <v-app :theme="theme">
    <div>
      <v-btn @click="rtl = !rtl">rtl</v-btn>
      <v-btn @click="theme = theme === 'light' ? 'dark' : 'light'">theme</v-btn>
      <v-btn @click="disabled = !disabled">disabled</v-btn>
    </div>
    <v-locale-provider :rtl="rtl">
      <div class="ma-10 d-flex flex-column">
        Regular
        <v-slider
          v-model="model"
          direction="vertical"
        />
        <v-slider
          v-model="model"
          direction="horizontal"
        />

        min/max
        <v-slider
          v-model="model7"
          direction="vertical"
          min="10"
          max="25"
          thumb-label="always"
        />
        <v-slider
          v-model="model7"
          direction="horizontal"
          min="10"
          max="25"
          thumb-label="always"
        />

        Step size
        <v-slider
          v-model="model2"
          direction="vertical"
          step-size="5"
        />
        <v-slider
          v-model="model2"
          direction="horizontal"
          step-size="5"
        />

        show-ticks
        <v-slider
          v-model="model3"
          direction="vertical"
          step-size="5"
          show-ticks="always"
        />
        <v-slider
          v-model="model3"
          direction="horizontal"
          step-size="5"
          show-ticks="always"
        />

        custom-ticks
        <v-slider
          v-model="model3"
          direction="vertical"
          step-size="2"
          show-ticks="always"
          :ticks="[0, 10, 90]"
        />
        <v-slider
          v-model="model3"
          direction="horizontal"
          step-size="2"
          show-ticks="always"
          :ticks="[0, 10, 90]"
        />

        thumb-label
        <select v-model="thumbLabel">
          <option :value="true">true</option>
          <option value="always">always</option>
        </select>
        <v-slider
          v-model="model4"
          direction="vertical"
          :thumb-label="thumbLabel"
        />
        <v-slider
          v-model="model4"
          direction="horizontal"
          :thumb-label="thumbLabel"
        />

        sizes
        <v-slider
          v-model="model5"
          direction="vertical"
          track-size="20"
          thumb-size="40"
          tick-size="8"
          step-size="10"
          show-ticks="always"
        />
        <v-slider
          v-model="model5"
          direction="horizontal"
          track-size="20"
          thumb-size="40"
          tick-size="8"
          step-size="10"
          show-ticks="always"
        />

        disabled
        <v-slider
          v-model="model6"
          direction="vertical"
          disabled
        />
        <v-slider
          v-model="model6"
          direction="horizontal"
          disabled
        />

        crane
        <v-slider
          direction="horizontal"
          step-size="10"
          show-ticks="always"
          rounded="0"
          color="#E30425"
        />

        tick-label slot
        <v-slider
          direction="horizontal"
          show-ticks="always"
          step-size="1"
          min="0"
          max="3"
        >
          <template #tick-label="props">
            {{ seasons[props.index] }}
          </template>
        </v-slider>

        thumb-label slot
        <v-slider
          direction="horizontal"
          thumb-label="always"
          step-size="1"
          min="0"
          max="3"
        >
          <template #thumb-label="props">
            {{ emojis[props.modelValue] }}
          </template>
        </v-slider>

      </div>

      <div class="ma-10 d-flex flex-column">
        Regular
        <v-range-slider
          v-model="model1"
          direction="vertical"
        />
        <v-range-slider
          v-model="model1"
          direction="horizontal"
        />

        min/max
        <v-range-slider
          v-model="model17"
          direction="vertical"
          min="10"
          max="25"
          thumb-label="always"
        />
        <v-range-slider
          v-model="model17"
          direction="horizontal"
          min="10"
          max="25"
          thumb-label="always"
        />

        Step size
        <v-range-slider
          v-model="model12"
          direction="vertical"
          step-size="5"
        />
        <v-range-slider
          v-model="model12"
          direction="horizontal"
          step-size="5"
        />

        Ticks
        <v-range-slider
          v-model="model13"
          direction="vertical"
          step-size="5"
          show-ticks="always"
        />
        <v-range-slider
          v-model="model13"
          direction="horizontal"
          step-size="5"
          show-ticks="always"
        />

        thumb-label
        <v-range-slider
          v-model="model14"
          direction="vertical"
          thumb-label="always"
        />
        <v-range-slider
          v-model="model14"
          direction="horizontal"
          thumb-label="always"
        />

        sizes
        <v-range-slider
          v-model="model15"
          direction="vertical"
          track-size="20"
          thumb-size="40"
          tick-size="8"
          step-size="10"
          show-ticks="always"
        />
        <v-range-slider
          v-model="model15"
          direction="horizontal"
          track-size="20"
          thumb-size="40"
          tick-size="8"
          step-size="10"
          show-ticks="always"
        />

        disabled
        <v-range-slider
          v-model="model16"
          direction="vertical"
          disabled
        />
        <v-range-slider
          v-model="model16"
          direction="horizontal"
          disabled
        />

        crane
        <v-range-slider
          direction="horizontal"
          step-size="10"
          show-ticks="always"
          rounded="0"
          color="#E30425"
        />
      </div>
    </v-locale-provider>
  </v-app>
</template>

<script>
  export default {
    name: 'Playground',
    data: () => ({
      thumbLabel: true,
      arr: [10, 30],
      foo: null,
      test: 3,
      model: 1,
      model2: 0,
      model3: 60,
      model4: 0,
      model5: 0,
      model6: 25,
      model7: 15,
      model1: [10, 30],
      model12: [10, 30],
      model13: [10, 30],
      model14: [10, 30],
      model15: [10, 30],
      model16: [10, 30],
      model17: [15, 20],
      seasons: ['spring', 'summer', 'fall', 'winter'],
      emojis: ['😭', '🙁', '😊', '😍'],
      theme: 'light',
      rtl: false,
    }),
  }
</script>
