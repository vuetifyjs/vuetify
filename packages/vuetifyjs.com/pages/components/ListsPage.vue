<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'lists-page',

    data: () => ({
      component: 'v-list',
      components: [
        'v-list-tile',
        'v-list-tile-title',
        'v-list-tile-sub-title',
        'v-list-tile-content',
        'v-list-tile-action',
        'v-list-tile-avatar',
        'v-list-tile-group',
        'v-list-tile-action-text',
      ],
      usage: { file: 'avatarTwoLines' },
      examples: [
        { file: 'avatarTitleAndAction' },
        { file: 'iconTwoLinesAndAction' },
        { file: 'avatarThreeLines' },
        { file: 'avatarSubheaderTitleAndAction' },
        { file: 'subheadingsAndDividers' },
        { file: 'cardList' },
        { file: 'titleSubtitleActionsAndActionText' },
        { file: 'actionTitleAndSubtitle' },
        { file: 'expansionLists' },
        { file: 'dark' }
      ]
    })
  }
</script>
