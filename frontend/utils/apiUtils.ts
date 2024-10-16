const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Utility to handle GET requests
export const get = async (endpoint: string, options?: RequestInit) => {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      ...options,
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Utility to handle POST requests
export const post = async (endpoint: string, data: any, options?: RequestInit) => {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      body: JSON.stringify(data),
      ...options,
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
