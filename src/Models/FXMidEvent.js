import { Event } from "./Event";

export class FXMidEvent extends Event {
    cCY
    rate

    constructor(eventId, eventType, cCY, rate) {
        super()
        this.eventId = eventId
        this.eventType = eventType
        this.cCY = cCY
        this.rate = rate
    }
}