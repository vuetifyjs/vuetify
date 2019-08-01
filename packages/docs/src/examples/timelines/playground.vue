<template>
  <div>
    <v-radio-group row wrap>
      <v-switch v-model="alignTop" label="Toggle align-top" class="mx-4"></v-switch>
      <v-switch v-model="dense" label="Toggle dense" class="mx-4"></v-switch>
      <v-switch v-model="fillDot" label="Toggle fill-dot" class="mx-4"></v-switch>
      <v-switch v-model="hideDot" label="Toggle hide-dot" class="mx-4"></v-switch>
      <v-switch v-model="icon" label="Toggle icon" class="mx-4"></v-switch>
      <v-switch v-model="avatar" label="Toggle avatar" class="mx-4"></v-switch>
      <v-switch v-model="iconColor" label="Toggle icon color" class="mx-4"></v-switch>
      <v-switch v-model="reverse" label="Toggle reverse" class="mx-4"></v-switch>
      <v-switch v-model="left" label="Toggle left" class="mx-4"></v-switch>
      <v-switch v-model="right" label="Toggle right" class="mx-4"></v-switch>
      <v-switch v-model="small" label="Toggle small" class="mx-4"></v-switch>
    </v-radio-group>

    <v-timeline
      :align-top="alignTop"
      :dense="dense"
      :reverse="reverse"
    >
      <v-timeline-item
        v-for="n in 3"
        :key="n"
        :fill-dot="fillDot"
        :hide-dot="hideDot"
        :icon="icon ? 'mdi-star' : ''"
        :icon-color=" iconColor ? 'deep-orange' : ''"
        :left="left"
        :right="right"
        :small="small"
      >
        <template v-slot:icon>
          <v-avatar v-if="avatar">
            <img src="http://i.pravatar.cc/64">
          </v-avatar>
        </template>
        <span slot="opposite">Tus eu perfecto</span>
        <v-card class="elevation-2">
          <v-card-title class="headline">Lorem ipsum</v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
  export default {
    data: () => ({
      alignTop: false,
      avatar: false,
      dense: false,
      fillDot: false,
      hideDot: false,
      icon: false,
      iconColor: false,
      left: false,
      reverse: false,
      right: false,
      small: false,
    }),
  }
</script>
