import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup"
import { Link, useNavigate } from "react-router-dom";
import Card from "./factory/Card";
import Cookies from 'js-cookie';


const defaultUserInitialValues = {
    name: "",
    bio: "",
    location: "",
    socialMedia: "",
    phone: ""
}

const formObject = [
    {
        title: "Name",
        tag: "name"
    },
    {
        title: "Phone No.",
        tag: "phone"
    },
    {
        title: "Location",
        tag: "location"
    },
    {
        title: "Social Media",
        tag: "socialMedia"
    },
    {
        title: "Bio",
        tag: "bio"
    }
]

const userValidationSchema = Yup.object({
    name: Yup.string().required("required").max(20, "only 20 characters are allowed"),
    bio: Yup.string().required("required"),
    location: Yup.string().required("required"),
    phone: Yup.string().required("required").length(10, "phone number should be 10 digit long")
})

export default function User(props) {

    const [userInitialValues, setUserInitialValues] = useState(defaultUserInitialValues)
    const [updateDisabled, setUpdateDisabled] = useState(false)
    const [petDisabled, setPetDisabled] = useState(false)
    const [user, setUser] = useState(props.logged)
    const navigate = useNavigate()

    const handleLogOut = () => {
        Cookies.remove("jwt")
        Cookies.remove("localhost")
        props.setLogged({})
        navigate("/")
    }

    const getMYAccount = async () => {
        try {
            const result = await axios({
                method: 'get',
                url: "https://petofile-api.onrender.com/users/my-account",
                withCredentials: true
            })
            if (result) {
                props.setLogged(result.data.data.user)
                setUser(result.data.data.user)
                console.log(result.data.data.user)
                let { name, bio, phone, socialMedia, location } = result.data.data.user
                if (name) {

                    setUserInitialValues((value) => value = { name, bio, phone, socialMedia, location })
                }
                if (name) {
                    setUpdateDisabled(true)
                    setPetDisabled(false)
                }


            }
        } catch (error) {
            if (error.response.status) {
                navigate("/login")
            }
            else {
                navigate("/error-404")
            }
        }
    }

    useEffect(() => {
        getMYAccount()
    }, [])

    const handleUserUpdate = async (values) => {
        console.log("run")
        try {
            const result = await axios({
                method: 'patch',
                url: "https://petofile-api.onrender.com/users/update-my-account",
                data: values,
                withCredentials: true
            })
            if (result) {
                // props.setLogged(result.data.data.email)
                let { name, bio, phone, socialMedia, location } = result.data.data.user

                setUserInitialValues({ name, bio, phone, socialMedia, location })
                if (name) {
                    setUpdateDisabled(true)
                    setPetDisabled(false)
                }
            }
        } catch (error) {
            console.log("error !! " + error)
        }
    }

    return <div className="w-[70%] h-full mx-auto my-8 flex justify-between items-start gap-8 font-boxy">
        <div className="w-[40%] flex flex-col gap-8">
            <Formik initialValues={userInitialValues} onSubmit={handleUserUpdate} validationSchema={userValidationSchema} enableReinitialize>
                <Form className="w-full flex flex-col gap-4">
                    {
                        formObject.map((ele, i) => {
                            return (
                                <div key={i} className="flex flex-col gap-2 justify-start items-start w-full">
                                    <label htmlFor={ele.tag} className="text-lg font-bold"> {ele.title} :</label>
                                    <Field type="text" id={ele.tag} as={ele.tag == "bio" ? "textarea" : ""} name={ele.tag} disabled={updateDisabled} className={`w-full py-1 px-3 rounded-lg focus:outline-none border-[2px] ${updateDisabled ? "bg-beige" : "bg-white"}`} />
                                    <ErrorMessage name={ele.tag} />
                                </div>
                            )
                        })
                    }

                    <div>

                        <button type="submit" className="bg-dark py-1 px-4 rounded-lg text-white" hidden={updateDisabled}>Submit</button>
                        <button type="button" className="bg-dark py-1 px-4 rounded-lg text-white" onClick={() => { setUpdateDisabled(false) }} hidden={!updateDisabled}>update account</button>
                    </div>

                </Form>
            </Formik>
            <div className="h-[2px] bg-platinum w-full" />
            <div className="flex justify-between items-center w-full">
                <Link to="/update-password">
                    <button className=" bg-dark py-1 px-4 rounded-lg text-white">update Password</button>
                </Link>
                <button className=" bg-dark py-1 px-4 rounded-lg text-white" onClick={handleLogOut}>Log Out</button>
            </div>
        </div>
        <div className="w-[60%] flex flex-col justify-center  items-center my-4 gap-4 px-4">
            <div className="w-full flex flex-col justify-start items-start border-[2px] rounded-lg p-4 min-h-[70vh] ">
                <div className="text-[25px] font-bold">Your Pets :</div>
                <div className="w-full flex h-[50vh] flex-wrap justify-between items-center overflow-y-scroll">
                    <div className="flex w-full  flex-wrap justify-between items-start p-4 ">
                        {
                            user.pets?.map((ele, i) => {
                                return (
                                    <div key={i} className="w-[75%] my-4 mx-auto" >
                                        <Card pet={ele} num={i} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    {user.pets?.length == 0 &&
                        <div>
                            You don't have any pets listed
                        </div>}
                </div>
            </div>
            <div className="my-3">
                <Link to="/create-pet"> <button className="w-full bg-dark py-1 px-4 rounded-lg text-white">create pet</button></Link>
            </div>

        </div>
    </div>;
}
