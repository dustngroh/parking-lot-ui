'use client';

import { logout } from '@/app/lib/auth'; // Adjust the path as needed
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = () => {
        logout(); // Clear the token
        router.push('/login'); // Redirect to the login page
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
            Logout
        </button>
    );
}
