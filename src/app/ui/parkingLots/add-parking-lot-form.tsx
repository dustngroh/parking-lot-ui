import { useState } from "react";

interface AddParkingLotFormProps {
    onClose: () => void; // Function to close the form
    onSuccess: () => void; // Function to refresh data after adding a lot
}

export default function AddParkingLotForm({ onClose, onSuccess }: AddParkingLotFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        totalSpaces: "",
        reservedSpaces: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/parkinglots", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Ensure authentication
                body: JSON.stringify({
                    ...formData,
                    totalSpaces: Number(formData.totalSpaces),
                    reservedSpaces: Number(formData.reservedSpaces),
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create parking lot");
            }

            alert("Parking lot added successfully!");
            setFormData({ name: "", address: "", totalSpaces: "", reservedSpaces: "" });
            onSuccess(); // Trigger a data refresh in parent
            onClose(); // Close the form
        } catch (error) {
            console.error("Error creating parking lot:", error);
        }
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow">
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700">Total Spaces</label>
                    <input
                        type="number"
                        name="totalSpaces"
                        value={formData.totalSpaces}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700">Reserved Spaces</label>
                    <input
                        type="number"
                        name="reservedSpaces"
                        value={formData.reservedSpaces}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="flex gap-2 mt-4">
                    <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                        Submit
                    </button>
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
