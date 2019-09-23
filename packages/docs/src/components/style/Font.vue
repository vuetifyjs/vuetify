<template>
  <div>
    <v-card
      v-for="(font, ind) in fonts"
      :key="ind"
      class="mb-12"
      outlined
    >
      <v-simple-table>
        <caption class="pa-4">{{ font.header }}</caption>

        <thead>
          <tr>
            <th>Class</th>

            <th>Information</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="([c, info], i) in font.classes"
            :key="i"
          >
            <td>
              <code>.{{ c }}</code>
            </td>

            <td
              :class="`${c} py-3`"
              v-text="info"
            />
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
  export default {
    data: () => ({
      fonts: [
        {
          header: 'Typography Display Classes',
          classes: [
            ['display-4', 'Light 96sp'],
            ['display-3', 'Light 60sp'],
            ['display-2', 'Regular 48sp'],
            ['display-1', 'Regular 34sp'],
            ['headline', 'Regular 24sp'],
            ['title', 'Medium 20sp'],
            ['subtitle-1', 'Regular 16sp'],
            ['subtitle-2', 'Medium 14sp'],
            ['body-1', 'Regular 16sp'],
            ['body-2', 'Regular 14sp'],
            ['caption', 'Regular 12sp'],
            ['overline', 'Regular 10sp'],
          ],
        },
        {
          header: 'Style and Weight Classes',
          classes: [
            ['font-regular', 'Regular 10sp'],
            ['font-weight-light', 'Condensed Light'],
            ['font-weight-thin', 'Thin'],
            ['font-weight-regular', 'Regular'],
            ['font-weight-medium', 'Medium'],
            ['font-weight-bold', 'Bold'],
            ['font-weight-black', 'Black'],
            ['font-italic', 'italic'],
            ['font-italic font-weight-light', 'Light italic'],
            ['font-italic font-weight-medium', 'Medium italic'],
            ['font-italic font-weight-bold', 'Bold italic'],
          ],
        },
      ],
    }),
  }
</script>
