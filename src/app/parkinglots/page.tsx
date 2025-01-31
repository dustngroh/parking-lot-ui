import ParkingLotsComponent from "@/app/ui/parkingLots/ParkingLotsComponent";
import LogoutButton from "@/app/ui/logout-button";

export default function Home() {
  return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 sm:p-20 bg-gray-50">
        <header className="w-full max-w-4xl flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <LogoutButton />
        </header>

        <main className="w-full max-w-4xl bg-white p-6 shadow-lg rounded-lg border border-gray-300">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Available Parking Lots</h2>
          <ParkingLotsComponent />
        </main>
      </div>
  );
}
