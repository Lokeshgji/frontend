"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import api from "@/lib/api"

const SimpleMDE = dynamic(
  () => import("react-simplemde-editor"),
  { ssr: false }
)

import "easymde/dist/easymde.min.css"

export default function Dashboard(){

const router = useRouter()

const [title,setTitle] = useState("")
const [content,setContent] = useState("")
const [loading,setLoading] = useState(false)
const [articles,setArticles] = useState<any[]>([])
const [checkingAuth,setCheckingAuth] = useState(true)

useEffect(()=>{

const token = localStorage.getItem("token")

if(!token){
  router.replace("/login")
  return
}

setCheckingAuth(false)
fetchArticles()

},[])

const fetchArticles = async () => {

try{

const res = await axios.get("http://localhost:8080/articles")

setArticles(res.data || [])

}catch(err){
console.error(err)
}

}

const createSlug = (title:string) => {

return title
.toLowerCase()
.replace(/ /g,"-")
.replace(/[^\w-]+/g,"")

}

const publishArticle = async () => {

if (!title || !content) {
  alert("Please fill title and content")
  return
}

try{

setLoading(true)

const slug = createSlug(title)

const token = localStorage.getItem("token")

await axios.post(
  "http://localhost:8080/articles",
  {
    title,
    content,
    slug
  },
  {
     headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }
)

alert("Article published")

setTitle("")
setContent("")

fetchArticles()

}catch(err: any){

console.error(err)

alert(
err?.response?.data?.error ||
err?.response?.data ||
err.message ||
"Failed to publish"
)

}finally{

setLoading(false)

}

}

const deleteArticle = async (id:number) => {

const token = localStorage.getItem("token")

if(!confirm("Delete this article?")) return

try{

await api.delete(`/articles/${id}`,{
headers:{
Authorization:`Bearer ${token}`
}
})

alert("Article deleted")

setArticles(prev => prev.filter((a:any)=>a.id !== id))

}catch(err:any){

alert(
err?.response?.data?.error || "Delete failed"
)

}

}

const deleteAccount = async () => {

const token = localStorage.getItem("token")

if(!token){
alert("You are not logged in")
return
}

try{

await api.delete("/users/me",{
headers:{
Authorization:`Bearer ${token}`
}
})

localStorage.removeItem("token")
alert("Account deleted")

window.location.href="/"

}catch(err:any){

alert(
err?.response?.data?.error || "Delete failed"
)

}

}

/* Prevent dashboard flash before auth check */

if(checkingAuth){
return null
}

return(

<div className="px-6 py-20 max-w-4xl mx-auto">

<h1 className="text-4xl font-bold mb-8 text-white">
Write Article
</h1>

<input
className="w-full p-3 mb-4 bg-white/5 backdrop-blur border border-white/10 rounded text-white"
placeholder="Article Title"
value={title}
onChange={e=>setTitle(e.target.value)}
/>

<SimpleMDE
value={content}
onChange={setContent}
/>

<button
className="mt-6 bg-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
onClick={publishArticle}
disabled={loading}
>
{loading ? "Publishing..." : "Publish Article"}
</button>


<h2 className="text-3xl font-bold mt-16 mb-6 text-white">
Your Articles
</h2>

{articles.length === 0 && (
<p className="text-gray-400">No articles yet</p>
)}

<div className="space-y-6">

{articles.map((article:any)=>(

<div
key={article.id}
className="bg-white/5 backdrop-blur border border-white/10 p-6 rounded-lg hover:bg-white/10 transition"
>

<h3 className="text-xl font-semibold text-white">
{article.title}
</h3>

<div className="flex gap-6 mt-4">

<button
onClick={()=>router.push(`/edit/${article.id}`)}
className="text-indigo-400 hover:text-indigo-300"
>
Edit
</button>

<button
onClick={()=>deleteArticle(article.id)}
className="text-red-400 hover:text-red-300"
>
Delete
</button>

</div>

</div>

))}

</div>

<button
onClick={deleteAccount}
className="text-red-500 mt-16 hover:text-red-400"
>
Delete Account
</button>

</div>

)

}