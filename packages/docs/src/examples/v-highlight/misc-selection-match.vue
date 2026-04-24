<template>
  <div class="pa-6">
    <p class="text-caption text-medium-emphasis mb-3">
      Click a word to highlight all matches &mdash; or select a phrase.
    </p>

    <v-highlight
      :query="query"
      :text="text"
      class="selection-target text-body-2 pa-4 rounded border"
      tag="pre"
      @mouseup="onMouseUp"
    ></v-highlight>
  </div>
</template>

<script setup>
  const query = shallowRef('')

  const text = `# v-highlight

## Overview

The v-highlight component renders text with highlighted
substrings. Use the query prop to pass a search term,
or the matches prop for pre-computed match ranges.

## Props

- text: The source text string to render
- query: A string or array of strings to highlight
- matches: Pre-computed [start, end] match ranges
- markClass: Custom CSS class for each mark element
- tag: The root element tag (default: span)`

  function onMouseUp () {
    const selection = window.getSelection()
    if (!selection) return

    const selected = selection.toString().trim()

    if (selected) {
      query.value = selected
      return
    }

    selection.modify('move', 'backward', 'word')
    selection.modify('extend', 'forward', 'word')
    const word = selection.toString().replace(/\W/g, '')
    if (word) query.value = word
  }
</script>

<style scoped>
  :deep(.selection-target) {
    &::selection,
    *::selection {
      background-color: rgba(255, 190, 0, 0.3);
    }
  }
</style>
