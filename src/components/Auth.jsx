import React, { useState } from "react";
import pet from "../images/login photo.png"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup"

export default function Auth(props) {

    const [page, setPage] = useState("login")
    const [sent, setSent] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (values) => {
        try {
            const result = await axios({
                method: 'post',
                url: "/users/login",
                data: values,
                withCredentials: true
            })
            if (result) {
                props.setLogged(result.data.data.user)
                navigate("/")
            }
        } catch (error) {
            console.log("error !! " + error)
            navigate("/error-404")
        }
    }

    const handleForgot = async (values) => {
        try {
            const result = await axios({
                method: 'post',
                url: "/users/forgot-password",
                data: values
            })
            if (result) {
                setSent(true)
            }
        } catch (error) {
            console.log(error)
            navigate("/error-404")
        }
    }

    const handleSignUp = async (values) => {
        try {
            const result = await axios({
                method: 'post',
                url: "/users/signup",
                data: values
            })
            if (result) {
                setSent(true)
            }
        } catch (error) {
            console.log(error)
            navigate("/error-404")
        }
    }

    const loginFormik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: handleLogin,
        validationSchema: Yup.object({
            email: Yup.string().required("required").email("invalid email format"),
            password: Yup.string().required("required").min(5, "password must be at least 5 characters long")
        })
    });

    const forgotFormik = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: handleForgot,
        validationSchema: Yup.object({
            email: Yup.string().required("required").email("invalid email format"),
        })
    });

    const signUpFormik = useFormik({
        initialValues: {
            email: "",
            password: "",
            passwordConfirm: ""
        },
        onSubmit: handleSignUp,
        validationSchema: Yup.object({
            email: Yup.string().required("required").email("invalid email format"),
            password: Yup.string().required("required").min(5, "password must be at least 5 characters long"),
            passwordConfirm: Yup.string().required("required").oneOf([Yup.ref("password"), null], "passwords do not match")
        })
    });



    return <div className="w-[100vw] h-[100vh]  flex justify-center items-center font-boxy">
        <div className="w-2/4 h-full flex justify-center items-center bg-dark text-beige">
            <div className="flex flex-col justify-center items-center mr-20 font-fun">
                <div className="text-[30px]">Welcome to</div>
                <div className="text-[150px]">PETOFILE</div>
                <div className="text-[20px] font-long">The Ultimate Destination For Pet Enthusiasts !</div>
            </div>
        </div>

        <img src={pet} alt="pet" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/6 rounded-[50%] border-dark border-[8px]" />
        <div className="w-2/4 h-full flex justify-end items-center bg-white">
            {/* login */}
            <div className={`w-3/4 h-4/5 p-4 flex flex-col justify-center gap-8 ${page === "login" ? "block" : "hidden"}`}>
                <div>
                    <div className=" text-[40px]">Log In</div>
                    <div className="">Unleash Joy, Adopt Today !</div>
                </div>
                <form onSubmit={loginFormik.handleSubmit} className="flex flex-col gap-4">
                    <div className="h-1/3 text-mid">
                        <div className="flex gap-2 items-center">
                            Email* {loginFormik.touched.email && loginFormik.errors.email && <span className={`text-[10px] text-red-600`}>{loginFormik.errors.email}</span>}
                        </div>
                        <div className="mt-1">
                            <input type="email" id="emailLogin" name="email" {...loginFormik.getFieldProps("email")} className="w-4/5 h-[40px] px-5 rounded-[20px] focus:outline-none border-mid border-[1px] " />
                        </div>
                    </div>
                    <div className="h-1/3 text-mid">
                        <div className="flex gap-2 items-center">
                            Password* {loginFormik.touched.password && loginFormik.errors.password && <span className={`text-[10px] text-red-600`}>{loginFormik.errors.password}</span>}
                        </div>
                        <div className="mt-1">
                            <input type="password" id="passwordLogin" name="password" {...loginFormik.getFieldProps("password")} className="w-4/5 h-[40px] px-5 rounded-[20px] focus:outline-none border-mid border-[1px] " />
                        </div>
                    </div>
                    <div className="h-1/3 mt-2">
                        <div className="text-blue-600 text-sm cursor-pointer" onClick={() => {
                            setPage("forgot")
                        }}>
                            forgot password ?
                        </div>
                        <button type="submit" className="w-4/5 h-[40px] rounded-[20px] flex justify-center items-center bg-dark mt-2 text-white cursor-pointer">
                            log in
                        </button>
                    </div>
                    <div className="text-mid">
                        New here ? <span className="cursor-pointer text-blue-600" onClick={() => {
                            setPage("signUp")
                        }}>Create Account</span>
                    </div>
                </form>
            </div>
            {/* sign up */}
            <div className={`w-3/4 h-4/5 p-4 flex flex-col justify-center gap-8 ${page === "signUp" ? "block" : "hidden"}`}>
                <div>
                    <div className=" text-[40px]">Sign Up</div>
                    <div className="">Connecting Paws, Creating Memories !</div>
                </div>
                <form onSubmit={signUpFormik.handleSubmit} className={`flex flex-col gap-4 ${!sent ? "block" : "hidden"}`}>
                    <div className="h-1/3 text-mid">
                        <div className="flex gap-2 items-center">
                            Email* {signUpFormik.touched.email && signUpFormik.errors.email && <span className={`text-[10px] text-red-600 `}>{signUpFormik.errors.email}</span>}
                        </div>
                        <div className="mt-1">
                            <input type="email" id="email" name="email" {...loginFormik.getFieldProps("email")} className="w-4/5 h-[40px] px-5 rounded-[20px] focus:outline-none border-mid border-[1px] " />
                        </div>
                    </div>
                    <div className="h-1/3 text-mid">
                        <div className="flex gap-2 items-center">
                            Password*{signUpFormik.touched.password && signUpFormik.errors.password && <span className={`text-[10px] text-red-600 `}>{signUpFormik.errors.password}</span>}
                        </div>
                        <div className="mt-1">
                            <input type="password" id="password" name="password" {...loginFormik.getFieldProps("password")} className="w-4/5 h-[40px] px-5 rounded-[20px] focus:outline-none border-mid border-[1px] " />
                        </div>
                    </div>
                    <div className="h-1/3 text-mid">
                        <div className="flex gap-2 items-center">
                            Confirm Password*{signUpFormik.touched.passwordConfirm && signUpFormik.errors.passwordConfirm && <span className={`text-[10px] text-red-600 `}>{signUpFormik.errors.passwordConfirm}</span>}
                        </div>
                        <div className="mt-1">
                            <input type="password" id="passwordConfirm" name="passwordConfirm" {...loginFormik.getFieldProps("passwordConfirm")} className="w-4/5 h-[40px] px-5 rounded-[20px] focus:outline-none border-mid border-[1px] " />
                        </div>
                    </div>
                    <div className="h-1/3 mt-2">
                        <button type="submit" className="w-4/5 h-[40px] rounded-[20px] flex justify-center items-center bg-dark mt-2 text-white cursor-pointer" >
                            Create Account
                        </button>
                    </div>
                    <div className="text-mid">
                        Already Have an Account ? <span className="cursor-pointer text-blue-600" onClick={() => {
                            setPage("login")
                        }}>Log in instead ?</span>
                    </div>
                </form>
                <div className={`w-3/4 h-4/5 p-4 flex flex-col justify-center gap-8 ${sent ? "block" : "hidden"}`}>
                    We've sent you an varification email. Click on link to verify your account and log in again.
                    <div className="text-mid">
                        Already Have an Account ? <span className="cursor-pointer text-blue-600" onClick={() => {
                            setPage("login")
                        }}>Log in instead ?</span>
                    </div>
                </div>
            </div>
            {/* forgot password */}
            <div className={`w-3/4 h-4/5 p-4 flex flex-col justify-center gap-8 ${page === "forgot" ? "block" : "hidden"}`}>
                <div>
                    <div className=" text-[40px]">Forgot Password ?</div>
                    <div className="">Don't Worry, Petofile is here !</div>
                </div>
                <form onSubmit={forgotFormik.handleSubmit} className={`flex flex-col gap-4 ${!sent ? "block" : "hidden"}`}>
                    <div className="h-1/3 text-mid">
                        <div className="flex gap-2 items-center">
                            Email* {forgotFormik.touched.email && forgotFormik.errors.email && <span className={`text-[10px] text-red-600 `}>{forgotFormik.errors.email}</span>}
                        </div>
                        <div className="mt-1">
                            <input type="email" id="forgotEmail" name="email" {...forgotFormik.getFieldProps("email")} className="w-4/5 h-[40px] px-5 rounded-[20px] focus:outline-none border-mid border-[1px] " />
                        </div>
                    </div>


                    <div className="h-1/3 mt-2">
                        <button type="submit" className="w-4/5 h-[40px] rounded-[20px] flex justify-center items-center bg-dark mt-2 text-white cursor-pointer" >
                            Send Email
                        </button>
                    </div>
                    <div className="text-mid">
                        <span className="cursor-pointer text-blue-600" onClick={() => {
                            setPage("login")
                        }}>Log In instead ?</span>
                    </div>
                </form>
                <div className={`w-3/4 h-4/5 p-4 flex flex-col justify-center gap-8 ${sent ? "block" : "hidden"}`}>
                    Request Successful ! Please check your email.
                    <div className="text-mid">
                        <span className="cursor-pointer text-blue-600" onClick={() => {
                            setPage("login")
                        }}>Log In instead ?</span>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}
