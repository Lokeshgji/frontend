"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function calculateReadTime(content?: string){

if(!content) return "1 min read"

const words = content.split(" ").length
const minutes = Math.ceil(words / 200)

return `${minutes} min read`

}

export default function AuthorPage(){

const params = useParams()
const id = params.id

const [author,setAuthor] = useState<any>(null)
const [articles,setArticles] = useState<any[]>([])
const [loading,setLoading] = useState(true)
const [error,setError] = useState("")

useEffect(()=>{

const fetchData = async () => {

try{

const authorRes = await axios.get(
`http://localhost:8080/authors/${id}`
)

setAuthor(authorRes.data)

const articleRes = await axios.get(
`http://localhost:8080/authors/${id}/articles`
)

setArticles(articleRes.data || [])

}catch(err:any){

setError(
err?.response?.data?.error ||
"Author not found"
)

}finally{

setLoading(false)

}

}

fetchData()

},[id])

if(loading){
return (
<div className="p-10 text-gray-400 text-center">
Loading author...
</div>
)
}

if(error){
return (
<div className="p-10 text-red-400 text-center">
{error}
</div>
)
}

return(

<div className="max-w-4xl mx-auto px-6 py-20">

{/* Author Header */}

<div className="mb-12">

<h1 className="text-4xl font-bold mb-2 text-white">
{author.name}
</h1>

<p className="text-gray-400">
{author.email}
</p>

<p className="text-gray-400 mt-2">
{articles.length} Articles Published
</p>

</div>

<h2 className="text-2xl mb-6 text-white">
Articles by {author.name}
</h2>

{articles.length === 0 && (
<p className="text-gray-400">
No articles published yet
</p>
)}

<div className="space-y-8">

{articles.map((article:any)=>(

<Card
key={article.id}
className="bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition duration-300"
>

<CardContent className="p-6">

<h3 className="text-2xl font-semibold mb-2 text-white hover:text-indigo-300 transition">

{article.title}

</h3>

<p className="text-gray-400 text-sm mb-3">

{calculateReadTime(article.content)}

</p>

<p className="text-gray-300 mb-5">

{(article.content || "").slice(0,160)}...

</p>

<Link href={`/article/${article.slug}`}>

<Button variant="outline">
Read Article
</Button>

</Link>

</CardContent>

</Card>

))}

</div>

</div>

)

}