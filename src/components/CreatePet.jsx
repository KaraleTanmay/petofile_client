import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"

const initialValues = {
    name: "",
    profile: "",
    type: "",
    species: "",
    breed: "",
    age: "",
    lifeStage: "",
    gender: "",
    size: "",
    color: "",
    temperment: "",
    specialFeature: "",
    healthStatus: "",
    isVaccinated: "",
    isSpayedOrNeutered: "",
    dietaryNeeds: "",
    exerciseRequirements: "",
    trainingLevel: "",
    description: "",
    adoptionFee: "",
    location: ""
}

const validationSchema = Yup.object({
    name: Yup.string().max(20, "only 20 characters are allowed"),
    profile: Yup.string().required("required"),
    type: Yup.string().required("required"),
    species: Yup.string().required("required"),
    breed: Yup.string(),
    age: Yup.number(),
    lifeStage: Yup.string().required("required"),
    gender: Yup.string().required("required"),
    size: Yup.string().required("required"),
    color: Yup.string(),
    temperment: Yup.string(),
    specialFeature: Yup.string(),
    healthStatus: Yup.string(),
    isVaccinated: Yup.boolean().required("required"),
    isSpayedOrNeutered: Yup.boolean(),
    dietaryNeeds: Yup.string(),
    exerciseRequirements: Yup.string(),
    trainingLevel: Yup.boolean(),
    description: Yup.string(),
    adoptionFee: Yup.number().required("required"),
    location: Yup.string().required("required"),
})

