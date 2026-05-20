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
        if(result.ok){
            window.location.href = "/";
        }
        setFormData({
             username:"",
             password:""
        })
    }

    return(
     <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" placeholder="enter username" value={formData.username} onChange={handleInputChange} name="username" id="username"/>
        <br/>
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="enter password" value={formData.password} onChange={handleInputChange} name="password" id="password"/>
        <br/>
        <button>Submit</button>
     </form>
    )
}

export default Login