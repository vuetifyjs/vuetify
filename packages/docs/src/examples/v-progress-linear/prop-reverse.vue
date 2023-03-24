<template>
  <div>
    <v-progress-linear
      model-value="15"
      color="pink"
      reverse
    ></v-progress-linear>

    <br>

    <v-progress-linear
      color="lime"
      indeterminate
      reverse
    ></v-progress-linear>

    <br>

    <v-progress-linear
      model-value="30"
      buffer-value="55"
      color="success"
      reverse
      streams
    ></v-progress-linear>

    <br>

    <p>In specific cases you may want progress to display in left-to-right mode regardless of the application direction (LTR or RTL):</p>

    <v-progress-linear
      model-value="15"
      :reverse="$vuetify.locale.isRtl"
    ></v-progress-linear>
  </div>
</template>
