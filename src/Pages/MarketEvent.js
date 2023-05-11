import React, { useEffect, useState } from 'react'
import { event } from '../Store/data'
import Header from '../Components/Header';

export default function MarketEvent() {

    const [currentIndex, setCurrentIndex] = useState(98);

    const [m, setM] = useState(event[currentIndex + 1]?.eventType === "ConfigEvent" ? event[currentIndex].m : 0)

    const [b, setB] = useState(event[currentIndex + 1]?.eventType === "ConfigEvent" ? event[currentIndex].b : 0)

    const [divisorRatio, setDivisorRatio] = useState(event[currentIndex + 1]?.eventType === "ConfigEvent" ? event[currentIndex].divisorRatio : 0)

    const [speard, setSpeard] = useState(event[currentIndex + 1]?.eventType === "ConfigEvent" ? event[currentIndex].spread : 0)

    const [tableInfo, setTableInfo] = useState([])

    useEffect(() => {
        // timer to simulate real time data with 4 second delay
        const timer = setTimeout(async () => {
            if (currentIndex < event.length - 1) {
                setCurrentIndex(currentIndex + 1);

                // Update to the latest configuration information if it is a config event
                if (event[currentIndex + 1].eventType === "ConfigEvent") {
                    setM(event[currentIndex + 1].m)
                    setB(event[currentIndex + 1].b)
                    setDivisorRatio(event[currentIndex + 1].divisorRatio)
                    setSpeard(event[currentIndex + 1].spread)
                }
                // get dashboard data
                await getDashboardData(event[currentIndex + 1])
            }
        }, 4000);
        return () => clearTimeout(timer);
    }, [currentIndex]);

    const getDashboardData = async (event) => {
        await fetch('https://reqbin.com/echo/post/json', {
            method: 'POST',
            body: JSON.stringify(
                event
            )
        })
            .then(response => {
                console.log(response)
                setTableInfo([{
                    CCy: "CHX",
                    Tensor: "1M",
                    Position: "-3000",
                    Ask: "123",
                    Bid: "125",
                    QuoteStatus: "TRADABLE"
                }])
            })
            .then(response => console.log(JSON.stringify(response)))
    }

    // Extract current event
    const displayCurrentEvent = () => {
        if (event[currentIndex].eventType === "TradeEvent") {
            return (
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Latest event: Trade Event</div>
                    <p class="text-gray-700 text-base">
                        Event ID: {event[currentIndex].eventId}
                    </p>
                    <p class="text-gray-700 text-base">
                        Operation: {event[currentIndex].buySell.toUpperCase()}
                    </p>
                    <p class="text-gray-700 text-base">
                        Currency: {event[currentIndex].cCY}
                    </p>
                    <p class="text-gray-700 text-base">
                        Quantity: {event[currentIndex].quantity}
                    </p>
                    <p class="text-gray-700 text-base">
                        Tenor: {event[currentIndex].tenor}
                    </p>
                    {/* <p class="text-gray-700 text-base">
                        Trade ID: {event[currentIndex].tradeId}
                    </p> */}
                </div>
            )
        }
        else if (event[currentIndex].eventType === "FXMidEvent") {
            return (
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Latest event: FX Mid Event</div>
                    <p class="text-gray-700 text-base">
                        Event ID: {event[currentIndex].eventId}
                    </p>
                    <p class="text-gray-700 text-base">
                        Currency: {event[currentIndex].cCY}
                    </p>
                    <p class="text-gray-700 text-base">
                        rate: {event[currentIndex].rate}
                    </p>
                </div>
            )
        }
        else {
            return (
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Latest event: Config Event</div>
                    <p class="text-gray-700 text-base">
                        Event ID: {event[currentIndex].eventId}
                    </p>
                    <p class="text-gray-700 text-base">
                        m: {event[currentIndex].m}
                    </p>
                    <p class="text-gray-700 text-base">
                        b: {event[currentIndex].b}
                    </p>
                    <p class="text-gray-700 text-base">
                        Divisor Ratio: {event[currentIndex].divisorRatio}
                    </p>
                    <p class="text-gray-700 text-base">
                        Spread: {event[currentIndex].spread}
                    </p>
                </div>
            )
        }
    }

    // Display rows in dashboard
    const displayDashboardData = () => {
        return tableInfo.map((item, index) => {
            return (
                <tr key={index}>
                    <td className="border">{item.CCy}</td>
                    <td className="border">{item.Tensor}</td>
                    <td className="border">{item.Position}</td>
                    <td className="border">{item.Ask}</td>
                    <td className="border">{item.Bid}</td>
                    <td className="border">{item.QuoteStatus}</td>
                </tr>
            )
        })
    }
    return (
        <>
            <Header /> 
            {/* Dashboard at the latest event happenning */}
            <h1 className="text-center mb-12 font-bold text-3xl">DASHBOARD</h1>
            <div className="w-full justify-center items-center mb-12">
                <table class="table-fixed border border-separate  mx-auto">
                    <thead>
                        <tr>
                            <th className="border">Currency</th>
                            <th className="border">Tenor</th>
                            <th className="border">Position</th>
                            <th className="border">Ask</th>
                            <th className="border">Bid</th>
                            <th className="border">QuoteStatus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayDashboardData()}
                    </tbody>
                </table>
            </div>


            {/* Display the last event and configuration information */}
            <div className="w-full justify-center items-center flex">
                <div class="max-w-xl rounded overflow-hidden shadow-xl border">
                    {displayCurrentEvent()}
                    <div class="px-6 pt-3 pb-2">
                        <h2 className="mb-2 text-lg font-bold">Latest configuration Information: </h2>
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">m = {m}</span>
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">b = {b}</span>
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Divisor Ratio = {divisorRatio}</span>
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Speard = {speard}</span>
                    </div>
                </div>
            </div>

        </>
    )
}
