import { useQuery } from '@tanstack/react-query';
import { handler } from 'daisyui';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const ManageDoctors = () => {

    const [deletingDoctor, SetDeletingDoctor] = useState(null);
    const closeModal = () => {
        SetDeletingDoctor(null);
    };


    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('https://y-mocha-delta.vercel.app/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('ACCESS_TOKEN')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (err) {

            }
        }
    });
    const handleToDelete = (doctor) => {
        fetch(`https://y-mocha-delta.vercel.app/doctors/${doctor._id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem('ACCESS_TOKEN')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Dr.${doctor.name} deleted successfully`)
                }
                console.log(data);

            })
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className="text-3xl">Manage doctors:{doctors?.length}</h2>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>specialty</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.length &&
                        doctors?.map((doctor, index) =>
                            <tr key={doctor._id}>
                                <th>{index + 1}</th>
                                <td><div className="avatar">
                                    <div className="w-24 rounded-full">
                                        <img src={doctor.image} alt='' />
                                    </div>
                                </div></td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.specialty}</td>
                                <td>
                                    <label onClick={() => SetDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </table>
            {
                deletingDoctor && <ConfirmationModal
                    title={`Are You sure you want to delete?`}
                    message={`If You delete ${deletingDoctor.name}.It cannot be undone`}
                    closeModal={closeModal}
                    successAction={handleToDelete}
                    successActionName="Delete"
                    modalData={deletingDoctor}
                >

                </ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;