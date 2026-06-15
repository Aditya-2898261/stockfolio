import { useState } from "react"

function Login(){
    let [formData,setFormData] = useState({
        username:"",
        password:""
    });

    let handleInputChange = (event) =>{
        setFormData((currData) => ({
            ...currData,[event.target.name] : event.target.value
        }))
    }

    let handleSubmit = async(event) =>{
        event.preventDefault();
        let result = await fetch("http://localhost:3000/users/login",{
            method:"POST",
            headers:{ "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(formData)
        })
        let data = await result.text();
        if(!result.ok){
          alert(data);
          return;
        }
        if(result.ok){
            window.location.href = "/";
        }
        setFormData({
             username:"",
             password:""
        })
    }

   return(
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-xl w-96 flex flex-col gap-5">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-gray-500 text-sm mt-1">Login to your Stockfolio account</p>
      </div>
      
      <div className="flex flex-col gap-1">
        <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
        <input required type="text" placeholder="Enter username" value={formData.username} onChange={handleInputChange} name="username" id="username" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
        <input required type="password" placeholder="Enter password" value={formData.password} onChange={handleInputChange} name="password" id="password" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
      </div>

      <button className="bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition">Login</button>
    </form>
  </div>
)
}

export default Login