import { genericComponent, MakeSlots } from "@/util";



export const VCalendarMonthly = genericComponent<new <T>() => {
  $props: {}
  $slots: MakeSlots<{}>
}>()({
  name: 'VCalendarMonthly',

  setup(props, { slots }) {
    // Computeds
    
  }

})

export type VCalendarMonthly = InstanceType<typeof VCalendarMonthly>
