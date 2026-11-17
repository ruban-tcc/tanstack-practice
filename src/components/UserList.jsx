
import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { fetchUsers, likeUser } from '../services/userApi';

function UserList() {
    const queryClient = useQueryClient();

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

    const likeMutation = useMutation({
        mutationFn: likeUser,

        onMutate: async (userId) => {
            await queryClient.cancelQueries({
                queryKey: ['users'],
            });

            const previousUsers = queryClient.getQueryData(['users']);

            queryClient.setQueryData(['users'], (oldUsers) =>
                oldUsers.map((user) =>
                    user.id === userId
                        ? { ...user, liked: true }
                        : user
                )
            );

            return { previousUsers };
        },

        onError: (error, userId, context) => {
            queryClient.setQueryData(
                ['users'],
                context.previousUsers
            );

            alert(error.message);
        },

        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['users'],
            });
        },
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

                    <button
                        disabled={user.liked || likeMutation.isPending}
                        onClick={() => likeMutation.mutate(user.id)}
                    >
                        {user.liked ? 'Liked' : 'Like'}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default UserList;
