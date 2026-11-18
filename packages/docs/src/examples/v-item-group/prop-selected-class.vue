<template>
  <v-item-group selected-class="bg-primary">
    <v-container>
      <v-row>
        <v-col
          v-for="n in 3"
          :key="n"
          cols="12"
          md="4"
        >
          <v-item v-slot="{ isSelected, selectedClass, toggle }">
            <v-card
              :class="['d-flex align-center', selectedClass]"
              height="200"
              dark
              @click="toggle"
            >
              <div
                class="text-display-medium flex-grow-1 text-center"
              >
                {{ isSelected ? 'Selected' : 'Click Me!' }}
              </div>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script></script>

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14400-140526"
}
</example-meta>
