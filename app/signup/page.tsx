"use client"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function Signup(){

const router = useRouter()

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const signup = async () => {

try{

const res = await axios.post(
"http://localhost:8080/signup",
{
name,
email,
password
}
)

alert("Signup successful")

router.push("/login")

}catch(err:any){

if(err.response){

alert(err.response.data.error || "Signup failed")

}else{

alert("Network error")

}

}

}

return(

<div className="p-10 max-w-md mx-auto">

<h1 className="text-2xl font-bold mb-6">
Signup
</h1>

<input
className="w-full p-3 mb-4 bg-gray-800 rounded"
placeholder="Name"
onChange={e=>setName(e.target.value)}
/>

<input
className="w-full p-3 mb-4 bg-gray-800 rounded"
placeholder="Email"
onChange={e=>setEmail(e.target.value)}
/>

<input
type="password"
className="w-full p-3 mb-4 bg-gray-800 rounded"
placeholder="Password"
onChange={e=>setPassword(e.target.value)}
/>

<button
className="bg-blue-600 px-6 py-3 rounded"
onClick={signup}
>
Create Account
</button>

<p className="mt-4">
Already have an account?
<a className="text-blue-400 ml-2" href="/login">
Login
</a>
</p>

</div>

)
}