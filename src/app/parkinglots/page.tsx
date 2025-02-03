'use client';

import { useEffect, useState } from "react";
import ParkingLotsComponent from "@/app/ui/parkingLots/ParkingLotsComponent";
import LogoutButton from "@/app/ui/logout-button";
import AddParkingLotForm from "@/app/ui/parkingLots/add-parking-lot-form";

export default function Home() {
    const [role, setRole] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await fetch("/api/users/role", {
                    credentials: "include", // Ensure JWT token is sent
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch role");
                }

                const data = await response.json();
                setRole(data.role);
            } catch (error) {
                console.error("Error fetching user role:", error);
            }
        };

        fetchUserRole();
    }, []);

    return (
        <main className="w-full max-w-4xl bg-white p-6 shadow-lg rounded-lg border border-gray-300">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Available Parking Lots</h2>

            {role === "ADMIN" && (
                <div className="mb-4">
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        {showForm ? "Cancel" : "Add Parking Lot"}
                    </button>

                    {showForm && <AddParkingLotForm onClose={() => setShowForm(false)} onSuccess={() => window.location.reload()} />}
                </div>
            )}

            <ParkingLotsComponent />
        </main>
    );
}
