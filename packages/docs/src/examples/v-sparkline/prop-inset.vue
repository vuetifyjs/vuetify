<template>
  <v-container>
    <v-card
      class="pa-5 mx-auto"
      color="#0a0a1a"
      height="190"
      rounded="lg"
      width="388"
    >
      <div class="d-flex align-start mb-2">
        <div>
          <div class="text-body-medium font-weight-bold text-cyan">Expenses YTD</div>
        </div>
        <div class="font-weight-bold ml-auto">${{ sum }}</div>
      </div>

      <v-sparkline
        :gradient="['#00e5ff99', '#00e5ff11']"
        :model-value="values"
        :tooltip="{ class: 'pl-0 bg-grey-darken-4' }"
        class="mb-n1"
        color="cyan"
        height="125"
        line-width="1"
        marker-size="10"
        marker-stroke="#0a0a1a"
        min="0"
        style="position: absolute; left: 0px; bottom: 0px; height: 125px;"
        width="388"
        auto-draw
        fill
        inset
        interactive
        show-markers
        smooth
      >
        <template v-slot:tooltip="{ index, value }">
          <v-list-item density="compact" lines="two">
            <template v-slot:prepend>
              <v-avatar :color="trend[index] === 'up' ? 'success' : 'warning'" variant="tonal">
                <v-icon :icon="trend[index] === 'up' ? 'mdi-arrow-up' : 'mdi-arrow-down'"></v-icon>
              </v-avatar>
            </template>
            <div class="text-body-small">{{ months[index] }}</div>
            <div class="text-body-large">${{ value.toLocaleString() }}</div>
          </v-list-item>
        </template>
      </v-sparkline>
    </v-card>
  </v-container>
</template>

<script setup>
  const values = [7600, 5000, 5600, 9800, 2200, 7400, 6640]
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  const trend = ['down', 'down', 'up', 'up', 'down', 'up', 'down']
  const sum = values.reduce((sum, n) => sum + n, 0).toLocaleString()
</script>
