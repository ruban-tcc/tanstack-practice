
const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
};

export const addUser = async (newUser) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    throw new Error('Failed to add user');
  }

  return response.json();
};


export const likeUser = async (userId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        liked: true,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to like user');
  }

  return response.json();
};
