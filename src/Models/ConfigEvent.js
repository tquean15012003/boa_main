import { Event } from "./Event";

export class ConfigEvent extends Event {
    // 1. Attribute
    m
    b
    divisorRatio
    spread

    // 2. Constructor
    constructor(eventId, eventType, m, b, divisorRatio, spread) {
        super()
        this.eventId = eventId
        this.eventType = eventType
        this.m = m
        this.b = b
        this.divisorRatio = divisorRatio
        this.spread = spread
    }
}