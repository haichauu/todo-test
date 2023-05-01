import { useForm } from "react-hook-form";
import React, {ReactElement, FC} from "react";
import {signInApi} from "../api/requests";
import {Link, useNavigate} from "react-router-dom";

const SignIn: FC<any> = (): ReactElement => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const onSubmit = async ({email, password}: any, e: any) => {
        const response: any  = await signInApi(email, password)
        navigate('/todo',{state:{token: response.access_token}});    }
    const onError = (errors: any, e: any) => console.log(errors, e);


    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit(onSubmit, onError)}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
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
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>

                    <Link to="/signup">Sign Up</Link>
                </div>
            </form>
        </div>
    )
};

export default SignIn;
