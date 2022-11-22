import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loading from '../../Shared/Loading/Loading';

const AllUsers = () => {
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://y-mocha-delta.vercel.app/users', {
                headers: {
                    authorization: `bearer ${localStorage.getItem("ACCESS_TOKEN")}`
                }
            });
            const data = await res.json();
            return data;
        }
    })
    const handleMakeAdmin = id => {
        fetch(`https://y-mocha-delta.vercel.app/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('ACCESS_TOKEN')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Make admin successfully');
                    refetch();
                }
            })

    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Treatment</th>
                        <th>Admin</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user, index) =>
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className="bt btn-xs btn-primary rounded-md">Make Admin</button>}</td>
                                <td><button className="bt btn-xs btn-accent rounded-md">Delete</button></td>
                            </tr>
                        )
                    }

                </tbody>
            </table>
        </div>
    );
};

export default AllUsers;