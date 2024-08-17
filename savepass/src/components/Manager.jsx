import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()

    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }

    }, [])


    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "icons/eyecross.png"
        }

    }

    const copyText = (text) => {
        toast('copied to clipboard', {
            position: "top-bottom",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
           
            });
        navigator.clipboard.writeText(text);
    }

    const savePassword = () => {
        
       if(form.site.length>3 && form.username.length>3 && form.password.length>3){

           setPasswordArray([...passwordArray, {...form, id:uuidv4() }])
           setform({ site: "", username: "", password: "" })
           localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id:uuidv4() }]))
           console.log([...passwordArray, form]);
        }
        else{
            toast("Error: Password not saved!"), {
                position: "top-bottom",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
               
                }
        }

    }

    const deletePassword = (id) => {
     
        // console.log("Deleting password with id", id);
        let c=confirm("Do you really want to delete ?")
        if (c) {    
            
            setPasswordArray(passwordArray.filter(item=>item.id!==id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
        }
        // console.log([...passwordArray, form]);

    }


    const editPassword = (id) => { 
        console.log("Editing password with id", id);
        setform(passwordArray.filter(i=>id===id)[0])
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
        
        // setPasswordArray([...passwordArray, {...form, id:uuidv4() }])
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        // console.log([...passwordArray, form]);

    }






    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    return (<>

        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        transition= "Bounce"
/>
        {/* Same as */}
        <ToastContainer />


        
        <div className="mycontainer text-white  ">
            <h1 className='text-4xl font-bold text-center '>

                <span className='text-green-700' > &lt; </span>Save<span className='text-green-700' >PASS/&gt;</span>
            </h1>
            <p className='text-green-700 text-lg text-center' >Your Own Password Manager</p>

            <div className="text-black flex flex-col p-4    gap-8 items-center">
                <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-700 w-full p-4 py-1 ' type="text" name="site" id="site" />
                <div className="flex w-full justify-between gap-8 ">

                    <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-700 w-full p-4 py-1 ' type="text" name="username" id="username" />
                    <div className="relative">

                        <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-700 w-full p-4 py-1 ' type="password" name="password" id="password" />
                        <span className='absolute top-[3px] right-[3px] cursor-pointer' onClick={showPassword} >
                            <img ref={ref} className='p-1' width={26} src="/icons/eye.png" alt="eye" />
                        </span>
                    </div>

                </div>
                <button onClick={savePassword} className='text-white flex justify-center items-center bg-green-500 rounded-full px-8 gap-2 py-2 w-fit hover:bg-green-400 border-green-900 border-2 ' >
                    <span className="material-symbols-outlined">
                        enhanced_encryption
                    </span>Save</button>

            </div>

            <div className="passwords">
                <h2 className='font-bold text-2xl py-4' >Your Passwords</h2>
                {passwordArray.length === 0 && <div>No Password to show</div>}
                {passwordArray.length != 0 && <table className='table-auto w-full rounded-md overflow-hidden  '>
                    <thead className='bg-green-800 text-white' >
                        <tr>
                            <th className='py-2'>Site</th>
                            <th className='py-2'>Username</th>
                            <th className='py-2'>Password</th>
                            <th className='py-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {passwordArray.map((item, index) => {
                            return <tr key={index}>
                                <td className=' py-2 text-center'>
                                    <div className=' flex justify-center items-center'>
                                        <a href={item.site} target='_blank' >{item.site}</a>
                                        <div className='cursor-pointer w-7 ' >

                                            <span className="material-symbols-outlined  " onClick={() => { copyText(item.site) }}>
                                                content_copy
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className='py-2 text-center'>
                                    <div className=' flex justify-center items-center'>
                                        <span>{item.username} </span>
                                        <div className='cursor-pointer w-7 ' >

                                            <span className="material-symbols-outlined  " onClick={() => { copyText(item.username) }}>
                                                content_copy
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className=' py-2 text-center '>
                                    <div className=' flex justify-center items-center'>
                                        <span>{item.password} </span>
                                        <div className='cursor-pointer w-7 ' >

                                            <span className="material-symbols-outlined  " onClick={() => { copyText(item.password) }}>
                                                content_copy
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className='justify-center items-center py-2 text-center '>

                                <span className="material-symbols-outlined cursor-pointer mx-1 " onClick={() => { editPassword(item.id) }}>
                                                edit
                                            </span>
                                <span className="material-symbols-outlined cursor-pointer mx-1 " onClick={() => { deletePassword(item.id) }}>
                                                delete
                                            </span>
                                            

                                </td>
                            </tr>
                        })}
                    </tbody>





                </table>}
            </div>

        </div>



    </>
    )

}

export default Manager
