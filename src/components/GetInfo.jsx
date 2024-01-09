import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Birds(props) {
    const { id } = useParams()
    const [pet, setPet] = useState({})
    const navigate = useNavigate()

    const getDate = () => {
        const date = new Date(pet.dateAdded)
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-based, so add 1
        const day = date.getDate();
        return (day + "/" + month + "/" + year)
    }

    const getInfo = async () => {
        try {
            const result = await axios({
                method: "get",
                url: `/pets/${id}`,
                withCredentials: true
            })
            if (!props.logged) {
                props.setLogged(result.data.data.user)
            }
            setPet(result.data.data.pet);
        } catch (error) {
            console.log(error)
            navigate("/error-404")
        }
    }
    useEffect(() => {
        getInfo();
    }, [])
    return <div className="w-[70%] mx-auto my-8 flex flex-col justify-center items-center gap-8">
        <div className="w-full flex flex-row justify-between items-center bg-dark p-8 rounded-[20px] font-boxy text-lg">
            <div className="w-3/5">
                <img src={pet.profile} alt="pet" className="rounded-lg border-[2px] " />
            </div>
            <div className="px-8 py-2 flex flex-col w-2/5 text-white gap-1">
                <div>Name : {pet.name || "unnamed"}</div>
                <div>Type : {pet.type}</div>
                <div>Species : {pet.species}</div>
                <div>Breed : {pet.breed}</div>
                <div>Age : {pet.age || "unknown"}</div>
                <div>Life Stage : {pet.lifeStage}</div>
                <div>Gender : {pet.gender}</div>
                <div>Size : {pet.size}</div>

                <div>Temperament : {pet.temperament}</div>
                <div>Health : {pet.healthStatus}</div>
                <div>Location : {pet.location}</div>
                <div>Adoption Fee : {pet.adoptionFee}</div>

                <div>Date Added : {
                    getDate(pet.dateAdded)
                }</div>
            </div>
        </div>
        <div className="w-full flex flex-col justify-center items-start px-8 py-4 gap-4 border-[3px] rounded-[20px] text-lg">
            <div>
                <div className="text-lg font-bold">Color : </div>
                <div> {pet.color}</div>
            </div>
            <div>
                <div className="text-lg font-bold">Special Features :</div>
                <div>{pet.specialFeatures}</div>
            </div>
            <div>
                <div className="text-lg font-bold">Description :</div>
                <div>{pet.description}</div>
            </div>
            <div>
                <div className="text-lg font-bold">Dietary Needs :</div>
                <div>{pet.dietaryNeeds}</div>
            </div>
            <div>
                <div className="text-lg font-bold">Exercise Requirements :</div>
                <div>{pet.exerciseRequirements}</div>
            </div>
            <div>
                <div><span className="text-lg font-bold">Vaccinated :</span> {pet.isVaccinated ? 'Yes' : 'No'}</div>
                <div><span className="text-lg font-bold">Spayed or Neutered :</span> {pet.isSpayedOrNeutered ? 'Yes' : 'No'}</div>
                <div><span className="text-lg font-bold">Training Level :</span> {pet.trainingLevel ? 'Yes' : 'No'}</div>
            </div>
        </div>
        <div className="w-full flex flex-col justify-center items-start px-8 py-4 gap-4 border-[3px] rounded-[20px] text-lg">
            <div className="text-[25px] font-bold">Owner</div>
            <div><span className="text-lg font-bold">Name : </span> {pet.owner?.name || "no Owner"}</div>
            <div><span className="text-lg font-bold">Email : </span>{pet.owner?.email} </div>
            <div><span className="text-lg font-bold">Phone : </span>{pet.owner?.phone} </div>
            <div><span className="text-lg font-bold">Location : </span>{pet.owner?.location}</div>
            {pet.owner?.socialMedia && <div><span className="text-lg font-bold">Social Media : </span> {pet.owner?.socialMedia}</div>}
            <div><span className="text-lg font-bold">Bio : </span> {pet.owner?.bio}</div>
        </div>
    </div>
}




