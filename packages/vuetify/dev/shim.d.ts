import { VCol } from 'vuetify/src/components/VGrid/VCol'
import { VRow } from 'vuetify/src/components/VGrid/VRow'
import { VBtn } from 'vuetify/src/components/VBtn/VBtn'

declare module 'vue' {
  export interface GlobalComponents {
    VCol: typeof VCol;
    VRow: typeof VRow;
    VBtn: typeof VBtn;
  }
}