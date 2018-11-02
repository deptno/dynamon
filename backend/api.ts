import {EventEmitter} from 'events'

class Api extends EventEmitter {
  constructor() {
    super()
  }

  async endpoints() {
    return ['result test']
  }
}

export const api = new Api()