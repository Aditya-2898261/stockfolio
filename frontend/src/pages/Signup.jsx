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
        if(result.ok){
            window.location.href = "/";
        }
        setFormData({
        username:"",
        email:"",
        password:"",
        balance:""
        })
    }


    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="enter username" value={formData.username} name="username" id="username" onChange={handleInputChange}/>
            <br/>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="enter email" value={formData.email} name="email" id="email" onChange={handleInputChange}/>
            <br/>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="enter password" value={formData.password} name="password" id="password" onChange={handleInputChange}/>
            <br/>
            <label htmlFor="balance">Balance</label>
            <input type="number" placeholder="enter balance" value={formData.balance} name="balance" id="balance" onChange={handleInputChange}/>
            <br/>
            <button>Submit</button>
        </form>
    )
}

export default Signup