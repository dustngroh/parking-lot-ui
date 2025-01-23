// Log in
export async function login(username: string, password: string): Promise<void> {
    const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Invalid credentials');
    }
}

// Log out by calling backend's logout endpoint to clear HttpOnly cookie
export async function logout(): Promise<void> {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to log out');
    }
}

// Fetch data from an endpoint with the Authorization header
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const response = await fetch(url, {
        ...options,
        credentials: 'include',
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(error.message || `HTTP Error: ${response.status}`);
    }

    return response.json(); // Parse JSON response
}