
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchUsers } from '../services/userApi';

function SearchUsers() {
    const [username, setUsername] = useState('');

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['users', 'search', username],
        queryFn: () => searchUsers(username),
        enabled: username.trim() !== '',
    });

    return (
        <div>
            <h2>Search Users</h2>

            <input
                type="text"
                placeholder="Search by username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            {username.trim() !== '' && isLoading && (
                <p>Searching...</p>
            )}

            {isError && (
                <p>Error: {error.message}</p>
            )}

            {data && (
                <div>
                    {data.length === 0 ? (
                        <p>No users found.</p>
                    ) : (
                        data.map((user) => (
                            <div key={user.id}>
                                <h3>{user.name}</h3>
                                <p>Username: {user.username}</p>
                                <p>Email: {user.email}</p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchUsers;
