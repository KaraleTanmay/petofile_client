import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../images/logo.png"

export default function Navbar(props) {
    // console.log(props)
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/my-account")
    }
    return (
        <div className='font-boxy w-full h-[6vh] flex bg-dark justify-between items-center px-16 shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]'>
            <div className='Flex flex-row justify-center items-center text-white text-[30px] font-bold font-fun tracking-widest'><img src={logo} alt="logo" className='w-[5%] inline' />PETOFILE</div>
            <div className='cursor-pointer py-[2px] px-2 bg-white rounded-lg' onClick={handleClick}>My Account</div>
        </div>
    )
}
