export interface ParkingLot {
    id: number; // Unique identifier for the parking lot
    name: string; // Name of the parking lot
    address: string; // Address of the parking lot
    totalSpaces: number; // Total number of parking spaces in the lot
    reservedSpaces: number; // Number of reserved spaces in the lot
    reservations: Reservation[]; // Array of reservations associated with the lot
    staff: Staff[]; // Array of staff members associated with the lot
}

export interface Reservation {
    // Define properties of a reservation here
    // Example:
    id: number;
    userId: number;
    parkingLotId: number;
}

export interface Staff {
    // Define properties of a staff member here
    id: number;
}