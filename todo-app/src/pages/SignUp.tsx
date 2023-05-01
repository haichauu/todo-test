import { useForm } from "react-hook-form";
import React, {ReactElement, FC} from "react";
import {signUpApi} from "../api/requests";
import {Link, useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp: FC<any> = (): ReactElement => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const onSubmit = async ({email, password, confirmPassword}: any, e: any) => {
        if(password !== confirmPassword) {
            toast.error('Passwords are not match', {
                position: toast.POSITION.TOP_RIGHT
            })
            return
        }
        try {
            const response: any  = await signUpApi(email, password)
            navigate('/todo',{state:{token: response.access_token}});
        }
        catch (e: any) {
            let errMsg = e?.response?.data?.message || e.message
            if(e?.response?.data?.errors) {
                errMsg = Object.keys(e?.response?.data?.errors).map((key) => e?.response.data.errors[key]).join(',')
            }
            toast.error(errMsg, {
                position: toast.POSITION.TOP_RIGHT
            })
        }

    }
    const onError = (errors: any, e: any) => console.log(errors, e);


    return (
        <div className="Auth-form-container">
            <ToastContainer />
            <form className="Auth-form" onSubmit={handleSubmit(onSubmit, onError)}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign Up</h3>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            {...register("email")}
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            {...register("password")}
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            {...register("confirmPassword")}
                            type="password"
                            className="form-control mt-1"
                            placeholder="Confirm password"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <Link to="/">Sign In</Link>
                </div>
            </form>
        </div>
    )
};

export default SignUp;
