"use client"

export const dynamic = "force-dynamic";
import { useEffect, useState } from "react"
import Link from "next/link"
import api from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"

function calculateReadTime(content:string){

if(!content) return "1 min read"

const words = content.split(" ").length
const minutes = Math.ceil(words/200)

return `${minutes} min read`

}

export default function Articles(){

const [articles,setArticles] = useState<any[]>([])
const [loading,setLoading] = useState(true)

const searchParams = useSearchParams()
const query = searchParams.get("q")

useEffect(()=>{

const fetchArticles = async()=>{

try{

const res = await api.get("/articles")

setArticles(res.data || [])

}catch(err){
console.error(err)
}

setLoading(false)

}

fetchArticles()

},[])


/* Filter articles if search query exists */

const filteredArticles = query
? articles.filter((article:any)=>
(article.title || "")
.toLowerCase()
.includes(query.toLowerCase())
)
: articles


return(

<div className="min-h-screen px-6 py-20">

<div className="max-w-4xl mx-auto">

<h1 className="text-5xl font-bold mb-6 text-white">
{query ? `Search Results` : "Explore Articles"}
</h1>

{query && (
<p className="text-gray-400 mb-8">
Showing results for "{query}"
</p>
)}

{loading && (
<p className="text-gray-400">Loading articles...</p>
)}

{!loading && filteredArticles.length === 0 && (

<p className="text-gray-400">

{query
? `No articles found for "${query}"`
: "No articles published yet"}

</p>

)}

<div className="space-y-8">

{filteredArticles.map((article:any)=>(

<Card
key={article.id}
className="bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition duration-300"
>

<CardContent className="p-6">

<h2 className="text-2xl font-semibold mb-2 text-white hover:text-indigo-300 transition">
{article.title}
</h2>

<p className="text-gray-400 text-sm mb-3">

By {article.author_name || "Unknown"} • {calculateReadTime(article.content)}

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

</div>

)

}