export default function CreatePet(props) {

    const navigate = useNavigate()

    const handleSubmit = async (values) => {
        console.log(values)
        try {
            const result = await axios({
                method: "post",
                url: "https://petofile-api.onrender.com/pets/",
                data: values,
                withCredentials: true
            })
            if (result) {
                navigate("/get-info/" + result.data.data.pet._id)
            }
        } catch (error) {
            console.log(error)
            navigate("/error-404")
        }
    }

    useEffect(() => {
        if (!props.logged.email) {
            navigate('/login')
        }
    }, [])

    return (
        <div className='w-[50%] h-full m-auto my-8 font-boxy'>
            <div className='text-[35px] font-bold my-4'>
                Pet Form
            </div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form className='flex flex-col justify-center items-start gap-y-4 '>
                    <div className="flex flex-col w-[90%] gap-4">
                        <label htmlFor="name" className="text-md font-bold"> Name :  <span className='text-red-500 text-'> <ErrorMessage name='name' /> </span></label>
                        <Field type="text" id="name" name="name" className="w-full py-1 px-3 rounded-lg focus:outline-none border-[2px]" />

                    </div>
                    <div className="flex flex-col w-[90%] gap-4">
                        <label htmlFor="profile" className="text-md font-bold"> profile : <span className='text-red-500 text-sm'> <ErrorMessage name='profile' /></span></label>
                        <Field type="text" id="profile" name="profile" className="w-full py-1 px-3 rounded-lg focus:outline-none border-[2px]" />

                    </div>
                    <div className="flex flex-col justify-center items-start gap-2 border-[2px] shadow-sm w-[90%] p-2 rounded-lg">
                        <div className="text-md font-bold">Type : <span className='text-red-500 text-sm'> <ErrorMessage name='type' /></span></div>
                        {["exotic", "bird", "aquatic", "domestic", "other"].map(
                            (ele, i) => {
                                return (
                                    <div key={i} className="flex justify-center items-center gap-1 text-md">
                                        <Field type="radio" id={ele} name="type" value={ele} />
                                        <label htmlFor={ele}>{ele}</label>
                                    </div>
                                );
                            }
                        )}

                    </div>
                    <div className="flex flex-col w-[90%] gap-4">
                        <label htmlFor="species" className="text-md font-bold"> species : <span className='text-red-500 text-sm'> <ErrorMessage name='species' /></span></label>
                        <Field type="text" id="species" name="species" className="w-full py-1 px-3 rounded-lg focus:outline-none border-[2px]" />

                    </div>
                    <div className="flex flex-col w-[90%] gap-4">
                        <label htmlFor="breed" className="text-md font-bold"> breed : <span className='text-red-500 text-sm'> <ErrorMessage name='breed' /></span></label>
                        <Field type="text" id="breed" name="breed" className="w-full py-1 px-3 rounded-lg focus:outline-none border-[2px]" />

                    </div>
                    <div className="flex flex-col w-[90%] gap-4">
                        <label htmlFor="age" className="text-md font-bold"> age : <span className='text-red-500 text-sm'> <ErrorMessage name='age' /></span></label>
                        <Field type="number" id="age" name="age" className="w-[20%] py-1 px-3 rounded-lg focus:outline-none border-[2px]" />

                    </div>
                    <div className="flex flex-col w-[90%] gap-4">
                        <label htmlFor="location" className="text-md font-bold"> location : <span className='text-red-500 text-sm'> <ErrorMessage name='location' /></span></label>
                        <Field type="text" id="location" name="location" className="w-full py-1 px-3 rounded-lg focus:outline-none border-[2px]" />
                    </div>
                    <div className="flex flex-col justify-center items-start gap-2 border-[2px] shadow-sm w-[90%] p-2 rounded-lg">
                        <div className="text-md font-bold">Lifestage : <span className='text-red-500 text-sm'> <ErrorMessage name='lifeStage' /></span></div>
                        {["newborn", "young", "adult"].map((ele, i) => {
                            return (
                                <div key={i} className="flex justify-center items-center gap-1 text-md">
                                    <Field
                                        type="radio"
                                        id={ele}
                                        name="lifeStage"
                                        value={ele}

                                    />
                                    <label htmlFor={ele}>{ele} </label>
                                </div>
                            );
                        })}

                    </div>
                    <div className="flex flex-col justify-center items-start gap-2 border-[2px] shadow-sm w-[90%] p-2 rounded-lg">
                        <div className="text-md font-bold">Size : <span className='text-red-500 text-sm'> <ErrorMessage name='size' /></span></div>
                        {["small", "medium", "large"].map((ele, i) => {
                            return (
                                <div key={i} className="flex justify-center items-center gap-1 text-md">
                                    <Field type="radio" id={ele} name="size" value={ele} />
                                    <label htmlFor={ele}>{ele} </label>
                                </div>
                            );
                        })}

                    </div>
                    <div className="flex flex-col justify-center items-start gap-2 border-[2px] shadow-sm w-[90%] p-2 rounded-lg">
                        <div className="text-md font-bold">Gender : <span className='text-red-500 text-sm'> <ErrorMessage name='gender' /></span></div>
                        {["male", "female", "unknown"].map((ele, i) => {
                            return (
                                <div key={i} className="flex justify-center items-center gap-1 text-md">
                                    <Field type="radio" id={ele} name="gender" value={ele} />
                                    <label htmlFor={ele}>{ele} </label>
                                </div>
                            );
                        })}

                    </div>
                    <div className="flex flex-col justify-center items-start gap-2 border-[2px] shadow-sm w-[90%] p-2 rounded-lg">
                        <div className="text-md font-bold">Temperment : <span className='text-red-500 text-sm'> <ErrorMessage name='temperment' /></span></div>
                        {["friendly", "playful", "calm", "energetic", "protective", "independent", "aggressive"].map((ele, i) => {
                            return (
                                <div key={i} className="flex justify-center items-center gap-1 text-md">
                                    <Field type="radio" id={ele} name="temperment" value={ele} />
                                    <label htmlFor={ele}>{ele} </label>
                                </div>
                            );
                        })}

                    </div>

                    <div className="flex flex-col w-[90%] gap-4">
                        <label htmlFor="color" className="text-md font-bold"> color : <span className='text-red-500 text-sm'> <ErrorMessage name='color' /></span></label>
                        <Field type="text" id="color" name="color" className="w-full py-1 px-3 rounded-lg focus:outline-none border-[2px]" />

                    </div>
                    <div className="flex flex-col w-[90%] gap-4">
                        <label htmlFor="specialFeatures" className="text-md font-bold"> specialFeatures : <span className='text-red-500 text-sm'> <ErrorMessage name='specialFeatures' /></span></label>
                        <Field as="textarea" id="specialFeatures" name="specialFeatures" className="w-full py-1 px-3 rounded-lg focus:outline-none border-[2px]" />

                    </div>
                    <div className="flex flex-col justify-center items-start gap-2 border-[2px] shadow-sm w-[90%] p-2 rounded-lg">
                        <div className="text-md font-bold">Health Status : <span className='text-red-500 text-sm'> <ErrorMessage name='healthStatus' /></span></div>
                        {["excellent", "good", "poor"].map(
                            (ele, i) => {
                                return (
                                    <div key={i} className="flex justify-center items-center gap-1 text-md">
                                        <Field type="radio" id={ele} name="healthStatus" value={ele} />
                                        <label htmlFor={ele}>{ele}</label>
                                    </div>
                                );
                            }
                        )}

                    </div>
                    <div className="flex flex-col justify-center items-start gap-2 border-[2px] shadow-sm w-[90%] p-2 rounded-lg">
                        <div className="text-md font-bold">Vaccinated : <span className='text-red-500 text-sm'> <ErrorMessage name='isVaccinated' /></span></div>
                        {["true", "false"].map(
                            (ele, i) => {
                                return (
                                    <div key={i} className="flex justify-center items-center gap-1 text-md">
                                        <Field type="radio" id={ele} name="isVaccinated" value={ele} />
                                        <label htmlFor={ele}>{ele}</label>
                                    </div>
                                );
                            }
                        )}

                    </div>
                    <div className="flex flex-col justify-center items-start gap-2 border-[2px] shadow-sm w-[90%] p-2 rounded-lg">
                        <div className="text-md font-bold">Neutrated : <span className='text-red-500 text-sm'> <ErrorMessage name='isSpayedOrNeutered' /></span></div>
                        {["true", "false"].map(
                            (ele, i) => {
                                return (
                                    <div key={i} className="flex justify-center items-center gap-1 text-md">
                                        <Field type="radio" id={ele + "nu"} name="isSpayedOrNeutered" value={ele} />
                                        <label htmlFor={ele + "nu"}>{ele}</label>
                                    </div>
                                );
                            }
                        )}

                    </div>
                    <div className="flex flex-col justify-center items-start gap-2 border-[2px] shadow-sm w-[90%] p-2 rounded-lg">
                        <div className="text-md font-bold">trained : <span className='text-red-500 text-sm'> <ErrorMessage name='trainingLevel' /></span></div>
                        {["true", "false"].map(
                            (ele, i) => {
                                return (
                                    <div key={i} className="flex justify-center items-center gap-1 text-md">
                                        <Field type="radio" id={ele + "tr"} name="trainingLevel" value={ele} />
                                        <label htmlFor={ele + "tr"} name="trainingLevel">{ele}</label>
                                    </div>
                                );
                            }
                        )}

                    </div>
                    <div className="flex flex-col w-[90%] gap-4">
                        <label htmlFor="dietaryNeeds" className="text-md font-bold"> dietaryNeeds : <span className='text-red-500 text-sm'> <ErrorMessage name='dietaryNeeds' /></span></label>
                        <Field as="textarea" id="dietaryNeeds" name="dietaryNeeds" className="w-full py-1 px-3 rounded-lg focus:outline-none border-[2px]" />

                    </div>
                    <div className="flex flex-col w-[90%] gap-4">
                        <label htmlFor="exerciseRequirements" className="text-md font-bold"> exerciseRequirements : <span className='text-red-500 text-sm'> <ErrorMessage name='exerciseRequirements' /></span></label>
                        <Field as="textarea" id="exerciseRequirements" name="exerciseRequirements" className="w-full py-1 px-3 rounded-lg focus:outline-none border-[2px]" />

                    </div>
                    <div className="flex flex-col w-[90%] gap-4">
                        <label htmlFor="description" className="text-md font-bold"> description : <span className='text-red-500 text-sm'> <ErrorMessage name='description' /></span></label>
                        <Field as="textarea" id="description" name="description" className="w-full py-1 px-3 rounded-lg focus:outline-none border-[2px]" />

                    </div>
                    <div className="flex flex-col w-[90%] gap-4">
                        <label htmlFor="adoptionFee" className="text-md font-bold"> adoption Fee : <span className='text-red-500 text-sm'> <ErrorMessage name='adoptionFee' /></span></label>
                        <Field type="number" id="adoptionFee" name="adoptionFee" className="w-[20%] py-1 px-3 rounded-lg focus:outline-none border-[2px]" />

                    </div>
                    <button type='submit' className='bg-dark py-1 px-4 rounded-lg text-white'>submit</button>
                    {/* <div>
                    </div> */}
                </Form>
            </Formik>
        </div>
    )
}
