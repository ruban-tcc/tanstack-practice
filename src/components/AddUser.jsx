
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { addUser } from '../services/userApi';

function AddUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const mutation = useMutation({
        mutationFn: addUser,

        onSuccess: (data) => {
            alert(`User added: ${data.name}`);

            setName('');
            setEmail('');
        },

        onError: (error) => {
            alert(error.message);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        mutation.mutate({
            name,
            email,
        });
    };

    return (
        <div>
            <h2>Add New User</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? 'Adding...' : 'Add User'}
                </button>
            </form>

            {mutation.isError && (
                <p>Error: {mutation.error.message}</p>
            )}
        </div>
    );
}

export default AddUser;
