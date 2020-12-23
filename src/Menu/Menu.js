import { Lightning } from '@lightningjs/sdk'

import Item from './Item'

export default class Menu extends Lightning.Component {
  static _template() {
    return {
      Items: {
        x: 40,
      },
      FocusIndicator: { y: 5, text: { text: '>', fontFace: 'Regular' } },
    }
  }

  _init() {
    this._blink = this.tag('FocusIndicator').animation({
      duration: 0.5,
      repeat: -1,
      actions: [{ p: 'x', v: { 0: 0, 0.5: -40, 1: 0 } }],
    })

    this._index = 0
  }

  _active() {
    this._blink.start()
  }

  _inactive() {
    this._blink.stop()
  }

  set items(v) {
    this.tag('Items').children = v.map((element, index) => {
      return { type: Item, action: element.action, label: element.label, y: index * 90 }
    })
  }

  get items() {
    return this.tag('Items').children
  }

  get activeItem() {
    return this.items[this._index]
  }

  _handleUp() {
    this._setIndex(Math.max(0, --this._index))
  }

  _handleDown() {
    this._setIndex(Math.min(++this._index, this.items.length - 1))
  }

  _setIndex(index) {
    this.tag('FocusIndicator').setSmooth('y', index * 90 + 5)
    this._index = index
  }
}
