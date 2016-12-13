import Navbar from './Navbar.vue'
import NavbarItem from './NavbarItem.vue'
import NavbarItems from './NavbarItems.vue'
import {
  createSimpleFunctional 
} from '../../util/helpers'

const NavbarLogo = createSimpleFunctional('navbar__logo')
const NavbarSideIcon = {
  functional: true,

  render (h, { data, children }) {
    data.staticClass = data.staticClass ? `navbar__side-icon ${data.staticClass}` : 'navbar__side-icon'

    console.log(data)
    const icon = [h('v-icon', 'reorder')]
    const anchor = [h('a', { attrs: { href: '#!' } }, icon)]

    return h('div',data, [anchor])
  }
}

export default {
  Navbar,
  NavbarItem,
  NavbarItems,
  NavbarLogo,
  NavbarSideIcon
}