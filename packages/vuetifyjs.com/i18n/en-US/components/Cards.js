export default {
  header: 'Card',
  headerText: `The <code>v-card</code> component is a versatile component that can be used for anything from a panel to a static image. The <strong>card</strong> component has numerous helper components to make markup as easy as possible. Components that have no listed options use <strong class="green--text">Vue's</strong> functional component option for faster rendering and serve as markup sugar to make building easier.`,
  props: {
    flat: 'Removes card box shadow',
    height: 'Manually define the height of the card',
    hover: 'Apply a higher elevation on hover',
    img: 'Specifies an image background',
    raised: 'Specifies a higher default elevation',
    tile: 'Turn the card into a tile by removing the border radius'
  }
}
