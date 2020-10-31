export type EventEmitterCallback = (...args: any[]) => any

export class EventEmitter {
  events: Record<string, EventEmitterCallback[]>

  constructor() {
    this.events = {}
  }

  dispatch(event: string, data: any) {
    if (!this.events[event]) {
      return
    }
    for (const callback of this.events[event]) {
      callback(data)
    }
  }

  subscribe(event: string, callback: EventEmitterCallback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  }

  unsubscribe(event: string, callback: EventEmitterCallback) {
    for (let i = 0; i < this.events[event].length; i++) {
      if (this.events[event][i] === callback) {
        this.events[event].splice(i, 1)
      }
    }
  }
}
