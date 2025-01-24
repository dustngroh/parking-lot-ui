'use client';

import LoginForm from '@/app/ui/login-form';
import RegisterForm from "@/app/ui/register-form";
import {useState} from "react";

export default function LoginPage() {
    const [isRegistering, setIsRegistering] = useState(false);

    const toggleForm = () => {
        setIsRegistering((prev) => !prev);
    };

    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
                    <div className="w-32 text-white md:w-36">
                        {isRegistering ? 'Create an Account' : 'Welcome Back'}
                    </div>
                </div>
                {isRegistering ? <RegisterForm /> : <LoginForm />}
                <button
                    onClick={toggleForm}
                    className="mt-4 w-full rounded-md bg-gray-600 py-2 px-4 text-white hover:bg-gray-700"
                >
                    {isRegistering ? 'Already have an account? Log in' : 'Need an account? Register'}
                </button>
            </div>
        </main>
    );
}