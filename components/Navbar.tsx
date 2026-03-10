"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Navbar(){

const router = useRouter()
const [loggedIn,setLoggedIn] = useState(false)

useEffect(()=>{
const token = localStorage.getItem("token")
setLoggedIn(!!token)
},[])

const logout = () => {
localStorage.removeItem("token")
setLoggedIn(false)
router.push("/")
}

return(

<nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/30">

<div className="flex items-center justify-between px-4 py-4 text-white">

<Link href="/" className="text-2xl font-bold hover:text-indigo-300 transition">
🚀 ValuableBlogs
</Link>

<div className="flex items-center gap-6">

<Link href="/articles" className="hover:text-indigo-300 transition">
Explore
</Link>

{loggedIn && (
<Link href="/dashboard" className="hover:text-indigo-300 transition">
Write
</Link>
)}

{!loggedIn && (
<>
<Link href="/login" className="hover:text-indigo-300 transition">
Login
</Link>

<Link
href="/signup"
className="bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
>
Signup
</Link>
</>
)}

{loggedIn && (
<button
onClick={logout}
className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
>
Logout
</button>
)}

</div>

</div>

</nav>

)

}