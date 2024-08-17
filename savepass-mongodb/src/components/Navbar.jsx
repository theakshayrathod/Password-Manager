import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-black text-white  '>
            <div className="mycontainer flex justify-between px-4 items-center h-14 py-5">

                <div className="logo font-bold  text-white text-2xl  ">
                   
                   <span className='text-green-7000' > &lt; </span>Save<span className='text-green-700' >PASS/&gt;</span>
                    </div>
                {/* <ul>
                    <li className='flex gap-4' >
                        <a className='hover:font-bold' href="/">Home</a>
                        <a className='hover:font-bold' href="#">About</a>
                        <a className='hover:font-bold' href="#">Contact</a>
                    </li>


                </ul> */}
                <button className='text-white flex gap-4 justify-between items-center ' >
                    <img className='invert w-8' src="icons/github.svg" alt="" /> <span className='font-bold'> GitHub</span>
                </button>
            </div>

        </nav>
    )
}

export default Navbar
