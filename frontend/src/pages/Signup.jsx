import { useState } from "react"

function Signup(){
    let [formData,setFormData] = useState({
        username:"",
        email:"",
        password:"",
        balance:""
    })

    let handleInputChange = (event) => {
        setFormData((currData) => ({
            ...currData,[event.target.name]:event.target.value
        }))
    }

    let handleSubmit = async(event) => {
        event.preventDefault();
        let result = await fetch("http://localhost:3000/users/signup",{
            method:"POST",
            headers:{ "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(formData)
        });

        let data = await result.text();
    
        if(!result.ok){
            alert(data);
            return;
        }
    
        window.location.href = "/stocks";
    }


    return(
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-xl w-96 flex flex-col gap-5">

            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800">Sign Up</h2>
                <p className="text-gray-500 text-sm mt-1">Hey there! Signup and set up your account</p>
            </div>

           <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
            <input  required type="text" placeholder="enter username" value={formData.username} name="username" id="username" onChange={handleInputChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div>

            <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input  required type="email" placeholder="enter email" value={formData.email} name="email" id="email" onChange={handleInputChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div>

             <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input required  type="password" placeholder="enter password" value={formData.password} name="password" id="password" onChange={handleInputChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div>

             <div className="flex flex-col gap-1">
            <label htmlFor="balance" className="text-sm font-medium text-gray-700">Balance</label>
            <input required min="1" type="number" placeholder="enter balance" value={formData.balance} name="balance" id="balance" onChange={handleInputChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div>

            <button className="bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition">Submit</button>
        </form>
        </div>
    )
}

export default Signup