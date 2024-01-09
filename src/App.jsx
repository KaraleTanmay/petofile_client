import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Pets from "./components/Pets";
import GetInfo from "./components/GetInfo";
import Auth from "./components/Auth";
import User from "./components/User";
import Navbar from "./components/Navbar";
import CreatePet from "./components/CreatePet";
import UpdatePassword from "./components/UpdatePassword";
import ErrorPage from "./components/ErrorPage";

export default function App() {

    const [logged, setLogged] = useState({});


    return (
        <>

            {logged.name && !window.location.href.endsWith("/login") && <Navbar logged={logged} />}
            <Routes>

                <Route path="/login" element={<Auth setLogged={setLogged} />} />
                <Route path="/" element={<Pets logged={logged} setLogged={setLogged} />} />
                <Route path="/my-account" element={<User logged={logged} setLogged={setLogged} />} />
                <Route path="/get-info/:id" element={<GetInfo logged={logged} setLogged={setLogged} />} />
                <Route path="/create-pet" element={<CreatePet logged={logged} setLogged={setLogged} />} />
                <Route path="/update-password" element={<UpdatePassword logged={logged} setLogged={setLogged} />} />
                <Route path="/error-404" element={<ErrorPage />} />
            </Routes>

        </>
    );
}
