"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchWithAuth } from "@/app/lib/auth";

type ParkingLot = {
    id: number;
    name: string;
    address: string;
    totalSpaces: number;
    reservedSpaces: number;
};

export default function ParkingLotPage() {
    const { id } = useParams();
    const router = useRouter();
    const [parkingLot, setParkingLot] = useState<ParkingLot | null>(null);
    const [hasReservation, setHasReservation] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const lotData = await fetchWithAuth(`/api/parkinglots/${id}`);
                setParkingLot(lotData);

                const reservationResponse = await fetchWithAuth(`/api/reservations/exists?parkingLotId=${id}`);
                setHasReservation(reservationResponse?.hasReservation === true);
            } catch (err) {
                setError("Failed to load parking lot data.");
                console.error("Error fetching parking lot:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleReserve = async () => {
        try {
            const result = await fetchWithAuth(`/api/reservations?parkingLotId=${id}`, {
                method: "POST",
                credentials: "include",
            });

            if (!result) throw new Error("Failed to make reservation.");

            setHasReservation(true);
        } catch (err) {
            setError("Error making reservation.");
            console.error("Error making reservation:", err);
        }
    };

    const handleCancelReservation = async () => {
        try {
            const result = await fetchWithAuth(`/api/reservations/cancel?parkingLotId=${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!result || !result.message) throw new Error("Failed to cancel reservation.");

            setHasReservation(false);
        } catch (err) {
            setError("Error canceling reservation.");
            console.error("Error canceling reservation:", err);
        }
    };

    if (loading) return <p className="text-center text-lg">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 sm:p-20 bg-gray-50">
            <main className="w-full max-w-4xl bg-white p-6 shadow-lg rounded-lg border border-gray-300">
                {parkingLot ? (
                    <>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{parkingLot.name}</h1>
                        <p className="text-lg text-gray-700 mb-4">{parkingLot.address || "Unknown Address"}</p>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-300 rounded-full h-4 mb-4">
                            <div
                                className="bg-blue-600 h-4 rounded-full transition-all"
                                style={{ width: `${(parkingLot.reservedSpaces / parkingLot.totalSpaces) * 100}%` }}
                            ></div>
                        </div>

                        <p className="text-md font-medium text-gray-800 mb-4">
                            <strong>Open Spaces:</strong> {parkingLot.totalSpaces - parkingLot.reservedSpaces} / {parkingLot.totalSpaces}
                        </p>

                        {/* Reservation Buttons */}
                        <div className="mt-4 flex justify-between">
                            {hasReservation ? (
                                <button
                                    onClick={handleCancelReservation}
                                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition"
                                >
                                    Cancel Reservation
                                </button>
                            ) : (
                                <button
                                    onClick={handleReserve}
                                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
                                >
                                    Make a Reservation
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <p className="text-center text-gray-500">Parking lot not found.</p>
                )}

                {/* Back Button */}
                <button
                    onClick={() => router.push("/parkinglots")}
                    className="mt-6 w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition"
                >
                    Back to Parking Lots
                </button>
            </main>
        </div>
    );
}
