import { ErrorMessage, Form, Field, Formik } from 'formik';
import React from 'react'
import { useEffect } from 'react';
import * as Yup from "yup"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initialValues = {
    oldPassword: "",
    password: "",
    passwordConfirm: ""
}

const validationSchema = Yup.object({
    oldPassword: Yup.string().required("required").min(6, "password should be minimum of 6 characters"),
    password: Yup.string().required("required").min(6, "password should be minimum of 6 characters").test('passwords-match', 'New password must be different from old password', function (value) {
        return value !== this.parent.oldPassword;
    }),
    passwordConfirm: Yup.string().required("required").min(6, "password should be minimum of 6 characters").oneOf([Yup.ref("password"), null], "passwords do not match")
})

export default function UpdatePassword(props) {

    const navigate = useNavigate()
    useEffect(() => {
        if (!props.logged?.email) {
            navigate("/login")
        }
    }, [])

    const handleSubmit = async (values) => {
        try {
            const result = await axios({
                method: 'patch',
                url: "/users/change-password",
                data: values,
                withCredentials: true
            })
            if (result) {
                navigate("/my-account")
            }
        } catch (error) {
            console.log("error !! " + error)
            navigate("/error-404")
        }
    }

    return (
        <div className='w-full h-[94vh] flex justify-center items-center font-boxy'>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                <Form className='w-[30%] flex flex-col justify-center items-center p-8 rounded-lg bg-dark gap-4'>
                    {

                        [
                            {
                                title: "Old Password",
                                tag: "oldPassword"
                            },
                            {
                                title: "New Password",
                                tag: "password"
                            },
                            {
                                title: "Confirm Password",
                                tag: "passwordConfirm"
                            }
                        ].map((ele, i) => {
                            return (
                                <div key={i} className='flex flex-col justify-center items-center w-full text-white gap-2'>
                                    <div className=' flex justify-between w-full px-2'>
                                        <span>{ele.title}</span><span className='text-red-600'>
                                            <ErrorMessage name={ele.tag} />
                                        </span>
                                    </div>
                                    <Field name={ele.tag} id={ele.tag} placeholder={ele.tag} className="bg-beige w-full py-1 px-3 rounded-lg focus:outline-none border-[2px] text-dark" />

                                </div>
                            )
                        })
                    }
                    <button type='submit' className='bg-beige py-1 px-4 rounded-lg text-dark text-center'>Change Password</button>
                </Form>
            </Formik>
        </div>
    )
}
