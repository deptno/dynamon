import {EventEmitter} from 'events'

class Api extends EventEmitter {
  constructor() {
    super()
  }
}

export const api = new Api()