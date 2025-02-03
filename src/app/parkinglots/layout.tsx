"use client";

import LogoutButton from "@/app/ui/logout-button";

export default function ParkingLotsLayout({
                                              children,
                                          }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 sm:p-20 bg-gray-50">

            <header className="w-full max-w-4xl flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
                <LogoutButton />
            </header>

            {children}
        </div>
    );
}
