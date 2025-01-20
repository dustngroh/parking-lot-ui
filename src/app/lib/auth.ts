// Log in and store the token in a cookie
export async function login(username: string, password: string): Promise<void> {
    const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error('Invalid credentials');
    }

    const { token } = await response.json();

    // Store the token in a cookie
    setCookie('jwtToken', token);
}

// Log out and clear the token cookie
export function logout(): void {
    deleteCookie('jwtToken');
}

// Retrieve the token from cookies
export function getToken(): string | null {
    return getCookie('jwtToken');
}


// Fetch data from an endpoint with the Authorization header
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = getToken();

    if (!token) {
        throw new Error('Unauthorized: No token found');
    }

    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        'Content-Type': 'application/json',
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(error.message || `HTTP Error: ${response.status}`);
    }

    return response.json(); // Parse JSON response
}

// Helper function to set a cookie
function setCookie(name: string, value: string, days: number = 1) {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}; Secure; SameSite=Strict`;
}

// Helper function to get a cookie value
function getCookie(name: string): string | null {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) {
            return value;
        }
    }
    return null;
}

// Helper function to delete a cookie
function deleteCookie(name: string) {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict`;
}
