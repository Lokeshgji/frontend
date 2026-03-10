"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function Navbar(){

const router = useRouter()
const pathname = usePathname()

const [loggedIn,setLoggedIn] = useState(false)

useEffect(()=>{

const token = localStorage.getItem("token")
setLoggedIn(!!token)

},[pathname])

const logout = () => {

localStorage.removeItem("token")
setLoggedIn(false)

router.push("/")

}

return(

<nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/30">

<div className="flex items-center justify-between px-6 py-4 text-white">

<Link href="/" className="text-2xl font-bold hover:text-indigo-300 transition">
🚀 ValuableBlogs
</Link>

<div className="flex items-center gap-8">

<Link href="/articles" className="hover:text-indigo-300 transition">
Explore
</Link>

{loggedIn && (
<Link href="/dashboard" className="hover:text-indigo-300 transition">
Write
</Link>
)}

{/* Logged out */}

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

{/* Logged in */}

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