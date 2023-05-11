import { Event } from "./Event";

export class TradeEvent extends Event {
    // 1. Attribute
    buySell
    cCY
    tenor
    quantity
    tradeId

    // 2. Constructor
    constructor(eventId, eventType, buySell, cCy, tenor, quantity, tradeId) {
        super()
        this.eventId = eventId
        this.eventType = eventType
        this.buySell = buySell
        this.cCY = cCy
        this.tenor = tenor
        this.quantity = quantity
        this.tradeId = tradeId
    }
}