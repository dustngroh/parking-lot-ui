import { useEffect, useState } from "react";
import {ParkingLot} from "@/app/lib/definitions";

export default function TestConnection() {
    const [data, setData] = useState<null | ParkingLot>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/parkinglots");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                // Narrow the type of `err` to an Error
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unexpected error occurred");
                }
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Test Backend Connection</h1>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
