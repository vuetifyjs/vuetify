import { VNodeDirective } from 'vue/types/vnode'

interface ColorStop {
  color: string
  percent?: number
}

interface LinearGradientDirective extends VNodeDirective {
  value: {
    angle: 0
    stops?: ColorStop[]
  }
}

function inserted (el: HTMLElement, binding: LinearGradientDirective) {
  if (!binding.value) return

  const stops = binding.value.stops ? binding.value.stops.map(stop => stop.percent ? `${stop.color} ${stop.percent}%` : `${stop.color}`) : []

  if (stops.length > 1) {
    el.style.backgroundImage = `linear-gradient(${binding.value.angle || 0}deg${stops.length > 0 ? ', ' + stops.join(', ') : ''})`
  } else if (stops.length === 1) {
    el.style.backgroundColor = binding.value.stops ? binding.value.stops[0].color : null
  } else {
    console.error('Cannot create a gradient with 0 color stops!')
  }
}

export default {
  inserted
}
