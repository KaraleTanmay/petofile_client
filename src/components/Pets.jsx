import React, { useEffect, useState } from "react";
import Card from "./factory/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const initialValues = {
	type: [],
	species: "",
	breed: "",
	minPrice: 0,
	maxPrice: "",
	lifeStage: [],
	size: [],
	gender: [],
	location: "",
	sort: "-dateAdded",
};

const validationSchema = Yup.object({});

export default function Pets(props) {
	const navigate = useNavigate();
	const [pets, setPets] = useState([]);
	const [page, setPage] = useState(1);
	const [queryString, setQueryString] = useState("")

	const getPets = async (queryString) => {
		console.log("running")
		try {
			const result = await axios({
				method: "get",
				url: "https://petofile-api.onrender.com/pets/?" + queryString + `&page=${page}`,
				withCredentials: true,
			});
			if (!props.logged.email) {
				props.setLogged(result.data.data.user)
			}

			setPets(result.data.data.pets);
		} catch (error) {
			if (error.response.status) {
				navigate("/login")
			}
			else {
				navigate("/error-404")
			}
		}
	};

	useEffect(() => {

		getPets(queryString)
	}, [page, queryString]);

	const handleSubmit = (values) => {
		console.log(values);

		let query = "adoptionFee[gte]=" + values.minPrice;
		if (!values.maxPrice == "") {
			query = query + "&adoptionFee[lte]=" + values.maxPrice;
		}
		values.type.forEach((ele) => {
			query = query + "&type=" + ele
		})
		values.lifeStage.forEach((ele) => {
			query = query + "&lifeStage=" + ele
		})
		values.size.forEach((ele) => {
			query = query + "&size=" + ele
		})
		values.gender.forEach((ele) => {
			query = query + "&gender=" + ele
		})
		if (!values.species == "") {
			console.log("haa")
			query = query + "&species=" + values.species
		}
		if (!values.breed == "") {
			query = query + "&breed=" + values.breed
		}
		if (!values.location == "") {
			query = query + "&location=" + values.location
		}
		query = query + "&sort=" + values.sort
		setQueryString((value) => value = query)
	};

	return (
		<div className="flex w-full h-[94vh]">
			<div className="h-full w-[30%] flex flex-col justify-start items-center p-8 overflow-y-scroll m-auto">
				<Formik
					onSubmit={handleSubmit}
					initialValues={initialValues}
					validationSchema={validationSchema}
				>
					<Form className="flex flex-col justify-center items-start gap-y-4 font-boxy">
						<div className="text-[30px] font-bold">Filters</div>

						<div className="flex flex-col gap-2 border-[2px] shadow-sm w-[90%] p-2 rounded-lg">
							<div className="text-md font-bold">Type :</div>
							<div className="flex flex-col justify-center items-start">
								{["exotic", "bird", "aquatic", "domestic", "other"].map(
									(ele, i) => {
										return (
											<div key={i} className="flex justify-center items-center gap-1 text-md">
												<Field type="checkbox" id={ele} name="type" value={ele} />
												<label htmlFor={ele}>{ele} </label>
											</div>
										);
									}
								)}
							</div>
						</div>

						<div className="flex flex-col w-[90%] gap-4">
							<label htmlFor="species" className="text-md font-bold"> Species :</label>
							<Field placeholder="dog" type="text" id="species" name="species" className="w-full py-1 px-3 rounded-lg focus:outline-none border-[2px]" />
						</div>
						<div className="flex flex-col w-[90%] gap-4">
							<label htmlFor="breed" className="text-md font-bold"> Breed :</label>
							<Field placeholder="bulldog" type="text" id="breed" name="breed" className="w-full py-1 px-3 rounded-lg focus:outline-none border-[2px]" />
						</div>

						<div className="flex flex-col w-[90%] gap-4">
							<div className="text-md font-bold">Price :</div>

							<div className="flex gap-4 justify-between items-center">
								<label htmlFor="minPrice"> Min :</label>
								<Field type="text" id="minPrice" name="minPrice" className="w-[60%] py-1 px-3 rounded-lg focus:outline-none border-[2px]" />
							</div>
							<div className="flex gap-4 justify-between items-center">
								<label htmlFor="maxPrice">Max :</label>
								<Field type="text" id="maxPrice" name="maxPrice" className="w-[60%] py-1 px-3 rounded-lg focus:outline-none border-[2px]" />
							</div>

						</div>
						<div className="flex flex-col gap-2 border-[2px] shadow-sm w-[90%] p-2 rounded-lg">
							<div className="text-md font-bold">Life Stage :</div>
							<div className="flex flex-col justify-center items-start">
								{["newborn", "young", "adult"].map(
									(ele, i) => {
										return (
											<div key={i} className="flex justify-center items-center gap-1 text-md">
												<Field
													type="checkbox"
													id={ele}
													name="lifeStage"
													value={ele}
												/>
												<label htmlFor={ele}>{ele} </label>
											</div>
										);
									}
								)}
							</div>
						</div>

						<div className="flex flex-col gap-2 border-[2px] shadow-sm w-[90%] p-2 rounded-lg">
							<div className="text-md font-bold">Size :</div>
							<div className="flex flex-col justify-center items-start">
								{["small", "medium", "large"].map(
									(ele, i) => {
										return (
											<div key={i} className="flex justify-center items-center gap-1 text-md">
												<Field type="checkbox" id={ele} name="Size" value={ele} />
												<label htmlFor={ele}>{ele} </label>
											</div>
										);
									}
								)}
							</div>
						</div>

						<div className="flex flex-col gap-2 border-[2px] shadow-sm w-[90%] p-2 rounded-lg">
							<div className="text-md font-bold">Gender :</div>
							<div className="flex flex-col justify-center items-start">
								{["male", "female"].map(
									(ele, i) => {
										return (
											<div key={i} className="flex justify-center items-center gap-1 text-md">
												<Field type="checkbox" id={ele} name="gender" value={ele} />
												<label htmlFor={ele}>{ele} </label>
											</div>
										);
									}
								)}
							</div>
						</div>

						<div className="flex flex-col w-[90%] gap-4">
							<label htmlFor="location" className="text-md font-bold"> Location :</label>
							<Field placeholder="pune" type="text" id="location" name="location" className="w-full py-1 px-3 rounded-lg focus:outline-none border-[2px]" />
						</div>

						<div className="flex flex-col w-[90%] gap-4">
							<div className="text-md font-bold"> Sort By :</div>

							<div>
								<Field as="select" id="sort" name="sort" className="w-full py-1 px-3 rounded-lg focus:outline-none border-[2px] flex flex-y-2">
									{/* <option value="">Select an option</option> */}


									<option value="adoptionFee">Price (Low to High)</option>
									<option value="-adoptionFee">Price (High to Low)</option>
									<option value="-dateAdded">Date Added (Newest)</option>
									<option value="dateAdded">Date Added (Oldest)</option>
									<option value="name">Alphabetical</option>

								</Field>
							</div>
						</div>
						<button type="submit" className="bg-dark py-1 px-4 rounded-lg text-white">apply</button>
					</Form>
				</Formik>
			</div>
			<div className="flex flex-col h-full w-[70%] overflow-y-scroll ">
				<div className="flex w-full flex-wrap justify-between items-start p-4">
					{
						pets.map((ele, i) => {
							return (
								<div key={i} className="w-[45%] my-4 mx-auto" >
									<Card pet={ele} num={i} />
								</div>
							)
						})
					}
					{
						pets.length == 0 && <div className="text-center">No results found.</div>
					}
				</div>
				<div className="w-full flex justify-between items-center px-8 my-2 h-[10vh]">
					<button className="py-1 px-2 text-white bg-dark rounded-lg" onClick={() => {
						setPage((page) => page - 1)
					}} disabled={page <= 1}>prev page</button>
					<button className="py-1 px-2 text-white bg-dark rounded-lg" onClick={() => {
						setPage((page) => page + 1)
					}} disabled={pets.length === 0 || pets.length < 20}>next page</button>
				</div>
			</div>
		</div>
	);
}
