
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../services/userApi';

function UserList() {

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        staleTime: 60000,
        gcTime: 300000,
    });


    if (isLoading) {
        return <p>Loading users...</p>;
    }

    if (isError) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <h2>User List</h2>

            {data.map((user) => (
                <div key={user.id}>
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                </div>
            ))}
        </div>
    );
}

export default UserList;
