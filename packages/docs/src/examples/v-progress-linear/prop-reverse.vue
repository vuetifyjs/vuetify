<template>
  <div>
    <v-progress-linear
      color="pink"
      model-value="15"
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
      model-value="30"
      reverse
      streams
    ></v-progress-linear>

    <br>

    <p>In specific cases you may want progress to display in left-to-right mode regardless of the application direction (LTR or RTL):</p>

    <v-progress-linear
      :reverse="$vuetify.locale.isRtl"
      model-value="15"
    ></v-progress-linear>
  </div>
</template>

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14461-95543"
}
</example-meta>
