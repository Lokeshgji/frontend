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

if(!name){
    alert("Name is required")
    return
  }

  if(!email){
    alert("Email is required")
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(!emailRegex.test(email)){
  alert("Invalid email format")
  return
}

  if(!password){
    alert("Password is required")
    return
  }

try{

await axios.post(
"http://localhost:8080/signup",
{
name,
email,
password
}
)

alert("Account created. Please login.")

router.push("/login")

}catch(err: any){

  console.error(err)

  alert(
    err?.response?.data?.error || "Signup failed"
  )

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