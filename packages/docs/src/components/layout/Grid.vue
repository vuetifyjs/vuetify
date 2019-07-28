<template>
  <v-card class="mb-12" outlined>
    <v-simple-table>
      <caption class="pa-4">Material Design Viewport Breakpoints</caption>

      <thead>
        <tr class="text-left">
          <th>Device</th>
          <th>Code</th>
          <th>Types</th>
          <th>Range</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            <v-icon left>phone_iphone</v-icon>
            <span>Extra small</span>
          </td>
          <td>
            <strong>xs</strong>
          </td>
          <td>small to large handset</td>
          <td>&lt; 600px</td>
        </tr>

        <tr>
          <td>
            <v-icon left>tablet</v-icon>
            <span>Small</span>
          </td>
          <td>
            <strong>sm</strong>
          </td>
          <td>small to medium tablet</td>
          <td>600px &gt; &lt; 960px</td>
        </tr>

        <tr>
          <td>
            <v-icon left>laptop</v-icon>
            <span>Medium</span>
          </td>
          <td>
            <strong>md</strong>
          </td>
          <td>large tablet to laptop</td>
          <td>960px &gt; &lt; 1264*</td>
        </tr>

        <tr>
          <td>
            <v-icon left>desktop_windows</v-icon>
            <span>Large</span>
          </td>
          <td>
            <strong>lg</strong>
          </td>
          <td>desktop</td>
          <td>1264 &gt; &lt; 1904px*</td>
        </tr>

        <tr>
          <td>
            <v-icon left>tv</v-icon>
            <span>Extra large</span>
          </td>
          <td>
            <strong>xl</strong>
          </td>
          <td>4k and ultra-wides</td>
          <td>&gt; 1904px*</td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td colspan="4" class="text-center">
            <small><em class="grey--text">* -16px on Desktop</em></small>
          </td>
        </tr>
      </tfoot>
    </v-simple-table>
  </v-card>
</template>
