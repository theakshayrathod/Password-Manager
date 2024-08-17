import React from 'react'

const Footer = () => {
    return (
        <div className='flex flex-col justify-center items-center bg-black text-white left-0 fixed bottom-0 w-full ' > 
            <div className="logo font-bold  text-white text-2xl  ">

                <span className='text-green-7000' > &lt; </span>Save<span className='text-green-700' >PASS/&gt;</span>
            </div>
            <div className='flex justify-center items-center'>

                Created with <img className='w-7 mx-2 ' src="icons/heart.png" alt="" /> by Akshay Rathod
            </div>
        </div>
    )
}

export default Footer
