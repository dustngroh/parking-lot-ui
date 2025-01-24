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
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="block w-full rounded-md border-gray-300 shadow-sm"
                        required
                        minLength={3}
                        maxLength={20}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="block w-full rounded-md border-gray-300 shadow-sm"
                        required
                        minLength={8}
                    />
                </div>
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="plateNumber" className="block text-sm font-medium text-gray-700">
                        Plate Number
                    </label>
                    <input
                        type="text"
                        id="plateNumber"
                        name="plateNumber"
                        className="block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </button>
                {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
                {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
            </form>
    );
}
