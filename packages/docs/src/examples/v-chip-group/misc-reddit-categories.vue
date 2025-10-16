<template>
  <v-sheet
    class="mx-auto"
    max-width="400"
    rounded="xl"
    border
  >
    <div class="pa-4">
      <div class="text-h6">What are you into?</div>

      <div class="text-subtitle-1">Select topics to continue</div>

      <v-responsive class="overflow-y-auto" max-height="280">
        <v-chip-group class="mt-3" column>
          <v-chip
            v-for="topic in topics"
            :key="topic"
            :text="topic"
            :value="topic"
          ></v-chip>
        </v-chip-group>
      </v-responsive>
    </div>

    <v-divider></v-divider>

    <div class="pa-2">
      <v-btn
        color="orange-darken-1"
        rounded="t-0 b-xl"
        size="x-large"
        text="Continue"
        variant="flat"
        block
      ></v-btn>
    </div>
  </v-sheet>
</template>

<script setup>
  const topics = [
    '🎤 Advice',
    '🐕 Animals',
    '🤖 Anime',
    '🎨 Art & Design',
    '💄 Beauty',
    '🏢 Business',
    '📚 Books',
    '💡 Damn That\'s Interesting',
    '💃 Hobbies',
    '🎮 Gaming',
    '🎥 Movies',
    '🎵 Music',
    '📺 TV',
    '🌮 Food',
    '😂 Funny',
    '💖 Health & Lifestyle',
    '🎓 School',
    '📰 News',
    '🌲 Nature',
    '🎨 Photography',
    '🎏 Sports',
  ]
</script>

<script>
  export default {
    data: () => ({
      topics: [
        '🎤 Advice',
        '🐕 Animals',
        '🤖 Anime',
        '🎨 Art & Design',
        '💄 Beauty',
        '🏢 Business',
        '📚 Books',
        '💡 Damn That\'s Interesting',
        '💃 Hobbies',
        '🎮 Gaming',
        '🎥 Movies',
        '🎵 Music',
        '📺 TV',
        '🌮 Food',
        '😂 Funny',
        '💖 Health & Lifestyle',
        '🎓 School',
        '📰 News',
        '🌲 Nature',
        '🎨 Photography',
        '🎏 Sports',
      ],
    }),
  }
</script>
