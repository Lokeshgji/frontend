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

useEffect(()=>{

const token = localStorage.getItem("token")

if(!token){
router.push("/login")
return
}

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

return(

<div className="p-10 max-w-3xl mx-auto">

<h1 className="text-3xl font-bold mb-6">
Write Article
</h1>

<input
className="w-full p-3 mb-4 bg-gray-800 rounded text-white"
placeholder="Article Title"
value={title}
onChange={e=>setTitle(e.target.value)}
/>

<SimpleMDE
value={content}
onChange={setContent}
/>

<button
className="mt-6 bg-blue-600 px-6 py-3 rounded hover:bg-blue-700"
onClick={publishArticle}
disabled={loading}
>
{loading ? "Publishing..." : "Publish Article"}
</button>


<h2 className="text-2xl font-bold mt-10 mb-4">
Your Articles
</h2>

{articles.length === 0 && (
<p className="text-gray-400">No articles yet</p>
)}

{articles.map((article:any)=>(
<div
key={article.id}
className="border border-gray-700 p-4 mb-4 rounded"
>

<h3 className="text-xl">{article.title}</h3>

<button
onClick={()=>deleteArticle(article.id)}
className="text-red-500 mt-2"
>
Delete
</button>

</div>
))}

<button
onClick={deleteAccount}
className="text-red-500 mt-10"
>
Delete Account
</button>

</div>

)

}