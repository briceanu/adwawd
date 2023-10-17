export const API = 'http://localhost:3003';
// localhost:3003 inside main has to work in port 3003

interface User {
  username: string;
  password: string;
}

export const saveUser = async (
  username: string,
  password: string
): Promise<void> => {
  try {
    const data = await fetch(`${API}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!data.ok) {
      const errorData = await data.json();
      throw new Error(errorData.message);
    }
    return;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};

export const login = async (userData: User): Promise<string> => {
  const { username, password } = userData;
  try {
    const response = await fetch(`${API}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const token = await response.text(); // Get the token as plain text
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
