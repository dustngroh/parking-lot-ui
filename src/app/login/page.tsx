'use client';

import LoginForm from '@/app/ui/login-form';
import RegisterForm from '@/app/ui/register-form';
import { useState } from 'react';

export default function LoginPage() {
    const [isRegistering, setIsRegistering] = useState(false);

    const toggleForm = () => {
        setIsRegistering((prev) => !prev);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 sm:p-20 bg-gray-50">
            <header className="w-full max-w-4xl flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900">{isRegistering ? 'Register' : 'Login'}</h1>
            </header>

            <main className="w-full max-w-md bg-white p-6 shadow-lg rounded-lg border border-gray-300">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    {isRegistering ? 'Create an Account' : 'Welcome Back'}
                </h2>

                {isRegistering ? <RegisterForm /> : <LoginForm />}

                <button
                    onClick={toggleForm}
                    className="mt-4 w-full rounded-md bg-gray-600 py-2 px-4 text-white hover:bg-gray-700"
                >
                    {isRegistering ? 'Already have an account? Log in' : 'Need an account? Register'}
                </button>
            </main>
        </div>
    );
}
