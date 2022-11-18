import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');
    const navigate = useNavigate();
    const handleToSignUp = (data) => {
        setSignUpError('');
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                toast.success('user Created Successfully')
                console.log(user);
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        navigate('/')
                    })
                    .catch(err => console.log(err));

            })
            .catch(err => {
                console.error(err.message);
                setSignUpError(err.message);
            })
    }
    return (
        <div className="h-[800px] flex justify-center items-center">
            <div className="w-96 p-7">
                <h2 className="text-xl text-center">Sign Up</h2>
                <form onSubmit={handleSubmit(handleToSignUp)}>
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
                    <div className="form-control w-full mb-7 max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password"
                            {...register('password', {
                                required: "Password is required",
                                pattern: { value: /(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.*[a-z])/, message: "password have to contain a number,special character,small and capital word" },
                                minLength: { value: 6, message: 'password must be 6 character or longer' }
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className="text-rose-500 font-semibold">{errors.password?.message}</p>}

                    </div>
                    <input type="submit" value="Login" className="btn btn-accent w-full" />
                    {
                        signUpError && <p className="text-red-600 font-semibold">{signUpError}</p>
                    }
                    {/* <p>{data}</p> */}
                </form>
                <p>Already have an account. <Link className="text-secondary" to='/login'>Please Log In</Link ></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;