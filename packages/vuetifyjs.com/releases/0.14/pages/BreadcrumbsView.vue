<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          title: 'Breadcrumbs',
          edit: 'BreadcrumbsView',
          component: 'breadcrumbs',
          desc: `
            <p>
              The <code>v-breadcrumbs</code> component is a navigational helper for pages. It can accept a <strong>Material Icons</strong> icon or characters as a divider. An array of objects containing the fields <em>href</em>, <em>text</em> and optional <em>disabled</em> can be passed to the <strong>items</strong> property of the component.  Additionally, a regular slot exists for more control of the breadcrumbs, either utilizing <code>v-breadcrumbs-item</code> or other custom markup.
            </p>
          `,
          examples: [
            { header: 'Text dividers', file: 'breadcrumbs/1', desc: `By default, breadcrumbs use a text divider. This can be any string.` },
            { header: 'Icon dividers', file: 'breadcrumbs/2', desc: `For the icon variant, breadcrumbs can use any icon in Material Design Icons.` }
          ],
          props: {
            'v-breadcrumbs': {
              params: [
                [
                  'divider',
                  'String',
                  '/',
                  'Specifies the dividing character'
                ],
                [
                  'icons',
                  'Boolean',
                  'False',
                  'Specifies that the dividers are icons'
                ]
              ]
            },
            'v-breadcrumbs-item': {
              shared: ['router'],
              params: [
                [
                  'active-class',
                  'String',
                  'breadcrumbs__item--active',
                  'Specifies the class to apply to the active breadcrumb'
                ]
              ]
            }
          },
          slots: {
            'v-breadcrumbs': {
              shared: ['default']
            },
            'v-breadcrumbs-item': {
              shared: ['default']
            }
          }
        }
      }
    }
  }
</script>
