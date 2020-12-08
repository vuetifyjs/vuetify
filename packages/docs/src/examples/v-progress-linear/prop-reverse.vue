<template>
  <div>
    <v-progress-linear
      color="pink"
      value="15"
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
      buffer-value="55"
      color="success"
      reverse
      stream
      value="30"
    ></v-progress-linear>

    <br>

    <v-subheader>In specific cases you may want progress to display in left-to-right mode regardless of the application direction (LTR or RTL):</v-subheader>

    <v-progress-linear
      :reverse="$vuetify.rtl"
      value="15"
    ></v-progress-linear>
  </div>
</template>
