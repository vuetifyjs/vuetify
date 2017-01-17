import Navbar from './Navbar.vue'

import {
  createSimpleFunctional 
} from '../../util/helpers'

const NavbarLogo = createSimpleFunctional('navbar__logo')
const NavbarTitle = createSimpleFunctional('navbar__title')
const NavbarSub = createSimpleFunctional('navbar__sub')
const NavbarToolbar = createSimpleFunctional('navbar__toolbar')
const NavbarSideIcon = {
  functional: true,

  render (h, { data, children }) {
    data.staticClass = data.staticClass ? `navbar__side-icon ${data.staticClass}` : 'navbar__side-icon'

    const icon = [h('v-icon', 'menu')]
    const anchor = [h('a', { attrs: { href: '#!' } }, icon)]

    return h('div',data, [anchor])
  }
}

export default {
  Navbar,
  NavbarLogo,
  NavbarTitle,
  NavbarToolbar,
  NavbarSideIcon,
  NavbarSub
}