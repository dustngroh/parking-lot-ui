'use client'

import { useEffect, useState } from "react";
import { ParkingLot } from "@/app/lib/definitions";
import { fetchWithAuth } from "@/app/lib/auth";
import Link from "next/link";

const ParkingLotsComponent = () => {
    const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);

    useEffect(() => {
        const fetchParkingLots = async () => {
            try {
                const data: ParkingLot[] = await fetchWithAuth("/api/parkinglots");
                console.log("API Response:", data); // Debugging
                if (!Array.isArray(data)) {
                    throw new Error("Invalid API response format.");
                }
                setParkingLots(data);
            } catch (error) {
                console.error("Error fetching parking lots:", error);
                //setError("Failed to load parking lots.");
            }
        };

        fetchParkingLots();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Parking Lots</h1>
            <ul className="space-y-6">
                {parkingLots.map((lot) => {
                    const openSpaces = lot.totalSpaces - lot.reservedSpaces;
                    const percentageFilled = (lot.reservedSpaces / lot.totalSpaces) * 100;

                    return (
                        <Link key={lot.id} href={`/parkinglots/${lot.id}`} passHref>
                            <li className="p-5 border border-gray-300 rounded-lg shadow-md bg-white cursor-pointer hover:bg-gray-100 transition-all">
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
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
};

export default ParkingLotsComponent;
