import { min } from 'date-fns';
import { tr } from 'date-fns/locale';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useToken from '../../Hooks/UseToken';
//password: 1234AB@#as
//user: smzubayer9004@gamil.com

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm('');
    const { LogIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    if (token) {

        navigate(from, { replace: true });
    }
    const handleToLogin = data => {
        console.log(data);
        setLoginError('');
        LogIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginUserEmail(data.email);
            })
            .catch(err => {
                console.error(err.message);
                setLoginError(err.message);
            })
    }
    return (
        <div className="h-[800px] flex justify-center items-center">
            <div className="w-96 p-7">
                <h2 className="text-xl text-center">Login</h2>
                <form onSubmit={handleSubmit(handleToLogin)}>
                    {/* <Header /> */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="text"
                            {...register("email", { required: 'Email is required' })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className="text-red-600 font-semibold">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password"
                            {...register("password",
                                {
                                    required: "password is required",
                                    minLength: { value: 6, message: 'password must be 6 character or longer' }
                                })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className="text-red-600 font-semibold">{errors.password?.message}</p>}
                        <div>
                            {
                                loginError && <p className="text-red-600 font-semibold">{loginError}</p>
                            }
                        </div>
                        <label className="label"><span className="label-text">Forget password</span></label>
                    </div>
                    <input type="submit" value="Login" className="btn btn-accent w-full" />
                    {/* <p>{data}</p> */}

                </form>
                <p>New to Doctor Portal <Link className="text-secondary" to='/signUp'>Create a new Account</Link ></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;