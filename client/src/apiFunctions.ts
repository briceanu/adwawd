export const API = 'http://localhost:3003';
// localhost:3003 inside main has to work in port 3003

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
      console.error('Server Error:', errorData);
      throw errorData.message;
    }
    return;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
