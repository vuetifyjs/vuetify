import Navbar from './Navbar.vue'
import NavbarItem from './NavbarItem.vue'
import NavbarItems from './NavbarItems.vue'
import {
  createSimpleFunctional 
} from '../../util/helpers'

const NavbarLogo = createSimpleFunctional('navbar__logo')

export {
  Navbar,
  NavbarItem,
  NavbarItems,
  NavbarLogo
}