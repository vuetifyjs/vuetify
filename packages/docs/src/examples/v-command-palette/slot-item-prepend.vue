<template>
  <v-btn text="Open" @click="model = !model"></v-btn>
  <v-command-palette
    v-model="model"
    :filter-keys="['raw.name', 'raw.username']"
    :items="items"
    hotkey="alt+g"
    item-title="name"
    item-value="name"
    max-height="800"
    placeholder="Search by name"
  >
    <template v-slot:prepend>
      <div class="ma-2 text-subtitle-2">
        What are you looking for?
      </div>
      <v-chip-group class="pl-2 mt-n1 mb-1">
        <v-chip
          v-for="c in ['People', 'Files', 'Actions']"
          :key="c"
          :text="c"
          size="small"
          closable
          label
        >
          <template v-slot:close>
            <v-icon icon="$close" size="14"></v-icon>
          </template>
        </v-chip>
      </v-chip-group>
    </template>
    <template v-slot:item.prepend="{ item }">
      <v-avatar :image="`https://avataaars.io/${item.avatar}`" size="small"></v-avatar>
    </template>
    <template v-slot:list.subheader="{ props: { title } }">
      <div class="d-flex align-center">
        <v-list-subheader>{{ title }}</v-list-subheader>
        <v-btn
          class="ml-auto my-n1 text-none"
          size="small"
          tabindex="-1"
          text="See all"
          variant="text"
        ></v-btn>
      </div>
    </template>
    <template v-slot:item.title="{ item }">
      {{ item.name }}
      <v-chip :text="item.username" class="opacity-70 ml-1" size="small"></v-chip>
    </template>
  </v-command-palette>
</template>

<script setup>
  import { ref } from 'vue'

  const avatars = [
    '?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban',
    '?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong',
    '?accessoriesType=Blank&avatarStyle=Circle&clotheColor=White&clotheType=GraphicShirt&eyeType=Dizzy&eyebrowType=RaisedExcitedNatural&facialHairColor=Brown&facialHairType=BeardLight&hairColor=Platinum&mouthType=Serious&skinColor=Tanned&topType=ShortHairShortCurly',
    '?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair',
    '?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun',
    '?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly',
  ]

  const people = [
    { value: 1, username: '@james', name: 'James Brown', avatar: avatars[0] },
    { value: 2, username: '@sophia', name: 'Sophia Williams', avatar: avatars[1] },
    { value: 3, username: '@taylor', name: 'Arthur Taylor', avatar: avatars[2] },
    { value: 4, username: '@emma', name: 'Emma Wright', avatar: avatars[3] },
    { value: 5, username: '@matt', name: 'Matthew Johnson', avatar: avatars[4] },
    { value: 6, username: '@laura', name: 'Laura Perez', avatar: avatars[5] },
  ]

  const model = ref(false)

  const items = [
    { type: 'divider' },
    { type: 'subheader', title: 'Recently open', childrenCount: 2 },
    ...people.slice(0, 2).map(x => ({ ...x, type: 'item' })),
    { type: 'divider' },
    { type: 'subheader', title: 'Other results', childrenCount: 4 },
    ...people.slice(2).map(x => ({ ...x, type: 'item' })),
  ]
</script>

<script>
  const avatars = [
    '?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban',
    '?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong',
    '?accessoriesType=Blank&avatarStyle=Circle&clotheColor=White&clotheType=GraphicShirt&eyeType=Dizzy&eyebrowType=RaisedExcitedNatural&facialHairColor=Brown&facialHairType=BeardLight&hairColor=Platinum&mouthType=Serious&skinColor=Tanned&topType=ShortHairShortCurly',
    '?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair',
    '?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun',
    '?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly',
  ]

  const people = [
    { value: 1, username: '@james', name: 'James Brown', avatar: avatars[0] },
    { value: 2, username: '@sophia', name: 'Sophia Williams', avatar: avatars[1] },
    { value: 3, username: '@taylor', name: 'Arthur Taylor', avatar: avatars[2] },
    { value: 4, username: '@emma', name: 'Emma Wright', avatar: avatars[3] },
    { value: 5, username: '@matt', name: 'Matthew Johnson', avatar: avatars[4] },
    { value: 6, username: '@laura', name: 'Laura Perez', avatar: avatars[5] },
  ]

  export default {
    data: () => ({
      model: false,
      items: [
        { type: 'divider' },
        { type: 'subheader', title: 'Recently open', childrenCount: 2 },
        ...people.slice(0, 2).map(x => ({ ...x, type: 'item' })),
        { type: 'divider' },
        { type: 'subheader', title: 'Other results', childrenCount: 4 },
        ...people.slice(2).map(x => ({ ...x, type: 'item' })),
      ],
    }),
  }
</script>
