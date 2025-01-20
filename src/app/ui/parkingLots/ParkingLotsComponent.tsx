'use client'

import { useEffect, useState } from "react";
import {ParkingLot} from "@/app/lib/definitions";

const ParkingLotsComponent = () => {
    const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);

    useEffect(() => {
        const fetchParkingLots = async () => {
            const response = await fetch("/api/parkinglots");
            const data: ParkingLot[] = await response.json();
            setParkingLots(data);
        };

        fetchParkingLots().catch(console.error);
    }, []);

    return (
        <div>
            <h1>Parking Lots</h1>
            <ul>
                {parkingLots.map((lot) => (
                    <li key={lot.id}>
                        {lot.name} - {lot.address} ({lot.reservedSpaces}/{lot.totalSpaces} reserved)
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ParkingLotsComponent;
