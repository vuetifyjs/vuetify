<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'lists-page',

    data: () => ({
      namespace: 'Lists',
      folder: 'lists',
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
