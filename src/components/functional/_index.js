import * as Card from './Card'
import * as Layout from './Layout'
import * as List from './List'
import * as Navbar from './Navbar'

let index = {}

Object.keys(Card).forEach(i => {
  index[`VCard${i}`] = Card[i]
})

Object.keys(Layout).forEach(i => {
  index[`V${i}`] = Layout[i]
})

Object.keys(List).forEach(i => {
  index[`V${i}`] = List[i]
})

Object.keys(Navbar).forEach(i => {
  index[`VNavbar${i}`] = Navbar[i]
})

export default index