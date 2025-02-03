import { useState } from 'react';
import { register } from '@/app/lib/auth';

export default function RegisterForm() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);

        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;
        const plateNumber = formData.get('plateNumber') as string;

        setIsSubmitting(true);

        const form = event.currentTarget;

        try {
            await register(username, password, firstName, lastName, plateNumber);
            if (form) {
                form.reset(); // Reset form only if it exists
            }
            setSuccessMessage('Account created successfully!');
            //event.currentTarget.reset();
        } catch (error) {
            setErrorMessage((error as Error).message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <label className="block text-gray-700 font-medium mb-1">Username</label>
                <input
                    type="text"
                    name="username"
                    required
                    minLength={3}
                    maxLength={20}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <input
                    type="password"
                    name="password"
                    required
                    minLength={8}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">First Name</label>
                <input
                    type="text"
                    name="firstName"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Plate Number</label>
                <input
                    type="text"
                    name="plateNumber"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}

            <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
        </form>
    );
}
