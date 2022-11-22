import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imgHostKey = process.env.REACT_APP_imgbb_key;

    const navigate = useNavigate();
    console.log(imgHostKey)
    const { data: specialties, isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('https://y-mocha-delta.vercel.app/appointmentSpecialty')
            const data = await res.json();
            return data;
        }
    });

    const handleAddDoctor = data => {
        const image = data.img[0];
        console.log('img is', image)
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?&key=${imgHostKey}`;
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        image: imgData.data.url

                    }
                    fetch('https://y-mocha-delta.vercel.app/doctors', {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('ACCESS_TOKEN')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.name} is added successfully`)
                            navigate('/dashboard/managedoctors')
                        })
                }
            })
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="w-96 p-7">
            <h2 className="text-4xl font-bold">Add A New Doctor</h2>
            <form onSubmit={handleSubmit(handleAddDoctor)}>
                {/* <Header /> */}
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Name</span></label>
                    <input type="text"
                        {...register('name', { required: "Name is required" })}
                        className="input input-bordered w-full max-w-xs" />
                    {errors.name && <p className="text-rose-500 font-semibold">{errors.name?.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Email</span></label>
                    <input type="email"
                        {...register('email', { required: "Email is required" })}
                        className="input input-bordered w-full max-w-xs" />
                    {errors.email && <p className="text-rose-500 font-semibold">{errors.email?.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Specialty</span></label>
                    <select
                        {...register('specialty', { required: "specialty is required" })}
                        className="select select-bordered w-full max-w-xs">
                        <option disabled selected>Please Pick a Specialty</option>
                        {

                            specialties.map(specialty => <option
                                key={specialty._id}
                                value={specialty.name}
                            >{specialty.name}</option>)
                        }


                    </select>
                </div>
                <div className="form-control w-full mb-7 max-w-xs">
                    <label className="label"><span className="label-text">Photo</span></label>
                    <input type="file"
                        {...register('img', { required: "img is required" })}
                        className="input input-bordered w-full max-w-xs" />
                    {errors.img && <p className="text-rose-500 font-semibold">{errors.img?.message}</p>}
                </div>
                <input type="submit" value="Add Doctor" className="btn btn-accent w-full" />
                {/* {
                    signUpError && <p className="text-red-600 font-semibold">{signUpError}</p>
                } */}
                {/* <p>{data}</p> */}
            </form>
        </div>
    );
};

export default AddDoctor;