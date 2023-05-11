import { Event } from "./Event";

export class ConfigEvent extends Event {
    // 1. Attribute
    m
    b
    DivisorRatio
    Spread

    // 2. Constructor
    constructor(eventId, eventType, m, b, divisorRatio, spread) {
        super()
        this.eventId = eventId
        this.eventType = eventType
        this.m = m
        this.b = b
        this.DivisorRatio = divisorRatio
        this.Spread = spread
    }
}