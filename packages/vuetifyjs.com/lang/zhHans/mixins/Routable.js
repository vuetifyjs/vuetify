export default {
  props: {
    activeClass: `当组件处于激活状态时被绑定的类，**警告（warning）**取决于组件，这可能会导致副作用。如果您需要在默认情况下添加自定义类，只需设置<code>active-class="default-class your-class"</code>`,
    append: `Vue Router的router-link属性`,
    disabled: 'Route列表项是被禁用的',
    exact: '完全匹配链接，没有这个的话，“/”将匹配每一个路由',
    exactActiveClass: 'Vue Router的 router-link属性',
    href: '将组件标签指定为`<a>`',
    nuxt: '指定一个链接是nuxt链接（nuxt-link）',
    replace: 'Vue Router router-link 属性',
    to: '将组件标签指定为`<router-link>`',
    tag: '指定要在组件上使用的自定义标签',
    target: '指定目标属性，仅适用于猫标签。'
  }
}
