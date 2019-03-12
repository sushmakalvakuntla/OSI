import 'raf/polyfill'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

const sessionStorage = (() => {
  let store = {}
  return {
    getItem: key => {
      return store[key] || null
    },
    setItem: (key, value) => {
      store[key] = value.toString()
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorage,
})

window.alert = msg => {}
window.matchMedia = () => ({})
window.scrollTo = () => {}
