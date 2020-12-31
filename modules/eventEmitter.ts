export type EventEmitterCallback = (...args: unknown[]) => unknown

export class EventEmitter {
  events: Record<string, EventEmitterCallback[]>

  constructor() {
    this.events = {}
  }

  dispatch(event: string, data: unknown): void {
    if (!this.events[event]) {
      return
    }
    for (const callback of this.events[event]) {
      callback(data)
    }
  }

  subscribe(event: string, callback: EventEmitterCallback): void {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  }

  unsubscribe(event: string, callback: EventEmitterCallback): void {
    for (let i = 0; i < this.events[event].length; i++) {
      if (this.events[event][i] === callback) {
        this.events[event].splice(i, 1)
      }
    }
  }
}
