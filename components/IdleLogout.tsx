"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function IdleLogout(){

const router = useRouter()

useEffect(()=>{

let timeout: any

const logout = () => {

localStorage.removeItem("token")

alert("Logged out due to inactivity")

router.push("/login")

}

const resetTimer = () => {

clearTimeout(timeout)

timeout = setTimeout(logout, 60 * 60 * 1000) // 1 hour

}

window.addEventListener("mousemove", resetTimer)
window.addEventListener("keydown", resetTimer)
window.addEventListener("click", resetTimer)
window.addEventListener("scroll", resetTimer)

resetTimer()

return () => {

clearTimeout(timeout)

window.removeEventListener("mousemove", resetTimer)
window.removeEventListener("keydown", resetTimer)
window.removeEventListener("click", resetTimer)
window.removeEventListener("scroll", resetTimer)

}

},[])

return null

}