"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import api from "@/lib/api"
import dynamic from "next/dynamic"

const SimpleMDE = dynamic(
 () => import("react-simplemde-editor"),
 { ssr:false }
)

import "easymde/dist/easymde.min.css"

export default function EditArticle(){

const router = useRouter()
const params = useParams()

const [title,setTitle] = useState("")
const [content,setContent] = useState("")
const [loading,setLoading] = useState(false)

useEffect(()=>{

const fetchArticle = async () => {

try{

const res = await api.get(`/articles`)

const article = res.data.find((a:any)=>a.id == params.id)

if(article){
setTitle(article.title)
setContent(article.content)
}

}catch(err){
console.error(err)
}

}

fetchArticle()

},[])


const updateArticle = async () => {

if(!title || !content){
alert("Title and content required")
return
}

try{

setLoading(true)

await api.put(`/articles/${params.id}`,{
title,
content
})

alert("Article updated")

router.push("/dashboard")

}catch(err:any){

alert(
err?.response?.data?.error || "Update failed"
)

}finally{

setLoading(false)

}

}

return(

<div className="p-10 max-w-3xl mx-auto">

<h1 className="text-3xl font-bold mb-6">
Edit Article
</h1>

<input
className="w-full p-3 mb-4 bg-gray-800 rounded"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<SimpleMDE
value={content}
onChange={setContent}
/>

<button
className="mt-6 bg-green-600 px-6 py-3 rounded"
onClick={updateArticle}
disabled={loading}
>
{loading ? "Updating..." : "Update Article"}
</button>

</div>

)

}