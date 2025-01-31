'use client'

import { useEffect, useState } from "react";
import { ParkingLot } from "@/app/lib/definitions";
import { fetchWithAuth } from "@/app/lib/auth";

const ParkingLotsComponent = () => {
    const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);

    useEffect(() => {
        const fetchParkingLots = async () => {
            const data: ParkingLot[] = await fetchWithAuth("/api/parkinglots");
            setParkingLots(data);
        };

        fetchParkingLots().catch(console.error);
    }, []);

    return (
        <div className="container mx-auto p-6">
            <ul className="space-y-6">
                {parkingLots.map((lot) => {
                    const openSpaces = lot.totalSpaces - lot.reservedSpaces;
                    const percentageFilled = (lot.reservedSpaces / lot.totalSpaces) * 100;

                    return (
                        <li key={lot.id} className="p-5 border border-gray-300 rounded-lg shadow-md bg-white">
                            <h2 className="text-xl font-semibold text-gray-800">{lot.name}</h2>
                            <p className="text-md text-gray-700">{lot.address || "Unknown Address"}</p>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-300 rounded-full h-4 my-3">
                                <div
                                    className="bg-blue-600 h-4 rounded-full transition-all"
                                    style={{ width: `${percentageFilled}%` }}
                                ></div>
                            </div>

                            {/* Open and Total Spaces */}
                            <p className="text-md font-medium text-gray-800">
                                <strong>Open Spaces:</strong> {openSpaces} / {lot.totalSpaces}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ParkingLotsComponent;
