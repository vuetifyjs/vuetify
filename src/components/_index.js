import Breadcrumbs from './breadcrumbs/index'
import * as Buttons from './buttons/index'
import * as Cards from './cards/index'
import * as Chips from './chips/index'
import * as Collapsible from './collapsible/index'
import * as Dropdowns from './dropdowns/index'
import * as Footer from './footer/index'
import * as Forms from './forms/index'
import * as Grid from './grid/index'
import * as Icons from './icons/index'
import * as Lists from './lists/index'
import * as Modal from './modal/index'
import * as Navbar from './navbar/index'
import * as Parallax from './parallax/index'
import * as Sidebar from './sidebar/index'
import * as Slider from './slider/index'
import * as Tabs from './tabs/index'
import * as Toasts from './toasts/index'

function bootstrap (...components) {
  let entries = {}

  components.forEach(component => {
    Object.keys(component).forEach(key => {
      entries[`V${key}`] = component[key]
    })
  })

  return entries
}

export default bootstrap(
  Breadcrumbs,
  Buttons,
  Cards,
  Chips,
  Collapsible,
  Dropdowns,
  Footer,
  Forms,
  Grid,
  Icons,
  Lists,
  Modal,
  Navbar,
  Parallax,
  Sidebar,
  Slider,
  Tabs,
  Toasts
)