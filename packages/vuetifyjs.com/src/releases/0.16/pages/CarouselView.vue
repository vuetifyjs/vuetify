<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  import Vue from 'vue'

  Vue.component('fade', {
    functional: true,

    render (createElement, context) {
      let data = context.data || {}

      data.props = { name: 'fade' }

      return createElement('transition', data, context.children)
    }
  })

  export default {
    data () {
      return {
        doc: {
          title: 'Carousel',
          component: 'VCarousel',
          edit: 'CarouselView',
          desc: 'The <code>v-carousel</code> component is used to display large numbers of visual content on a rotating timer.',
          examples: [
            { header: 'Default', file: 'carousel/default', desc: 'A carousel by default has a slide transition.' },
            { header: 'Custom transition', file: 'carousel/custom-transition', desc: 'You can also apply your own custom transition.' },
            { header: 'Custom delimiter', file: 'carousel/custom-delimiter', desc: 'You can also change the icon for the carousel delimiter.' },
            { header: 'Hide controls', file: 'carousel/hide-controls', desc: 'You can hide the bottom controls with the <code>hide-controls</code> prop.' }
          ],
          props: {
            'v-carousel': {
              shared: ['theme'],
              model: {
                type: 'Number'
              },
              params: [
                [
                  'cycle',
                  'Boolean',
                  'True',
                  'Determines if carousel should cycle through images'
                ],
                [
                  'icon',
                  'String',
                  'fiber_manual_record',
                  'Sets icon for carousel delimiter'
                ],
                [
                  'hide-controls',
                  'Boolean',
                  'False',
                  'Hides the panel with carousel delimiters'
                ],
                [
                  'lazy',
                  'Boolean',
                  'False',
                  'Lazily load the carousel slides'
                ],
                [
                  'left-control-icon',
                  '[Boolean, String]',
                  'chevron_left',
                  'Sets icon for left carousel control, false removes icon'
                ],
                [
                  'right-control-icon',
                  '[Boolean, String]',
                  'chevron_right',
                  'Sets icon for right carousel control, false removes icon'
                ],
                [
                  'interval',
                  'Number',
                  '6000',
                  'The duration between image cycles'
                ]
              ]
            },
            'v-carousel-item': {
              params: [
                [
                  'src',
                  'String',
                  '-',
                  'The image src',
                ],
                [
                  'transition',
                  'String',
                  'v-tab-transition',
                  'Sets the normal transition',
                ],
                [
                  'reverse-transition',
                  'String',
                  'v-tab-reverse-transition',
                  'Sets the reverse transition',
                ]
              ]
            }
          },
          slots: {
            'v-carousel': {
              shared: ['default']
            },
            'v-carousel-item': {
              shared: ['default']
            }
          }
        }
      }
    }
  }
</script>
